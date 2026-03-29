import type { Lesson } from '../lessonTypes';
import { chatCompletionJson } from './openaiChat';

function normalizeReference(referenceTranscript: string) {
  return referenceTranscript.trim();
}

export async function generateExplanationFromTopic({
  topic,
  referenceTranscript,
}: {
  topic: string;
  referenceTranscript: string;
}): Promise<Lesson> {
  const model = process.env.OPENAI_CHAT_MODEL ?? 'gpt-4o-mini';
  const ref = normalizeReference(referenceTranscript);

  const cleanedTopic = topic.trim();
  if (!cleanedTopic) throw new Error('Missing topic');

  const system =
    'You are an AI tutor. Generate a student-friendly, clear explanation for the given topic. ' +
    'When a reference transcript is provided, analyze its tone, explanation style, and structure, then mimic it. ' +
    'Prefer short predictable headings and step-by-step sequencing that matches the reference. ' +
    'Avoid hallucinating facts not implied by the reference when reference is provided. ' +
    'Return a structured teaching plan, and also provide an audio narration script.';

  const user = [
    `Topic to teach: ${cleanedTopic}`,
    '',
    ref
      ? `Reference lesson transcript (teaching style guide):\n${ref}`
      : 'No reference transcript provided. Use a default clear tutoring style.',
    '',
    'Return ONLY valid JSON with this shape:',
    '{',
    '  "title": string,',
    '  "steps": [',
    '    {',
    '      "stepTitle": string,',
    '      "explanation": string,',
    '      "keyPoints": string[]',
    '    }',
    '  ],',
    '  "keyPoints": string[],',
    '  "qna": [',
    '    { "question": string, "answer": string }',
    '  ],',
    '  "notes": string[],',
    '  "audioScript": string',
    '}',
    '',
    'Constraints:',
    '- steps: 4 to 8 items',
    '- keyPoints: 6 to 12 items',
    '- qna: 3 to 6 items',
    '- notes: 5 to 10 items',
    '- audioScript should be narration-friendly text (not JSON), roughly 1-3 minutes long',
    '- mimic reference structure and wording patterns when referenceTranscript is present',
  ].join('\n');

  const parsed = await chatCompletionJson({
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  });

  return normalizeLesson(parsed, cleanedTopic);
}

function normalizeLesson(raw: any, fallbackTitle: string): Lesson {
  const title = typeof raw?.title === 'string' ? raw.title.trim() : '';
  if (!title) throw new Error('LLM response missing “title”.');
  const styleGuide =
    raw?.styleGuide && typeof raw.styleGuide === 'object'
      ? (raw.styleGuide as Lesson['styleGuide'])
      : undefined;

  const stepsRaw = Array.isArray(raw?.steps) ? raw.steps : [];
  const steps = stepsRaw
    .slice(0, 10)
    .map((s: any) => ({
      stepTitle: typeof s?.stepTitle === 'string' ? s.stepTitle.trim() : '',
      explanation: typeof s?.explanation === 'string' ? s.explanation.trim() : '',
      keyPoints: Array.isArray(s?.keyPoints)
        ? s.keyPoints.filter((x: any) => typeof x === 'string' && x.trim().length > 0)
        : [],
    }))
    .filter((s: any) => s.explanation.length > 0 && s.stepTitle.length > 0);

  if (steps.length < 2) throw new Error('LLM response produced insufficient “steps”.');

  const keyPoints = Array.isArray(raw?.keyPoints)
    ? raw.keyPoints.filter((x: any) => typeof x === 'string' && x.trim().length > 0)
    : [];
  if (keyPoints.length < 2) throw new Error('LLM response produced insufficient “keyPoints”.');

  const qnaRaw = Array.isArray(raw?.qna) ? raw.qna : [];
  const qna = qnaRaw
    .slice(0, 8)
    .map((q: any) => ({
      question: typeof q?.question === 'string' ? q.question.trim() : '',
      answer: typeof q?.answer === 'string' ? q.answer.trim() : '',
    }))
    .filter((x: any) => x.question.length > 0 && x.answer.length > 0);
  if (qna.length < 1) throw new Error('LLM response missing “qna” items.');

  const notes = Array.isArray(raw?.notes)
    ? raw.notes.filter((x: any) => typeof x === 'string' && x.trim().length > 0)
    : [];
  if (notes.length < 1) throw new Error('LLM response missing “notes”.');

  const audioScript = typeof raw?.audioScript === 'string' ? raw.audioScript.trim() : '';
  if (audioScript.length < 30) throw new Error('LLM response missing/invalid “audioScript”.');

  return {
    title,
    steps,
    keyPoints,
    qna,
    notes,
    styleGuide,
    audioScript,
  };
}

