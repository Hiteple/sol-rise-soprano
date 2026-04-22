import { createFileRoute } from '@tanstack/react-router'
import { allProductions } from 'content-collections'

export const Route = createFileRoute('/productions')({
  component: ProductionsPage,
})

function netlifyImg(url: string, w: number, h?: number, fit = 'cover') {
  const params = new URLSearchParams({ url, w: String(w), fit })
  if (h) params.set('h', String(h))
  return `/.netlify/images?${params.toString()}`
}

function ProductionsPage() {
  const productions = [...allProductions].sort((a, b) =>
    Number(b.year) - Number(a.year),
  )

  return (
    <div style={{ background: 'var(--page-background-color)' }}>
      {/* Page Header */}
      <section
        className="pt-40 pb-16 lg:pt-52 lg:pb-24"
        style={{ background: 'var(--section-background-color)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p
            className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
            style={{ color: 'var(--accent-color)' }}
          >
            Repertoire
          </p>
          <h1
            className="font-display italic leading-none mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--heading-color)' }}
          >
            Productions
          </h1>
          <p
            className="font-body text-lg max-w-xl"
            style={{ color: 'var(--muted-text-color)' }}
          >
            A curated selection of performances that have defined a career spanning
            three continents and the world's greatest opera houses.
          </p>
        </div>
      </section>

      {/* Productions Grid */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-2">
            {productions.map((production, idx) => (
              <div
                key={production._meta.path}
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 group"
                data-sb-object-id={`content/productions/${production._meta.path}.md`}
              >
                {/* Image */}
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

                {/* Text */}
                <div
                  className={`p-10 lg:p-16 flex flex-col justify-center ${
                    idx % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                  style={{ background: 'var(--section-background-color)' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="font-display italic text-3xl"
                      style={{ color: 'var(--accent-color)' }}
                      data-sb-field-path="year"
                    >
                      {production.year}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background: 'color-mix(in srgb, var(--accent-color) 28%, transparent)',
                      }}
                    />
                  </div>

                  <h2
                    className="font-display italic text-3xl lg:text-4xl mb-3"
                    style={{ color: 'var(--heading-color)' }}
                    data-sb-field-path="title"
                  >
                    {production.title}
                  </h2>

                  <p
                    className="font-body text-sm uppercase tracking-widest mb-2 font-semibold"
                    style={{ color: 'var(--accent-color)' }}
                    data-sb-field-path="role"
                  >
                    {production.role}
                  </p>

                  <p
                    className="font-body text-xs uppercase tracking-widest mb-6"
                    style={{ color: 'var(--subtle-text-color)' }}
                    data-sb-field-path="venue"
                  >
                    {production.venue}
                  </p>

                  <p
                    className="font-body text-sm leading-relaxed mb-8"
                    style={{ color: 'var(--muted-text-color)' }}
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
                          borderColor: 'color-mix(in srgb, var(--accent-color) 26%, transparent)',
                          color: 'var(--subtle-text-color)',
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
    </div>
  )
}
