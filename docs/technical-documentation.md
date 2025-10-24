# Technical Documentation — Assignment-2 Interactive Portfolio

Author: **[Your Name]**  
Repo: **assignment-2**  
Date: **[Today’s date]**

This document explains how the project works, how to set it up, and how to use and extend it.  
It is written in clear, simple language.

---

## 1) Overview

A single-page, client-side portfolio with:

- **Dynamic UI** (tabs, theme, greeting, filterable projects, collapsible sections)
- **Data handling** (Local Storage, public API fetch for Sports via Wikipedia)
- **Animations & transitions** (fade, slide, reveal on scroll; respects reduced-motion)
- **Error handling & user feedback** (loading states, retries, inline form errors, empty states)
- **AI Enhancement**: **AI Draft Assistant** in Contact form
  - Uses **OpenAI API** if a key is provided by the user (stored only in Local Storage)
  - Falls back to a **local template** if the API is not available

Technology: HTML + CSS + Vanilla JavaScript. No frameworks.

---

## 2) Repository Structure

assignment-2/
├── README.md
├── index.html
├── css/
│ └── styles.css
├── js/
│ └── script.js
├── assets/
│ └── images/ # (placeholder, can add your images)
├── docs/
│ ├── ai-usage-report.md
│ └── technical-documentation.md # (this file)
└── .gitignore

markdown
نسخ الكود

---

## 3) Architecture & Data Flow

### 3.1 High-level flow
- **index.html** renders the layout (Header, Tabs, Panels).
- **styles.css** defines color tokens, layout, components, and animations.
- **script.js** controls:
  - State (theme, name, last tab, project list, sports list)
  - Local Storage (persist theme, name, last tab, optional API key)
  - UI interactions (tabs, filters, collapsible sections)
  - **Sports API** fetch → transform → render → filter
  - **Contact form** validation, feedback
  - **AI Draft Assistant** (OpenAI call or local template fallback)

### 3.2 State keys (Local Storage)
- `theme` → `"dark" | "light"`
- `name` → user name string
- `lastTab` → `"about" | "sports" | "projects" | "contact"`
- `openai_key` → optional user-provided OpenAI API key (client-side only)

### 3.3 Tabs & Navigation
- Buttons with `data-tab` switch `tab-panel` sections.
- The active tab is saved as `lastTab`.
- ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`.

### 3.4 Projects module
- In-memory list with `{title, date, category, description}`.
- **Live search**, **category filter**, **sort** (newest, oldest, title).
- Collapsible details: click the project header.
- Empty state when no results match.
- Debounce is used to avoid excessive re-renders.

### 3.5 Sports module (Public API)
- **Endpoint** (no key): `https://en.wikipedia.org/api/rest_v1/page/summary/{Title}`
- Sports loaded: **Soccer**, **Basketball**, **Tennis**, **Swimming**, **Formula One**.
- Steps:
  1. Show loading UI (`spinner`, “Loading sports…”).
  2. `fetch` Wikipedia summaries in parallel.
  3. Normalize into `{title, summary, image, url}`.
  4. **Simplify** text: remove parentheses, keep the first short sentence when needed.
  5. Render cards with image (or fallback block).
  6. Live search on sport titles.
- **Error handling**:
  - Per-sport fallback text (short, simple language).
  - Global error message + **Retry** button.
  - Empty state (“No sports matched…”) for search filtering.

### 3.6 Contact form module
- Validates **name**, **email**, **message** (inline errors).
- On submit: shows loading, then a success message (simulated).
- Animated feedback and clear color signals for states.

