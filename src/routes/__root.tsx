import { useEffect } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Footer } from '@/components/Footer'
import { LanguageSuggestBanner } from '@/components/LanguageSuggestBanner'
import { LocaleProvider, useLocaleFromPathname } from '@/components/LocaleContext'
import { Nav } from '@/components/Nav'
import { NotFoundSection } from '@/components/NotFoundSection'
import { SkipLink } from '@/components/SkipLink'
import { DEFAULT_DESCRIPTION, SITE_NAME, googleSiteVerificationMeta } from '@/lib/seo'
import { DEFAULT_LOCALE, getSavedLocale, getUiMessages } from '@/lib/i18n'
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
      { rel: 'icon', type: 'image/png', href: '/images/sol-rise-soprano-favicon-optimized.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600&display=swap',
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
        <AppShell>{children}</AppShell>
        <Scripts />
      </body>
    </html>
  )
}

function AppShell({ children }: { children: React.ReactNode }) {
  const locale = useLocaleFromPathname()

  useEffect(() => {
    const path = window.location.pathname
    if (path !== '/') return
    const saved = getSavedLocale()
    if (saved && saved !== DEFAULT_LOCALE) {
      window.location.replace(`/${saved}`)
    }
  }, [])

  return (
    <LocaleProvider locale={locale}>
      <SkipLink />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <LanguageSuggestBanner />
    </LocaleProvider>
  )
}

function NotFoundPage() {
  const locale = useLocaleFromPathname()
  const messages = getUiMessages(locale)

  return (
    <NotFoundSection
      eyebrow={messages.notFound.eyebrow}
      title={messages.notFound.title}
      description={messages.notFound.description}
      backHref={locale === DEFAULT_LOCALE ? '/' : `/${locale}`}
      backLabel={messages.notFound.backLabel}
      homeLabel={messages.notFound.backLabel}
    />
  )
}
