import { NextResponse } from 'next/server';

/**
 * NEXT.JS API BRIDGE FOR PDF ANALYSIS
 * This route simulates the backend processing of a specific PDF range.
 * Integration note: In a real environment, this would call the FastAPI /analyze-pdf/ endpoint.
 */

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const startPage = formData.get('start_page');
    const endPage = formData.get('end_page');

    if (!file || !startPage || !endPage) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Mocking the "Teacher Mode" response based on the defined prompt
    // In reality, this would use PyMuPDF to extract text and Gemini to analyze.
    
    return NextResponse.json({
      summary: `Ders kitabınızın ${startPage}. ve ${endPage}. sayfalarını inceledim. Bu bölümde özellikle ekosistem dengesi ve biyotik faktörler üzerinde duruluyor. 
      Özellikle 2. sayfadaki besin zinciri diyagramı, üreticilerden tüketicilere doğru bir enerji akışını simgeliyor. 
      Önemli Noktalar: 
      1. Enerji akışının yönü tektir.
      2. Ayrıştırıcılar her basamakta görev alır.
      3. Madde döngüsü süreklidir.`,
      page_range: `${startPage}-${endPage}`,
      status: "success"
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
