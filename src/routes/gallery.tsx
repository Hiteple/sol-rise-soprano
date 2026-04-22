import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { allGalleries, allGalleryPages } from 'content-collections'
import { X } from 'lucide-react'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

function netlifyImg(url: string, w: number, h?: number, fit = 'cover') {
  const params = new URLSearchParams({ url, w: String(w), fit })
  if (h) params.set('h', String(h))
  return `/.netlify/images?${params.toString()}`
}

function GalleryPage() {
  const landing = allGalleryPages[0]
  const categories =
    landing?.filterCategories?.length ? landing.filterCategories : ['All', 'Performance', 'Behind the Scenes']

  const items = [...allGalleries].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? 'All')
  const [lightboxImg, setLightboxImg] = useState<{
    src: string
    alt: string
  } | null>(null)

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.category === activeCategory)

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/gallery-landing/page.md"
    >
      <section
        className="pt-40 pb-16 lg:pt-52 lg:pb-20"
        style={{ background: 'var(--section-background-color)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p
            className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
            style={{ color: 'var(--accent-color)' }}
            data-sb-field-path="heroEyebrow"
          >
            {landing?.heroEyebrow ?? 'Photography'}
          </p>
          <h1
            className="font-display italic leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--heading-color)' }}
            data-sb-field-path="heroTitle"
          >
            {landing?.heroTitle ?? 'Gallery'}
          </h1>
        </div>
      </section>

      <section className="py-10" style={{ background: 'var(--page-background-color)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            className="flex gap-1 p-1 w-fit"
            style={{ background: 'var(--pill-track-background-color)' }}
          >
            {categories.map((cat, i) => (
              <button
                key={`${cat}-${i}`}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2 text-xs uppercase tracking-widest font-body font-semibold transition-all duration-300"
                style={
                  activeCategory === cat
                    ? { background: 'var(--accent-color)', color: 'var(--on-accent-text-color)' }
                    : { color: 'var(--subtle-text-color)' }
                }
                data-sb-field-path={`filterCategories.${i}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, idx) => {
              const isLarge = idx % 5 === 0
              return (
                <div
                  key={item._meta.path}
                  className={`group img-zoom cursor-pointer relative ${
                    isLarge ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                  style={{ aspectRatio: isLarge ? '16/9' : '4/5' }}
                  data-sb-object-id={`content/gallery/${item._meta.path}.md`}
                  onClick={() =>
                    setLightboxImg({
                      src: item.image,
                      alt: item.alt,
                    })
                  }
                >
                  <img
                    src={netlifyImg(
                      item.image,
                      isLarge ? 1200 : 600,
                      isLarge ? 675 : 750,
                    )}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    data-sb-field-path="image"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(to top, color-mix(in srgb, var(--palette-wine) 78%, transparent) 0%, transparent 60%)',
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p
                      className="font-display italic text-base"
                      style={{ color: 'var(--media-caption-text-color)' }}
                      data-sb-field-path="title"
                    >
                      {item.title}
                    </p>
                    {item.category && (
                      <p
                        className="font-body text-xs uppercase tracking-widest mt-1"
                        style={{ color: 'var(--accent-color)' }}
                      >
                        {item.category}
                      </p>
                    )}
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                    style={{
                      background:
                        'linear-gradient(to top, color-mix(in srgb, var(--palette-wine) 78%, transparent) 0%, transparent 60%)',
                    }}
                  >
                    <div>
                      <p
                        className="font-display italic text-base"
                        style={{ color: 'var(--media-caption-text-color)' }}
                      >
                        {item.title}
                      </p>
                      {item.category && (
                        <p
                          className="font-body text-xs uppercase tracking-widest mt-1"
                          style={{ color: 'var(--accent-color)' }}
                        >
                          {item.category}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {lightboxImg && (
        <div className="modal-overlay" onClick={() => setLightboxImg(null)}>
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-12 right-0 p-2 transition-opacity hover:opacity-70"
              style={{ color: 'var(--media-caption-text-color)' }}
              onClick={() => setLightboxImg(null)}
            >
              <X size={28} />
            </button>
            <img
              src={netlifyImg(lightboxImg.src, 1400, 900, 'contain')}
              alt={lightboxImg.alt}
              className="w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
