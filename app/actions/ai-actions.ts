"use server";

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * getAIStudySuggestions:
 * Professional Server Action using React cache for deduplication and performance.
 * Specifically handles the visually impaired user experience by providing actionable study hints.
 */
export const getAIStudySuggestions = cache(async (fileId: string) => {
  try {
    // 1. Fetch material data from Prisma
    const material = await prisma.material.findUnique({
      where: { id: fileId },
      select: { 
        title: true, 
        aiSummary: true 
      }
    });

    if (!material) {
        throw new Error("Material not found");
    }

    // 2. Initialize Gemini 1.5
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert AI tutor for visually impaired students. 
      Based on the document title "${material.title}" and summary "${material.aiSummary?.substring(0, 500) || 'No summary available'}", 
      generate 3 short, actionable study suggestions (max 5 words each). 
      Format as a simple JSON array of strings.
      Example: ["Summarize Chapter 1", "Key Dates Quiz", "Explain Formulas"]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Cleanup potential markdown artifacts from the response
    const cleanedJson = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
      
    const suggestions: string[] = JSON.parse(cleanedJson);

    // 3. Map to standardized Suggestion format
    return suggestions.map((label, index) => ({
      id: `suggest-${fileId}-${index}`,
      label: label,
    }));

  } catch (error) {
    console.error("AI Suggestions Error:", error);
    // Fallback suggestions for UI resilience (Group 1 goal)
    return [
      { id: "fallback-1", label: "Genel Bakışı Dinle" },
      { id: "fallback-2", label: "Anahtar Kelimeler" },
      { id: "fallback-3", label: "AI'ya Soru Sor" },
    ];
  }
});
