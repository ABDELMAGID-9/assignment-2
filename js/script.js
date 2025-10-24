/* ========================
   Helpers & Global State
======================== */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
const J = (v) => JSON.stringify(v);

const state = {
  theme: 'dark',
  name: null,
  lastTab: 'about',
  projects: [
    { id: 1, title: 'Personal Site', date: '2025-08-10', category: 'web', description: 'A multipage portfolio with responsive layout.' },
    { id: 2, title: 'Data Visualizer', date: '2025-07-02', category: 'data', description: 'Charts from CSV using client-side rendering.' },
    { id: 3, title: 'Micro Tools', date: '2025-09-15', category: 'other', description: 'Small JS utilities packaged for reuse.' },
    { id: 4, title: 'Web Storefront', date: '2025-06-01', category: 'web', description: 'Catalog grid with filter/sort and cart demo.' },
  ],
  sports: [
    { key: 'soccer',      title: 'Soccer',       wiki: 'Association_football' },
    { key: 'basketball',  title: 'Basketball',   wiki: 'Basketball' },
    { key: 'tennis',      title: 'Tennis',       wiki: 'Tennis' },
    { key: 'swimming',    title: 'Swimming',     wiki: 'Swimming_(sport)' },
    { key: 'formulaone',  title: 'Formula One',  wiki: 'Formula_One' },
  ]
};

function save(key, value){ localStorage.setItem(key, J(value)); }
function load(key, fallback=null){ try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }

/* ========================
   Theme (Local Storage + system pref)
======================== */
function initialTheme(){
  const saved = load('theme', null);
  if (saved) return saved;
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}
function applyTheme(theme){
  document.documentElement.classList.toggle('light', theme === 'light');
  state.theme = theme;
  save('theme', theme);
}
function toggleTheme(){ applyTheme(state.theme === 'dark' ? 'light' : 'dark'); }

/* ========================
   Greeting & Name (Local Storage)
======================== */
function updateGreeting(){
  const el = $('#greetingText');
  const hours = new Date().getHours();
  const part = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
  const name = state.name ? `, ${state.name}` : '!';
  el.textContent = `${part}${name}`;
}
function initName(){
  state.name = load('name', null);
  const input = $('#nameInput');
  input.value = state.name ?? '';
  updateGreeting();
  $('#nameForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const val = input.value.trim();
    if(!val) return;
    state.name = val; save('name', val); updateGreeting();
  });
  $('#clearName').addEventListener('click', ()=>{
    localStorage.removeItem('name'); state.name = null; $('#nameInput').value = ''; updateGreeting();
  });
}

/* ========================
   Tabs (persist last tab)
======================== */
function setActiveTab(key){
  const tabs = $$('.tab'); const panels = $$('.tab-panel');
  tabs.forEach(b=>{
    const isActive = b.dataset.tab === key;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', String(isActive));
  });
  panels.forEach(p => p.classList.toggle('active', p.id === `tab-${key}`));
  state.lastTab = key; save('lastTab', key);
}
function initTabs(){
  const saved = load('lastTab', 'about'); setActiveTab(saved);
  $$('.tab').forEach(btn=> btn.addEventListener('click', ()=> setActiveTab(btn.dataset.tab)));
}

