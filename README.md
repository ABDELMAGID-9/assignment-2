
## `README.md`

```markdown
# Assignment-2 · Interactive Portfolio

A clean, responsive, **single-page portfolio** built with **HTML, CSS, and Vanilla JavaScript**.  
It demonstrates dynamic UI, public API data handling, smooth animations, robust error handling, and an **AI Draft Assistant** for the contact form.

> **Live demo (optional):** https://<YOUR-USERNAME>.github.io/assignment-2/

---

## Features

- **Dynamic Content**
  - Tabs: *About, Sports, Projects, Contact* (remembers last open tab)
  - Personalized greeting with saved name (Local Storage)
  - Projects: live search, category filter, sort, and collapsible details

- **Data Handling**
  - Local Storage: theme, name, last tab, optional OpenAI API key
  - Public API (Wikipedia REST): short summaries for **Soccer, Basketball, Tennis, Swimming, Formula One**
  - Loading state, retry button, and empty state for search

- **Animation & Transitions**
  - Fade-in tab panels, slide-down sections, reveal-on-scroll
  - Respects `prefers-reduced-motion`

- **Error Handling & Feedback**
  - Inline form validation (name, email, message)
  - Clear success/error/loading messages across the app

- **AI Enhancement**
  - **AI Draft Assistant** (Contact tab) generates **Subject**, **Message**, and **Help** text
  - Uses **OpenAI API** if a key is saved locally; otherwise uses a **local template fallback**

---

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **APIs:** Wikipedia REST (no key), OpenAI Chat Completions (optional, client-side)
- **Tooling:** Works as a static site (GitHub Pages, Netlify, Vercel, or any static host)

---

## Project Structure

```

assignment-2/
├─ README.md
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ script.js
├─ assets/
│  └─ images/                 # place any images here
└─ docs/
├─ ai-usage-report.md      # detailed AI prompts, outputs, edits, learnings
└─ technical-documentation.md

````

---

## Run Locally

> Serve over a local server (avoid `file://`). Some features (fetch, storage) work best via HTTP.

**Option A — VS Code Live Server**
1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

**Option B — Python simple server**
```bash
# Python 3
python -m http.server 8080
# open http://localhost:8080
````

**Option C — Node http-server**

```bash
npm i -g http-server
http-server -p 8080
# open http://localhost:8080
```

---

## Usage

* **Theme:** Click the 🌓 button to toggle dark/light (saved automatically).
* **Greeting:** Enter your name and click **Save**; greeting updates and persists.
* **Sports:** Auto-loads summaries from Wikipedia; search to filter; use **Refresh/Retry** if needed.
* **Projects:** Search, filter, sort; click a project header to expand details.
* **Contact:** Fill fields. Use **Draft with AI** to create subject/message/help. Submit to see loading + success feedback (simulated).

---

## AI Tools (Short Summary)

* **AI Draft Assistant (runtime, optional)**

  * Calls **OpenAI Chat Completions** (`gpt-4o-mini`) if you store an API key locally.
  * If no key or an error occurs, a **local template** generates a helpful draft.
  * The API key (if used) is stored only in your browser’s Local Storage (`openai_key`).

> Full details (prompts, outputs, edits, decisions): see [`docs/ai-usage-report.md`](docs/ai-usage-report.md).
> Architecture & setup: see [`docs/technical-documentation.md`](docs/technical-documentation.md).

---

## Configure the AI Draft Assistant (Optional)

1. Open the **Contact** tab → **AI Settings**.
2. Paste your **OpenAI API key** (`sk-...`) → click **Save Key**.
3. Pick **Purpose** and **Tone**, then click **Draft with AI**.
4. You can clear the key any time. No server is used.

---

## Deploy (Optional)

**GitHub Pages**

1. Push the repo to GitHub.
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch** → Branch: `main`, Folder: `/ (root)`.
4. Save. After it builds, your site is live at:

```
https://<YOUR-USERNAME>.github.io/assignment-2/
```

**Netlify / Vercel**

* Connect the repo or drag-and-drop.
* Build command: *none* (static).
* Output directory: `/` (root).

---

## Accessibility & Privacy

* Keyboard-friendly tabs and collapsible sections
* `aria-live="polite"` status updates for screen readers
* Honors **reduced motion** preferences
* No backend; all logic runs in the browser
* Optional OpenAI key stored **locally**; never committed to Git
* Wikipedia API requires no key

---

## Troubleshooting

* **Blank or partial page:** run with a local server (see *Run Locally*).
* **Sports not loading:** check connection; click **Retry**; inspect DevTools → Network.
* **AI Draft unavailable:** add a valid API key or rely on the local template.
* **Styles not updating:** hard refresh (`Ctrl/Cmd + Shift + R`).

---

## Assignment Checklist

* [x] Dynamic content (tabs, greeting, projects interactions)
* [x] Data handling (Local Storage + public API fetch)
* [x] Animations & transitions (with reduced-motion support)
* [x] Error handling & user feedback (validation, loading, empty, retry)
* [x] AI enhancement (Draft Assistant with API + local fallback)
* [x] Documentation (`docs/ai-usage-report.md`, `docs/technical-documentation.md`)

```

::contentReference[oaicite:0]{index=0}
```

