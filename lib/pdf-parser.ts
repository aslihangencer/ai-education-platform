import pdf from 'pdf-parse';

/**
 * extractTextFromBuffer:
 * A foundational utility to extract raw text content from PDF binary buffers.
 * Optimized for server-side execution within Next.js Server Actions.
 */
export async function extractTextFromBuffer(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    return data.text; // Returns the raw text for AI processing
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw new Error("Could not read PDF content. Please ensure the file is a valid PDF.");
  }
}
