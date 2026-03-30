import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pdf from 'pdf-parse';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Güvenlik Kontrolü
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    // 1. PDF'ten Metin Çıkarma (Sunucu tarafında Buffer üzerinden)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let fullText = "";
    try {
      const data = await pdf(buffer);
      fullText = data.text;
    } catch (pdfError) {
      console.error('PDF Parse Error:', pdfError);
      return NextResponse.json({ error: 'PDF dökümanı okunamadı' }, { status: 422 });
    }

    if (!fullText || fullText.trim().length === 0) {
      return NextResponse.json({ error: 'PDF içeriği boş veya okunamıyor' }, { status: 422 });
    }

    // 2. Gemini AI Analizi (Erişilebilirlik Odaklı)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      Aşağıdaki ders notunu görme engelli bir öğrenci için analiz et ve erişilebilir bir formatta yeniden yapılandır.
      Kurallar:
      - Çok net, basit ve akıcı bir dil kullan.
      - Önemli kavramları vurgula.
      - Varsa karmaşık tabloları veya görsel düzenleri metinle betimle.
      - Sonunda öğrencinin konuyu pekiştirmesi için 2 adet düşündürücü soru ekle.

      Metin İçeriği:
      ${fullText.substring(0, 15000)}
    `;

    const result = await model.generateContent(prompt);
    const aiSummary = result.response.text();

    // 3. Veritabanına Kaydet (Prisma Note Modeli)
    const newNote = await prisma.note.create({
      data: {
        title: file.name.replace('.pdf', '') || 'Yeni Ders Notu',
        textContent: aiSummary,
        authorId: session.user.id,
        aiDescription: "AI tarafından oluşturulmuş erişilebilir ders özeti.",
      },
    });

    return NextResponse.json({ 
      success: true, 
      noteId: newNote.id,
      title: newNote.title,
      summary: aiSummary
    });

  } catch (error) {
    console.error('AI PDF Processing Error:', error);
    return NextResponse.json({ error: 'Sunucu tarafında bir hata oluştu' }, { status: 500 });
  }
}
