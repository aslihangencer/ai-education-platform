import { generateExplanationFromTopic } from '../../../../lib/server/generateExplanationFromTopic';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { topic?: string; referenceTranscript?: string }
    | null;

  const topic = body?.topic ?? '';
  const referenceTranscript = body?.referenceTranscript ?? '';

  if (!topic.trim()) return new Response('Missing topic.', { status: 400 });

  try {
    const lesson = await generateExplanationFromTopic({ topic, referenceTranscript });
    return Response.json({ lesson });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to generate lesson.';
    return new Response(message, { status: 500 });
  }
}

