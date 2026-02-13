const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

function cleanJsonResponse(text) {
  // Remove ```json ``` wrappers if present
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

async function generateSpec(input) {
  const prompt = `
You are a senior product architect.

Return ONLY valid JSON in this exact structure:

{
  "user_stories": [],
  "engineering_tasks": {
    "frontend": [],
    "backend": [],
    "database": [],
    "devops": []
  },
  "risks": [],
  "unknowns": []
}

Feature Details:
Title: ${input.title || "Untitled"}
Goal: ${input.goal}
Users: ${input.users}
Constraints: ${input.constraints}
Template Type: ${input.template_type}

Do NOT add explanation.
Do NOT wrap in markdown.
Return JSON only.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const cleaned = cleanJsonResponse(text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("Invalid JSON returned from LLM");
  }
}

module.exports = { generateSpec };
