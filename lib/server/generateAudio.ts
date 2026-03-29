import type { Lesson } from '../lessonTypes';
import { fileExists, getAudioPath, getLessonPath, readJsonIfExists, writeBinary } from './storage';

async function generateTtsMp3({
  input,
  voice,
  model,
}: {
  input: string;
  voice: string;
  model: string;
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY');

  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      voice,
      input,
      format: 'mp3',
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `TTS request failed (${res.status})`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function generateAudioForLesson(lessonId: string) {
  const audioPath = getAudioPath(lessonId);
  const cached = await fileExists(audioPath);
  if (cached) {
    return { audioUrl: `/api/student/audio/${lessonId}`, cached: true };
  }

  const lessonPath = getLessonPath(lessonId);
  const lesson = await readJsonIfExists<Lesson>(lessonPath);
  if (!lesson) throw new Error('Lesson not found for audio generation');

  const voice = process.env.OPENAI_TTS_VOICE ?? 'alloy';
  const model = process.env.OPENAI_TTS_MODEL ?? 'gpt-4o-mini-tts';

  const script = lesson.audioScript;
  if (!script || !script.trim()) throw new Error('Missing audioScript for lesson');

  const ttsBytes = await generateTtsMp3({ input: script, voice, model });
  await writeBinary(audioPath, ttsBytes);

  return { audioUrl: `/api/student/audio/${lessonId}`, cached: false };
}

