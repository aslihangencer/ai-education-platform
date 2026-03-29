import { generateAudioForLesson } from '../../../../lib/server/generateAudio';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { lessonId?: string } | null;
  const lessonId = body?.lessonId;
  if (!lessonId) return new Response('Missing lessonId.', { status: 400 });

  try {
    const result = await generateAudioForLesson(lessonId);
    return Response.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to generate audio.';
    return new Response(message, { status: 500 });
  }
}