### 3.7 AI Draft Assistant (Contact)
- Goal: Help the user draft **Subject**, **Message**, and short **Help** text.
- Inputs: **Purpose** (greeting, inquiry, collaboration, support, thanks) + **Tone** (friendly, professional, concise, enthusiastic, polite).
- **Two modes**:
  1. **OpenAI API** (if user saved a key):
     - POST `https://api.openai.com/v1/chat/completions`
     - Model: `gpt-4o-mini`
     - Prompt asks for **JSON only**: `{"subject":"...","body":"...","help":"..."}`
     - Parse JSON. If parsing fails (code fences), strip fences and retry.
     - Update UI fields.
  2. **Local template fallback** (no key or error):
     - Creates a simple, friendly draft based on purpose + tone.
     - Always available offline.
- **Privacy**:
  - API key is stored **only** in Local Storage (`openai_key`).
  - No server is used; all requests are from the browser to OpenAI.
  - Users can clear the key any time.

---

## 4) User Experience (UX) & Accessibility (A11y)

- **Clear layout** with consistent cards, lists, and toolbars.
- **Readable text** and strong color contrast in light/dark themes.
- **Keyboard support**:
  - Tabs: focusable, `aria-selected` updates, Enter/Space toggles project sections.
- **Live regions**:
  - Status messages use `aria-live="polite"` so screen readers announce updates.
- **Reduced motion**:
  - Animations disabled if `prefers-reduced-motion: reduce` is set.
- **Error feedback**:
  - Inline messages under inputs.
  - Distinct colors for success (`--success`) and errors (`--danger`).
- **Empty/Loading/Retry** patterns** so users always know what is happening.

---

## 5) Performance Notes

- Vanilla JS; no large runtime framework.
- Short DOM updates; simple components.
- Debounce on search inputs (projects and sports).
- Static assets only; good fit for GitHub Pages.
- Images for sports use Wikipedia thumbnails when available.

---

## 6) Security & Privacy

- No backend server; everything runs in the browser.
- API key (if used) is saved only on the user machine (Local Storage).
- Do **not** commit `.env` files or keys. `.gitignore` excludes secrets and build artifacts.
- Wikipedia requests are public and do not need a key.

---

## 7) Setup Instructions (Step-by-Step)

### 7.1 Prerequisites
- A modern browser (Chrome, Edge, Firefox, Safari).
- **VS Code** is recommended.
- (Windows) **PowerShell** works with the commands below.

