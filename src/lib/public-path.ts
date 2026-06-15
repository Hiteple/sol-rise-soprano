/** Root-relative public asset path — safe under /es, /de, etc. */
export function resolvePublicPath(path: string): string {
  const trimmed = path.trim()
  if (!trimmed) return trimmed
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}
