/** Netlify Image CDN transform (same-origin in production on Netlify). */
export function netlifyImg(url: string, w: number, h?: number, fit = 'cover') {
  const params = new URLSearchParams({ url, w: String(w), fit })
  if (h) params.set('h', String(h))
  return `/.netlify/images?${params.toString()}`
}
