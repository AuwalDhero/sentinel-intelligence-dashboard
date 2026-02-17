import { GoogleGenAI, Type } from "@google/genai";
import { TeamBReport, MonitoringConfig } from "../types";

// Always use process.env.API_KEY as per system instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateTeamBReport(config: MonitoringConfig): Promise<TeamBReport> {
  const prompt = `
    SYSTEM: You are a high-performance autonomous social media monitoring AI agent for the Nigeria Police Force (NPF). 
    Your mission is to produce a structured "TEAM 'B' REPORT" based on simulated analysis of national security topics.
    
    MONITORING CONTEXT:
    - Keywords: ${config.keywords.join(', ')}
    - Scope: ${config.scope.join(', ')}
    - Platforms: ${config.platforms.join(', ')}

    INSTRUCTIONS:
    1. Identify exactly TWO major trending stories related to the monitoring scope.
    2. Format as a formal intelligence report following the TEAM 'B' structure.
    3. Be extremely concise to avoid exceeding token limits.
    4. Each trend description should be 2-3 sentences max.
    5. Each executive summary point should be one clear sentence.
    6. Ensure the output is valid, complete JSON.

    JSON SCHEMA REQUIREMENTS:
    - report_date: ISO string
    - time: Current time in WAT (e.g., "14:30 WAT")
    - executive_summary: Array of 2 clear summary strings
    - general_outlook: String (max 60 words)
    - new_developments: Array of exactly 2 Trend objects
    - assessment: Array of 3 numbered analysis strings
    - recommendations: Array of 2 actionable strings
    - sign_off: Formal closing phrase
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        // Reserved tokens for thinking and final response to prevent truncation
        maxOutputTokens: 3000,
        thinkingConfig: { thinkingBudget: 1000 },
        temperature: 0.1, // Lower temperature for more consistent JSON structure
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            report_date: { type: Type.STRING },
            time: { type: Type.STRING },
            executive_summary: { type: Type.ARRAY, items: { type: Type.STRING } },
            general_outlook: { type: Type.STRING },
            new_developments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  sentiment: {
                    type: Type.OBJECT,
                    properties: {
                      positive: { type: Type.NUMBER },
                      neutral: { type: Type.NUMBER },
                      negative: { type: Type.NUMBER }
                    },
                    required: ["positive", "neutral", "negative"]
                  },
                  matched_keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  platforms: { type: Type.ARRAY, items: { type: Type.STRING } },
                  engagement: {
                    type: Type.OBJECT,
                    properties: {
                      volume: { type: Type.NUMBER },
                      trend_score: { type: Type.NUMBER }
                    },
                    required: ["volume", "trend_score"]
                  }
                },
                required: ["title", "description", "sentiment", "matched_keywords", "platforms", "engagement"]
              },
              minItems: 2,
              maxItems: 2
            },
            assessment: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            sign_off: { type: Type.STRING }
          },
          required: ["report_date", "time", "executive_summary", "general_outlook", "new_developments", "assessment", "recommendations", "sign_off"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The AI returned an empty response.");
    }

    try {
      const reportData = JSON.parse(text);
      return {
        ...reportData,
        id: crypto.randomUUID()
      };
    } catch (parseError: any) {
      console.error("Critical JSON Parse Error. Raw Text Snippet:", text.substring(0, 100) + "...");
      throw new Error(`Intelligence formatting error: ${parseError.message}. This usually happens when the model output is truncated.`);
    }
  } catch (error: any) {
    console.error("Sentinel AI Error:", error);
    throw error;
  }
}