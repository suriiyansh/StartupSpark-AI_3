# StartupSpark AI

An AI-powered startup idea validator. Enter a one-line startup idea and get back a full analysis — competitors, market size, revenue model, SWOT, MVP suggestions, marketing plan, and risks — like having a startup mentor on demand.

![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)
![AI](https://img.shields.io/badge/AI-Groq%20Llama%203.3%2070B-F5B942)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## What it does

You type a one-line startup idea — something like *"AI Laundry Service"* — and StartupSpark AI returns a full breakdown:

- 🎯 **Idea summary & viability score** — a quick 1–10 gut check
- 🏢 **Competitors** — real comparable companies, with differentiation angles
- 📊 **Market size** — TAM, SAM, SOM, and market trend
- 💰 **Revenue model** — pricing strategies suited to the idea
- ⚖️ **SWOT analysis** — strengths, weaknesses, opportunities, threats
- 🛠️ **MVP suggestions** — what to build first, what to skip, and a rough timeline
- 📣 **Marketing plan** — target audience, channels, and an early traction tactic
- ⚠️ **Risks** — ranked by severity, each with a mitigation
- ✅ **Verdict** — pursue, pivot, or reconsider, with reasoning

## Live Demo

🔗 **[startupspark-ai.netlify.app](#)** *(update once deployed)*

## Screenshots

*(Add a screenshot or short GIF of the results dashboard here once deployed — this is the single highest-impact addition for a LinkedIn post.)*

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS v4, Framer Motion |
| Backend | Node.js, Express |
| Database / Auth | Supabase |
| AI | Groq API (Llama 3.3 70B) |
| Deployment | Netlify (frontend), Render (backend) |

## Project Structure

StartupSpark-AI_3/
├── backend/
│ ├── routes/
│ │ └── validateIdea.js # Groq API integration + validation logic
│ ├── server.js # Express app entry point
│ ├── .env.example
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── IdeaForm.jsx
│ │ │ ├── ResultsDashboard.jsx
│ │ │ └── VerdictStamp.jsx
│ │ ├── lib/
│ │ │ └── api.js
│ │ ├── App.jsx
│ │ └── index.css
│ ├── .env.example
│ └── package.json
│
└── README.md
