import { createFileRoute } from '@tanstack/react-router'
import { allBioPages } from 'content-collections'

import { RichtextContentSection } from '@/sections/RichtextContentSection'

export const Route = createFileRoute('/bio')({
  component: BioPage,
})

function BioPage() {
  const page = allBioPages[0]
  if (!page) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/bio/page.md">
      <RichtextContentSection page={page} />
    </div>
  )
}
