const express = require('express');
const Groq = require('groq-sdk');
const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a senior startup consultant analyzing early-stage business ideas.

A founder will give you a one-line startup idea. Analyze it and 
respond with ONLY a valid JSON object. Do not include any text before 
or after the JSON. Do not use markdown code fences. Do not add comments.

Use exactly this structure:

{
  "ideaSummary": "string, 1-2 sentences",
  "viabilityScore": integer from 1 to 10,
  "competitors": [
    {"name": "string", "description": "string", "differentiator": "string"}
  ],
  "marketSize": {
    "tam": "string with rough dollar figure",
    "sam": "string with rough dollar figure",
    "som": "string with rough dollar figure",
    "trend": "string, one of growing/stable/shrinking plus reasoning"
  },
  "revenueModel": [
    {"model": "string", "description": "string", "pricingSuggestion": "string"}
  ],
  "swot": {
    "strengths": ["string", "string"],
    "weaknesses": ["string", "string"],
    "opportunities": ["string", "string"],
    "threats": ["string", "string"]
  },
  "mvpSuggestions": {
    "coreFeatures": ["string", "string", "string"],
    "outOfScope": ["string", "string"],
    "buildTimeEstimate": "string",
    "techStackSuggestion": "string"
  },
  "marketingPlan": {
    "targetAudience": "string",
    "primaryChannels": ["string", "string"],
    "goToMarketStrategy": "string",
    "earlyTractionTactic": "string"
  },
  "risks": [
    {"risk": "string", "severity": "high or medium or low", "mitigation": "string"}
  ],
  "verdict": {
    "recommendation": "pursue or pivot or reconsider",
    "reasoning": "string"
  }
}

Rules:
1. Return exactly one JSON object matching this structure. Nothing else.
2. Every array must contain at least 2 items unless noted otherwise.
3. Be specific to the given idea. Never write generic filler like 
   "this could work well" — name real comparable companies and 
   plausible numbers.
4. Be honest, not promotional. If the idea is weak, say "reconsider" 
   and explain why.
5. Keep every string under 40 words.
6. Ensure the JSON is syntactically valid: no trailing commas, all 
   strings in double quotes, no single quotes.`;

function extractJSON(rawText) {
  let cleaned = rawText.replace(/```json|```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) {
    throw new Error('No JSON object found in model response');
  }
  cleaned = cleaned.slice(start, end + 1);
  return JSON.parse(cleaned);
}

function isValidAnalysis(obj) {
  return (
    obj &&
    typeof obj.ideaSummary === 'string' &&
    typeof obj.viabilityScore === 'number' &&
    Array.isArray(obj.competitors) &&
    obj.marketSize &&
    Array.isArray(obj.revenueModel) &&
    obj.swot &&
    obj.mvpSuggestions &&
    obj.marketingPlan &&
    Array.isArray(obj.risks) &&
    obj.verdict &&
    typeof obj.verdict.recommendation === 'string'
  );
}

async function callGroq(idea) {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Startup idea: "${idea}"` }
    ],
    temperature: 0.4,
    max_tokens: 2000
  });

  return completion.choices[0].message.content;
}

router.post('/validate-idea', async (req, res) => {
  const { idea } = req.body;

  if (!idea || typeof idea !== 'string' || idea.trim().length < 3) {
    return res.status(400).json({ error: 'Please provide a valid startup idea.' });
  }

  if (idea.length > 200) {
    return res.status(400).json({ error: 'Idea description is too long. Keep it to one line.' });
  }

  const MAX_RETRIES = 2;
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const raw = await callGroq(idea.trim());
      const parsed = extractJSON(raw);

      if (!isValidAnalysis(parsed)) {
        throw new Error('Response did not match expected schema');
      }

      return res.json({ success: true, data: parsed });
    } catch (err) {
      lastError = err;
      console.error(`Attempt ${attempt + 1} failed:`, err.message);
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }

  console.error('All attempts failed:', lastError);
  return res.status(502).json({
    error: 'Could not generate analysis right now. Please try again.'
  });
});

module.exports = router;