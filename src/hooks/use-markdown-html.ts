import { useEffect, useState } from 'react'

import { renderMarkdown } from '@/lib/markdown'

/** Client-side markdown HTML — loads `marked` on first use. */
export function useMarkdownHtml(content: string | undefined): string {
  const trimmed = content?.trim() ?? ''
  const [html, setHtml] = useState('')

  useEffect(() => {
    if (!trimmed) {
      setHtml('')
      return
    }

    let cancelled = false
    void renderMarkdown(trimmed).then((result) => {
      if (!cancelled) setHtml(result)
    })

    return () => {
      cancelled = true
    }
  }, [trimmed])

  return html
}
