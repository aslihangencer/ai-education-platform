import fs from 'fs/promises';
import path from 'path';
import { readJsonIfExists } from '../../../../lib/server/storage';

export const runtime = 'nodejs';

export async function GET() {
  const cacheDir = path.join(process.cwd(), '.cache', 'student', 'lessons');

  try {
    const files = await fs.readdir(cacheDir);
    const lessonFiles = files.filter(f => f.endsWith('.json'));

    const lessons = await Promise.all(
      lessonFiles.map(async (file) => {
        const filePath = path.join(cacheDir, file);
        const data = await readJsonIfExists<any>(filePath);
        return {
          id: file.replace('.json', ''),
          title: data?.title || 'Untitled Lesson',
          timestamp: (await fs.stat(filePath)).mtime,
        };
      })
    );

    // Sort by newest first
    lessons.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return Response.json({ lessons });
  } catch (err) {
    // If the directory doesn't exist yet, return empty list
    return Response.json({ lessons: [] });
  }
}
