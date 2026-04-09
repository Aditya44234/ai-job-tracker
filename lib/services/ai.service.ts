import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// -----------------------------
// 1. PARSE JOB DESCRIPTION
// -----------------------------
export async function parseJobDescription(jd: string) {
  // fallback if no API key
  if (!genAI) {
    return {
      company: "Mock Company",
      role: "Frontend Developer",
      skills_required: ["React", "JavaScript"],
      skills_optional: ["Next.js"],
      seniority: "Mid-level",
      location: "Remote",
    };
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Extract structured information from this job description.

Return ONLY valid JSON in this format:

{
  "company": "",
  "role": "",
  "skills_required": [],
  "skills_optional": [],
  "seniority": "",
  "location": ""
}

Job Description:
${jd}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("AI parsing failed");
  }
}

// -----------------------------
// 2. GENERATE RESUME BULLETS
// -----------------------------
export async function generateResumeSuggestions(data: {
  role: string;
  skills_required: string[];
  seniority: string;
}) {
  if (!genAI) {
    return [
      "Built scalable web apps using React improving performance.",
      "Developed REST APIs and optimized backend performance.",
      "Collaborated with teams to deliver production-ready features.",
    ];
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Generate 3-5 strong resume bullet points for:

Role: ${data.role}
Skills: ${data.skills_required.join(", ")}
Seniority: ${data.seniority}

Make them specific, impactful, and ATS-friendly.
Return ONLY an array of strings.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("AI generation failed");
  }
}