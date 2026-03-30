"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * analyzeVisualContent:
 * The core 'Digital Eye' engine. It uses Gemini 1.5 Pro Vision to 
 * describe complex visual data (diagrams, tables, charts) from PDF snapshots.
 * Provides spatial context to help visually impaired students build a 
 * mental model of the educational material.
 */
export async function analyzeVisualContent(imageBufferBase64: string) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Sen bir görme engelli eğitim asistanısın. 
      Önündeki görsel bir eğitim materyalinden (PDF) alınan bir kesittir.
      Lütfen bu görseldeki tabloyu, grafiği veya diyagramı mekansal (spatial) olarak betimle. 
      Örneğin: "Sol üstte X başlığı var, altında 3 sütunlu bir tablo başlıyor, ilk sütun tarihleri gösteriyor..." şeklinde anlat.
      Karmaşık sayısal verileri özetle, trendleri belirt.
      Kısa, net ve sesli okunmaya uygun bir dil kullan.
      Türkçe konuş.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBufferBase64,
          mimeType: "image/png"
        }
      }
    ]);

    const description = result.response.text().trim();

    return {
      success: true,
      description: description
    };
  } catch (error) {
    console.error("Digital Eye Analysis Error:", error);
    return {
      success: false,
      description: "Görsel analiz edilemedi. Lütfen tekrar deneyin veya eğitmeninize danışın."
    };
  }
}
