import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { allHomes, allMediaItems } from 'content-collections'
import { Play, X, ChevronDown } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function netlifyImg(url: string, w: number, h?: number, fit = 'cover') {
  const params = new URLSearchParams({ url, w: String(w), fit })
  if (h) params.set('h', String(h))
  return `/.netlify/images?${params.toString()}`
}

function HomePage() {
  const page = allHomes[0]
  const mediaItems = [...allMediaItems].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  )
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all')
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  if (!page) return null

  const filteredMedia =
    filter === 'all' ? mediaItems : mediaItems.filter((m) => m.type === filter)

  return (
    <div style={{ background: 'var(--obsidian)' }}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-end pb-24 lg:pb-32"
        style={{ minHeight: '100svh' }}
        data-sb-object-id="content/home/data.md"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={netlifyImg(page.heroImage, 1920, 1080)}
            alt={page.heroImageAlt}
            className="w-full h-full object-cover"
            data-sb-field-path="heroImage"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(14,12,11,0.97) 0%, rgba(14,12,11,0.55) 40%, rgba(14,12,11,0.25) 100%)',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p
            className="animate-fade-up text-xs uppercase tracking-[0.35em] mb-6 font-body font-semibold"
            style={{ color: 'var(--gold)' }}
            data-sb-field-path="heroTagline"
          >
            {page.heroTagline}
          </p>

          <h1
            className="animate-fade-up-delay-1 font-display italic leading-none mb-6"
            style={{
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              color: 'var(--ivory)',
              letterSpacing: '-0.02em',
            }}
            data-sb-field-path="heroTitle"
          >
            {page.heroTitle}
          </h1>

          <p
            className="animate-fade-up-delay-2 font-body text-base tracking-[0.2em] uppercase mb-12"
            style={{ color: 'var(--ivory-dim)' }}
            data-sb-field-path="heroSubtitle"
          >
            {page.heroSubtitle}
          </p>

          <div className="animate-fade-up-delay-3 flex flex-wrap gap-6">
            <Link
              to="/productions"
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              style={{
                background: 'var(--gold)',
                color: 'var(--obsidian)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--gold-light)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'var(--gold)')
              }
            >
              View Productions
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold border transition-all duration-300"
              style={{
                borderColor: 'rgba(245, 240, 232, 0.4)',
                color: 'var(--ivory)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)'
                e.currentTarget.style.color = 'var(--gold)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 240, 232, 0.4)'
                e.currentTarget.style.color = 'var(--ivory)'
              }}
            >
              Book a Performance
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
          style={{ color: 'rgba(184, 151, 90, 0.6)' }}
        >
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── ABOUT TEASER — Image + Text ───────────────────────────────────── */}
      <section
        className="py-24 lg:py-36"
        style={{ background: 'var(--obsidian-soft)' }}
        data-sb-object-id="content/home/data.md"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
            {/* Image — 3/5 */}
            <div className="lg:col-span-3 img-zoom relative">
              <div
                className="absolute -top-6 -left-6 w-32 h-32 border"
                style={{ borderColor: 'rgba(184, 151, 90, 0.25)' }}
              />
              <img
                src={netlifyImg(page.aboutImage, 900, 1100)}
                alt={page.aboutImageAlt}
                className="w-full object-cover"
                style={{ maxHeight: '640px', objectPosition: 'top center' }}
                data-sb-field-path="aboutImage"
              />
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 border"
                style={{ borderColor: 'rgba(184, 151, 90, 0.25)' }}
              />
            </div>

            {/* Text — 2/5 */}
            <div className="lg:col-span-2">
              <p
                className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-6"
                style={{ color: 'var(--gold)' }}
              >
                About
              </p>
              <h2
                className="font-display text-4xl lg:text-5xl italic leading-tight mb-8"
                style={{ color: 'var(--ivory)' }}
                data-sb-field-path="aboutTitle"
              >
                {page.aboutTitle}
              </h2>
              <div
                className="w-12 h-px mb-8"
                style={{ background: 'var(--gold)' }}
              />
              <p
                className="font-body text-base leading-relaxed mb-10"
                style={{ color: 'var(--ivory-dim)' }}
                data-sb-field-path="aboutText"
              >
                {page.aboutText}
              </p>
              <Link
                to="/about"
                className="gold-link"
                data-sb-field-path="aboutLinkText"
              >
                {page.aboutLinkText} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEDIA GRID ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36" style={{ background: 'var(--obsidian)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-4"
                style={{ color: 'var(--gold)' }}
              >
                On Stage & On Screen
              </p>
              <h2
                className="font-display text-4xl lg:text-5xl italic"
                style={{ color: 'var(--ivory)' }}
              >
                Media
              </h2>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 p-1" style={{ background: 'var(--charcoal)' }}>
              {(['all', 'video', 'image'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-5 py-2 text-xs uppercase tracking-widest font-body font-semibold transition-all duration-300"
                  style={
                    filter === f
                      ? { background: 'var(--gold)', color: 'var(--obsidian)' }
                      : { color: 'var(--warm-gray)' }
                  }
                >
                  {f === 'all' ? 'All' : f === 'video' ? 'Videos' : 'Photos'}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item._meta.path}
                className="relative img-zoom cursor-pointer group"
                style={{ aspectRatio: '16/10' }}
                data-sb-object-id={`content/media/${item._meta.path}.md`}
                onClick={() => {
                  if (item.type === 'video' && item.videoUrl) {
                    setActiveVideo(item.videoUrl)
                  }
                }}
              >
                <img
                  src={netlifyImg(item.thumbnail, 800, 500)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  data-sb-field-path="thumbnail"
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(14,12,11,0.9) 0%, rgba(14,12,11,0.3) 60%, transparent 100%)',
                  }}
                >
                  {item.type === 'video' && (
                    <div className="play-btn mb-4">
                      <Play
                        size={20}
                        fill="white"
                        style={{ color: 'var(--ivory)', marginLeft: 2 }}
                      />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p
                    className="font-display text-lg italic leading-tight"
                    style={{ color: 'var(--ivory)' }}
                    data-sb-field-path="title"
                  >
                    {item.title}
                  </p>
                  <p
                    className="font-body text-xs mt-1 line-clamp-1"
                    style={{ color: 'var(--ivory-dim)' }}
                    data-sb-field-path="description"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE — Image + Text (reversed) ────────────────────────────── */}
      <section
        className="py-24 lg:py-36"
        style={{ background: 'var(--obsidian-soft)' }}
        data-sb-object-id="content/home/data.md"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
            {/* Text — 2/5 */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <p
                className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-6"
                style={{ color: 'var(--gold)' }}
              >
                Pedagogy & Teaching
              </p>
              <h2
                className="font-display text-4xl lg:text-5xl italic leading-tight mb-8"
                style={{ color: 'var(--ivory)' }}
                data-sb-field-path="featureTitle"
              >
                {page.featureTitle}
              </h2>
              <div
                className="w-12 h-px mb-8"
                style={{ background: 'var(--gold)' }}
              />
              <p
                className="font-body text-base leading-relaxed mb-10"
                style={{ color: 'var(--ivory-dim)' }}
                data-sb-field-path="featureText"
              >
                {page.featureText}
              </p>
              <Link to="/contact" className="gold-link">
                Enquire About Lessons →
              </Link>
            </div>

            {/* Image — 3/5 */}
            <div className="lg:col-span-3 img-zoom order-1 lg:order-2 relative">
              <div
                className="absolute -top-6 -right-6 w-32 h-32 border"
                style={{ borderColor: 'rgba(184, 151, 90, 0.25)' }}
              />
              <img
                src={netlifyImg(page.featureImage, 900, 1100)}
                alt={page.featureImageAlt}
                className="w-full object-cover"
                style={{ maxHeight: '640px', objectPosition: 'top center' }}
                data-sb-field-path="featureImage"
              />
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 border"
                style={{ borderColor: 'rgba(184, 151, 90, 0.25)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE / FULL-WIDTH BANNER ─────────────────────────────────────── */}
      <section
        className="relative py-36 lg:py-48 flex items-center justify-center text-center overflow-hidden"
        data-sb-object-id="content/home/data.md"
      >
        <div className="absolute inset-0">
          <img
            src={netlifyImg(page.quoteImage, 1920, 900)}
            alt="Performance backdrop"
            className="w-full h-full object-cover"
            data-sb-field-path="quoteImage"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(14, 12, 11, 0.82)' }}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12">
          <div
            className="font-display text-5xl lg:text-6xl mb-8"
            style={{ color: 'var(--gold)', opacity: 0.6 }}
          >
            "
          </div>
          <blockquote
            className="font-display italic text-2xl lg:text-4xl leading-relaxed mb-8"
            style={{ color: 'var(--ivory)' }}
            data-sb-field-path="quoteText"
          >
            {page.quoteText}
          </blockquote>
          <cite
            className="font-body text-sm uppercase tracking-widest not-italic"
            style={{ color: 'var(--gold)' }}
            data-sb-field-path="quoteAuthor"
          >
            {page.quoteAuthor}
          </cite>
        </div>
      </section>

      {/* Video Modal */}
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
              className="absolute -top-12 right-0 p-2 transition-opacity hover:opacity-70"
              style={{ color: 'var(--ivory)' }}
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
