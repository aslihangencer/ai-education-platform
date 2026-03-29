type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `OpenAI request failed (${res.status})`);
  }

  return (await res.json()) as T;
}

export async function chatCompletionJson({
  model,
  messages,
}: {
  model: string;
  messages: ChatMessage[];
}) {
  const data = await postJson<any>('https://api.openai.com/v1/chat/completions', {
    model,
    messages,
    temperature: 0.2,
    response_format: { type: 'json_object' },
  });

  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string') throw new Error('Invalid OpenAI response payload');

  const parsed = tryParseJson(content);
  if (!parsed) throw new Error('Failed to parse lesson JSON from model output');
  return parsed;
}

function tryParseJson(input: string) {
  try {
    return JSON.parse(input);
  } catch {
    // Attempt to recover from wrapped output.
    const firstBrace = input.indexOf('{');
    const lastBrace = input.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      const sliced = input.slice(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(sliced);
      } catch {
        return null;
      }
    }
    return null;
  }
}

