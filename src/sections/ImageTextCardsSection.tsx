import { netlifyImg } from '@/lib/netlify-image'
import { resolveColorScheme, schemeForeground, schemeSolidBackground } from '@/lib/section-color-scheme'
import type { SectionColorScheme } from '../../schemas/color-scheme'

export type ProductionCard = {
  _meta: { path: string }
  title: string
  role: string
  venue: string
  year: string
  image: string
  description: string
  tags: string[]
}

export type ImageTextCardsSectionProps = {
  productions: ProductionCard[]
  listColorScheme?: SectionColorScheme
}

export function ImageTextCardsSection({
  productions,
  listColorScheme,
}: ImageTextCardsSectionProps) {
  const scheme = resolveColorScheme(listColorScheme)
  const fg = schemeForeground(scheme)

  return (
    <section className="section-vertical-padding" data-sb-field-path="productionsListColorScheme">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="space-y-2">
          {productions.map((production, idx) => (
            <div
              key={production._meta.path}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 group"
              data-sb-object-id={`content/productions/${production._meta.path}.md`}
            >
              <div
                className={`img-zoom ${idx % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}`}
                style={{ aspectRatio: '16/10' }}
              >
                <img
                  src={netlifyImg(production.image, 900, 562)}
                  alt={production.title}
                  className="w-full h-full object-cover"
                  data-sb-field-path="image"
                />
              </div>

              <div
                className={`p-10 lg:p-16 flex flex-col justify-center ${
                  idx % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'
                }`}
                style={{ background: schemeSolidBackground(scheme) }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="font-display italic text-3xl"
                    style={{ color: scheme === 'wine' ? fg.eyebrow : 'var(--accent-color)' }}
                    data-sb-field-path="year"
                  >
                    {production.year}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        scheme === 'wine'
                          ? fg.divider
                          : 'color-mix(in srgb, var(--accent-color) 28%, transparent)',
                    }}
                  />
                </div>

                <h2
                  className="font-display italic text-3xl lg:text-4xl mb-3"
                  style={{ color: fg.heading }}
                  data-sb-field-path="title"
                >
                  {production.title}
                </h2>

                <p
                  className="font-body text-sm uppercase tracking-widest mb-2 font-semibold"
                  style={{ color: scheme === 'wine' ? fg.eyebrow : 'var(--accent-color)' }}
                  data-sb-field-path="role"
                >
                  {production.role}
                </p>

                <p
                  className="font-body text-xs uppercase tracking-widest mb-6"
                  style={{ color: scheme === 'wine' ? fg.body : 'var(--subtle-text-color)' }}
                  data-sb-field-path="venue"
                >
                  {production.venue}
                </p>

                <p
                  className="font-body text-sm leading-relaxed mb-8"
                  style={{ color: fg.body }}
                  data-sb-field-path="description"
                >
                  {production.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {production.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 font-body text-xs uppercase tracking-widest border"
                      style={{
                        borderColor:
                          scheme === 'wine'
                            ? fg.divider
                            : 'color-mix(in srgb, var(--accent-color) 26%, transparent)',
                        color: scheme === 'wine' ? fg.body : 'var(--subtle-text-color)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
