import { useRef, type ReactNode } from 'react'
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
  const { titleId } = useModalA11y({
    open,
    onClose,
    dialogRef,
    initialFocusRef: closeRef,
  })

  if (!open) return null

  const labelProps = title
    ? { 'aria-labelledby': titleId }
    : { 'aria-label': ariaLabel }

  return (
    <div className={cn('modal-overlay', className)} onClick={onClose}>
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
          className="absolute -top-12 right-0 p-2 transition-opacity hover:opacity-70"
          style={{ color: 'var(--media-caption-text-color)' }}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={28} aria-hidden />
        </button>
        {children}
      </div>
    </div>
  )
}
