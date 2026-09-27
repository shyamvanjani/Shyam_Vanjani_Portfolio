/**
 * Vercel Serverless Function — /api/chat
 *
 * Proxies chat requests to Google's Gemini 3.8 Flash API so the API key
 * never touches the browser bundle. The system prompt with Shyam's
 * portfolio data lives here on the server side.
 */

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";

// ─── System Prompt — portfolio context for the model ───────
const SYSTEM_PROMPT = `You are an AI assistant embedded in Shyam Vanjani's personal portfolio website. Your sole purpose is to answer questions about Shyam in a friendly, concise, first-person style — as if Shyam himself is speaking. Do NOT answer questions unrelated to Shyam or his professional background; politely redirect those back to his portfolio.

**About Shyam:**
- Full Stack Software Engineer based in Gujarat, India, working across Java/Spring Boot on the backend and Next.js on the frontend.
- Education: B.E. in Computer Engineering from LDRP-ITR (Sep 2022 – May 2025); Diploma in Computer Engineering from Government Polytechnic Gandhinagar (Aug 2019 – Jun 2022).

**Current Role:**
- Software Engineer at Cygnet.One (July 2026 – Present); promoted from Associate Software Engineer (July 2025 – June 2026). Since the promotion, scope has expanded to full stack — building Next.js frontends alongside the existing Java backend services.
- Working on two platforms:
  1. **Nobilex** — digital workflow platform for Dutch notarial offices. Built with Java, Spring Boot, Kotlin, Angular, MongoDB. Handles secure deed drafting, signing, submission, and archiving with Kadaster SYVAS integration.
  2. **Solumina Admin Portal** — enterprise manufacturing administration platform. Built with Java 21, Spring Boot, PostgreSQL, Docker, Kubernetes, Elasticsearch, Keycloak. Features include user management, audit logging, Kubernetes monitoring (clusters/nodes/pods/namespaces/ConfigMaps/PV-PVCs/TLS), and multi-destination log streaming (Elasticsearch, Graylog, Splunk).
- Previously: Software Engineer Trainee at Cygnet.One (Jan 2025 – Jun 2025), working on Cluster-Deck — a MongoDB Atlas monitoring platform with multi-tenant RBAC, scheduler-based metrics sync, auto-scaling, and cost analytics.

**Core Technical Skills:**
- Backend: Java, Kotlin, Spring Boot, Spring Security, REST APIs, Microservices, JWT, RBAC, Keycloak, Logstash, Node.js, Express.js
- Frontend: React.js, Next.js, Bootstrap
- Databases: PostgreSQL, MongoDB (incl. Atlas), MySQL, MSSQL, Oracle, Elasticsearch
- Cloud & DevOps: Docker, Kubernetes, GitHub Actions, CI/CD pipelines
- Tools: Git, GitHub, IntelliJ IDEA, VS Code, Postman, Graylog, Splunk, Gradle, Maven

**Personal Projects:**
- Job Recruitment Portal (MERN stack)
- iNoteBook — cloud-based note-taking app
- NewsMonkey — news aggregator

**Certifications:**
- Database Management System — NPTEL
- Machine Learning — Coursera
- Introduction to Cloud Development with HTML, CSS and JavaScript — IBM
- Oracle Cloud Infrastructure Generative AI Professional — Oracle
- Claude Certified Architect – Foundations (CCAR-F) — Anthropic (September 2026)

**Hackathons:**
- SSIP Hackathon 2023
- Cygnet Build-A-Thon 2025

**Response style rules:**
- Keep answers concise (2-4 short paragraphs max).
- Use first-person ("I", "my") as if Shyam is speaking.
- You may use **bold** for emphasis and bullet points (•) for lists.
- If the question is completely unrelated to Shyam's professional life, reply: "That's a bit outside my wheelhouse! I'm best at answering questions about my engineering background, skills, projects, or experience. Feel free to ask about any of those."
- Never make up information that isn't in the context above.`;

module.exports = async function handler(req, res) {
  // ─── Only accept POST ───
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    return res.status(500).json({ error: "AI service not configured" });
  }

  const { message, history } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  // ─── Build conversation history (last 6 messages for context) ───
  const recentHistory = Array.isArray(history) ? history.slice(-6) : [];

  const historyContents = recentHistory
    .filter((msg) => msg.text && msg.text.trim())
    .map((msg) => ({
      role: msg.type === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

  try {
    let geminiResponse;
    let geminiFailed = false;

    // ─── Initial Gemini Call ───
    try {
      geminiResponse = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Prevent connection keep-alive on Windows during `vercel dev`
          Connection: "close",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            ...historyContents,
            {
              role: "user",
              parts: [{ text: message.trim() }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!geminiResponse.ok) {
        console.warn(`Gemini API error ${geminiResponse.status}. Attempting Groq fallback...`);
        geminiFailed = true;
      }
    } catch (err) {
      console.warn(`Gemini API fetch failed: ${err.message}. Attempting Groq fallback...`);
      geminiFailed = true;
    }

    if (!geminiFailed) {
      const data = await geminiResponse.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const text = parts.map((p) => p.text || "").join("");

      if (text) {
        return res.status(200).json({
          reply: text.trim(),
        });
      } else {
        console.warn("No text in Gemini response. Attempting Groq fallback...");
        geminiFailed = true;
      }
    }

    // ─── Groq Fallback ───
    if (geminiFailed) {
      const groqApiKey = process.env.GROQ_API_KEY;
      
      if (!groqApiKey) {
        console.error("GROQ_API_KEY is not set. Cannot use fallback.");
        // We throw a 500 error here to properly trigger the frontend's static fallback text
        return res.status(500).json({ error: "Primary and fallback AI services unavailable." });
      }

      // Groq uses OpenAI's message format
      const groqHistory = recentHistory
        .filter((msg) => msg.text && msg.text.trim())
        .map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.text,
        }));

      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqApiKey}`,
          Connection: "close",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...groqHistory,
            { role: "user", content: message.trim() }
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!groqResponse.ok) {
        const groqData = await groqResponse.json();
        console.error(`Groq API error ${groqResponse.status}:`, JSON.stringify(groqData));
        // If Groq ALSO fails, we throw the error back to the frontend to trigger the static fallback
        return res.status(500).json({
          error: `Groq fallback returned ${groqResponse.status}`,
          details: groqData,
        });
      }

      const groqData = await groqResponse.json();
      const text = groqData?.choices?.[0]?.message?.content;

      if (!text) {
        console.error("No text in Groq response:", JSON.stringify(groqData));
        return res.status(500).json({
          error: "No response text from fallback AI",
        });
      }

      // Return exactly what the frontend expects from Gemini
      return res.status(200).json({
        reply: text.trim(),
      });
    }
  } catch (err) {
    console.error("Serverless function error:", err);

    return res.status(500).json({
      error: err.message || "Internal server error",
    });
  }
};