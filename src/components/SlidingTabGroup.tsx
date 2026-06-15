import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type SlidingTabOption<T extends string> = {
  value: T
  label: ReactNode
  fieldPath?: string
}

export type SlidingTabGroupProps<T extends string> = {
  options: SlidingTabOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel: string
  inactiveTextColor?: string
  activeTextColor?: string
  className?: string
  tabClassName?: string
}

type IndicatorStyle = {
  left: number
  width: number
}

export function SlidingTabGroup<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  inactiveTextColor = 'var(--subtle-text-color)',
  activeTextColor = 'var(--on-accent-text-color)',
  className = '',
  tabClassName = 'px-3 py-1.5 md:px-5 md:py-2',
}: SlidingTabGroupProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef(new Map<T, HTMLButtonElement>())
  const [indicator, setIndicator] = useState<IndicatorStyle>({ left: 0, width: 0 })

  const updateIndicator = useCallback(() => {
    const activeEl = tabRefs.current.get(value)
    const track = trackRef.current
    if (!activeEl || !track) return

    setIndicator({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    })
  }, [value])

  const scrollActiveTabIntoView = useCallback(() => {
    const activeEl = tabRefs.current.get(value)
    const scroller = scrollRef.current
    if (!activeEl || !scroller) return

    const pad = 4
    const tabLeft = activeEl.offsetLeft
    const tabRight = tabLeft + activeEl.offsetWidth
    const viewLeft = scroller.scrollLeft
    const viewRight = viewLeft + scroller.clientWidth

    if (tabLeft < viewLeft + pad) {
      scroller.scrollTo({ left: Math.max(0, tabLeft - pad), behavior: 'smooth' })
    } else if (tabRight > viewRight - pad) {
      scroller.scrollTo({
        left: tabRight - scroller.clientWidth + pad,
        behavior: 'smooth',
      })
    }
  }, [value])

  useLayoutEffect(() => {
    updateIndicator()
    scrollActiveTabIntoView()
  }, [updateIndicator, scrollActiveTabIntoView, options])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new ResizeObserver(updateIndicator)
    observer.observe(track)
    for (const button of tabRefs.current.values()) observer.observe(button)

    window.addEventListener('resize', updateIndicator)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [updateIndicator, options])

  return (
    <div
      ref={scrollRef}
      className="sliding-tab-scroll max-w-full self-start overflow-x-auto"
      role="group"
      aria-label={ariaLabel}
    >
      <div
        ref={trackRef}
        className={`relative inline-flex w-max max-w-none gap-1 p-1 rounded-[var(--media-radius)] ${className}`.trim()}
        style={{ background: 'var(--pill-track-background-color)' }}
      >
        <span
          className="sliding-tab-indicator"
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
          aria-hidden
        />
        {options.map((option) => {
          const isActive = value === option.value
          return (
            <button
              key={option.value}
              ref={(el) => {
                if (el) tabRefs.current.set(option.value, el)
                else tabRefs.current.delete(option.value)
              }}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isActive}
              className={`sliding-tab-button relative z-[1] shrink-0 whitespace-nowrap ${tabClassName} text-xs uppercase tracking-wide md:tracking-widest font-body font-semibold rounded-[var(--media-radius-inner)]`}
              style={{
                color: isActive ? activeTextColor : inactiveTextColor,
              }}
              data-sb-field-path={option.fieldPath}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
