import { Link } from '@tanstack/react-router'

import { netlifyImg } from '@/lib/netlify-image'
import type { HomeAboutSection } from './types'

export type AboutTeaserSectionProps = {
  section: HomeAboutSection
}

export function AboutTeaserSection({ section }: AboutTeaserSectionProps) {
  const eyebrow = section.eyebrow ?? 'About'
  const aboutHref = section.aboutHref ?? '/about'

  const surfaceBg =
    section.surface === 'bright'
      ? 'var(--section-surface-bright)'
      : 'var(--section-background-color)'

  return (
    <section
      className="py-24 lg:py-36"
      style={{ background: surfaceBg }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-3 img-zoom relative">
              <div
                className="absolute -top-6 -left-6 w-32 h-32 border"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent-color) 22%, transparent)',
                }}
              />
              <img
                src={netlifyImg(section.aboutImage, 900, 1100)}
                alt={section.aboutImageAlt}
                className="w-full object-cover"
                style={{ maxHeight: '640px', objectPosition: 'top center' }}
                data-sb-field-path="aboutImage#@src"
              />
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 border"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent-color) 22%, transparent)',
                }}
              />
            </div>

            <div className="lg:col-span-2">
              <p
                className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-6"
                style={{ color: 'var(--accent-color)' }}
                data-sb-field-path="aboutEyebrow"
              >
                {eyebrow}
              </p>
              <h2
                className="font-display text-4xl lg:text-5xl italic leading-tight mb-8"
                style={{ color: 'var(--heading-color)' }}
                data-sb-field-path="aboutTitle"
              >
                {section.aboutTitle}
              </h2>
              <div
                className="w-12 h-px mb-8"
                style={{ background: 'var(--accent-color)' }}
              />
              <p
                className="font-body text-base leading-relaxed mb-10"
                style={{ color: 'var(--muted-text-color)' }}
                data-sb-field-path="aboutText"
              >
                {section.aboutText}
              </p>
              <Link to={aboutHref} className="gold-link" data-sb-field-path="aboutHref">
                <span data-sb-field-path="aboutLinkText">{section.aboutLinkText} →</span>
              </Link>
            </div>
          </div>
      </div>
    </section>
  )
}
