import pl from '../locales/pl.json';
import en from '../locales/en.json';

const LOCALES = { pl, en };

const CHAT_BASE = import.meta.env.DEV
  ? ''
  : 'https://chatbot-omom.onrender.com';

const CHAT_API = `${CHAT_BASE}/api/chat`;
const CHAT_PING = `${CHAT_BASE}/api/chat/ping`;

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
  },
  en: {
    network: 'Connection failed. Please try again.',
    rateLimit: 'Too many requests — wait a moment.',
    generic: 'Something went wrong. Please try again.',
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

function getLocale() {
  const lang = document.documentElement.lang;
  return lang === 'en' ? 'en' : 'pl';
}

function getWelcome() {
  return LOCALES[getLocale()]?.chat?.welcome ?? '';
}

function wakeChatbot() {
  fetch(CHAT_PING).catch(() => {});
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

function showWelcome() {
  welcomeShown = true;
  appendMessage(getWelcome(), 'bot');
  renderSuggestions();
}

function setLoading(loading) {
  isLoading = loading;
  input.disabled = loading;
  sendBtn.disabled = loading;
}

async function parseErrorReply(res, fallback) {
  const contentType = res.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (data?.reply) return data.reply;
    }
    const text = await res.text();
    if (text) return text;
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

  appendMessage(message, 'user');
  input.value = '';
  suggestionsEl.innerHTML = '';
  setLoading(true);
  showTyping();

  try {
    const res = await fetch(CHAT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
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

    const data = await res.json();
    appendMessage(data.reply || errors.generic, 'bot');
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

document.addEventListener('localechange', () => {
  if (!welcomeShown) return;
  const msgs = messagesEl.querySelectorAll('.chat-message--bot:not(.chat-message--typing)');
  if (msgs.length === 1) {
    msgs[0].textContent = getWelcome();
    renderSuggestions();
  }
});

document.querySelectorAll('[data-chat-open]').forEach((el) => {
  el.addEventListener('click', () => openChat());
});

wakeChatbot();
window.openChatWidget = openChat;
