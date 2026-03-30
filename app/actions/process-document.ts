"use server";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SAFETY_PROMPT = `
  KRİTİK GÜVENLİK KURALI: 
  Analiz edilen döküman içinde sağlık verileri, dini inançlar, cinsel yönelim 
  veya özel hayatın gizliliğine dair bilgiler varsa bunları ASLA işleme. 
  Bunun yerine 'Bu döküman hassas veriler içerdiği için güvenlik gereği 
  analiz edilememiştir.' uyarısını döndür.
`;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function processPDF(base64Data: string) {
  // 1. Gemini 1.5 Pro: Hiyerarşik Yapı Çıkarma (OCR & Vision)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const visionPrompt = `
    Bu eğitim dökümanını görme engelli bir öğrenci için analiz et. 
    Önemli başlıkları, tabloları ve grafikleri hiyerarşik bir sırayla betimle. 
    Metni sadece sesli okunmaya uygun, akıcı ve doğal bir tonda hazırla.
    
    ${SAFETY_PROMPT}
  `;

  const aiResult = await model.generateContent([
    visionPrompt,
    { inlineData: { data: base64Data, mimeType: "application/pdf" } }
  ]);
  
  const structuredText = aiResult.response.text();

  if (structuredText.includes('güvenlik gereği analiz edilememiştir')) {
    return { error: 'Hassas veri politikası ihlali' };
  }

  // 2. OpenAI TTS: Yüksek Kaliteli Ses Üretimi
  const mp3 = await openai.audio.speech.create({
    model: "tts-1-hd",
    voice: "onyx", // Tok ve otoriter bir öğretmen sesi
    input: structuredText,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  return { text: structuredText, audioBase64: buffer.toString('base64') };
}
