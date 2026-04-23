import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { allHomes, allMediaItems } from 'content-collections'
import { X } from 'lucide-react'

import { HeroSection } from '@/sections/HeroSection'
import { ImageTextSection } from '@/sections/ImageTextSection'
import { MediaGridSection } from '@/sections/MediaGridSection'
import { QuoteBannerSection } from '@/sections/QuoteBannerSection'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const site = allHomes[0]
  const mediaItems = [...allMediaItems].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  )
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all')
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

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
        section={{ eyebrow: site.mediaEyebrow, title: site.mediaTitle }}
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
        }}
      />

      {activeVideo && (
        <div
          className="modal-overlay"
          onClick={() => setActiveVideo(null)}
        >
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
                src={`${activeVideo}?autoplay=1`}
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
