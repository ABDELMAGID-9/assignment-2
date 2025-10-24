# AI Usage Report

Project: **Assignment-2 Interactive Portfolio**  
Author: **[Your Name]**  
Date: **[Today’s date]**

This report explains **how I used AI** in my project. I describe the tools, the prompts, the output, what I changed, what I learned, and how I used AI in a **responsible** way.

---

## 1) Tools Used

- **ChatGPT (GPT-5 Thinking)**  
  Used to draft code, explain bugs, and improve wording in the UI.
- **OpenAI API (optional, runtime in the site)**  
  Used by the **AI Draft Assistant** to write a short email subject + message + help text.  
  If no key is provided, the site uses a **local template fallback**.
- **VS Code**  
  Editor for writing and testing the code.

> Note: I did **not** use GitHub Copilot in this assignment.

---

## 2) Main AI Feature in the Site

### Feature: AI Draft Assistant (Contact Form)
- **What it does**: Creates a short **Subject**, **Message**, and **Help** text for the contact form.  
  The user chooses **Purpose** (greeting, inquiry, collaboration, support, thanks) and **Tone** (friendly, professional, concise, enthusiastic, polite).
- **How it works**:
  - If the user saves an **OpenAI API key** in the “AI Settings”, the site calls the official API and gets a JSON draft.
  - If there is **no key** or the API fails, the site uses a **local template** to create a good draft.  
- **Why it is useful**: It helps users start writing fast and with a clear tone.

---

## 3) Use Cases (Prompt → Output → Edits → Understanding)

### 3.1 Build the AI Draft Assistant (development phase)
- **Tool**: ChatGPT  
- **Prompt (short)**:  
  *“Help me create a contact form feature that drafts a subject, body, and help text based on purpose and tone. Use OpenAI API if a key exists, and a local fallback if not. Return JSON only.”*
- **Output (summary)**:  
  ChatGPT gave me a structure with a `fetch` call to `/v1/chat/completions`, an example JSON prompt, and code to parse the result.
- **My Edits**:
  - I **pinned** the model name to `gpt-4o-mini` for low cost and speed.
  - I added **strict JSON parsing** with a fallback for code-fence outputs.
  - I added **local template drafts** for offline mode (no key).
  - I stored the API key in **Local Storage** (client only), not on a server.
  - I added **status messages** and simple **error handling** in the UI.
- **Understanding (my words)**:  
  The API is called with a **messages** array. The assistant reply is plain text. I **expect JSON**, so I parse it. If parsing fails, I try removing code fences and parse again. If it still fails, I switch to the **template fallback**. This design guarantees the button always works.

---

### 3.2 Improve the sports API section text (development phase)
- **Tool**: ChatGPT  
- **Prompt (short)**:  
  *“Give me 1–2 sentence, simple-language summaries for soccer, basketball, tennis, swimming, and Formula One.”*
- **Output (summary)**:  
  Short summaries for each sport.
- **My Edits**:
  - I simplified the sentences and made them **consistent** in style.
  - I added a **client function** that trims long extracts from Wikipedia and keeps only the first sentence for clarity.
- **Understanding**:  
  The summaries must be **short and clear**. If the API text is long, I **shorten** it to improve readability.

---

### 3.3 Documentation drafting (this file)
- **Tool**: ChatGPT  
- **Prompt (short)**:  
  *“Write an AI usage report with tools, prompts, output, edits, ethics, and learning outcomes.”*
- **Output (summary)**:  
  A first draft report with all sections.
- **My Edits**:
  - I **shortened** sentences and removed extra jargon.
  - I added details that match **my actual code** and choices.
- **Understanding**:  
  Documentation must reflect the **real implementation**, not just generic text. I verified each point against my code.

---

## 4) Benefits

- **Speed**: AI helped me write working code faster (draft assistant + API handling).
- **Clarity**: AI gave me simple wording for UI texts and error messages.
- **Fallback mindset**: AI reminded me to always design **fallbacks** (local template when API fails).
- **Learning**: I understood better how to **parse AI JSON** responses safely.

---

## 5) Challenges

- **Earlier idea (sentiment model) failed** due to CDN/CORS and model loading in some environments.  
  I replaced it with the **AI Draft Assistant** which is more stable and has a clear **offline fallback**.
- **JSON parsing**: Sometimes AI answers include code fences. I added a **strip and re-parse** step.
- **Privacy**: I avoided sending personal data to any server by keeping the **API key local** and only sending the **minimum text** to the API when used.

---

## 6) Ethics and Responsible Use

- **Privacy first**: The API key is stored only in the browser (**Local Storage**). The site does **not** save messages to a server.
- **Transparency**: The UI clearly says when AI is used and when a **local template** is used instead.
- **User Control**: The user can **edit** the AI draft before sending. AI is a helper, not the final decision.
- **No harmful content**: The prompts request **safe, polite** text. I keep the output short and neutral.
- **Learning, not copying**: I changed AI suggestions to match my goals and I can explain every part of the code.

---

## 7) Learning Outcomes

- I can design an AI feature with a **clean UX** and **fallbacks**.
- I can call a **chat completion API**, build a **system/user prompt**, and parse the **response**.
- I know how to handle **errors**: network failure, 401/429, bad JSON.
- I can write **simple, clear** help text and labels with AI support.
- I understand how to keep user data **private** in a client-only site.

---

## 8) Prompts & Outputs (examples)

### A) Draft Assistant (OpenAI prompt)
**System**:  
“Return only valid JSON: `{"subject":"...","body":"...","help":"..."}` with short, clear, friendly text.”

**User (example)**:  
Draft a subject, message body, and one-sentence help text for a website contact form.
Purpose: collaboration
Tone: professional
Name: Abdelmagid
Email: s201837680@kfupm.edu.sa

Existing subject: (none)
Existing message: (none)
Constraints: keep it brief, plain language, and safe for all audiences.


**Expected JSON Output (example)**:
```json
{
  "subject": "Collaboration idea",
  "body": "Hello, I have a project idea that could fit your work. May we schedule a short call to discuss details? Thank you for your time.",
  "help": "Draft created in a clear and professional tone—feel free to edit before sending."
}
My Edits:
I sometimes shorten the body and change the subject to better fit the site’s style.

B) Local Template Fallback (no API key)

Inputs: purpose = support, tone = friendly, name = Abdelmagid

Generated:

Subject: Need a bit of help

Body: Hi, I ran into a small issue and could use your help. Looking forward to hearing from you.

Help: Draft created in a warm and friendly style. Edit any part before sending.