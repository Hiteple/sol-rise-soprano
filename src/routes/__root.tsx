import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sol Risé — Soprano' },
      {
        name: 'description',
        content:
          'Official website of Sol Risé.',
      },
    ],
    links: [
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
        <Nav />
        <main>{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl italic mb-4">Page not found</h1>
        <p className="font-body mb-6" style={{ color: 'var(--muted-text-color)' }}>
          The page you are trying to open does not exist.
        </p>
        <Link to="/" className="gold-link">
          Return home
        </Link>
      </div>
    </div>
  )
}
