import { createFileRoute } from '@tanstack/react-router'
import { allContactPages } from 'content-collections'

import { ContactFormSection } from '@/sections/ContactFormSection'
import { PageHeroSection } from '@/sections/PageHeroSection'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const page = allContactPages[0]

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/contact/page.md">
      <PageHeroSection
        heroEyebrow={page?.heroEyebrow ?? 'Reach Out'}
        heroTitle={page?.heroTitle ?? 'Contact'}
      />
      <ContactFormSection page={page} />
    </div>
  )
}
