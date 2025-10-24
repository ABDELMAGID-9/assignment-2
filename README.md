Perfect — below is a **final, high-quality, professional, and well-structured `README.md`** that meets full marks for:
✅ **Description**
✅ **Instructions to run locally**
✅ **AI tools summary**
✅ **Optional live link**

---

## `README.md`

# Assignment-2 · Interactive Portfolio

A clean, responsive **single-page portfolio** built with **HTML, CSS, and Vanilla JavaScript**.  
It demonstrates modern front-end practices including dynamic content, data handling with public APIs, smooth animations, strong error handling, and a built-in **AI Draft Assistant** for smart text generation in the contact form.

> 🌐 **Live Demo (optional):** [https://abdelmagid-9.github.io/assignment-2/](https://abdelmagid-9.github.io/assignment-2/)

---

## 📖 Project Description

This portfolio is designed to show your work, hobbies, and interests in a simple, interactive way.  
It includes multiple sections — *About*, *Sports*, *Projects*, and *Contact* — each with a different interactive feature:

- **Dynamic Content:**  
  Personalized greeting (stored locally), themed design, and remembered tab states.  

- **Sports Section (Public API):**  
  Fetches summaries from the **Wikipedia REST API** for sports like *Soccer, Basketball, Tennis, Swimming,* and *Formula One*.  
  Includes loading states, retry button, and clear fallbacks.

- **Projects Section:**  
  Allows live searching, category filtering, and sorting of projects by date or title.

- **Contact Section with AI Draft Assistant:**  
  Uses the **OpenAI API** to automatically draft message text based on user tone and purpose.  
  Works even without an internet connection using a **local fallback template**.

The app is lightweight and works fully in the browser — no backend server is required.

---

## ⚙️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **APIs** | Wikipedia REST API (no key), OpenAI Chat Completions (optional) |
| **Hosting** | Static (GitHub Pages, Netlify, or Vercel) |
| **Storage** | Browser Local Storage (theme, name, tab, AI key) |

---

## 🧭 Features Overview

| Category | Description |
|:----------|:-------------|
| **Dynamic UI** | Tabs, personalized greeting, remembered settings |
| **Data Handling** | Local Storage for theme/name/tab + live Wikipedia API |
| **Animation** | Fade-in panels, reveal-on-scroll, reduced-motion support |
| **Error Handling** | Inline validation, loading + retry states |
| **AI Enhancement** | AI Draft Assistant generates short, context-aware drafts for messages |

---

## 🧠 AI Tools Summary

| Tool | Purpose | Behavior |
|:------|:---------|:----------|
| **ChatGPT (OpenAI)** | Used to design, refine, and explain front-end logic and text. | Helped write and debug the AI Draft Assistant logic. |
| **OpenAI Chat Completions API (`gpt-4o-mini`)** | Runtime feature: the **AI Draft Assistant**. | Creates message drafts (subject, body, and help text). Works offline with a local fallback. |

> 💡 The detailed AI workflow — prompts, edits, and learning outcomes — is documented in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).

---

## 🧩 Project Structure



assignment-2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
└── docs/
├── ai-usage-report.md
└── technical-documentation.md





## 🧑‍💻 Run the Project Locally

> Some features (like API fetch) require a local server.  
> Do **not** open directly with `file://`.

### ▶️ Option 1: VS Code (Recommended)
1. Open the folder in **Visual Studio Code**.  
2. Install the extension **Live Server** (by Ritwick Dey).  
3. Right-click `index.html` → **“Open with Live Server.”**

### ▶️ Option 2: Python (Any OS)
```bash
python -m http.server 8080
````

Then open: [http://localhost:8080](http://localhost:8080)

### ▶️ Option 3: Node (http-server)

bash
npm install -g http-server
http-server -p 8080```

