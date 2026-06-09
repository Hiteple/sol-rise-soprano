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
  const containerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef(new Map<T, HTMLButtonElement>())
  const [indicator, setIndicator] = useState<IndicatorStyle>({ left: 0, width: 0 })

  const updateIndicator = useCallback(() => {
    const activeEl = tabRefs.current.get(value)
    const container = containerRef.current
    if (!activeEl || !container) return

    const containerRect = container.getBoundingClientRect()
    const tabRect = activeEl.getBoundingClientRect()
    setIndicator({
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    })
  }, [value])

  useLayoutEffect(() => {
    updateIndicator()
  }, [updateIndicator, options])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(updateIndicator)
    observer.observe(container)
    window.addEventListener('resize', updateIndicator)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [updateIndicator])

  return (
    <div
      ref={containerRef}
      className={`relative flex w-fit max-w-full self-start gap-1 p-1 rounded-[var(--media-radius)] overflow-x-auto ${className}`.trim()}
      style={{ background: 'var(--pill-track-background-color)' }}
      role="group"
      aria-label={ariaLabel}
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
            className={`relative z-[1] shrink-0 whitespace-nowrap ${tabClassName} text-xs uppercase tracking-wide md:tracking-widest font-body font-semibold transition-colors duration-300 rounded-[var(--media-radius-inner)]`}
            style={{
              color: isActive ? activeTextColor : inactiveTextColor,
              background: 'transparent',
            }}
            data-sb-field-path={option.fieldPath}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
