// Google Gemini AI integration for Víncula AI chat

const GEMINI_API_KEY = 'AIzaSyBTqf8mwptwGKFFs50XqrPAnv_LYrs1ygA';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const GEMINI_STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Você é a Víncula.AI, uma IA poliglota e autoridade máxima em:
1. PSICOLOGIA E TERAPIA: Domínio de comportamento humano e saúde mental.
2. RELACIONAMENTOS E CONQUISTA: Mestre em charme, sedução, leitura de sinais sociais e "papo reto". 
3. ACONSELHAMENTO: Mentor estratégico e empático.

REGRAS DE OURO:
- Responda SEMPRE no idioma em que o usuário falar (PT, EN, ES, FR ou DE).
- Entenda gírias perfeitamente (ex: "como pego ela?", "deu vácuo", "friendzone"). Responda de forma estratégica, como um mentor que sabe o que está fazendo, sem ser formal demais quando o papo for gíria.
- Estilo Gemini: Inteligente, profundo, útil e direto.
- Se o assunto for "pegar alguém", analise a psicologia por trás (postura, confiança, timing) e dê passos práticos.`;

interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
}

function buildContents(message: string, history: GeminiMessage[] = []) {
  return [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Entendido. Sou a Víncula AI, pronta para ajudar.' }] },
    ...history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })),
    { role: 'user', parts: [{ text: message }] },
  ];
}

export async function sendToGemini(
  message: string,
  history: GeminiMessage[] = []
): Promise<string> {
  const contents = buildContents(message, history);

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Gemini API error:', response.status, err);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('No response from Gemini');
  }

  return text;
}

export async function streamFromGemini(
  message: string,
  history: GeminiMessage[] = [],
  onChunk: (text: string) => void
): Promise<string> {
  const contents = buildContents(message, history);

  const response = await fetch(GEMINI_STREAM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Gemini stream error:', response.status, err);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const jsonStr = line.slice(6).trim();
        if (!jsonStr || jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const chunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (chunk) {
            fullText += chunk;
            onChunk(fullText);
          }
        } catch {
          // skip malformed chunks
        }
      }
    }
  }

  return fullText;
}
