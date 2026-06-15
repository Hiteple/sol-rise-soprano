import { createFileRoute } from '@tanstack/react-router'

import { useLocale } from '@/components/LocaleContext'
import { getAllRoles, getRolesPage } from '@/lib/i18n/content'
import { publishedContentSorted } from '@/lib/content-order'
import { pageHead, seoLocaleFromParams } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { RolesIndexSection } from '@/sections/RolesIndexSection'

export const Route = createFileRoute('/{-$locale}/roles/')({
  head: ({ params }) =>
    pageHead({
      title: 'Roles',
      description:
        'Operatic roles performed by Sol Risé Soprano — character, production history, photography and video from the stage.',
      path: '/roles',
      locale: seoLocaleFromParams(params),
    }),
  component: RolesPage,
})

function RolesPage() {
  const { locale } = useLocale()
  const landing = getRolesPage(locale)
  const roles = publishedContentSorted(getAllRoles(locale))

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/roles-landing/page.md"
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme}
        heroEyebrow={landing?.heroEyebrow ?? 'Repertoire'}
        heroTitle={landing?.heroTitle ?? 'Roles'}
        heroDescription={
          landing?.heroDescription ??
          'Operatic characters Sol Risé has brought to the stage — with performance history and photography.'
        }
      />
      <RolesIndexSection
        roles={roles}
        listColorScheme={landing?.rolesListColorScheme}
        slideIn={landing?.rolesListSlideIn}
      />
    </div>
  )
}
