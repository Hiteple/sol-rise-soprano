import { useState } from 'react'

import { SlidingTabGroup } from '@/components/SlidingTabGroup'
import { TabGridEmptyState } from '@/components/TabGridEmptyState'
import { useGalleryPhotoSwipe } from '@/lib/gallery-photoswipe'
import { netlifyImgSet } from '@/lib/netlify-image'
import { resolveColorScheme, schemeForeground, schemePageBandBackground } from '@/lib/section-color-scheme'
import { photographerCreditLabel } from '@/lib/photographer-credit'
import { packGalleryGrid } from '@/lib/gallery-grid-pack'
import { galleryCategoryEmptyCopy } from '@/lib/tab-grid-empty-copy'
import { useInView } from '@/lib/use-in-view'
import type { SectionColorScheme } from '../../schemas/color-scheme'

export type GalleryGridItem = {
  _meta: { path: string }
  title: string
  image: string
  alt: string
  category?: string
  photographer?: string
  featuredImg?: boolean
  roleSlug?: string
  gallerySlug?: string
  order?: number
}

export type TabItemsSectionProps = {
  categories: string[]
  items: GalleryGridItem[]
  tabItemsColorScheme?: SectionColorScheme
  slideIn?: boolean
}

export function TabItemsSection({ categories, items, tabItemsColorScheme, slideIn }: TabItemsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? 'All')

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.category === activeCategory)

  const gridItems = packGalleryGrid(filtered)

  const scheme = resolveColorScheme(tabItemsColorScheme)
  const fg = schemeForeground(scheme)
  const animate = slideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()
  const { openGallery } = useGalleryPhotoSwipe()

  return (
    <>
      <section
        className="py-10"
        style={{ background: schemePageBandBackground(scheme) }}
        data-sb-field-path="tabItemsColorScheme"
      >
        <div className="max-w-site mx-auto px-4 lg:px-12">
          <SlidingTabGroup
            className="w-fit"
            tabClassName="px-3 py-1.5 md:px-6 md:py-2"
            ariaLabel="Filter gallery by category"
            value={activeCategory}
            onChange={setActiveCategory}
            inactiveTextColor={scheme === 'wine' ? fg.body : 'var(--subtle-text-color)'}
            activeTextColor="var(--on-accent-text-color)"
            options={categories.map((cat, i) => ({
              value: cat,
              label: cat,
              fieldPath: `filterCategories.${i}`,
            }))}
          />
        </div>
      </section>

      <section
        className="pb-24 lg:pb-36"
        style={{ background: schemePageBandBackground(scheme) }}
      >
        <div
          ref={ref}
          className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
        >
          {gridItems.length === 0 ? (
            <TabGridEmptyState
              {...galleryCategoryEmptyCopy(activeCategory)}
              headingColor={fg.heading}
              bodyColor={fg.body}
            />
          ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-flow-dense gap-4 items-stretch">
            {gridItems.map((item, index) => {
              const isFeatured = Boolean(item.featuredImg)
              const photographerCredit = photographerCreditLabel(item.photographer)
              return (
                <button
                  key={item._meta.path}
                  type="button"
                  className={`group img-zoom media-radius relative block h-full min-h-0 w-full self-stretch overflow-hidden border-0 p-0 text-left cursor-pointer col-span-2 ${
                    isFeatured ? '' : 'lg:col-span-1'
                  }`}
                  {...(isFeatured ? { 'data-featured-img': true } : {})}
                  data-sb-object-id={`content/gallery/${item._meta.path}.md`}
                  aria-label={`View larger image: ${item.title}`}
                  onClick={() =>
                    openGallery(
                      gridItems.map((entry) => ({
                        image: entry.image,
                        alt: entry.alt,
                        title: entry.title,
                        photographer: entry.photographer,
                      })),
                      index,
                    )
                  }
                >
                  <img
                    {...netlifyImgSet(
                      item.image,
                      isFeatured ? 1200 : 600,
                      isFeatured ? 675 : 750,
                    )}
                    alt=""
                    aria-hidden
                    className="img-zoom-sizer block w-full h-auto opacity-0"
                  />
                  <img
                    {...netlifyImgSet(
                      item.image,
                      isFeatured ? 1200 : 600,
                      isFeatured ? 675 : 750,
                    )}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover"
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
                      {photographerCredit && (
                        <p
                          className="font-body text-xs uppercase tracking-widest mt-1"
                          style={{ color: 'var(--media-caption-text-color)' }}
                          data-sb-field-path="photographer"
                        >
                          {photographerCredit}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
          )}
        </div>
      </section>
    </>
  )
}
