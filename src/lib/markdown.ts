import { marked } from 'marked'

marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const titleAttr = title ? ` title="${title}"` : ''
      const isExternal =
        typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'))
      if (isExternal) {
        return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`
      }
      return `<a href="${href}"${titleAttr}>${text}</a>`
    },
  },
})

export function renderMarkdown(content: string): string {
  return String(marked.parse(content))
}
