import { Link } from '@tanstack/react-router'

import { netlifyImg } from '@/lib/netlify-image'
import { schemeForeground, schemeSolidBackground } from '@/lib/section-color-scheme'
import type { HomeImageTextSection } from './types'

export type ImageTextSectionProps = {
  section: HomeImageTextSection
}

export function ImageTextSection({ section }: ImageTextSectionProps) {
  const eyebrow = section.eyebrow ?? 'About'
  const linkHref = section.linkHref ?? '/career'
  const linkLabel = section.linkText

  const scheme = section.surface
  const surfaceBg = schemeSolidBackground(scheme)
  const fg = schemeForeground(scheme)
  const isWine = scheme === 'wine'

  const paths = {
    eyebrow: 'aboutEyebrow',
    title: 'aboutTitle',
    text: 'aboutText',
    image: 'aboutImage#@src',
    linkHref: 'aboutHref',
    linkLabel: 'aboutLinkText',
  }

  return (
    <section
      className="section-vertical-padding"
      style={{ background: surfaceBg }}
      data-sb-field-path="aboutSurface"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <p
              className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-6"
              style={{ color: fg.eyebrow }}
              data-sb-field-path={paths.eyebrow}
            >
              {eyebrow}
            </p>
            <h2
              className="font-display text-4xl lg:text-5xl italic leading-tight mb-8"
              style={{ color: fg.heading }}
              data-sb-field-path={paths.title}
            >
              {section.title}
            </h2>
            <div
              className="w-12 h-px mb-8"
              style={{ background: fg.divider }}
            />
            <p
              className="font-body text-base leading-relaxed mb-10"
              style={{ color: fg.body }}
              data-sb-field-path={paths.text}
            >
              {section.text}
            </p>
            <Link
              to={linkHref}
              className="gold-link"
              style={isWine ? { color: fg.heading } : undefined}
              data-sb-field-path={paths.linkHref}
            >
              <span data-sb-field-path={paths.linkLabel}>
                {`${linkLabel} →`}
              </span>
            </Link>
          </div>

          <div className="lg:col-span-3 img-zoom order-1 lg:order-2 relative">
            <img
              src={netlifyImg(section.image, 900, 1100)}
              alt={section.imageAlt}
              className="w-full object-cover"
              style={{ maxHeight: '640px', objectPosition: 'top center' }}
              data-sb-field-path={paths.image}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
