import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateChatResponse(prompt: string, personality: string, context: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `You are an AI assistant with the following personality: ${personality}. 
          Context: ${context}
          User message: ${prompt}`,
        },
      ],
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

export async function summarizeTicket(description: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize this support ticket in one sentence: ${description}`,
    });
    return response.text;
  } catch (error) {
    console.error("Summarization Error:", error);
    return description.substring(0, 50) + "...";
  }
}
