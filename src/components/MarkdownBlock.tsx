import type { CSSProperties } from 'react'

import { useMarkdownHtml } from '@/hooks/use-markdown-html'

type MarkdownBlockProps = {
  content: string
  className?: string
  style?: CSSProperties
  'data-sb-field-path'?: string
}

export function MarkdownBlock({
  content,
  className,
  style,
  'data-sb-field-path': fieldPath,
}: MarkdownBlockProps) {
  const html = useMarkdownHtml(content)
  if (!html) return null

  return (
    <div
      className={className}
      style={style}
      data-sb-field-path={fieldPath}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
