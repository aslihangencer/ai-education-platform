"use server";

export async function analyzePDFContent(fileData: string) {
  // Mock AI response for demonstration - simulates Gemini 1.5 Pro analysis
  // In production, this would use actual AI API

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock analysis based on file content hints
  const mockAnalysis = `
    Bu PDF belgesi eğitim materyali olarak görünüyor. İçerikte matematik ders notları ve örnek problemler bulunuyor.

    Görsel analiz: Sol üst köşede bir koordinat sistemi grafiği var, x ve y eksenleri kesişiyor.
    Sağ tarafta ise bir tablo bulunuyor, üç sütun halinde öğrenci notları listelenmiş.
    Aşağıda ise bir daire grafiği var, farklı renklerde dilimler halinde bölünmüş.

    Metin içeriği: Temel cebir denklemleri ve çözüm yöntemleri anlatılıyor.
    Özellikle ikinci dereceden denklemlerin kökleri konusuna odaklanılmış.
  `;

  return { success: true, summary: mockAnalysis.trim() };
}
