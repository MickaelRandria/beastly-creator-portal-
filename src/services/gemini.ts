import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateSocialContent(brief: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Brand Brief: ${brief}`,
    config: {
      systemInstruction: "You are a world-class social media strategist for high-end influencers. Convert the provided brand brief into viral content. Output strictly in JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hooks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 viral hooks for TikTok/Reels"
          },
          script: {
            type: Type.STRING,
            description: "A natural tone script for a 30-60s video"
          },
          caption: {
            type: Type.STRING,
            description: "An SEO-optimized caption with relevant hashtags"
          }
        },
        required: ["hooks", "script", "caption"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
}
