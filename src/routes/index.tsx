import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { allHomes, allMediaItems } from 'content-collections'
import { X } from 'lucide-react'

import { youtubeIframeSrc } from '@/lib/utils'
import { HeroSection } from '@/sections/HeroSection'
import { ImageTextSection } from '@/sections/ImageTextSection'
import { MediaGridSection } from '@/sections/MediaGridSection'
import { QuoteBannerSection } from '@/sections/QuoteBannerSection'
import { SplitGridSection } from '@/sections/SplitGridSection'

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
  const splitGridItems = site?.splitGridItems ?? [
    {
      title: 'Book a Performance',
      href: '/contact',
      image: 'https://picsum.photos/seed/split-performance/1200/1200',
      decorativeEyebrow: '',
      subtitle: '',
    },
    {
      title: 'Artistic Collaborations',
      href: '/contact',
      image: 'https://picsum.photos/seed/split-collab/1200/1200',
      decorativeEyebrow: '',
      subtitle: '',
    },
    {
      title: 'Masterclasses & Lessons',
      href: '/contact',
      image: 'https://picsum.photos/seed/split-lessons/1200/1200',
      decorativeEyebrow: '',
      subtitle: '',
    },
  ]
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all')
  const [activeMedia, setActiveMedia] = useState<{
    kind: 'video' | 'image'
    url: string
    title?: string | null
  } | null>(null)

  useEffect(() => {
    if (!activeMedia) return

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
  }, [activeMedia])

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
        onOpenMedia={setActiveMedia}
      />
      <SplitGridSection
        items={splitGridItems}
        colorScheme={site.splitGridColorScheme}
        title={site.splitGridTitle}
        description={site.splitGridDescription}
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

      {activeMedia && (
        <div
          className="modal-overlay flex-col"
          onClick={() => setActiveMedia(null)}
        >
          {activeMedia.title?.trim() && (
            <h3
              className="mb-4 px-4 text-center font-display text-2xl italic"
              style={{ color: 'var(--media-caption-text-color)' }}
            >
              {activeMedia.title.trim()}
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
              onClick={() => setActiveMedia(null)}
            >
              <X size={28} />
            </button>
            {activeMedia.kind === 'video' ? (
              <div style={{ aspectRatio: '16/9' }}>
                <iframe
                  src={youtubeIframeSrc(activeMedia.url)}
                  title="Video player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={activeMedia.url}
                alt={activeMedia.title ?? 'Media image'}
                className="h-[82vh] w-full object-cover"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
