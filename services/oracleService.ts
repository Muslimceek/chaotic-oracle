import { GoogleGenAI } from "@google/genai";
import { LanguageCode, LANGUAGES } from "../types";

const BASE_INSTRUCTION = `
Act as a chaotic oracle that gives absurd, funny, and sarcastic predictions.
Generate a short (1-2 sentences), humorous and totally unexpected answer using everyday metaphors, 
pop culture references, or completely random comparisons. 
Make it sound like a mystical prophecy, but with a modern twist and a touch of sarcasm.

Examples of style:
- "Your career will take off when you stop eating instant noodles for breakfast."
- "You'll find love when you stop checking your phone and start checking the weather."

Tone: mystical but sarcastic, absurd but relatable. 
Do NOT be generic. Make it funny and memorable.
`;

const getLanguageName = (code: LanguageCode): string => {
  const lang = LANGUAGES.find(l => l.code === code);
  return lang ? lang.label : 'English';
};

// Safe access to API Key that works in Vite/Browser environments
const getApiKey = (): string | undefined => {
  try {
    // Check if process is defined (Node/Vite defines)
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore ReferenceError if process is not defined
  }
  return undefined;
};

// Lazy initialization to prevent top-level crashes
let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (aiClient) return aiClient;

  const apiKey = getApiKey();

  if (!apiKey) {
    console.error("CRITICAL: API Key is missing. Ensure process.env.API_KEY is set in your environment (e.g., Vercel Environment Variables).");
    throw new Error("System Error: API Key is missing.");
  }

  aiClient = new GoogleGenAI({ apiKey });
  return aiClient;
};

export const consultOracle = async (question: string, language: LanguageCode): Promise<string> => {
  try {
    // Initialize client only when requested
    const ai = getClient();
    const languageName = getLanguageName(language);
    
    // Dynamic system instruction to enforce language
    const systemInstruction = `${BASE_INSTRUCTION}

IMPORTANT: Answer in the following language: ${languageName}.
Ensure the response is culturally relevant to this language if possible, but keep the chaotic oracle persona.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "The spirits are silent.";
  } catch (error: any) {
    console.error("Oracle Error:", error);
    
    // Check for common SDK initialization errors
    if (error.message && error.message.includes("API Key must be set")) {
      throw new Error("Configuration Error: API Key invalid.");
    }
    
    throw error;
  }
};
