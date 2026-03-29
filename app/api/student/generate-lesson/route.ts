import { extractTextFromPdfBuffer } from '../../../../lib/server/pdfExtract';
import { generateLessonFromPdfText } from '../../../../lib/server/generateLesson';
import type { Lesson } from '../../../../lib/lessonTypes';
import { sha256Hex } from '../../../../lib/server/hash';
import { getLessonPath, readJsonIfExists, writeJson } from '../../../../lib/server/storage';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const form = await req.formData();
  const pdf = form.get('pdf');
  const referenceTranscript = (form.get('referenceTranscript') as string | null) ?? '';
  const teachingPersona = (form.get('teachingPersona') as string | null) ?? '';
  const customGuidelines = (form.get('customGuidelines') as string | null) ?? '';

  if (!pdf || typeof pdf === 'string') {
    return new Response('Missing PDF file.', { status: 400 });
  }

  const pdfFile = pdf as File;
  const pdfArrayBuffer = await pdfFile.arrayBuffer();
  const pdfBuffer = Buffer.from(pdfArrayBuffer);

  const pdfHash = sha256Hex(pdfBuffer);
  const referenceHash = sha256Hex(referenceTranscript);
  const guidelinesHash = sha256Hex(teachingPersona + customGuidelines);
  const lessonId = `${pdfHash}_${referenceHash}_${guidelinesHash}`;

  const existing = await readJsonIfExists<Lesson>(getLessonPath(lessonId));
  if (existing) {
    return Response.json({ lessonId, lesson: existing });
  }

  // Extract text and generate lesson with reference transcript style.
  try {
    const extractedText = await extractTextFromPdfBuffer(pdfBuffer);
    if (!extractedText || extractedText.length < 10) {
      return new Response('Could not extract text from the PDF.', { status: 400 });
    }

    const lesson = await generateLessonFromPdfText({
      extractedText,
      referenceTranscript,
      teachingPersona,
      customGuidelines,
    });

    await writeJson(getLessonPath(lessonId), lesson);
    return Response.json({ lessonId, lesson });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to generate lesson.';
    return new Response(message, { status: 500 });
  }
}

