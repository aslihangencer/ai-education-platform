import toast from 'react-hot-toast';

export async function describeImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/api/vision', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
        throw new Error('API Hatası');
    }

    const data = await res.json();
    return data.description;
  } catch (error) {
     toast.error('Görsel işlenirken hata oluştu.');
     return 'Hata: Bağlantı veya sistem arızası.';
  }
}
