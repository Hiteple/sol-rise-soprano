/** Visible photo credit — `PH: Name`. Strips a leading `PH:` if already in the field. */
export function photographerCreditLabel(photographer?: string | null): string | undefined {
  const raw = photographer?.trim()
  if (!raw) return undefined
  const name = raw.replace(/^PH:\s*/i, '').trim()
  if (!name) return undefined
  return `PH: ${name}`
}
