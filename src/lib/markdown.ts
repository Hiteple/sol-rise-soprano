type MarkedParser = {
  parse: (content: string) => string | Promise<string>
}

let markedReady: Promise<MarkedParser> | null = null

function loadMarked(): Promise<MarkedParser> {
  if (!markedReady) {
    markedReady = import('marked').then(({ marked }) => {
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
      return marked
    })
  }
  return markedReady
}

/** Lazy-loaded markdown → HTML (keeps `marked` out of the main client bundle). */
export async function renderMarkdown(content: string): Promise<string> {
  const marked = await loadMarked()
  return String(await marked.parse(content))
}
