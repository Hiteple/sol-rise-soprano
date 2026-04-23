import { Link } from '@tanstack/react-router'

import { netlifyImg } from '@/lib/netlify-image'
import type { HomeImageTextSection } from './types'

export type ImageTextSectionProps = {
  /** Drives Stackbit `data-sb-field-path` prefixes and small copy defaults */
  variant: 'about' | 'feature'
  section: HomeImageTextSection
}

export function ImageTextSection({ variant, section }: ImageTextSectionProps) {
  const isAbout = variant === 'about'

  const eyebrow = isAbout ? (section.eyebrow ?? 'About') : section.eyebrow
  const linkHref = isAbout
    ? (section.linkHref ?? '/about')
    : (section.linkHref ?? '/contact')
  const linkLabel =
    isAbout
      ? section.linkText
      : (section.linkText ?? 'Enquire About Lessons →')

  const surfaceBg =
    section.surface === 'bright'
      ? 'var(--section-surface-bright)'
      : 'var(--section-background-color)'

  const paths = isAbout
    ? {
        eyebrow: 'aboutEyebrow',
        title: 'aboutTitle',
        text: 'aboutText',
        image: 'aboutImage#@src',
        linkHref: 'aboutHref',
        linkLabel: 'aboutLinkText',
      }
    : {
        eyebrow: 'featureEyebrow',
        title: 'featureTitle',
        text: 'featureText',
        image: 'featureImage#@src',
        linkHref: 'featureCtaHref',
        linkLabel: 'featureCtaLabel',
      }

  return (
    <section
      className="py-24 lg:py-36"
      style={{ background: surfaceBg }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <p
              className="text-xs uppercase tracking-[0.3em] font-body font-semibold mb-6"
              style={{ color: 'var(--accent-color)' }}
              data-sb-field-path={paths.eyebrow}
            >
              {eyebrow}
            </p>
            <h2
              className="font-display text-4xl lg:text-5xl italic leading-tight mb-8"
              style={{ color: 'var(--heading-color)' }}
              data-sb-field-path={paths.title}
            >
              {section.title}
            </h2>
            <div
              className="w-12 h-px mb-8"
              style={{ background: 'var(--accent-color)' }}
            />
            <p
              className="font-body text-base leading-relaxed mb-10"
              style={{ color: 'var(--muted-text-color)' }}
              data-sb-field-path={paths.text}
            >
              {section.text}
            </p>
            <Link to={linkHref} className="gold-link" data-sb-field-path={paths.linkHref}>
              <span data-sb-field-path={paths.linkLabel}>
                {isAbout ? `${linkLabel} →` : linkLabel}
              </span>
            </Link>
          </div>

          <div className="lg:col-span-3 img-zoom order-1 lg:order-2 relative">
            <div
              className="absolute -top-6 -right-6 w-32 h-32 border"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-color) 22%, transparent)',
              }}
            />
            <img
              src={netlifyImg(section.image, 900, 1100)}
              alt={section.imageAlt}
              className="w-full object-cover"
              style={{ maxHeight: '640px', objectPosition: 'top center' }}
              data-sb-field-path={paths.image}
            />
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 border"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-color) 22%, transparent)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
