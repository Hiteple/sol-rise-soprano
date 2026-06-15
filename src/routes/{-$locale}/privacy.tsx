import { createFileRoute } from '@tanstack/react-router'

import { useLocale } from '@/components/LocaleContext'
import { getPrivacyPage } from '@/lib/i18n/content'
import { pageHead, seoLocaleFromParams } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { PrivacyContentSection } from '@/sections/PrivacyContentSection'

export const Route = createFileRoute('/{-$locale}/privacy')({
  head: ({ params }) => {
    const locale = seoLocaleFromParams(params)
    const titles: Record<string, string> = {
      en: 'Privacy Policy',
      es: 'Política de privacidad',
      de: 'Datenschutzerklärung',
      it: 'Informativa sulla privacy',
    }
    const descriptions: Record<string, string> = {
      en: 'How Sol Risé Soprano handles personal data on this website — contact form, language preferences, hosting and embedded media.',
      es: 'Cómo Sol Risé Soprano trata los datos personales en este sitio — formulario de contacto, preferencias de idioma, hosting y medios incrustados.',
      de: 'Wie Sol Risé Soprano mit personenbezogenen Daten auf dieser Website umgeht — Kontaktformular, Spracheinstellungen, Hosting und eingebettete Medien.',
      it: 'Come Sol Risé Soprano tratta i dati personali su questo sito — modulo di contatto, preferenze lingua, hosting e contenuti incorporati.',
    }
    return pageHead({
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      path: '/privacy',
      locale,
    })
  },
  component: PrivacyPage,
})

function PrivacyPage() {
  const { locale, messages } = useLocale()
  const page = getPrivacyPage(locale)
  if (!page) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/privacy/page.md">
      <PageHeroSection
        colorScheme={page.pageHeroColorScheme}
        heroEyebrow={page.heroEyebrow}
        heroTitle={page.heroTitle}
        heroDescription={page.heroDescription}
      />
      <PrivacyContentSection page={page} lastUpdatedLabel={messages.privacy.lastUpdated} />
    </div>
  )
}
