import { createFileRoute, Link } from '@tanstack/react-router'
import { allAboutPages, allHomeSections } from 'content-collections'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function netlifyImg(url: string, w: number, h?: number, fit = 'cover') {
  const params = new URLSearchParams({ url, w: String(w), fit })
  if (h) params.set('h', String(h))
  return `/.netlify/images?${params.toString()}`
}

function aboutTeaserImageFromHome() {
  const layout = allHomeSections[0]
  const block = layout?.sections.find((s) => s.type === 'about_teaser')
  return block?.type === 'about_teaser' ? block.aboutImage : undefined
}

function AboutPage() {
  const page = allAboutPages[0]
  if (!page) return null

  const heroSrc =
    page.heroImage?.trim() ||
    aboutTeaserImageFromHome() ||
    'https://picsum.photos/seed/aboutpage/800/1000'

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/about/page.md">
      <section
        className="pt-40 pb-24 lg:pt-52 lg:pb-36"
        style={{ background: 'var(--section-background-color)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-6"
                style={{ color: 'var(--accent-color)' }}
                data-sb-field-path="heroEyebrow"
              >
                {page.heroEyebrow}
              </p>
              <h1
                className="font-display italic leading-none mb-8"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  color: 'var(--heading-color)',
                }}
              >
                <span data-sb-field-path="heroTitleLine1">{page.heroTitleLine1}</span>
                <br />
                <span style={{ color: 'var(--accent-color)' }} data-sb-field-path="heroTitleAccent">
                  {page.heroTitleAccent}
                </span>
                <br />
                <span data-sb-field-path="heroTitleLine2">{page.heroTitleLine2}</span>
              </h1>
              <div className="w-16 h-px mb-8" style={{ background: 'var(--accent-color)' }} />
              <p
                className="font-body text-lg leading-relaxed"
                style={{ color: 'var(--muted-text-color)' }}
                data-sb-field-path="heroIntro"
              >
                {page.heroIntro}
              </p>
            </div>

            <div className="relative img-zoom">
              <img
                src={netlifyImg(heroSrc, 800, 1000)}
                alt={page.heroImageAlt}
                className="w-full object-cover"
                style={{ maxHeight: 680 }}
                data-sb-field-path="heroImage"
              />
              <div
                className="absolute bottom-6 left-6 right-6 p-6"
                style={{
                  background: 'color-mix(in srgb, var(--page-background-color) 88%, transparent)',
                  backdropFilter: 'blur(10px)',
                  borderLeft: '3px solid var(--accent-color)',
                }}
              >
                <p
                  className="font-display italic text-xl"
                  style={{ color: 'var(--heading-color)' }}
                  data-sb-field-path="heroQuote"
                >
                  {page.heroQuote}
                </p>
                <p
                  className="font-body text-xs mt-2 uppercase tracking-widest"
                  style={{ color: 'var(--accent-color)' }}
                  data-sb-field-path="heroQuoteAttribution"
                >
                  {page.heroQuoteAttribution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20"
        style={{
          borderTop: '1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)',
          borderBottom: '1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {page.highlights.map((h) => (
              <div key={`${h.number}-${h.label}`} className="text-center">
                <div
                  className="font-display text-5xl lg:text-6xl italic mb-2"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {h.number}
                </div>
                <div
                  className="font-body text-xs uppercase tracking-widest"
                  style={{ color: 'var(--subtle-text-color)' }}
                >
                  {h.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p
            className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-6"
            style={{ color: 'var(--accent-color)' }}
            data-sb-field-path="fullBioEyebrow"
          >
            {page.fullBioEyebrow}
          </p>
          <div
            className="font-body text-base leading-relaxed space-y-6"
            style={{ color: 'var(--muted-text-color)' }}
          >
            {page.fullBioParagraphs.map((para, i) => (
              <p key={i} data-sb-field-path={`fullBioParagraphs.${i}`}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-24 lg:py-36"
        style={{ background: 'var(--section-background-color)' }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <p
            className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
            style={{ color: 'var(--accent-color)' }}
            data-sb-field-path="timelineSectionEyebrow"
          >
            {page.timelineSectionEyebrow}
          </p>
          <h2
            className="font-display italic text-4xl lg:text-5xl mb-16"
            style={{ color: 'var(--heading-color)' }}
            data-sb-field-path="timelineSectionTitle"
          >
            {page.timelineSectionTitle}
          </h2>

          <div className="relative">
            <div
              className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px"
              style={{
                background: 'color-mix(in srgb, var(--accent-color) 28%, transparent)',
              }}
            />

            <div className="space-y-12">
              {page.timeline.map((item, idx) => (
                <div
                  key={item.year + item.title}
                  className={`relative flex items-start gap-8 lg:gap-16 ${
                    idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div
                    className="absolute left-0 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full mt-1 border-2"
                    style={{
                      background: 'var(--page-background-color)',
                      borderColor: 'var(--accent-color)',
                      zIndex: 1,
                    }}
                  />

                  <div
                    className={`ml-8 lg:ml-0 lg:w-5/12 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:pl-16'}`}
                    data-sb-field-path={`timeline.${idx}`}
                  >
                    <span
                      className="font-display italic text-2xl"
                      style={{ color: 'var(--accent-color)' }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="font-display text-xl mt-1 mb-3"
                      style={{ color: 'var(--heading-color)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: 'var(--muted-text-color)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2
            className="font-display italic text-4xl mb-6"
            style={{ color: 'var(--heading-color)' }}
          >
            <span data-sb-field-path="ctaTitleLine1">{page.ctaTitleLine1}</span>
            <br />
            <span data-sb-field-path="ctaTitleLine2">{page.ctaTitleLine2}</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to={page.ctaPrimaryHref}
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              style={{ background: 'var(--accent-color)', color: 'var(--on-accent-text-color)' }}
              data-sb-field-path="ctaPrimaryLabel"
            >
              {page.ctaPrimaryLabel}
            </Link>
            <Link
              to={page.ctaSecondaryHref}
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold border transition-all duration-300"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-color) 45%, transparent)',
                color: 'var(--accent-color)',
              }}
              data-sb-field-path="ctaSecondaryLabel"
            >
              {page.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
