import { createFileRoute, Navigate } from '@tanstack/react-router'

import { useLocale } from '@/components/LocaleContext'
import { localizePath } from '@/lib/i18n'
import { SITE_NAME, pageHead, seoLocaleFromParams } from '@/lib/seo'

export const Route = createFileRoute('/{-$locale}/about')({
  head: ({ params }) =>
    pageHead({
      title: 'About',
      description: `Redirect to ${SITE_NAME} career page.`,
      path: '/about',
      noindex: true,
      locale: seoLocaleFromParams(params),
    }),
  component: AboutRedirect,
})

function AboutRedirect() {
  const { locale } = useLocale()

  return <Navigate to={localizePath('/career', locale)} replace />
}
