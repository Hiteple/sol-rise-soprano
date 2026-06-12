import { useEffect, useState, type RefObject } from 'react'

export type TimelineFillProgress = {
  /** 0–1 scroll progress along the timeline track */
  progress: number
  /** True once the fill line has reached the end */
  complete: boolean
}

/** Maps vertical scroll position to timeline line fill (0 → 1). */
export function useTimelineFillProgress(
  trackRef: RefObject<HTMLElement | null>,
): TimelineFillProgress {
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      const rect = track.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      if (motionQuery.matches) {
        const visible = rect.top < viewportHeight * 0.9 && rect.bottom > viewportHeight * 0.1
        setProgress(visible ? 1 : 0)
        setComplete(visible)
        return
      }

      const startOffset = viewportHeight * 0.78
      const endOffset = viewportHeight * 0.22
      const total = rect.height + startOffset - endOffset
      const traveled = startOffset - rect.top
      const next = total > 0 ? Math.min(1, Math.max(0, traveled / total)) : 0

      setProgress(next)
      setComplete(next >= 0.97)
    }

    update()
    requestAnimationFrame(update)

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(track)

    const onMotionChange = () => update()
    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      resizeObserver.disconnect()
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [trackRef])

  return { progress, complete }
}
