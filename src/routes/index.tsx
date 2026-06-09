import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { allHomes, allMediaItems } from 'content-collections'

import { Modal } from '@/components/Modal'
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
  const [activeVideo, setActiveVideo] = useState<{
    url: string
    title?: string | null
  } | null>(null)

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
          linkHref: site.aboutHref,
        }}
      />
      <SplitGridSection
        items={splitGridItems}
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
        mediaItems={mediaItems}
        filter={filter}
        onFilterChange={setFilter}
        onOpenVideo={setActiveVideo}
      />
      <QuoteBannerSection
        section={{
          quoteText: site.quoteText,
          quoteAuthor: site.quoteAuthor,
          quoteImage: site.quoteImage,
          quoteImageAlt: site.quoteImageAlt,
          colorScheme: site.quoteBannerColorScheme,
          slideIn: site.quoteBannerSlideIn,
        }}
      />

      <Modal
        open={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title?.trim() || undefined}
        ariaLabel="Video player"
        className="flex-col"
      >
        {activeVideo && (
          <div style={{ aspectRatio: '16/9' }}>
            <iframe
              src={youtubeIframeSrc(activeVideo.url)}
              title={activeVideo.title?.trim() ? `${activeVideo.title} video` : 'Video player'}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
    </div>
  )
}
