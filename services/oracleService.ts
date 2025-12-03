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

export const consultOracle = async (question: string, language: LanguageCode): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API Key is missing from process.env.API_KEY");
    throw new Error("System Error: API Key is missing.");
  }

  // Initialize the client strictly when needed
  const ai = new GoogleGenAI({ apiKey });

  const languageName = getLanguageName(language);
  
  // Dynamic system instruction to enforce language
  const systemInstruction = `${BASE_INSTRUCTION}

IMPORTANT: Answer in the following language: ${languageName}.
Ensure the response is culturally relevant to this language if possible, but keep the chaotic oracle persona.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "The spirits are silent.";
  } catch (error) {
    console.error("Oracle Error:", error);
    throw error;
  }
};
