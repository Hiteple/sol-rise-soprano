export type TabGridEmptyStateProps = {
  title: string
  description: string
  headingColor?: string
  bodyColor?: string
}

export function TabGridEmptyState({
  title,
  description,
  headingColor = 'var(--heading-color)',
  bodyColor = 'var(--subtle-text-color)',
}: TabGridEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-16 lg:py-20 px-4"
      role="status"
      aria-live="polite"
    >
      <p
        className="font-display text-xl lg:text-2xl italic mb-3"
        style={{ color: headingColor }}
      >
        {title}
      </p>
      <p
        className="font-body text-sm lg:text-base max-w-md leading-relaxed"
        style={{ color: bodyColor }}
      >
        {description}
      </p>
    </div>
  )
}
