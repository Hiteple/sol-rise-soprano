import { createFileRoute } from '@tanstack/react-router'

import { useLocale } from '@/components/LocaleContext'
import { getContactPage } from '@/lib/i18n/content'
import { SITE_NAME, pageHead, seoLocaleFromParams } from '@/lib/seo'
import { ContactFormSection } from '@/sections/ContactFormSection'
import { PageHeroSection } from '@/sections/PageHeroSection'

export const Route = createFileRoute('/{-$locale}/contact')({
  head: ({ params }) =>
    pageHead({
      title: 'Contact',
      description:
        `Contact ${SITE_NAME} for artistic engagements, voice lessons and collaborations — email, Instagram, YouTube and Muvac.`,
      path: '/contact',
      locale: seoLocaleFromParams(params),
    }),
  component: ContactPage,
})

function ContactPage() {
  const { locale } = useLocale()
  const page = getContactPage(locale)

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
