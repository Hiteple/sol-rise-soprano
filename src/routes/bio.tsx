import { createFileRoute } from '@tanstack/react-router'
import { allAboutPages } from 'content-collections'

import { RichtextContentSection } from '@/sections/RichtextContentSection'

export const Route = createFileRoute('/bio')({
  component: BioPage,
})

function BioPage() {
  const page = allAboutPages[0]
  if (!page) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/about/page.md">
      <RichtextContentSection page={page} />
    </div>
  )
}
