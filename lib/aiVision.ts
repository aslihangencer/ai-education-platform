import toast from 'react-hot-toast';

export async function describeImage(file: File) {
  // Mock AI vision response for demonstration
  // In production, this would use actual vision API

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Mock descriptions based on file name or type
  const mockDescriptions = [
    "Bu görsel bir matematik grafiği gösteriyor. X ve Y eksenleri kesişiyor, kırmızı renkte bir parabol çizilmiş. Sol üst köşede denklemin formülü yazıyor.",
    "Resimde bir çiçek bahçesi görünüyor. Arka planda ağaçlar var, ön planda renkli çiçekler açmış. Güneş ışığı yapraklarda parlıyor.",
    "Bu bir tablo görüntüsü. Üç sütun var: İsim, Not, Tarih. Beş satır öğrenci bilgisi içeriyor. Başlık mavi renkte vurgulanmış.",
    "Görselde bir dünya haritası var. Ülkeler farklı renklerle boyanmış, okyanuslar mavi renkte. Bazı şehirler yıldız işaretleriyle gösterilmiş."
  ];

  const description = mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];

  return description;
}
