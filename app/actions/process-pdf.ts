"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * processAndSummarizePDF:
 * A specialized Server Action that uses Gemini 1.5 Pro to provide 
 * an accessibility-first analysis of educational materials.
 * It focuses on spatial descriptions and logical flow for visually impaired students.
 */
export async function processAndSummarizePDF(fileId: string, rawText: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      You are an expert accessibility tutor for visually impaired students. 
      Analyze the following textbook content and format it for an auditory journey.
      
      TASK:
      1. HIGH-LEVEL OVERVIEW: Briefly describe the overall structure/layout of this chapter/page.
      2. LOGICAL AUDIO FLOW: Summarize the key concepts using transitional language (e.g., 'First', 'Building on that', 'Finally').
      3. INTERACTIVE HINTS: Identify 3 potential quiz questions to test comprehension.
      4. SPATIAL AWARENESS: If there are tables, lists, or diagrams mentioned in the text, describe their layout spatially (e.g., "The table has three columns; the leftmost one lists elements...").

      TEXT CONTENT:
      ${rawText.substring(0, 15000)} // Safe context limit for rapid processing
    `;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    // 2. Persist the analysis to the database for future retrieval
    await prisma.material.update({
      where: { id: fileId },
      data: { 
        aiSummary: summary,
        updatedAt: new Date()
      }
    });

    return summary;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("AI analysis failed. Please try again in a moment.");
  }
}