### 7.2 Clone and open
```powershell
git clone https://github.com/<YOUR-USERNAME>/assignment-2.git
cd assignment-2
code .
7.3 Run locally
Option A — VS Code Live Server (recommended)

Install the “Live Server” extension.

Right-click index.html → Open with Live Server.

Option B — simple Python server

powershell
نسخ الكود
# Windows / Mac / Linux with Python 3
python -m http.server 8080
# then open http://localhost:8080 in your browser
Do not double-click index.html (file://). Some web features work better via a local server.

7.4 Optional: Add your OpenAI API key (client-side)
Go to the Contact tab → AI Settings.

Paste your key (looks like sk-...) → click Save Key.

You can clear it anytime.

7.5 Deploy to GitHub Pages (optional)
In GitHub, open Settings → Pages.

Select Deploy from branch.

Choose branch main and folder / (root).

Save; GitHub builds and gives you a public URL.

8) Usage Guide (Quick Start)
Theme: Click 🌓 to toggle dark/light. Your choice is saved.

Greeting: Enter your name and click Save. The greeting updates and is stored.

Tabs: About / Sports / Projects / Contact. Last tab is saved.

Projects: Search, filter, and sort. Click a project to expand details.

Sports:

Loads short summaries from Wikipedia.

Use the search box to filter sports.

Click Refresh to re-load; Retry if a network error happens.

Contact:

Fill name, email, and message.

Use AI Draft to create a subject/message/help (with API or local template).

Click Send to see validation and a success message (simulated).

9) Technical Details (Deep Dive)
9.1 Key functions (script.js)
State helpers: save(key, value), load(key, fallback)

Theme: initialTheme(), applyTheme(), toggleTheme()

Greeting & name: initName(), updateGreeting()

Tabs: setActiveTab(key), initTabs()

Projects: renderProjects(), initProjectControls()

Sports:

fetchSportSummary(wikiTitle) → fetch & normalize

simplify(text) → keep short, remove parentheses

loadSports() → handles loading, error, retry, fallbacks

renderSports(items), filterSports()

Contact:

validateEmail(v), setInvalid(selector, isInvalid, msg)

handleContactSubmit(e) → loading, success/error states

AI Draft Assistant:

Storage: AI_STORAGE_KEY = 'openai_key'

buildDraftPrompt(inputs) → strict JSON instructions

localTemplateDraft({ name, purpose, tone }) → offline draft

draftWithOpenAI(inputs, key) → calls chat/completions with gpt-4o-mini

handleAIDraft() → decides between API or local template

9.2 API contracts
Wikipedia Summary API (GET)

ruby
نسخ الكود
https://en.wikipedia.org/api/rest_v1/page/summary/{Title}
Response: { title, extract, thumbnail?, content_urls?... }
Used to produce { title, summary, image, url }. No API key required.

OpenAI Chat Completions (POST) (optional)

yaml
نسخ الكود
https://api.openai.com/v1/chat/completions
Headers: Authorization: Bearer <openai_key>, Content-Type: application/json
Body: { model: "gpt-4o-mini", messages: [...], temperature: 0.7 }
Expected: { choices: [{ message: { content: '{"subject":"...","body":"...","help":"..."}' } }] }
If parsing fails or request errors, the app falls back to localTemplateDraft().

9.3 Error handling patterns
Sports: Per-item fallback + global message + Retry button.

Contact: Inline field errors, loading spinner, success/error message.

AI: API failure → switch to local template; status text tells the user.

Accessibility: All status messages use aria-live="polite".

10) Testing Checklist (Meets Assignment Requirements)
Dynamic Content
 Greeting changes with time of day and saved name.

 Tabs switch sections and remember the last tab.

 Projects: filter, sort, live search, and collapsible items work.

Data Handling
 Local Storage saves theme, name, tab, and (optional) API key.

 Sports API fetch works and shows loading/error/empty states.

 Contact form validates and shows clear messages.

Animations & Transitions
 Tab switch fades in.

 Project open/close slides down smoothly.

 Reveal-on-scroll appears as items enter the viewport.

 Prefers-reduced-motion disables animations.

Error Handling & Feedback
 Inline validation messages show under inputs.

 Sports section shows Retry on failure.

 Empty states visible when needed.

AI Enhancement
 AI Draft Assistant creates subject/message/help using API key.

 Without key, local template produces a useful draft.

 User can edit the AI text freely.

11) Troubleshooting
Nothing loads / blank page
Serve from a local server (Live Server / python -m http.server). Avoid file://.

Sports not loading
Check internet connection. Open DevTools → Network to confirm Wikipedia requests are 200. Click Retry.

AI Draft says “Live AI unavailable”
Add a valid OpenAI API key in Contact → AI Settings, or rely on the local template.

Styles look off
Hard refresh (Ctrl/Cmd + Shift + R) after updates.

12) Extending the Project
Add a sport:

Push a new item into state.sports with a valid Wikipedia title.

(Optional) Add a fallback entry in SPORTS_FALLBACK.

Add a project:
Append to state.projects with {title, date, category, description}.

Change AI model:
Update model in draftWithOpenAI(); adjust prompt or JSON parsing if needed.

Deploy elsewhere:
Any static host works (Netlify, Vercel, Cloudflare Pages).

13) Git & Branching (Recommended)
feature/ branches for new features (e.g., feature/ai-draft-assistant)

chore/ for housekeeping (e.g., .gitignore, formatting)

docs/ for documentation updates

Example:

powershell
نسخ الكود
git checkout -b feature/ai-draft-assistant
# edit files...
git add .
git commit -m "feat(ai): add AI Draft Assistant with API + local fallback"
git push -u origin feature/ai-draft-assistant
Open a Pull Request, review, then merge to main.

