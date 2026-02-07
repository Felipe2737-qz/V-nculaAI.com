#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Vincula AI Mini (Single-file) - Multilíngue + RAG (TF-IDF) + Keywords
See README.md for usage instructions.
"""
import os, re, json, math, argparse
from collections import Counter
from http.server import BaseHTTPRequestHandler, HTTPServer

PORT = 8088
DOCS_DIR = "docs"
MAX_CHARS = 2000
TOP_K = 4
CHUNK_SIZE = 900
CHUNK_OVERLAP = 140

RISK_PATTERNS = [r"\bsuicid", r"\bme matar\b", r"\bautoagress", r"\bme cortar\b", r"\bnao aguento mais\b"]
LANGS = ["pt","en","es","fr","de"]

LANG_HINTS = {
    "pt": ["você","como","não","pra","porque","relacionamento","ciúmes","ansiedade"],
    "en": ["you","how","don't","because","relationship","anxiety","communication"],
    "es": ["cómo","tú","porque","relación","ansiedad","comunicación"],
    "fr": ["comment","vous","parce","relation","anxiété","communication"],
    "de": ["wie","du","weil","beziehung","angst","kommunikation"],
}

LABELS = {
    "pt": ("1) Diagnóstico", "2) Explicação", "3) Resolução"),
    "en": ("1) Assessment", "2) Explanation", "3) Resolution"),
    "es": ("1) Evaluación", "2) Explicación", "3) Resolución"),
    "fr": ("1) Évaluation", "2) Explication", "3) Résolution"),
    "de": ("1) Einschätzung", "2) Erklärung", "3) Lösung"),
}

RISK_REPLY = {
    "pt": "Eu me importo com sua segurança. Fale com um adulto de confiança agora.",
    "en": "I care about your safety. Please talk to a trusted adult right now.",
    "es": "Me importa tu seguridad. Habla con un adulto de confianza ahora.",
    "fr": "Ta sécurité compte. Parle à un adulte de confiance maintenant.",
    "de": "Deine Sicherheit ist wichtig. Sprich jetzt mit einer vertrauten Person.",
}

def is_risky(text): return any(re.search(p, text.lower()) for p in RISK_PATTERNS)
def detect_lang(text):
    t = text.lower()
    scores = {l: sum(2 for h in hints if h in t) for l, hints in LANG_HINTS.items()}
    return max(scores, key=scores.get) if max(scores.values()) > 0 else "pt"

def norm(text): return re.sub(r"\s+", " ", re.sub(r"[^a-zà-ú0-9\s]", " ", text.strip().lower()))
def tokenize(text): return [w for w in norm(text).split() if len(w) > 1]

def read_docs(lang):
    docs = []
    for subdir in ["common", lang]:
        path = os.path.join(DOCS_DIR, subdir)
        if os.path.isdir(path):
            for fn in os.listdir(path):
                if fn.endswith((".txt", ".md")):
                    try:
                        docs.append((fn, open(os.path.join(path, fn), "r", encoding="utf-8").read()))
                    except: pass
    return docs

def chunk_text(text):
    text = re.sub(r"\s+", " ", text).strip()
    return [text[i:i+CHUNK_SIZE] for i in range(0, len(text), CHUNK_SIZE - CHUNK_OVERLAP)]

def build_index(lang):
    chunks = [{"source": src, "text": ch} for src, txt in read_docs(lang) for ch in chunk_text(txt)]
    if not chunks: return {"chunks": [], "idf": {}, "tfidf": []}
    df = Counter()
    tokens_list = []
    for c in chunks:
        toks = tokenize(c["text"])
        tokens_list.append(toks)
        for w in set(toks): df[w] += 1
    N = len(chunks)
    idf = {w: math.log((N+1)/(d+1)) + 1.0 for w, d in df.items()}
    tfidf = [{w: (f/max(1,len(toks))) * idf.get(w,0) for w, f in Counter(toks).items()} for toks in tokens_list]
    return {"chunks": chunks, "idf": idf, "tfidf": tfidf}

def cosine(a, b):
    if not a or not b: return 0.0
    dot = sum(v * b.get(k, 0) for k, v in a.items())
    na, nb = math.sqrt(sum(v*v for v in a.values())), math.sqrt(sum(v*v for v in b.values()))
    return dot / (na * nb) if na and nb else 0.0

def search(index, query):
    qv = {w: (f/max(1,len(tokenize(query)))) * index["idf"].get(w,0) for w, f in Counter(tokenize(query)).items()}
    scores = sorted([(cosine(qv, vec), i) for i, vec in enumerate(index["tfidf"])], reverse=True)
    return [{"score": s, **index["chunks"][i]} for s, i in scores[:TOP_K] if s > 0]

class Engine:
    def __init__(self):
        self.indexes = {l: build_index(l) for l in LANGS}
    
    def reply(self, msg):
        lang = detect_lang(msg)
        if is_risky(msg): return {"lang": lang, "answer": RISK_REPLY[lang][:MAX_CHARS], "domain": "safety", "sources": []}
        L1, L2, L3 = LABELS[lang]
        contexts = search(self.indexes[lang], msg)
        ctx_str = "\n".join(f"- {c['text'][:150]}..." for c in contexts[:2]) if contexts else ""
        answer = f"""{L1}: Based on your message, I'll provide structured guidance.

{L2}: Relationships involve communication patterns, expectations, and emotional dynamics. Understanding these helps navigate challenges.

{L3}:
1. Identify the specific pattern you want to address
2. Express needs clearly using "I" statements
3. Listen to understand, not just respond

{ctx_str}"""
        return {"lang": lang, "answer": answer[:MAX_CHARS], "domain": "general", "sources": contexts}

class Handler(BaseHTTPRequestHandler):
    engine = None
    def _send(self, code, payload):
        data = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(data)
    
    def do_POST(self):
        if self.path != "/chat": return self._send(404, {"error": "not_found"})
        try:
            body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))).decode())
            msg = (body.get("message") or "").strip()
            if not msg: return self._send(400, {"error": "missing_message"})
            self._send(200, self.engine.reply(msg))
        except Exception as e:
            self._send(500, {"error": str(e)})
    
    def log_message(self, *args): pass

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--serve", action="store_true")
    args = ap.parse_args()
    engine = Engine()
    if args.serve:
        Handler.engine = engine
        print(f"✅ AI API: http://127.0.0.1:{PORT}/chat")
        HTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
    else:
        print("Interactive mode. Type 'sair' to exit.")
        while True:
            u = input("You: ").strip()
            if u.lower() == "sair": break
            print("AI:", engine.reply(u)["answer"])

if __name__ == "__main__": main()
