# Assignment-2 · Interactive Portfolio

A clean, responsive **single-page portfolio** built with **HTML, CSS, and Vanilla JavaScript**.  
It shows dynamic UI, data handling with a public API, smooth animations, clear error handling, and an **AI Draft Assistant** for the contact form.

> **Live demo:** https://abdelmagid-9.github.io/assignment-2/

---

## Features

- **Dynamic Content**
  - Tabs: *About, Sports, Projects, Contact* (remembers the last open tab)
  - Personalized greeting with saved name (Local Storage)
  - Projects: live search, category filter, sorting, and collapsible details

- **Data Handling**
  - Local Storage: theme, name, last tab, optional OpenAI API key
  - Public API (Wikipedia REST): short summaries for **Soccer, Basketball, Tennis, Swimming, Formula One**
  - Loading state, retry button, and “no results” empty state

- **Animation & Transitions**
  - Fade-in panels, slide-down sections, reveal-on-scroll
  - Respects `prefers-reduced-motion`

- **Error Handling & Feedback**
  - Inline form validation (name, email, message)
  - Clear success/error/loading messages

- **AI Enhancement**
  - **AI Draft Assistant** (Contact tab) creates **Subject**, **Message**, and **Help** text
  - Uses **OpenAI Chat Completions** if a key is saved locally; otherwise uses a **local template fallback**

---

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **APIs:** Wikipedia REST (no key), OpenAI Chat Completions (optional, client-side)
- **Hosting:** Static (GitHub Pages, Netlify, Vercel, etc.)

---

## Project Structure

assignment-2/
├─ README.md
├─ index.html
├─ css/
│ └─ styles.css
├─ js/
│ └─ script.js
├─ assets/
│ └─ images/
└─ docs/
├─ ai-usage-report.md
└─ technical-documentation.md

pgsql
نسخ الكود

---

## Run Locally

> Use a local server (avoid opening `index.html` with `file://`).

**VS Code (Live Server)**
1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

**Python**
```bash
python -m http.server 8080
# open http://localhost:8080
Node

bash
نسخ الكود
npm i -g http-server
http-server -p 8080
# open http://localhost:8080
Configure the AI Draft Assistant (Optional)
Go to Contact → AI Settings.

Paste your OpenAI API key (sk-...) and click Save Key.

Pick Purpose and Tone, then click Draft with AI.
(No key? The local template runs automatically.)

Deploy (GitHub Pages)
Push your repo to GitHub as abdelmagid-9/assignment-2.

In your repo: Settings → Pages.

Source: Deploy from a branch → Branch: main → Folder: / (root) → Save.

Visit: https://abdelmagid-9.github.io/assignment-2/
If you see 404, hard-refresh and confirm the Pages settings and that index.html is in the repo root.

AI Tools (Short Summary)
AI Draft Assistant (runtime, optional)

Calls OpenAI Chat Completions (gpt-4o-mini) when a key is saved locally.

Falls back to a local template if no key or the API is unavailable.

The key is stored only in your browser (Local Storage, key: openai_key).

Full details: see docs/ai-usage-report.md
Architecture & setup: see docs/technical-documentation.md

Troubleshooting
Page doesn’t load correctly → run with a local server.

Sports not loading → check connection and click Retry (Network tab can help).

AI Draft unavailable → add a valid OpenAI key or use the local template.

Styles not updating → hard refresh (Ctrl/Cmd + Shift + R).
