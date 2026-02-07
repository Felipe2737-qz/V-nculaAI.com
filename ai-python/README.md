# AI Python Service

## Run

```bash
python3 vincula_ai_mini_rag_multilang.py --serve
```

Runs on `http://127.0.0.1:8088/chat`

## API

```bash
curl -X POST http://127.0.0.1:8088/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I communicate better?"}'
```

## Add Knowledge

Place `.txt` or `.md` files in:
- `docs/common/` - All languages
- `docs/en/` - English only
- `docs/pt/` - Portuguese only
- etc.
