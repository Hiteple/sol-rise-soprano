import { skipToContent } from '@/lib/skip-to-content'

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(event) => {
        event.preventDefault()
        skipToContent()
      }}
    >
      Skip to main content
    </a>
  )
}
