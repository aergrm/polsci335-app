

import { GoogleGenAI } from "@google/genai";
import { SCHEDULE, ASSIGNMENTS } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYLLABUS_CONTEXT = `
You are a Teaching Assistant for POL SCI 335: Comparative Political Systems.
Instructor: Ahmet Ergurum.
Textbook: Patterns of Democracy by Arend Lijphart (2nd ed).

KEY THEORETICAL FRAMEWORK:
Lijphart distinguishes democracies based on two dimensions:
1. The Executives-Parties Dimension (Joint-Power):
   - Party System (Two-party vs Multiparty)
   - Cabinets (One-party bare majority vs Broad coalition)
   - Executive-Legislative Relations (Dominance vs Balance)
   - Electoral System (Majoritarian/Plurality vs Proportional Representation)
   - Interest Groups (Pluralism vs Corporatism)

2. The Federal-Unitary Dimension (Divided-Power):
   - Federalism (Unitary/Centralized vs Federal/Decentralized)
   - Legislature (Unicameral vs Strong Bicameral)
   - Constitution (Flexible/Unwritten vs Rigid/Written)
   - Judicial Review (None vs Strong)
   - Central Bank (Dependent vs Independent)

Assignments:
${JSON.stringify(ASSIGNMENTS)}

Schedule:
${JSON.stringify(SCHEDULE)}

AI POLICY:
- Permitted: Brainstorming, outlining, research assistance, explaining concepts.
- PROHIBITED: Generating essay content, answering quiz questions directly, writing the analysis for the student.

Your Goal: Help the student understand these 10 specific variables and guide them in their Country Analysis Project.

If asked to write an essay, refuse and offer to help outline or brainstorm instead.
`;

export const getChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  if (!apiKey) {
    return "API Key is missing. Please set the REACT_APP_GEMINI_API_KEY environment variable.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a chat session
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYLLABUS_CONTEXT,
      },
      history: history // Pass previous history
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the course database right now. Please try again later.";
  }
};

export const generateProjectOutline = async (country: string, interest: string) => {
  if (!apiKey) {
    return "API Key is missing. Please set the REACT_APP_GEMINI_API_KEY environment variable.";
  }

  const prompt = `
    Create a detailed research project outline for a comparative politics paper on ${country}.
    The student is specifically interested in: "${interest}".
    
    The outline must follow this structure:
    1. Introduction (Puzzle/Question)
    2. Historical Context
    3. Analysis of Key Institutions (Focus on 2-3 relevant Lijphart variables)
    4. Assessment of Democratic Quality
    5. Conclusion
    
    Keep it academic, structured, and helpful for an undergraduate student.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYLLABUS_CONTEXT,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate outline. Please try again.";
  }
};
