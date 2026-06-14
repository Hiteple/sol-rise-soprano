import { createFileRoute, Navigate } from '@tanstack/react-router'

import { SITE_NAME, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead({
      title: 'About',
      description: `Redirect to ${SITE_NAME} career page.`,
      path: '/about',
      noindex: true,
    }),
  component: AboutRedirect,
})

function AboutRedirect() {
  return <Navigate to="/career" replace />
}
