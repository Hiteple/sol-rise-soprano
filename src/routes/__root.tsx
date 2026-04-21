import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { allHomes } from 'content-collections'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Isabella Cavalcanti — Soprano' },
      {
        name: 'description',
        content:
          'Official website of Isabella Cavalcanti, internationally acclaimed soprano and stage artist.',
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
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const homePage = allHomes[0]
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        <Nav />
        <main>{children}</main>
        <Footer
          instagramUrl={homePage?.instagramUrl}
          youtubeUrl={homePage?.youtubeUrl}
          facebookUrl={homePage?.facebookUrl}
          email={homePage?.email}
        />
        <Scripts />
      </body>
    </html>
  )
}
