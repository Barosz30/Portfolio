import pl from '../locales/pl.json';
import en from '../locales/en.json';

const LOCALES = { pl, en };
const STORAGE_KEY = 'locale';

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

async function detectLocale() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'pl' || stored === 'en') return stored;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://ipapi.co/country_code/', { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const country = (await res.text()).trim().toUpperCase();
      const locale = country === 'PL' ? 'pl' : 'en';
      localStorage.setItem(STORAGE_KEY, locale);
      return locale;
    }
  } catch (_) {
    /* geo lookup failed — fall through */
  }

  const lang = (navigator.language || '').toLowerCase();
  const locale = lang.startsWith('pl') ? 'pl' : 'en';
  localStorage.setItem(STORAGE_KEY, locale);
  return locale;
}

function applyLocale(locale) {
  const dict = LOCALES[locale];
  if (!dict) return;

  document.documentElement.lang = locale;

  if (dict.meta?.title) document.title = dict.meta.title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict.meta?.description) metaDesc.content = dict.meta.description;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = getNested(dict, el.dataset.i18n);
    if (val != null) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const val = getNested(dict, el.dataset.i18nHtml);
    if (val != null) el.innerHTML = val;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      const val = getNested(dict, key);
      if (val != null) el.setAttribute(attr, val);
    });
  });

  document.querySelectorAll('.lang-switch__btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.locale === locale);
    btn.setAttribute('aria-pressed', btn.dataset.locale === locale ? 'true' : 'false');
  });

  localStorage.setItem(STORAGE_KEY, locale);
}

function bindLangSwitch() {
  document.querySelectorAll('.lang-switch__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.locale;
      if (next === 'pl' || next === 'en') applyLocale(next);
    });
  });
}

async function initI18n() {
  bindLangSwitch();
  const locale = await detectLocale();
  applyLocale(locale);
}

initI18n();
