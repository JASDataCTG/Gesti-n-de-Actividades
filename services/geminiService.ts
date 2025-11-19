import { GoogleGenAI, Type } from "@google/genai";

// Safe initialization - relies on process.env.API_KEY being present in the build/run environment
// For this demo context, we assume the user configures their environment correctly.
const apiKey = process.env.API_KEY || 'demo-key'; 
const ai = new GoogleGenAI({ apiKey });

export const generateSuggestions = async (activityName: string, context: string) => {
  if (!process.env.API_KEY) {
    console.warn("No API Key found in environment.");
    return null;
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Act as an academic administrative assistant. 
      Based on the activity "${activityName}" and the context "${context}", 
      suggest a concrete 'Goal' (Meta), a 'Deliverable 1' (mid-term), a 'Deliverable 2' (final), and a list of 2-3 'Required Formats' (names of forms).
      
      Return JSON only.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            goal: { type: Type.STRING },
            deliverable1: { type: Type.STRING },
            deliverable2: { type: Type.STRING },
            requiredFormats: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return null;
  }
};
