"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function analyzePDFContent(fileData: string) {
  // Prisma v7 ve Next.js 15 için optimize edilmiş model çağrısı
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
    Sen bir görme engelli eğitim asistanısın. Bu PDF içeriğini analiz et:
    1. Metni yapılandırılmış (başlıklar, maddeler) şekilde özetle.
    2. Varsa görsel, grafik veya tabloların mekansal betimlemesini yap.
    3. Sadece sesli okunmaya uygun, akıcı bir metin döndür.
  `;

  try {
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: fileData, mimeType: "application/pdf" } }
    ]);
    return { success: true, summary: result.response.text() };
  } catch (error) {
    return { success: false, error: "Analiz sırasında bir hata oluştu." };
  }
}
