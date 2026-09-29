const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// =========================
// AI SUMMARY
// =========================
const generateSummary = async (content) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `Summarize the following study material in simple and clear language.

Study Material:
${content}`
        });

        return response.text;
    } catch (error) {
        console.error("Gemini Summary Error:", error);
        throw error;
    }
};


// =========================
// AI FLASHCARDS
// =========================
const generateFlashcards = async (content) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `Create 5 useful study flashcards from the following study material.

Return ONLY valid JSON.
Do not add markdown.
Do not add explanation.

Use exactly this format:

[
  {
    "question": "Question here",
    "answer": "Answer here"
  }
]

Study Material:
${content}`
        });

        let text = response.text.trim();

        // Remove markdown code fences if Gemini returns them
        if (text.startsWith("```json")) {
            text = text.replace(/^```json/, "");
            text = text.replace(/```$/, "");
            text = text.trim();
        }

        if (text.startsWith("```")) {
            text = text.replace(/^```/, "");
            text = text.replace(/```$/, "");
            text = text.trim();
        }

        return JSON.parse(text);

    } catch (error) {
        console.error("Gemini Flashcard Error:", error);
        throw error;
    }
};


// =========================
// EXPORT
// =========================
module.exports = {
    generateSummary,
    generateFlashcards
};