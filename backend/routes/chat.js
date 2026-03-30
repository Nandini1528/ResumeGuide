import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body || {};

    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      return res.status(503).json({ error: "Gemini API key is not configured" });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const prompt = `
You are an AI assistant for a resume-building web app.
Help users with resumes, tips, and guidance.

User: ${message}
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ reply: response.text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/job-description/analyze", async (req, res) => {
  try {
    const { jobDescription } = req.body || {};

    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      return res.status(503).json({ error: "Gemini API key is not configured" });
    }

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ error: "Job description is required" });
    }

    const prompt = `
You are a resume analyzer.

Task: Analyze the job description and extract only the most important and relevant information.

Output Rules:
- Keep it short, clear, and professional
- Do use bullet points or numbering
- Do NOT write long paragraphs
- Use simple, easy-to-understand language suitable for students
- Do NOT add anything not present in the job description
- Avoid explanations

Format your response EXACTLY like this:

Key Keywords:
<comma-separated keywords>

Skills & Tools:
<4 bullets of specific skills, tools, or technologies mentioned>

What to Highlight in Resume:
<1-2 short sentences with bullets>

ATS Tips:
<1-2 short sentences with bullets>


Job description:
${jobDescription.trim()}
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ analysis: response.text?.trim() || "" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
