import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function generateSocialContent(brief: string) {
  if (!ai) {
    console.log("No Gemini API key found, returning mock data for demo.");
    return {
      hooks: [
        "You won't believe what happens when you try this...",
        "The secret they don't want you to know 🤫",
        "Watch until the end for a surprise! ✨"
      ],
      script: "Hey everyone! Today I'm partnering with this amazing brand to show you something incredible. It's changed the way I do things and I know you'll love it too. Check it out and let me know what you think in the comments!",
      caption: "So obsessed with this new find! 😍 It's everything I've been looking for and more. Get yours today! #ad #sponsored #musthave #lifestyle"
    };
  }

  try {
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

    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
}
