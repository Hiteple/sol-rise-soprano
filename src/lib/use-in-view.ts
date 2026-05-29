import { useEffect, useRef, useState } from 'react'

export type UseInViewOptions = {
  /** Fraction of the element visible before it triggers (0–1). */
  threshold?: number
  /** Margin around the viewport; negative bottom delays the trigger slightly. */
  rootMargin?: string
  /** Reveal only once (default) or re-trigger when scrolling in and out. */
  once?: boolean
}

/** Tracks whether an element has entered the viewport, for scroll-reveal effects. */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
