import { NextResponse } from 'next/server';
import { analyzeWithGemini } from '@/app/actions/ai-analyze';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const data = await analyzeWithGemini(prompt);
  return NextResponse.json(data);
}
