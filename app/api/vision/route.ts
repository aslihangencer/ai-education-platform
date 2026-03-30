import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini safely
const geminiApiKey = process.env.GEMINI_API_KEY || '';
let genAI: GoogleGenerativeAI | null = null;
if (geminiApiKey) {
  genAI = new GoogleGenerativeAI(geminiApiKey);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Görsel yüklenmedi.' }, { status: 400 });
    }

    // Convert File to Base64 (needed for Gemini inline data format)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type;

    if (!genAI) {
      // PROTOTYPE MODE: If user hasn't put the GEMINI_API_KEY in .env, simulate it.
      return NextResponse.json({
        description: `API Anahtarı bulunamadı. Simülasyon modu: Gönderdiğiniz ${file.name} adlı görsel inceleniyor. Fotoğraf ağırlıklı olarak aydınlık tonlara sahip ve sistemin deneme modunda olduğunu belirtiyor. Tam açıklama için lütfen çevre değişkenlerine GEMINI API Anahtarınızı ekleyiniz.`
      });
    }

    // PRODUCTION MODE
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Lütfen bu görseli AŞIRI DETAYLI VE YALIN bir Türkçe ile, tamamen görme engelli birine anlatır gibi betimle (Renkler, konumlar, ışık, potansiyel tehlikeler veya nesneler dahil).`;

    const imageParts = [
      {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ description: text });

  } catch (error: any) {
    console.error("Gemini Vision API Hatası:", error);
    return NextResponse.json({ error: error.message || 'API Hatası' }, { status: 500 });
  }
}
