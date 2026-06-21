const CHAT_BASE = import.meta.env.DEV
  ? ''
  : 'https://chatbot-omom.onrender.com';

const CHAT_API = `${CHAT_BASE}/api/chat`;
const CHAT_PING = `${CHAT_BASE}/api/chat/ping`;
const CHAT_WELCOME = `${CHAT_BASE}/api/chat/welcome`;

const SUGGESTIONS = {
  pl: [
    'Kim jest Mirosław?',
    'Opowiedz o projektach',
    'Dlaczego jest świetnym developerem?',
  ],
  en: [
    'Who is Mirosław?',
    'Tell me about his projects',
    'Why is he a great developer?',
  ],
};

const ERRORS = {
  pl: {
    network: 'Nie udało się połączyć. Spróbuj ponownie.',
    rateLimit: 'Za dużo zapytań — poczekaj chwilę.',
    generic: 'Coś poszło nie tak. Spróbuj ponownie.',
    welcome: 'Cześć! Jestem asystentem Mirosława Wandyk. Zapytaj o jego projekty, umiejętności albo doświadczenie.',
  },
  en: {
    network: 'Connection failed. Please try again.',
    rateLimit: 'Too many requests — wait a moment.',
    generic: 'Something went wrong. Please try again.',
    welcome: "Hi! I'm Mirosław Wandyk's assistant. Ask about his projects, skills, or experience.",
  },
};

const widget = document.getElementById('chat-widget');
const panel = document.getElementById('chatPanel');
const toggle = document.getElementById('chatToggle');
const messagesEl = document.getElementById('chatMessages');
const form = document.getElementById('chatForm');
const input = document.getElementById('chatInput');
const sendBtn = document.getElementById('chatSend');
const suggestionsEl = document.getElementById('chatSuggestions');

let isOpen = false;
let isLoading = false;
let welcomeShown = false;
/** @type {{ role: 'user' | 'assistant', content: string }[]} */
let history = [];

function getLocale() {
  const lang = document.documentElement.lang;
  return lang === 'en' ? 'en' : 'pl';
}

function wakeChatbot() {
  fetch(CHAT_PING).catch(() => {});
}

async function parseReply(res) {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (typeof data === 'string') return data;
    return data?.reply ?? data?.message ?? data?.welcome ?? '';
  }
  return (await res.text()).trim();
}

async function fetchWelcome() {
  const locale = getLocale();
  const fallback = ERRORS[locale].welcome;

  try {
    const res = await fetch(`${CHAT_WELCOME}?lang=${locale}`);
    if (!res.ok) return fallback;
    const text = await parseReply(res);
    return text || fallback;
  } catch {
    return fallback;
  }
}

function openChat() {
  isOpen = true;
  widget.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
  panel.removeAttribute('hidden');
  if (!welcomeShown) showWelcome();
  input.focus();
}

function closeChat() {
  isOpen = false;
  widget.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  panel.setAttribute('hidden', '');
}

function toggleChat() {
  if (isOpen) closeChat();
  else openChat();
}

function appendMessage(text, role) {
  const el = document.createElement('div');
  el.className = `chat-message chat-message--${role}`;
  el.textContent = text;
  messagesEl.appendChild(el);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return el;
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'chat-message chat-message--bot chat-message--typing';
  el.id = 'chatTyping';
  el.innerHTML = '<span></span><span></span><span></span>';
  messagesEl.appendChild(el);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTyping() {
  document.getElementById('chatTyping')?.remove();
}

function renderSuggestions() {
  const locale = getLocale();
  suggestionsEl.innerHTML = '';
  SUGGESTIONS[locale].forEach((text) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chat-suggestion';
    btn.textContent = text;
    btn.addEventListener('click', () => sendMessage(text));
    suggestionsEl.appendChild(btn);
  });
}

async function showWelcome() {
  welcomeShown = true;
  showTyping();

  const text = await fetchWelcome();
  hideTyping();
  appendMessage(text, 'bot');
  history = [{ role: 'assistant', content: text }];
  renderSuggestions();
}

function setLoading(loading) {
  isLoading = loading;
  input.disabled = loading;
  sendBtn.disabled = loading;
}

async function parseErrorReply(res, fallback) {
  try {
    const reply = await parseReply(res);
    if (reply) return reply;
  } catch {
    /* fall through */
  }
  return fallback;
}

async function sendMessage(text) {
  const message = (text ?? input.value).trim();
  const locale = getLocale();
  const errors = ERRORS[locale];

  if (!message) return;
  if (isLoading) return;

  const historyForRequest = [...history];

  appendMessage(message, 'user');
  input.value = '';
  suggestionsEl.innerHTML = '';
  setLoading(true);
  showTyping();

  try {
    const res = await fetch(CHAT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: historyForRequest }),
    });

    hideTyping();

    if (res.status === 429) {
      const reply = await parseErrorReply(res, errors.rateLimit);
      appendMessage(reply, 'bot');
      return;
    }

    if (!res.ok) {
      const reply = await parseErrorReply(res, errors.generic);
      appendMessage(reply, 'bot');
      return;
    }

    const reply = await parseReply(res);
    const botReply = reply || errors.generic;
    appendMessage(botReply, 'bot');
    history.push({ role: 'user', content: message });
    history.push({ role: 'assistant', content: botReply });
  } catch {
    hideTyping();
    appendMessage(errors.network, 'bot');
  } finally {
    setLoading(false);
  }
}

toggle.addEventListener('click', toggleChat);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

document.addEventListener('localechange', async () => {
  if (!welcomeShown) return;

  const botMsgs = messagesEl.querySelectorAll('.chat-message--bot:not(.chat-message--typing)');
  const userMsgs = messagesEl.querySelectorAll('.chat-message--user');

  if (botMsgs.length === 1 && userMsgs.length === 0) {
    const text = await fetchWelcome();
    botMsgs[0].textContent = text;
    history = [{ role: 'assistant', content: text }];
    renderSuggestions();
  }
});

document.querySelectorAll('[data-chat-open]').forEach((el) => {
  el.addEventListener('click', () => openChat());
});

wakeChatbot();
window.openChatWidget = openChat;
