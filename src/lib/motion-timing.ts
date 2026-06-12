const REVEAL_DURATION_FALLBACK_MS = 1100
const STATS_COUNT_UP_FACTOR_FALLBACK = 1.45

function parseCssDurationMs(raw: string): number | null {
  const value = raw.trim()
  if (!value) return null
  if (value.endsWith('ms')) {
    const ms = Number.parseFloat(value)
    return Number.isFinite(ms) ? ms : null
  }
  if (value.endsWith('s')) {
    const seconds = Number.parseFloat(value)
    return Number.isFinite(seconds) ? seconds * 1000 : null
  }
  return null
}

function readRootCssVar(name: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name)
}

/** Scroll-reveal transition length from `--reveal-transition-duration`. */
export function getRevealTransitionMs(): number {
  return (
    parseCssDurationMs(readRootCssVar('--reveal-transition-duration')) ??
    REVEAL_DURATION_FALLBACK_MS
  )
}

/** Total count-up duration: reveal time × `--stats-count-up-duration-factor`. */
export function getStatsCountUpDurationMs(): number {
  const revealMs = getRevealTransitionMs()
  const factorRaw = readRootCssVar('--stats-count-up-duration-factor').trim()
  const factor = Number.parseFloat(factorRaw)
  const resolvedFactor =
    Number.isFinite(factor) && factor > 0 ? factor : STATS_COUNT_UP_FACTOR_FALLBACK
  return revealMs * resolvedFactor
}

export function statsCountUpStepMs(target: number, durationMs = getStatsCountUpDurationMs()): number {
  if (target <= 0) return 80
  return Math.max(48, Math.ceil(durationMs / target))
}
