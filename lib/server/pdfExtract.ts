export async function extractTextFromPdfBuffer(pdfBuffer: Buffer) {
  const pdfParse = require('pdf-parse');
  const data = await pdfParse(pdfBuffer);
  const text = (data.text ?? '').replace(/\s+/g, ' ').trim();
  return text;
}

