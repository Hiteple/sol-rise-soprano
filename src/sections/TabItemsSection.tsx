import { useState } from 'react'

import { Modal } from '@/components/Modal'
import { netlifyImg } from '@/lib/netlify-image'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { SectionColorScheme } from '../../schemas/color-scheme'

export type GalleryGridItem = {
  _meta: { path: string }
  title: string
  image: string
  alt: string
  category?: string
}

export type TabItemsSectionProps = {
  categories: string[]
  items: GalleryGridItem[]
  tabItemsColorScheme?: SectionColorScheme
  slideIn?: boolean
}

export function TabItemsSection({ categories, items, tabItemsColorScheme, slideIn }: TabItemsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? 'All')
  const [lightboxImg, setLightboxImg] = useState<{
    src: string
    alt: string
  } | null>(null)

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.category === activeCategory)

  const scheme = resolveColorScheme(tabItemsColorScheme)
  const fg = schemeForeground(scheme)
  const animate = slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <>
      <section
        className="py-10"
        style={{ background: schemePageBandBackground(scheme) }}
        data-sb-field-path="tabItemsColorScheme"
      >
        <div className="max-w-site mx-auto px-6 lg:px-12">
          <div
            className="flex gap-1 p-1 w-fit rounded-[var(--media-radius)]"
            style={{ background: 'var(--pill-track-background-color)' }}
            role="group"
            aria-label="Filter gallery by category"
          >
            {categories.map((cat, i) => (
              <button
                key={`${cat}-${i}`}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className="px-6 py-2 text-xs uppercase tracking-widest font-body font-semibold transition-all duration-300 rounded-[var(--media-radius-inner)]"
                style={
                  activeCategory === cat
                    ? { background: 'var(--accent-color)', color: 'var(--on-accent-text-color)' }
                    : { color: scheme === 'wine' ? fg.body : 'var(--subtle-text-color)' }
                }
                data-sb-field-path={`filterCategories.${i}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        className="pb-24 lg:pb-36"
        style={{ background: schemePageBandBackground(scheme) }}
      >
        <div
          ref={ref}
          className={`max-w-site mx-auto px-6 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, idx) => {
              const isLarge = idx % 5 === 0
              return (
                <button
                  key={item._meta.path}
                  type="button"
                  className={`group img-zoom media-radius cursor-pointer relative block w-full border-0 p-0 text-left ${
                    isLarge ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                  style={{ aspectRatio: isLarge ? '16/9' : '4/5' }}
                  data-sb-object-id={`content/gallery/${item._meta.path}.md`}
                  aria-label={`View larger image: ${item.title}`}
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
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover"
                    data-sb-field-path="image"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-end p-5"
                    style={{
                      background:
                        'linear-gradient(to top, color-mix(in srgb, var(--palette-wine) 78%, transparent) 0%, transparent 60%)',
                    }}
                    aria-hidden
                  >
                    <div>
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
                          style={{ color: scheme === 'wine' ? fg.eyebrow : 'var(--accent-color)' }}
                        >
                          {item.category}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <Modal
        open={Boolean(lightboxImg)}
        onClose={() => setLightboxImg(null)}
        ariaLabel={lightboxImg ? `Image: ${lightboxImg.alt}` : 'Image preview'}
        panelClassName="max-w-5xl"
      >
        {lightboxImg && (
          <img
            src={netlifyImg(lightboxImg.src, 1400, 900, 'contain')}
            alt={lightboxImg.alt}
            className="w-full max-h-screen object-contain"
          />
        )}
      </Modal>
    </>
  )
}
