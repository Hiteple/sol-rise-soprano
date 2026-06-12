import { useCallback, useLayoutEffect, useState, type RefObject } from 'react'

/** Per-dot fill state synced to scroll line progress (updates up and down). */
export function useTimelineDotsReached(
  trackRef: RefObject<HTMLElement | null>,
  fillProgress: number,
): boolean[] {
  const [reached, setReached] = useState<boolean[]>([])

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const height = track.offsetHeight
    if (height <= 0) return

    const trackTop = track.getBoundingClientRect().top
    const dots = track.querySelectorAll<HTMLElement>('.timeline-track__dot')

    const next = Array.from(dots, (dot) => {
      const rect = dot.getBoundingClientRect()
      const ratio = (rect.top + rect.height / 2 - trackTop) / height
      return fillProgress >= ratio
    })

    setReached((prev) => {
      if (prev.length === next.length && prev.every((value, index) => value === next[index])) {
        return prev
      }
      return next
    })
  }, [trackRef, fillProgress])

  useLayoutEffect(() => {
    update()
    requestAnimationFrame(update)
  }, [update])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(track)
    return () => resizeObserver.disconnect()
  }, [trackRef, update])

  return reached
}
