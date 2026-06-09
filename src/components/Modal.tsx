import { useEffect, useRef, useState, type ReactNode, type TransitionEvent } from 'react'
import { X } from 'lucide-react'

import { useModalA11y } from '@/lib/use-modal-a11y'
import { cn } from '@/lib/utils'

type ModalProps = {
  open: boolean
  onClose: () => void
  /** Accessible name when no visible title is passed. */
  ariaLabel?: string
  /** Visible title (also used as accessible name). */
  title?: string
  children: ReactNode
  className?: string
  panelClassName?: string
}

export function Modal({
  open,
  onClose,
  ariaLabel = 'Dialog',
  title,
  children,
  className,
  panelClassName,
}: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [present, setPresent] = useState(open)
  const [active, setActive] = useState(false)

  const { titleId } = useModalA11y({
    open: present,
    onClose,
    dialogRef,
    initialFocusRef: closeRef,
  })

  useEffect(() => {
    if (open) {
      setPresent(true)
      return
    }
    setActive(false)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPresent(false)
    }
  }, [open])

  useEffect(() => {
    if (!present || !open) return

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setActive(true))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [present, open])

  const handleOverlayTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== overlayRef.current || event.propertyName !== 'transform') return
    if (!active) setPresent(false)
  }

  if (!present) return null

  const labelProps = title
    ? { 'aria-labelledby': titleId }
    : { 'aria-label': ariaLabel }

  return (
    <div
      ref={overlayRef}
      className={cn('modal-overlay', active && 'is-open', className)}
      onClick={onClose}
      onTransitionEnd={handleOverlayTransitionEnd}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        {...labelProps}
        className={cn('relative mx-4 w-full max-w-4xl', panelClassName)}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2
            id={titleId}
            className="mb-4 px-4 text-center font-display text-2xl italic"
            style={{ color: 'var(--media-caption-text-color)' }}
          >
            {title}
          </h2>
        )}
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={24} aria-hidden />
        </button>
        {children}
      </div>
    </div>
  )
}
