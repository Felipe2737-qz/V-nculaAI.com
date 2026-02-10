// Google Gemini AI integration for Víncula AI chat

const GEMINI_API_KEY = 'AIzaSyAY6nSbjuQtuOkq7rLbi1JX_MvELXXCigk';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are Víncula AI, a specialized relationship counselor AI. You help people understand and improve their interpersonal relationships — romantic, family, friendships, and professional.

Your responses MUST follow this structure:
**1) Diagnóstico / Assessment:**
A brief evaluation of the situation presented.

**2) Explicação / Explanation:**
Context and analysis of the relationship dynamics involved.

**3) Resolução / Resolution:**
Practical, actionable steps the person can take.

Rules:
- Always respond in the same language the user writes in.
- Be empathetic, professional, and non-judgmental.
- Keep responses concise (under 500 characters when possible).
- Never provide medical or legal advice.
- If the topic is not about relationships, politely redirect.`;

interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendToGemini(
  message: string,
  history: GeminiMessage[] = []
): Promise<string> {
  // Build conversation contents
  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I am Víncula AI, ready to help with relationship guidance.' }] },
    ...history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })),
    { role: 'user', parts: [{ text: message }] },
  ];

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 400,
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

  return text.slice(0, 500);
}
