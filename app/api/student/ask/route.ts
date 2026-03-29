import { NextResponse } from 'next/server';

/**
 * MOCK API for AI Summarization and Q&A
 * In a production environment, these would call GPT-4o or Gemini.
 */

export async function POST(req: Request) {
  try {
    const { content, question } = await req.json();
    const url = new URL(req.url);
    const mode = url.pathname.split('/').pop(); // 'summarize' or 'ask'

    if (mode === 'summarize') {
       return NextResponse.json({
         summary: "Bu ders, mitokondrinin hücredeki 'enerji santrali' görevini ve ATP üretim sürecini detaylandırmaktadır. Temel olarak iç ve dış zar yapısına odaklanılmıştır."
       });
    }

    if (mode === 'ask') {
       return NextResponse.json({
         answer: `"${question}" sorunuz üzerine yaptığım analizde; mitokondrinin sadece enerji üretimi değil, aynı zamanda programlanmış hücre ölümü (apoptoz) süreçlerinde de kritik rol oynadığını söyleyebilirim.`
       });
    }

    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
