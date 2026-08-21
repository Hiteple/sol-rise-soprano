import { createFileRoute } from '@tanstack/react-router'

import { useLocale } from '@/components/LocaleContext'
import { homeLastEvents } from '@/lib/home-last-events'
import { resolveFeaturedPerformanceVideo } from '@/lib/featured-performance-video'
import { getAllScheduleEvents, getAllOrganizations, getHomePage, getOrganization } from '@/lib/i18n/content'
import { DEFAULT_LOCALE, localizePath } from '@/lib/i18n'
import { heroImagePreloadLink } from '@/lib/netlify-image'
import { DEFAULT_DESCRIPTION, SITE_NAME, personJsonLd, pageHead, seoLocaleFromParams } from '@/lib/seo'
import { HeroSection } from '@/sections/HeroSection'
import { ImageTextSection } from '@/sections/ImageTextSection'
import { MediaGridSection } from '@/sections/MediaGridSection'
import { QuoteBannerSection } from '@/sections/QuoteBannerSection'
import { OrganizationsStripSection } from '@/sections/OrganizationsStripSection'
import { FeaturedEventsSection } from '@/sections/FeaturedEventsSection'
import { FeaturedVideoSection } from '@/sections/FeaturedVideoSection'
export const Route = createFileRoute('/{-$locale}/')({
  head: ({ params }) => {
    const seo = pageHead({
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      path: '/',
      locale: seoLocaleFromParams(params),
    })
    const heroImage = getHomePage(DEFAULT_LOCALE)?.heroImage
    const heroPreload = heroImage ? heroImagePreloadLink(heroImage) : null

    return {
      ...seo,
      links: [...(heroPreload ? [heroPreload] : []), ...seo.links],
      scripts: [personJsonLd()],
    }
  },
  component: HomePage,
})

function normalizeOrganizationSlug(slug: string): string {
  return slug.replace(/^content\/organizations\//, '').replace(/\.md$/, '')
}

function HomePage() {
  const { locale } = useLocale()
  const site = getHomePage(locale)
  const scheduleEvents = getAllScheduleEvents(locale)
  const lastEvents = homeLastEvents(scheduleEvents)
  const featuredVideo = resolveFeaturedPerformanceVideo(
    site?.featuredVideoScheduleSlug,
    scheduleEvents,
    locale,
  )
  const stripSlugs = site?.organizationsStripItems?.map(normalizeOrganizationSlug) ?? []
  const organizationsStripItems =
    stripSlugs.length > 0
      ? stripSlugs
          .map((slug) => getOrganization(slug, locale))
          .filter((org): org is NonNullable<ReturnType<typeof getOrganization>> => Boolean(org))
      : getAllOrganizations(locale).slice(0, 4)
  const splitGridItems = (site?.splitGridItems ?? []).map((item) => ({
    ...item,
    href: localizePath(item.href, locale),
  }))
  if (!site) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/home/data.md">
      <HeroSection
        section={{
          heroTitle: site.heroTitle,
          heroSubtitle: site.heroSubtitle,
          heroTagline: site.heroTagline,
          heroImage: site.heroImage,
          heroImageAlt: site.heroImageAlt,
          primaryCtaLabel: site.primaryCtaLabel,
          primaryCtaHref: site.primaryCtaHref,
          secondaryCtaLabel: site.secondaryCtaLabel,
          secondaryCtaHref: site.secondaryCtaHref,
          colorScheme: site.heroColorScheme,
        }}
      />
      <ImageTextSection
        section={{
          surface: site.aboutSurface,
          slideIn: site.aboutSlideIn,
          eyebrow: site.aboutEyebrow,
          title: site.aboutTitle,
          text: site.aboutText,
          image: site.aboutImage,
          imageAlt: site.aboutImageAlt,
          linkText: site.aboutLinkText,
          linkHref: site.aboutHref ? localizePath(site.aboutHref, locale) : undefined,
        }}
      />
      {site.organizationsStripTitle && organizationsStripItems.length > 0 && (
        <OrganizationsStripSection
          eyebrow={site.organizationsStripEyebrow ?? 'Collaborations'}
          title={site.organizationsStripTitle}
          description={site.organizationsStripDescription}
          linkText={site.organizationsStripLinkText}
          organizations={organizationsStripItems}
          colorScheme={site.organizationsStripColorScheme}
          slideIn={site.organizationsStripSlideIn}
        />
      )}
      {featuredVideo && site.featuredVideoEnabled && site.featuredVideoTitle?.trim() && (
        <FeaturedVideoSection
          video={featuredVideo}
          section={{
            eyebrow: site.featuredVideoEyebrow,
            title: site.featuredVideoTitle,
            description: site.featuredVideoDescription,
            linkText: site.featuredVideoLinkText,
            colorScheme: site.featuredVideoColorScheme,
            slideIn: site.featuredVideoSlideIn,
          }}
        />
      )}
      <FeaturedEventsSection
        items={splitGridItems}
        layout={site.featuredEventsLayout}
        colorScheme={site.splitGridColorScheme}
        slideIn={site.splitGridSlideIn}
        title={site.splitGridTitle}
        description={site.splitGridDescription}
      />
      <MediaGridSection
        section={{
          eyebrow: site.mediaEyebrow,
          title: site.mediaTitle,
          colorScheme: site.mediaGridColorScheme,
          slideIn: site.mediaGridSlideIn,
        }}
        events={lastEvents}
        linkText={site.mediaLinkText}
      />
      <QuoteBannerSection
        section={{
          quoteText: site.quoteText,
          quoteAuthor: site.quoteAuthor,
          quoteImage: site.quoteImage,
          quoteImageAlt: site.quoteImageAlt,
          quoteImageCredit: site.quoteImageCredit,
          colorScheme: site.quoteBannerColorScheme,
          slideIn: site.quoteBannerSlideIn,
        }}
      />
    </div>
  )
}
