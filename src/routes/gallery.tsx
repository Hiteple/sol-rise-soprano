import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { allGalleries } from 'content-collections'
import { X } from 'lucide-react'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

function netlifyImg(url: string, w: number, h?: number, fit = 'cover') {
  const params = new URLSearchParams({ url, w: String(w), fit })
  if (h) params.set('h', String(h))
  return `/.netlify/images?${params.toString()}`
}

const categories = ['All', 'Performance', 'Behind the Scenes']

function GalleryPage() {
  const items = [...allGalleries].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxImg, setLightboxImg] = useState<{
    src: string
    alt: string
  } | null>(null)

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.category === activeCategory)

  return (
    <div style={{ background: 'var(--obsidian)' }}>
      {/* Page Header */}
      <section
        className="pt-40 pb-16 lg:pt-52 lg:pb-20"
        style={{ background: 'var(--obsidian-soft)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p
            className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
            style={{ color: 'var(--gold)' }}
          >
            Photography
          </p>
          <h1
            className="font-display italic leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--ivory)' }}
          >
            Gallery
          </h1>
        </div>
      </section>

      {/* Filter */}
      <section className="py-10" style={{ background: 'var(--obsidian)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-1 p-1 w-fit" style={{ background: 'var(--charcoal)' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2 text-xs uppercase tracking-widest font-body font-semibold transition-all duration-300"
                style={
                  activeCategory === cat
                    ? { background: 'var(--gold)', color: 'var(--obsidian)' }
                    : { color: 'var(--warm-gray)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-style Grid */}
      <section className="pb-24 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, idx) => {
              const isLarge = idx % 5 === 0
              return (
                <div
                  key={item._meta.path}
                  className={`img-zoom cursor-pointer relative ${
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
                        'linear-gradient(to top, rgba(14,12,11,0.85) 0%, transparent 60%)',
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p
                      className="font-display italic text-base"
                      style={{ color: 'var(--ivory)' }}
                      data-sb-field-path="title"
                    >
                      {item.title}
                    </p>
                    {item.category && (
                      <p
                        className="font-body text-xs uppercase tracking-widest mt-1"
                        style={{ color: 'var(--gold)' }}
                      >
                        {item.category}
                      </p>
                    )}
                  </div>
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(14,12,11,0.85) 0%, transparent 60%)',
                    }}
                  >
                    <div>
                      <p
                        className="font-display italic text-base"
                        style={{ color: 'var(--ivory)' }}
                      >
                        {item.title}
                      </p>
                      {item.category && (
                        <p
                          className="font-body text-xs uppercase tracking-widest mt-1"
                          style={{ color: 'var(--gold)' }}
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

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="modal-overlay"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 p-2 transition-opacity hover:opacity-70"
              style={{ color: 'var(--ivory)' }}
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
