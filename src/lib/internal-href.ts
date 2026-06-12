/** True for same-site paths like `/schedule/foo` (not protocol-relative `//`). */
export function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}
