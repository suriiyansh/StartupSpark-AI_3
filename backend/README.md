# StartupSpark AI — Backend

Express API powering the StartupSpark AI idea validator. Takes a one-line startup idea and returns a structured analysis generated via the Groq API (Llama 3.3 70B).

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **AI:** Groq API (free tier, Llama 3.3 70B)
- **Database / Auth:** Supabase
- **Validation:** Zod
- **Security:** Helmet, express-rate-limit

## Project Structure

backend/
├── routes/
│ └── validateIdea.js # Idea validation route + Groq integration
├── server.js # Express app entry point
├── .env.example # Template for required environment variables
├── .gitignore
└── package.json


## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```
Then open `.env` and add your Groq API key:

GROQ_API_KEY=your_key_here
PORT=5000

Get a free key at [console.groq.com](https://console.groq.com) — no credit card required.

### 3. Run the server
```bash
npm run dev
```
Starts on `http://localhost:5000` with auto-restart on file changes (via nodemon).

For production:
```bash
npm start
```

## API Reference

### `POST /api/validate-idea`

Analyzes a startup idea and returns a structured breakdown.

**Request body:**
```json
{ "idea": "AI Laundry Service" }
```

**Success response — `200 OK`:**
```json
{
  "success": true,
  "data": {
    "ideaSummary": "string",
    "viabilityScore": 7,
    "competitors": [
      { "name": "string", "description": "string", "differentiator": "string" }
    ],
    "marketSize": {
      "tam": "string",
      "sam": "string",
      "som": "string",
      "trend": "string"
    },
    "revenueModel": [
      { "model": "string", "description": "string", "pricingSuggestion": "string" }
    ],
    "swot": {
      "strengths": ["string"],
      "weaknesses": ["string"],
      "opportunities": ["string"],
      "threats": ["string"]
    },
    "mvpSuggestions": {
      "coreFeatures": ["string"],
      "outOfScope": ["string"],
      "buildTimeEstimate": "string",
      "techStackSuggestion": "string"
    },
    "marketingPlan": {
      "targetAudience": "string",
      "primaryChannels": ["string"],
      "goToMarketStrategy": "string",
      "earlyTractionTactic": "string"
    },
    "risks": [
      { "risk": "string", "severity": "high | medium | low", "mitigation": "string" }
    ],
    "verdict": {
      "recommendation": "pursue | pivot | reconsider",
      "reasoning": "string"
    }
  }
}
```

**Error responses:**

| Status | Reason |
|---|---|
| `400` | Missing idea, idea too short (<3 chars), or too long (>200 chars) |
| `502` | Groq API failed or returned malformed JSON after retries |

## How it works

1. Request hits `/api/validate-idea` with the idea string
2. Input is validated (length checks)
3. A structured system prompt is sent to Groq's Llama 3.3 70B, instructing it to return only JSON matching a fixed schema
4. The response is cleaned (stray markdown fences stripped) and parsed
5. The parsed object is validated against the expected shape before being returned
6. If parsing/validation fails, the request retries up to 2 times before returning a `502`

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Free API key from console.groq.com |
| `PORT` | No | Defaults to `5000` if not set |

## Notes

- Rate limiting is applied to protect the free Groq quota from abuse
- CORS is configured to only accept requests from approved frontend origins (update `server.js` when adding new deployment URLs)