/* ========================
   Projects (filter/sort/search + collapsible + empty state)
======================== */
function renderProjects(){
  const query = $('#searchInput')?.value.toLowerCase().trim() || '';
  const filter = $('#filterSelect')?.value || 'all';
  const sort = $('#sortSelect')?.value || 'newest';
  let list = [...state.projects];

  if(filter !== 'all') list = list.filter(p => p.category === filter);
  if(query) list = list.filter(p => (p.title + ' ' + p.description).toLowerCase().includes(query));
  if(sort === 'newest') list.sort((a,b) => b.date.localeCompare(a.date));
  else if(sort === 'oldest') list.sort((a,b) => a.date.localeCompare(b.date));
  else if(sort === 'title') list.sort((a,b) => a.title.localeCompare(b.title));

  const container = $('#projectsList'); if (!container) return;
  container.innerHTML = '';
  if(list.length === 0){ $('#emptyState').classList.remove('hidden'); return; }
  $('#emptyState').classList.add('hidden');

  list.forEach(p=>{
    const wrapper = document.createElement('div');
    wrapper.className = 'project reveal';
    wrapper.innerHTML = `
      <div class="project-header" role="button" tabindex="0" aria-expanded="false">
        <div>
          <div class="project-title">${p.title}</div>
          <div class="project-meta">${p.category.toUpperCase()} • ${new Date(p.date).toLocaleDateString()}</div>
        </div>
        <div>▼</div>
      </div>
      <div class="project-body"><p>${p.description}</p></div>`;
    const header = $('.project-header', wrapper);
    header.addEventListener('click', ()=>{
      wrapper.classList.toggle('open');
      header.setAttribute('aria-expanded', wrapper.classList.contains('open'));
    });
    header.addEventListener('keydown', e=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); header.click(); }
    });
    container.appendChild(wrapper);
  });
  observeReveals();
}
function initProjectControls(){
  $('#searchInput')?.addEventListener('input', debounce(renderProjects, 120));
  $('#filterSelect')?.addEventListener('change', renderProjects);
  $('#sortSelect')?.addEventListener('change', renderProjects);
  renderProjects();
}

/* ========================
   SPORTS (Public API: Wikipedia REST)
======================== */
function simplify(text){
  if (!text) return '';
  text = text.replace(/\s*\([^)]*\)\s*/g, ' ');
  const sentences = text.split(/(?<=[.!?])\s+/);
  if (text.length > 240 && sentences.length > 1) text = sentences[0];
  text = text.trim(); if (!/[.!?]$/.test(text)) text += '.';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
