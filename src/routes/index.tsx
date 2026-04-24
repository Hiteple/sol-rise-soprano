import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { allHomes, allMediaItems } from 'content-collections'
import { X } from 'lucide-react'

import { youtubeIframeSrc } from '@/lib/utils'
import { HeroSection } from '@/sections/HeroSection'
import { ImageTextSection } from '@/sections/ImageTextSection'
import { MediaGridSection } from '@/sections/MediaGridSection'
import { QuoteBannerSection } from '@/sections/QuoteBannerSection'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function normalizeRef(value: string): string {
  return value.replace(/^\/+/, '').replace(/^content\/media\//, '').replace(/\.md$/, '')
}

function HomePage() {
  const site = allHomes[0]
  const mediaByPath = new Map(allMediaItems.map((item) => [item._meta.path, item]))
  const selectedMediaItems =
    site?.mediaItems
      ?.map((ref) => mediaByPath.get(normalizeRef(ref)))
      .filter((item): item is (typeof allMediaItems)[number] => Boolean(item)) ?? []
  const mediaItems =
    selectedMediaItems.length > 0
      ? selectedMediaItems
      : [...allMediaItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all')
  const [activeVideo, setActiveVideo] = useState<{ url: string; title?: string | null } | null>(
    null,
  )

  useEffect(() => {
    if (!activeVideo) return

    const scrollY = window.scrollY
    const original = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = original.overflow
      document.body.style.position = original.position
      document.body.style.top = original.top
      document.body.style.width = original.width
      window.scrollTo(0, scrollY)
    }
  }, [activeVideo])

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
        variant="about"
        section={{
          surface: site.aboutSurface,
          eyebrow: site.aboutEyebrow,
          title: site.aboutTitle,
          text: site.aboutText,
          image: site.aboutImage,
          imageAlt: site.aboutImageAlt,
          linkText: site.aboutLinkText,
          linkHref: site.aboutHref,
        }}
      />
      <MediaGridSection
        section={{
          eyebrow: site.mediaEyebrow,
          title: site.mediaTitle,
          colorScheme: site.mediaGridColorScheme,
        }}
        mediaItems={mediaItems}
        filter={filter}
        onFilterChange={setFilter}
        onOpenVideo={setActiveVideo}
      />
      <ImageTextSection
        variant="feature"
        section={{
          surface: site.featureSurface,
          eyebrow: site.featureEyebrow,
          title: site.featureTitle,
          text: site.featureText,
          image: site.featureImage,
          imageAlt: site.featureImageAlt,
          linkText: site.featureCtaLabel,
          linkHref: site.featureCtaHref,
        }}
      />
      <QuoteBannerSection
        section={{
          quoteText: site.quoteText,
          quoteAuthor: site.quoteAuthor,
          quoteImage: site.quoteImage,
          quoteImageAlt: site.quoteImageAlt,
          colorScheme: site.quoteBannerColorScheme,
        }}
      />

      {activeVideo && (
        <div
          className="modal-overlay flex-col"
          onClick={() => setActiveVideo(null)}
        >
          {activeVideo.title?.trim() && (
            <h3
              className="mb-4 px-4 text-center font-display text-2xl italic"
              style={{ color: 'var(--media-caption-text-color)' }}
            >
              {activeVideo.title.trim()}
            </h3>
          )}
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-12 right-0 p-2 transition-opacity hover:opacity-70"
              style={{ color: 'var(--media-caption-text-color)' }}
              onClick={() => setActiveVideo(null)}
            >
              <X size={28} />
            </button>
            <div style={{ aspectRatio: '16/9' }}>
              <iframe
                src={youtubeIframeSrc(activeVideo.url)}
                title="Video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
