# Víncula AI

AI-powered relationship guidance SaaS with credits system ("Vínculos").

## 🚀 Quick Start

### Frontend (Running in Lovable)
The React frontend is live! Set environment variables:
```
VITE_API_URL=http://localhost:4000
```

### Backend (Run Separately)
```bash
cd backend
npm install
cp .env.example .env  # Edit with your values
npm run dev           # Runs on :4000
```

### AI Python Service (Run Separately)
```bash
cd ai-python
python3 vincula_ai_mini_rag_multilang.py --serve  # Runs on :8088
```

## 📁 Structure

- `/src` - React frontend (Lovable)
- `/backend` - Node.js + Express + MongoDB
- `/ai-python` - Python AI microservice

## 💰 Plans & Pricing

| Plan | Vínculos | USD | BRL |
|------|----------|-----|-----|
| Starter | 50 | $1 | R$5 |
| Basic | 120 | $2 | R$10 |
| Advanced | 250 | $4 | R$20 |
| Premium | 1000 | $15 | R$75 |

## 🔑 Business Rules

- 1 AI response = 1 Vínculo consumed
- Atomic consumption (no double-spend)
- If AI fails → vínculo refunded
- Language ≠ Currency (independent settings)
