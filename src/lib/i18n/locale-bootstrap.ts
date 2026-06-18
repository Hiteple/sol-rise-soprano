import { LOCALE_PREFERENCE_KEY } from './storage'

const NON_EN_LOCALES = ['es', 'de', 'it'] as const

/**
 * Tiny synchronous bootstrap injected in `<head>` before body paint.
 * - Sets `document.documentElement.lang` from the URL prefix
 * - Redirects `/` to a saved non-English preference (cookie, then localStorage)
 *
 * Intentionally parser-blocking but sub-millisecond; avoids English home flash
 * without Edge Functions or a post-hydration `useEffect` redirect.
 */
export const LOCALE_BOOTSTRAP_SCRIPT = `(function(){var p=location.pathname;var m=/^\\/(es|de|it)(?:\\/|$)/.exec(p);document.documentElement.lang=m?m[1]:"en";if(p!=="/")return;var key=${JSON.stringify(LOCALE_PREFERENCE_KEY)};var ok=${JSON.stringify(NON_EN_LOCALES)};var pref=null;try{var parts=document.cookie?document.cookie.split(";"):[],i=0,prefix=key+"=";for(;i<parts.length;i++){var part=parts[i].trim();if(part.indexOf(prefix)===0){pref=decodeURIComponent(part.slice(prefix.length));break}}}catch(e){}if(!pref){try{pref=localStorage.getItem(key)}catch(e){}}if(!pref||pref==="en"||ok.indexOf(pref)<0)return;location.replace("/"+pref+location.search+location.hash)})();`
