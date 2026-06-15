import { useLayoutEffect, useRef, useState } from 'react'

export type UseInViewOptions = {
  /** Fraction of the element visible before it triggers (0–1). */
  threshold?: number
  /** Margin around the viewport; positive bottom triggers before the element enters. */
  rootMargin?: string
  /** Reveal only once (default) or re-trigger when scrolling in and out. */
  once?: boolean
}

function parseMarginBottomPx(rootMargin: string, viewportHeight: number): number {
  const parts = rootMargin.trim().split(/\s+/)
  const bottom = parts.length === 1 ? parts[0] : (parts[2] ?? parts[0])
  if (!bottom) return 0
  if (bottom.endsWith('%')) return (parseFloat(bottom) / 100) * viewportHeight
  if (bottom.endsWith('px')) return parseFloat(bottom)
  return 0
}

/** Mirrors IntersectionObserver math for a one-off sync check. */
function isInViewport(el: HTMLElement, threshold: number, rootMargin: string): boolean {
  const rect = el.getBoundingClientRect()
  if (rect.height === 0 && rect.width === 0) return false

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const rootBottom = viewportHeight + parseMarginBottomPx(rootMargin, viewportHeight)
  const overlap = Math.min(rect.bottom, rootBottom) - Math.max(rect.top, 0)
  if (overlap <= 0) return false

  return overlap / rect.height >= threshold
}

/** Tracks whether an element has entered the viewport, for scroll-reveal effects. */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { threshold = 0.08, rootMargin = '0px 0px 10% 0px', once = true } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    let visible = false

    let removeSyncListeners: (() => void) | null = null

    const markVisible = () => {
      if (visible) return
      visible = true
      setInView(true)
      removeSyncListeners?.()
      removeSyncListeners = null
    }

    const sync = () => {
      if (isInViewport(el, threshold, rootMargin)) markVisible()
    }

    if (typeof IntersectionObserver === 'undefined') {
      markVisible()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            markVisible()
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            visible = false
            setInView(false)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    sync()
    requestAnimationFrame(() => {
      sync()
      requestAnimationFrame(sync)
    })

    const onSync = () => sync()
    window.addEventListener('resize', onSync, { passive: true })
    window.addEventListener('scroll', onSync, { passive: true })
    window.addEventListener('load', onSync, { passive: true, once: true })
    removeSyncListeners = () => {
      window.removeEventListener('resize', onSync)
      window.removeEventListener('scroll', onSync)
      window.removeEventListener('load', onSync)
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => sync())
        : undefined
    resizeObserver?.observe(el)

    return () => {
      observer.disconnect()
      resizeObserver?.disconnect()
      removeSyncListeners?.()
    }
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
