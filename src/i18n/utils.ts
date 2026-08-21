import { common } from './common';
import { defaultLang, languages } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages, pageUi?: any) {
  return function t(key: string) {
    // Try page-specific translation first
    if (pageUi && pageUi[lang] && key in pageUi[lang]) {
      return pageUi[lang][key];
    }
    if (pageUi && pageUi[defaultLang] && key in pageUi[defaultLang]) {
      return pageUi[defaultLang][key];
    }
    
    // Fallback to common translations
    const commonZh = common[defaultLang];
    const commonLang = common[lang] || commonZh;
    
    return (commonLang as any)[key] || (commonZh as any)[key] || key;
  }
}

export function useTranslatedPath(lang: keyof typeof languages) {
  return function translatePath(path: string, l: string = lang) {
    const isDefault = l === defaultLang;
    const prefix = isDefault ? '' : `/${l}`;
    return `${prefix}${path.startsWith('/') ? path : `/${path}`}`;
  }
}
