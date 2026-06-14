import { createFileRoute } from '@tanstack/react-router'
import { allContactPages } from 'content-collections'

import { SITE_NAME, pageHead } from '@/lib/seo'
import { ContactFormSection } from '@/sections/ContactFormSection'
import { PageHeroSection } from '@/sections/PageHeroSection'

export const Route = createFileRoute('/contact')({
  head: () =>
    pageHead({
      title: 'Contact',
      description:
        `Contact ${SITE_NAME} for artistic engagements, voice lessons and collaborations — email, Instagram, YouTube and Muvac.`,
      path: '/contact',
    }),
  component: ContactPage,
})

function ContactPage() {
  const page = allContactPages[0]

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/contact/page.md">
      <PageHeroSection
        colorScheme={page?.pageHeroColorScheme}
        heroEyebrow={page?.heroEyebrow ?? 'Reach Out'}
        heroTitle={page?.heroTitle ?? 'Contact'}
      />
      <ContactFormSection page={page} />
    </div>
  )
}