async function fetchSportSummary(wikiTitle){
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error(`Wiki error ${res.status}`);
  const data = await res.json();
  return {
    title: data.title || wikiTitle.replace(/_/g, ' '),
    summary: simplify(data.extract || ''),
    image: data.thumbnail?.source || null,
    url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${wikiTitle}`
  };
}
const SPORTS_FALLBACK = {
  'Association_football': {
    title: 'Soccer',
    summary: 'Soccer is a team game. Two sides try to score by kicking the ball into a goal.',
    image: null, url: 'https://en.wikipedia.org/wiki/Association_football'
  },
  'Basketball': {
    title: 'Basketball',
    summary: 'Basketball is a fast team sport where players shoot the ball through a hoop.',
    image: null, url: 'https://en.wikipedia.org/wiki/Basketball'
  },
  'Tennis': {
    title: 'Tennis',
    summary: 'Tennis is played with rackets across a net. Players rally to win points.',
    image: null, url: 'https://en.wikipedia.org/wiki/Tennis'
  },
  'Swimming_(sport)': {
    title: 'Swimming',
    summary: 'Swimming is a water sport. Athletes race in different strokes and distances.',
    image: null, url: 'https://en.wikipedia.org/wiki/Swimming_(sport)'
  },
  'Formula_One': {
    title: 'Formula One',
    summary: 'Formula One is top-level motor racing. Drivers compete in high-speed open-wheel cars.',
    image: null, url: 'https://en.wikipedia.org/wiki/Formula_One'
  }
};
async function loadSports(){
  const msg = $('#sportsMessage');
  const spinner = $('#sportsLoading');
  const retry = $('#sportsRetry');
  const grid = $('#sportsGrid');
  const empty = $('#sportsEmpty');

  msg.textContent = 'Loading sports…'; spinner.classList.remove('hidden');
  retry.classList.add('hidden'); empty.classList.add('hidden'); grid.innerHTML = '';

  const tasks = state.sports.map(async s => {
    try { const info = await fetchSportSummary(s.wiki); return { key: s.key, ...info }; }
    catch { const fb = SPORTS_FALLBACK[s.wiki]; return { key: s.key, ...(fb || { title: s.title, summary: 'A popular sport enjoyed worldwide.', image: null, url: '#' }) }; }
  });

  try {
    const results = await Promise.all(tasks);
    renderSports(results); msg.textContent = 'Loaded.';
  } catch (e){
    console.warn(e); msg.textContent = 'Could not load sports. You can retry.'; retry.classList.remove('hidden');
  } finally { spinner.classList.add('hidden'); }
}
function renderSports(items){
  const grid = $('#sportsGrid'); grid.innerHTML = '';
  items.forEach(item=>{
    const card = document.createElement('article');
    card.className = 'sport-card reveal';
    card.dataset.title = item.title.toLowerCase();
    const img = item.image ? `<img class="sport-thumb" src="${item.image}" alt="${item.title} thumbnail"/>` : `<div class="sport-thumb" aria-hidden="true"></div>`;
    card.innerHTML = `${img}<strong>${item.title}</strong><p class="muted">${item.summary}</p><a class="btn small mt" href="${item.url}" target="_blank" rel="noopener">Learn more</a>`;
    grid.appendChild(card);
  });
  observeReveals(); filterSports();
}
function filterSports(){
  const q = ($('#sportSearch')?.value || '').toLowerCase().trim();
  const cards = $$('.sport-card', $('#sportsGrid')); let shown = 0;
  cards.forEach(c=>{ const match = c.dataset.title.includes(q); c.style.display = match ? '' : 'none'; if (match) shown++; });
  $('#sportsEmpty').classList.toggle('hidden', shown !== 0);
}

/* ========================
   Contact Form: Validation + feedback + loading state
======================== */
function validateEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function setInvalid(id, isInvalid, msg){
  const input = $(id); input.setAttribute('aria-invalid', String(isInvalid));
  const errorEl = input.parentElement.querySelector('.error'); errorEl.textContent = isInvalid ? msg : '';
}
async function handleContactSubmit(e){
  e.preventDefault();
  const name = $('#cName').value.trim();
  const email = $('#cEmail').value.trim();
  const msg = $('#cMsg').value.trim();

  setInvalid('#cName', !name, 'Name is required.');
  setInvalid('#cEmail', !email || !validateEmail(email), email ? 'Enter a valid email.' : 'Email is required.');
  setInvalid('#cMsg', !msg, 'Message is required.');
  const valid = name && email && validateEmail(email) && msg;

  const status = $('#formStatus'); const sendBtn = $('#sendBtn');
  status.classList.remove('hidden'); status.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…'; sendBtn.disabled = true;

  if(!valid){ status.innerHTML = 'Please fix the errors above.'; status.style.color = 'var(--danger)'; sendBtn.disabled = false; return; }

  try {
    await new Promise(res => setTimeout(res, 900));
    status.textContent = 'Message sent successfully!'; status.style.color = 'var(--success)';
    status.animate([{ transform: 'translateY(6px)', opacity: .2 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 280 });
    e.target.reset();
  } catch {
    status.textContent = 'Something went wrong. Please try again.'; status.style.color = 'var(--danger)';
  } finally { sendBtn.disabled = false; }
}

/* ========================
   AI Draft Assistant
   - Uses OpenAI if a key is provided (stored locally)
   - Otherwise uses a local smart template
======================== */
const AI_STORAGE_KEY = 'openai_key';
function getAIKey(){ return load(AI_STORAGE_KEY, ''); }
function saveAIKeyToStorage(k){ save(AI_STORAGE_KEY, k || ''); }

function buildDraftPrompt({name, email, subject, message, purpose, tone}){
  // Ask for a compact JSON so we can parse safely
  return [
    { role: 'system', content: 'You are a helpful writing assistant. Return only valid JSON: {"subject": "...","body": "...","help": "..."} with short, clear, friendly text.' },
    { role: 'user', content:
      `Draft a subject, message body, and one-sentence help text for a website contact form.
Purpose: ${purpose}
Tone: ${tone}
Name: ${name || 'Anonymous'}
Email: ${email || 'unknown'}
Existing subject: ${subject || '(none)'}
Existing message: ${message || '(none)'}
Constraints: keep it brief, plain language, and safe for all audiences.` }
  ];
}

function localTemplateDraft({name, purpose, tone}){
  const who = name ? name : 'there';
  const tones = {
    friendly: ['warm and friendly', 'kind and friendly'],
    professional: ['clear and professional', 'polite and direct'],
    concise: ['short and to the point', 'brief and clear'],
    enthusiastic: ['excited and upbeat', 'positive and energetic'],
    polite: ['polite and respectful', 'kind and respectful']
  }[tone] || ['clear and friendly'];

  const subjectByPurpose = {
    greeting: `Hello from ${name || 'a visitor'}`,
    inquiry: `Question about your work`,
    collaboration: `Collaboration idea`,
    support: `Need a bit of help`,
    thanks: `Thank you!`
  };
  const openers = {
    greeting: `Hi, ${who}!`,
    inquiry: `Hello,`,
    collaboration: `Hello,`,
    support: `Hi,`,
    thanks: `Hello,`
  };
  const bodies = {
    greeting: `Just stopping by to say hi and learn more about your projects.`,
    inquiry: `I have a quick question and would love your guidance.`,
    collaboration: `I have an idea we could build together and would like to discuss.`,
    support: `I ran into a small issue and could use your help.`,
    thanks: `Thanks for your time and the work you share.`
  };

  const subject = subjectByPurpose[purpose] || 'Hello';
  const body = `${openers[purpose] || 'Hello,'} ${bodies[purpose] || ''} Looking forward to hearing from you.`;
  const help = `Draft created in a ${tones[0]} style. Edit any part before sending.`;
  return { subject, body, help };
}

async function draftWithOpenAI(inputs, key){
  const payload = {
    model: 'gpt-4o-mini',
    messages: buildDraftPrompt(inputs),
    temperature: 0.7,
  };
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`OpenAI API error ${res.status}`);
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content?.trim() || '';
  // Try to parse JSON safely
  try { return JSON.parse(content); } catch { /* sometimes models wrap code fences */ }
  const stripped = content.replace(/```json|```/g, '').trim();
  try { return JSON.parse(stripped); } catch { return null; }
}

async function handleAIDraft(){
  const name = $('#cName').value.trim();
  const email = $('#cEmail').value.trim();
  const subject = $('#cSubject').value.trim();
  const message = $('#cMsg').value.trim();
  const purpose = $('#purposeSelect').value;
  const tone = $('#toneSelect').value;

  const status = $('#aiStatus');
  status.textContent = 'Drafting…';

  const key = getAIKey();
  let draft = null;

  if (key){
    try {
      draft = await draftWithOpenAI({ name, email, subject, message, purpose, tone }, key);
      if (!draft || !draft.subject || !draft.body) throw new Error('Malformed AI response');
      status.textContent = 'Draft ready (AI).';
    } catch (e){
      console.warn(e);
      status.textContent = 'Live AI unavailable. Using local template.';
      draft = localTemplateDraft({ name, purpose, tone });
    }
  } else {
    draft = localTemplateDraft({ name, purpose, tone });
    status.textContent = 'Draft ready (local template).';
  }

  if (draft){
    if (draft.subject) $('#cSubject').value = draft.subject;
    if (draft.body) $('#cMsg').value = draft.body;
    if (draft.help) $('#formHelp').textContent = draft.help;
  }
}

/* ========================
   Reveal on scroll
======================== */
let revealObserver;
function observeReveals(){
  if(revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  $$('.reveal').forEach(el => revealObserver.observe(el));
}

/* ========================
   Utilities
======================== */
function debounce(fn, wait=150){ let t; return (...args)=>{ clearTimeout(t); t = setTimeout(()=> fn(...args), wait); }; }

/* ========================
   Init
======================== */
document.addEventListener('DOMContentLoaded', ()=>{
  applyTheme(initialTheme()); $('#themeToggle').addEventListener('click', toggleTheme);
  $('#year').textContent = new Date().getFullYear();

  initName(); initTabs(); initProjectControls();

  // SPORTS
  $('#sportsRetry')?.addEventListener('click', loadSports);
  $('#sportsRefresh')?.addEventListener('click', loadSports);
  $('#sportSearch')?.addEventListener('input', debounce(filterSports, 120));
  loadSports();

  // Contact + AI Draft Assistant
  $('#contactForm')?.addEventListener('submit', handleContactSubmit);
  $('#aiDraft')?.addEventListener('click', handleAIDraft);
  $('#saveAIKey')?.addEventListener('click', ()=>{
    const key = $('#aiKey').value.trim();
    saveAIKeyToStorage(key);
    $('#aiStatus').textContent = key ? 'API key saved locally.' : 'API key cleared.';
    setTimeout(()=> $('#aiStatus').textContent = '', 1500);
  });

  // Preload saved key into field (masked)
  const existingKey = getAIKey();
  if (existingKey) $('#aiKey').value = existingKey;

  observeReveals();
});
