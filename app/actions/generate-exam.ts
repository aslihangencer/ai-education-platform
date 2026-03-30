"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * createExamFromMaterial:
 * Leverages Gemini 1.5 Pro's JSON mode to generate high-quality 
 * multiple-choice exams based on analyzed lesson material.
 */
export async function createExamFromMaterial(materialId: string) {
  try {
    // 1. Fetch material summary
    const material = await prisma.material.findUnique({
      where: { id: materialId }
    });

    if (!material || !material.aiSummary) {
      throw new Error("Material analysis not found. Please analyze the PDF first.");
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: { 
        responseMimeType: "application/json" // Enable Native JSON Mode
      }
    });

    const prompt = `
      You are an expert examiner for visually impaired students. 
      Generate a 10-question multiple-choice exam based on the following summary:
      
      "${material.aiSummary}"
      
      REQUIREMENTS:
      1. Each question must be clear and focus on key concepts.
      2. Format: Output a JSON object with a "questions" key containing an array of objects.
      3. Each question object MUST have:
         - "question": string
         - "options": array of 4 strings
         - "correctAnswer": integer (0 to 3)
      4. Language: Turkish (Türkçe).
    `;

    const result = await model.generateContent(prompt);
    const examContent = JSON.parse(result.response.text());

    // 2. Persist the exam to the database
    const exam = await prisma.exam.create({
      data: {
        title: `${material.title} - AI Sınavı`,
        description: "Gemini 1.5 Pro tarafından hazırlanan kazanım kavrama testi.",
        content: examContent, // Stoing JSON directly
        materialId: materialId
      }
    });

    return {
      id: exam.id,
      title: exam.title,
      questions: examContent.questions
    };
  } catch (error) {
    console.error("Exam Generation Error:", error);
    throw new Error("Sınav oluşturulamadı. Lütfen materyalin analiz edildiğinden emin olun.");
  }
}
