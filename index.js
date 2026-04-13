const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

// 🔑 API KEY
const API_KEY = "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";

// 🧠 Fake DB (in-memory)
const users = [];
const sessions = {};
const AI_MODELS = ["openrouter/free", "openrouter/auto"];

// 🔐 Helper: Hash password
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// 🔐 REGISTER
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email & password required" });
  }

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  const user = {
    id: crypto.randomUUID(),
    email,
    password: hashPassword(password)
  };

  users.push(user);

  res.json({ success: true });
});

// 🔐 LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = crypto.randomUUID();
  sessions[token] = user.id;

  res.json({ success: true, token });
});

// 🔐 AUTH MIDDLEWARE
function auth(req, res, next) {
  const authHeader = req.get("Authorization") || req.headers.authorization || "";
  const rawAuth = String(authHeader).trim();
  const bearerMatch = rawAuth.match(/^Bearer\s+(.+)$/i);
  const token = (bearerMatch ? bearerMatch[1] : rawAuth).trim();

  console.log("[auth] header:", rawAuth);
  console.log("[auth] token:", token);

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized: missing token. Send Authorization header as '<token>' or 'Bearer <token>'.",
    });
  }

  if (!sessions[token]) {
    console.log("[auth] token not found in sessions");
    return res.status(401).json({ error: "Unauthorized: invalid or expired token" });
  }

  req.userId = sessions[token];
  next();
}

// 🧠 AI CALL
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callAI(prompt) {
  let lastError = null;

  for (const model of AI_MODELS) {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI Recruiter App"
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }]
          })
        });

        const data = await response.json();
        if (response.ok && data?.choices?.[0]?.message?.content) {
          console.log(`[ai] success model=${model} attempt=${attempt}`);
          return data.choices[0].message.content;
        }

        const err = new Error(data?.error?.message || "AI provider returned an invalid response");
        err.status = response.status || 500;
        err.code = data?.error?.code;
        err.details = data;
        lastError = err;
        console.error(`[ai] failed model=${model} attempt=${attempt} status=${err.status}`, data);

        if (err.status !== 429) {
          throw err;
        }

        if (attempt < 2) {
          await sleep(500 * attempt);
        }
      } catch (error) {
        lastError = error;
        if (error?.status !== 429) {
          throw error;
        }
      }
    }
  }

  const rateLimitError = new Error("AI provider is temporarily rate-limited. Please retry in a few seconds.");
  rateLimitError.status = 429;
  rateLimitError.details = lastError?.details;
  throw rateLimitError;
}

// 🧠 JSON PARSER
function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  }
}

// 📄 PARSER
async function parseResume(resumeText) {
  const prompt = `
Extract structured resume data.

Return JSON:
{
  "name": "",
  "skills": [],
  "experience": [],
  "projects": []
}

Resume:
${resumeText}
`;

  return safeParseJSON(await callAI(prompt));
}

// 🎯 EVALUATOR
async function evaluateCandidate(data, job) {
  const prompt = `
Evaluate candidate.

Candidate:
${JSON.stringify(data)}

Job:
${job}

Return JSON:
{
  "match_score": 0-100,
  "matched_skills": [],
  "missing_skills": [],
  "strengths": [],
  "weaknesses": []
}
`;

  return safeParseJSON(await callAI(prompt));
}

// 🕵️ FAKE
async function detectFake(data) {
  const prompt = `
Detect exaggeration.

Candidate:
${JSON.stringify(data)}

Return JSON:
{
  "suspicion_score": 0-100,
  "flags": [],
  "explanations": []
}
`;

  return safeParseJSON(await callAI(prompt));
}

// 🧠 DECISION
async function makeDecision(data, evalRes, fake) {
  const prompt = `
Make hiring decision.

Candidate:
${JSON.stringify(data)}

Evaluation:
${JSON.stringify(evalRes)}

Fake:
${JSON.stringify(fake)}

Return JSON:
{
  "final_score": 0-100,
  "decision": "Hire/Maybe/Reject",
  "reasoning": [],
  "risk_factors": []
}
`;

  return safeParseJSON(await callAI(prompt));
}

// 🎤 INTERVIEW
async function generateInterview(data) {
  const prompt = `
Generate interview questions.

Candidate:
${JSON.stringify(data)}

Return JSON:
{
  "technical_questions": [],
  "behavioral_questions": []
}
`;

  return safeParseJSON(await callAI(prompt));
}

// 🚀 PROTECTED PIPELINE
app.post("/analyze", auth, async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  console.log("[analyze] request from user:", req.userId);

  try {
    const parsed = await parseResume(resumeText);
    const evaluation = await evaluateCandidate(parsed, jobDescription);
    const fake = await detectFake(parsed);
    const decision = await makeDecision(parsed, evaluation, fake);
    const interview = await generateInterview(parsed);

    res.json({
      success: true,
      parsed,
      evaluation,
      fake,
      decision,
      interview
    });
    console.log("[analyze] analysis completed successfully");

  } catch (err) {
    console.error("[analyze] pipeline failed:", err);
    const statusCode = err.status === 429 ? 429 : 500;
    res.status(statusCode).json({
      error: err.message || "Analysis failed",
      status: statusCode,
      retryable: statusCode === 429,
    });
  }
});

// 🟢 HEALTH
app.get("/", (req, res) => {
  res.send("AI Recruiter with Auth Running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});