export const getSimulatedAIResponse = (input: string) => {
  const lowercaseInput = input.toLowerCase();

  if (lowercaseInput.includes("ders") || lowercaseInput.includes("çalış")) {
    return "Bugün matematik dersinde 40 soru çözdün, harikasın! Trigonometriye odaklanmanı öneririm.";
  }
  if (lowercaseInput.includes("meet") || lowercaseInput.includes("toplantı")) {
    return "Google Meet linkin otomatik olarak oluşturuldu. Öğrencin Ahmet seni bekliyor.";
  }
  if (lowercaseInput.includes("pdf") || lowercaseInput.includes("yükle")) {
    return "PDF başarıyla tarandı. İçerikte 12 adet çözülmüş soru ve 3 adet konu özeti buldum.";
  }

  return "Seni anlıyorum. Eğitim yolculuğunda her zaman yanındayım!";
};