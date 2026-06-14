import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { NotFoundSection } from '@/components/NotFoundSection'
import { SkipLink } from '@/components/SkipLink'
import { DEFAULT_DESCRIPTION, SITE_NAME, googleSiteVerificationMeta } from '@/lib/seo'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: SITE_NAME },
      { name: 'description', content: DEFAULT_DESCRIPTION },
      ...googleSiteVerificationMeta(),
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/images/sol-rise-soprano-logo.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Nunito+Sans:wght@300;400;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        <SkipLink />
        <Nav />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundPage() {
  return (
    <NotFoundSection
      eyebrow="Lost in the wings"
      title="Page not found"
      description="The page you are looking for does not exist, may have moved, or is not yet published."
      backHref="/"
      backLabel="Return home"
      homeLabel="Return home"
    />
  )
}
