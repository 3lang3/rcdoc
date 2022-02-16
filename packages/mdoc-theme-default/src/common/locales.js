const ZH_CN = 'zh-CN';
const EN_US = 'en-US';
const CACHE_KEY = '@mdoc-lang';

let currentLang = EN_US;

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem(CACHE_KEY, lang);
}

export function setDefaultLang(langFromConfig) {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    currentLang = cached;
    return;
  }
  currentLang = langFromConfig || EN_US;
}
