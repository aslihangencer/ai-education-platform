import type { Lesson } from '../lessonTypes';
import { chatCompletionJson } from './openaiChat';

function cleanReference(referenceTranscript: string) {
  return referenceTranscript.trim();
}

export async function generateLessonFromPdfText({
  extractedText,
  referenceTranscript,
  teachingPersona,
  customGuidelines,
}: {
  extractedText: string;
  referenceTranscript: string;
  teachingPersona?: string;
  customGuidelines?: string;
}): Promise<Lesson> {
  const model = process.env.OPENAI_CHAT_MODEL ?? 'gpt-4o-mini';
  const ref = cleanReference(referenceTranscript);

  // Keep prompt size manageable.
  const trimmedText = extractedText.length > 12000 ? extractedText.slice(0, 12000) : extractedText;

  const personaMap: Record<string, string> = {
    encouraging: 'You are an encouraging AI tutor. Be patient, supportive, and celebrate progress.',
    socratic: 'You are a Socratic AI tutor. Ask guiding questions to help students discover answers themselves.',
    expert: 'You are an expert AI tutor. Be direct, clear, and provide detailed technical explanations.',
  };

  const personaPrompt = personaMap[teachingPersona || ''] || 'You are an AI tutor. Create a student-friendly lesson that is clear and adaptive.';

  const system =
    `${personaPrompt} ` +
    (customGuidelines ? `Follow these specific teacher instructions: "${customGuidelines}". ` : '') +
    'When a reference transcript is provided, analyze its tone, explanation style, and structure, then mimic it. ' +
    'Prefer short sections, predictable headings, and explanation patterns that match the reference. ' +
    'Be accurate and avoid hallucinating facts not present in the provided PDF text.';

  const user = [
    'PDF extracted text (source material):',
    trimmedText,
    '',
    ref
      ? `Reference lesson transcript (teaching style guide):\n${ref}`
      : 'No reference transcript provided. Use a default clear tutoring style.',
    '',
    'Return ONLY valid JSON with this shape:',
    '{',
    '  "styleGuide": {',
    '    "tone": string,',
    '    "explanationStyle": string,',
    '    "structure": string',
    '  },',
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
    '- audioScript should be narration-friendly text (not JSON, not bullets), roughly 1-3 minutes long',
    '- mimic reference structure and wording patterns when referenceTranscript is present',
  ].join('\n');

  const parsed = await chatCompletionJson({
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  });

  return normalizeLesson(parsed);
}

function normalizeLesson(raw: any): Lesson {
  const title = typeof raw?.title === 'string' ? raw.title.trim() : '';
  if (!title) throw new Error('LLM response missing “title”.');

  const styleGuide =
    raw?.styleGuide && typeof raw.styleGuide === 'object' ? raw.styleGuide : undefined;

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
    title: title || 'Untitled Lesson',
    steps: steps.length > 0 ? steps : [{ stepTitle: 'Introduction', explanation: 'No explanation provided.', keyPoints: [] }],
    keyPoints: keyPoints.length > 0 ? keyPoints : ['No key points provided.'],
    qna: qna.length > 0 ? qna : [{ question: 'No questions available.', answer: 'Check back later.' }],
    notes: notes.length > 0 ? notes : ['No additional notes.'],
    styleGuide: styleGuide || { tone: 'Neutral', explanationStyle: 'Standard', structure: 'Default' },
    audioScript,
  };
}