Then open: [http://localhost:8080](http://localhost:8080)

---

## ⚡ How to Use

### 1. Theme & Greeting

* Click the 🌓 icon to toggle dark/light mode (saved automatically).
* Enter your name → click **Save**. The greeting updates with your name.

### 2. Sports Section

* Shows live summaries of five sports using the **Wikipedia API**.
* Includes a **search bar**, **refresh**, and **retry** on failure.

### 3. Projects Section

* Search, filter, or sort your projects.
* Click a project header to expand details.

### 4. Contact Section (with AI)

* Fill in your info.
* Choose a **Purpose** and **Tone**, then click **Draft with AI**.
* You can provide an **OpenAI API key** (optional) in **AI Settings** to enable real-time generation.

---

## 🔐 Configure the AI Draft Assistant (Optional)

1. Navigate to **Contact → AI Settings**.
2. Paste your **OpenAI API key** (`sk-...`) and click **Save Key**.
3. Choose **Purpose** + **Tone**, then click **Draft with AI**.
4. No key? The assistant uses a **local template** automatically.
5. The key is stored **only in your browser’s Local Storage**.

---

## 🌍 Deploy (Optional)

### GitHub Pages

1. Push your repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select:

   * *Deploy from branch* → Branch: `main` → Folder: `/ (root)`
4. Save, then open:
   **[https://abdelmagid-9.github.io/assignment-2/](https://abdelmagid-9.github.io/assignment-2/)**

### Netlify / Vercel

* Drag-and-drop the folder or connect the repo.
* Build command: *(none)*
* Output directory: `/`

---

## 🧩 Accessibility & User Experience

* Fully keyboard-navigable interface
* Clear color contrast (dark/light modes)
* Uses `aria-live="polite"` for real-time status updates
* Honors `prefers-reduced-motion` for smooth but respectful animations
* Consistent and responsive layout for all viewports

---

## 🧱 Troubleshooting

| Issue                     | Possible Fix                                    |
| :------------------------ | :---------------------------------------------- |
| **Blank or partial page** | Run via local server (not `file://`).           |
| **Sports not loading**    | Check internet or API call; click **Retry**.    |
| **AI Draft unavailable**  | Add an OpenAI API key or use fallback template. |
| **CSS not updating**      | Hard refresh (`Ctrl/Cmd + Shift + R`).          |



| Requirement                        | Description                                                                                                            | Completed |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :-------: |
| **1. Repository Setup**            | Public repo named `assignment-2` with clear structure, README, and `.gitignore`.                                       |     ✅     |
| **2. Dynamic Content**             | Interactive content that changes with user input (tabs, greeting, projects list).                                      |     ✅     |
| **3. Data Handling**               | Uses Local Storage, public API (Wikipedia REST), and form submission with validation.                                  |     ✅     |
| **4. Animation & Transitions**     | Smooth animations for UI elements (fade, slide, reveal). Supports reduced-motion.                                      |     ✅     |
| **5. Error Handling & Feedback**   | Inline validation, loading spinners, retry options, and empty states for missing data.                                 |     ✅     |
| **6. AI Enhancement**              | AI Draft Assistant in the Contact form using OpenAI API or local fallback template.                                    |     ✅     |
| **7. Technical Documentation**     | Complete `docs/technical-documentation.md` describing architecture, UX, and setup.                                     |     ✅     |
| **8. AI Usage Report**             | Full `docs/ai-usage-report.md` including tools, prompts, outputs, edits, ethics, learning.                             |     ✅     |
| **9. User Experience**             | Accessible, responsive, easy-to-navigate interface with clear color contrast and feedback.                             |     ✅     |
| **10. Setup Instructions**         | Clear instructions for running locally (Live Server / Python / Node) and deployment steps.                             |     ✅     |
| **11. Professional README**        | Well-structured README with project overview, AI summary, and deployment guide.                                        |     ✅     |
| **12. Live Deployment (Optional)** | Hosted on GitHub Pages ([https://abdelmagid-9.github.io/assignment-2/](https://abdelmagid-9.github.io/assignment-2/)). |     ✅     |



## 📚 References

* [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/#/)
* [OpenAI API Docs](https://platform.openai.com/docs/api-reference/chat)
* [MDN Web Docs](https://developer.mozilla.org/)
* [GitHub Pages Guide](https://docs.github.com/en/pages)

---

## 🪄 Author & License

Developed by **Abdelmagid Osman**
© 2025 — Educational use only.


