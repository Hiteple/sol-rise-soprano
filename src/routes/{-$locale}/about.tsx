import { createFileRoute, Navigate } from '@tanstack/react-router'

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
  return <Navigate to="/career" replace />
}
