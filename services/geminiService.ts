import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Politician } from "../types";
import { MOCK_POLITICIANS } from "./data";

const apiKey = process.env.API_KEY || '';
// Initialize the client outside the function if possible, but inside is safer if env var loads late
// However, per instructions, assume env is ready.
const ai = new GoogleGenAI({ apiKey });

const politicianSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    name: { type: Type.STRING },
    party: { type: Type.STRING },
    image: { type: Type.STRING, description: "Use a picsum url with a unique seed" },
    bio: { type: Type.STRING },
    roles: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          period: { type: Type.STRING },
          description: { type: Type.STRING }
        }
      }
    },
    votes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          subject: { type: Type.STRING },
          result: { type: Type.STRING, enum: ['A favor', 'En contra', 'Abstención', 'Ausente'] },
          date: { type: Type.STRING }
        }
      }
    },
    initiatives: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          status: { type: Type.STRING, enum: ['Aprobada', 'Rechazada', 'Pendiente', 'Retirada'] },
          date: { type: Type.STRING },
          description: { type: Type.STRING }
        }
      }
    }
  },
  required: ["id", "name", "party", "bio", "roles", "votes", "initiatives"]
};

export const searchPolitician = async (query: string): Promise<Politician | null> => {
  // 1. Check Mock Data First (The "Backend")
  const normalizedQuery = query.toLowerCase().trim();
  const foundLocal = MOCK_POLITICIANS.find(p => 
    p.name.toLowerCase().includes(normalizedQuery) || 
    p.party.toLowerCase().includes(normalizedQuery)
  );

  if (foundLocal) {
    return new Promise(resolve => setTimeout(() => resolve(foundLocal), 500)); // Simulate network latency
  }

  // 2. Fallback to Gemini for "Unknown" politicians
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Search for the Mexican politician "${query}". Provide their detailed political profile including past roles, key votes in congress/senate, and initiatives. If the person is not a real Mexican politician, return null.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: politicianSchema,
        systemInstruction: "You are an expert political analyst for Mexico. Be accurate with dates and parties. Use 'https://picsum.photos/seed/${query}/400/400' for the image URL field."
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as Politician;
      // Basic validation to ensure it didn't return empty junk
      if (!data.name) return null;
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    return null;
  }
};