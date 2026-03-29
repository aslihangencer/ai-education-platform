import fs from 'fs/promises';
import path from 'path';

const CACHE_ROOT = path.join(process.cwd(), '.cache', 'student');

export function getLessonPath(lessonId: string) {
  return path.join(CACHE_ROOT, 'lessons', `${lessonId}.json`);
}

export function getAudioPath(lessonId: string) {
  return path.join(CACHE_ROOT, 'audio', `${lessonId}.mp3`);
}

async function ensureDirForFile(filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

export async function readJsonIfExists<T>(filePath: string): Promise<T | null> {
  try {
    const text = await fs.readFile(filePath, 'utf8');
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export async function writeJson(filePath: string, data: unknown) {
  await ensureDirForFile(filePath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function writeBinary(filePath: string, bytes: Buffer) {
  await ensureDirForFile(filePath);
  await fs.writeFile(filePath, bytes);
}

