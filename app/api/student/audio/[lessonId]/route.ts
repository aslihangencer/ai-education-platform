import fs from 'fs';
import { fileExists, getAudioPath } from '../../../../../lib/server/storage';

export const runtime = 'nodejs';

export async function GET(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  const { lessonId } = params;
  const audioPath = getAudioPath(lessonId);

  const exists = await fileExists(audioPath);
  if (!exists) return new Response('Audio not found.', { status: 404 });

  const url = new URL(req.url);
  const download = url.searchParams.get('download') === '1';

  const stream = fs.createReadStream(audioPath);
  const headers: HeadersInit = {
    'Content-Type': 'audio/mpeg',
    'Cache-Control': 'public, max-age=31536000, immutable',
  };

  if (download) {
    headers['Content-Disposition'] = `attachment; filename="${lessonId}.mp3"`;
  }

  return new Response(stream as any, { headers });
}

