import { useEffect, useState } from 'react'

export type ParsedStatNumber = {
  prefix: string
  value: number
  suffix: string
}

/** Splits values like `6+` or `15` into a numeric target plus optional affixes. */
export function parseStatNumber(raw: string): ParsedStatNumber | null {
  const trimmed = raw.trim()
  const match = trimmed.match(/^([^0-9]*)(\d+)(.*)$/)
  if (!match) return null

  return {
    prefix: match[1] ?? '',
    value: Number.parseInt(match[2], 10),
    suffix: match[3] ?? '',
  }
}

type UseCountUpOptions = {
  /** Milliseconds between each increment (default 80). */
  stepMs?: number
  /** When false, jumps straight to the target (e.g. prefers-reduced-motion). */
  animate?: boolean
}

/** Counts from 0 up to `target` in steps of 1 while `active` is true. */
export function useCountUp(
  target: number,
  active: boolean,
  { stepMs = 80, animate = true }: UseCountUpOptions = {},
) {
  const [count, setCount] = useState(animate ? 0 : target)

  useEffect(() => {
    if (!active) {
      setCount(animate ? 0 : target)
      return
    }

    if (!animate) {
      setCount(target)
      return
    }

    setCount(0)
    if (target <= 0) return

    let current = 0
    const id = window.setInterval(() => {
      current += 1
      setCount(current)
      if (current >= target) window.clearInterval(id)
    }, stepMs)

    return () => window.clearInterval(id)
  }, [active, target, stepMs, animate])

  return count
}

/** Tracks `prefers-reduced-motion: reduce`. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}
