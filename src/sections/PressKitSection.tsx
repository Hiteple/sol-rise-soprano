import { Download, FileImage, FileText, Images, ScrollText, type LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'

import { ExternalLink } from '@/components/ExternalLink'
import { LocaleFlagIcon } from '@/components/LocaleFlagIcon'
import { useLocale } from '@/components/LocaleContext'
import { localizePath } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/locales'
import { halfColumnImageProps } from '@/lib/netlify-image'
import {
  resolveColorScheme,
  schemeForeground,
  schemeGoldLinkStyle,
  schemePageBandBackground,
} from '@/lib/section-color-scheme'
import { useInView } from '@/lib/use-in-view'
import type { PressKitPage } from '../../schemas/site-pages'

export type PressKitSectionProps = {
  page: PressKitPage | undefined
}

function languageBadgeLocale(language: string): Locale | null {
  const code = language.trim().toLowerCase()
  if (code === 'en' || code === 'es' || code === 'de' || code === 'it') return code
  return null
}

function fileIcon(asset: PressKitPage['assets'][number]): LucideIcon {
  if (asset.category === 'photos') return Images
  if (asset.fileType === 'jpg') return FileImage

  const href = asset.href.toLowerCase()
  if (href.includes('short-bio') || href.includes('bio-corta')) return ScrollText
  if (href.includes('resume') || href.includes('curriculum')) return FileText

  return FileText
}

const CONTACT_PAGE_PHRASES = [
  /página de contacto/i,
  /pagina contatti/i,
  /kontaktseite/i,
  /contact page/i,
] as const

function contactPagePhraseMatch(body: string) {
  for (const pattern of CONTACT_PAGE_PHRASES) {
    const match = body.match(pattern)
    if (match && match.index !== undefined) return match
  }
  return null
}

function IntroBodyText({
  body,
  contactHref,
  goldLinkStyle,
}: {
  body: string
  contactHref: string
  goldLinkStyle: CSSProperties
}) {
  const match = contactPagePhraseMatch(body)
  if (!match || match.index === undefined) {
    return <>{body}</>
  }

  const before = body.slice(0, match.index)
  const label = match[0]
  const after = body.slice(match.index + label.length)

  return (
    <>
      {before}
      <Link to={contactHref} className="gold-link" style={goldLinkStyle}>
        {label}
      </Link>
      {after}
    </>
  )
}

function MuvacNoteLine({
  note,
  url,
  goldLinkStyle,
}: {
  note: string
  url: string
  goldLinkStyle: CSSProperties
}) {
  const match = note.match(/Muvac/i)
  if (!match || match.index === undefined) {
    return <span data-sb-field-path="muvacNote">{note}</span>
  }

  const before = note.slice(0, match.index)
  const label = match[0]
  const after = note.slice(match.index + label.length)

  return (
    <span data-sb-field-path="muvacNote">
      {before}
      <ExternalLink href={url} className="gold-link" style={goldLinkStyle} data-sb-field-path="muvacUrl">
        {label}
      </ExternalLink>
      {after}
    </span>
  )
}

function PressKitAssetCard({
  asset,
  downloadLabel,
  index,
}: {
  asset: PressKitPage['assets'][number]
  downloadLabel: string
  index: number
}) {
  const Icon = fileIcon(asset)
  const fileLabel = asset.fileType.toUpperCase()

  return (
    <a
      href={asset.href}
      download
      className="press-kit-card group block h-full rounded-[var(--media-radius)] border p-6 lg:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        borderColor: 'color-mix(in srgb, var(--accent-ink-color) 16%, transparent)',
        background: 'var(--section-surface-bright)',
      }}
      data-sb-field-path={`assets.${index}`}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div
          className="press-kit-card__icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{
            background: 'color-mix(in srgb, var(--palette-wine) 10%, var(--palette-pink) 90%)',
            color: 'var(--accent-ink-color)',
          }}
        >
          <Icon size={22} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span
            className="font-body text-[0.62rem] uppercase tracking-[0.28em] px-2.5 py-1 rounded-full"
            style={{
              background: 'color-mix(in srgb, var(--palette-wine) 12%, transparent)',
              color: 'var(--accent-ink-color)',
            }}
          >
            {fileLabel}
          </span>
          {asset.language ? (() => {
            const badgeLocale = languageBadgeLocale(asset.language)
            return (
              <span
                className="font-body text-[0.62rem] uppercase tracking-[0.28em] px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent-ink-color) 22%, transparent)',
                  color: 'var(--muted-text-color)',
                }}
              >
                {badgeLocale ? (
                  <LocaleFlagIcon locale={badgeLocale} size={14} decorative className="press-kit-lang-flag" />
                ) : null}
                {asset.language}
              </span>
            )
          })() : null}
        </div>
      </div>

      <h3
        className="font-display text-2xl italic leading-snug mb-3 group-hover:opacity-90 transition-opacity"
        style={{ color: 'var(--heading-color)' }}
        data-sb-field-path={`assets.${index}.title`}
      >
        {asset.title}
      </h3>
      <p
        className="font-body text-sm leading-relaxed mb-6"
        style={{ color: 'var(--muted-text-color)' }}
        data-sb-field-path={`assets.${index}.description`}
      >
        {asset.description}
      </p>

      <span
        className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.28em] font-semibold transition-colors duration-200"
        style={{ color: 'var(--accent-ink-color)' }}
      >
        <Download size={14} aria-hidden />
        {downloadLabel}
      </span>
    </a>
  )
}

export function PressKitSection({ page }: PressKitSectionProps) {
  const { locale } = useLocale()
  const scheme = resolveColorScheme(page?.sectionColorScheme)
  const fg = schemeForeground(scheme)
  const goldLinkStyle = schemeGoldLinkStyle(scheme)
  const contactHref = localizePath('/contact', locale)
  const animate = page?.sectionSlideIn !== false
  const { ref, inView } = useInView<HTMLDivElement>()

  const documents = page?.assets.filter((asset) => asset.category === 'documents') ?? []
  const photos = page?.assets.filter((asset) => asset.category === 'photos') ?? []
  const introImage = page?.introImage?.trim()
  const introImageAlt = page?.introImageAlt?.trim()

  const introContent = (
    <>
      <h2
        className="font-display text-3xl lg:text-4xl italic mb-5"
        style={{ color: fg.heading }}
        data-sb-field-path="introHeading"
      >
        {page?.introHeading}
      </h2>
      <p
        className="font-body text-base leading-relaxed"
        style={{ color: fg.body }}
        data-sb-field-path="introBody"
      >
        <IntroBodyText
          body={page?.introBody ?? ''}
          contactHref={contactHref}
          goldLinkStyle={goldLinkStyle}
        />
      </p>
    </>
  )

  return (
    <section
      className="section-vertical-padding"
      style={{ background: schemePageBandBackground(scheme) }}
      data-sb-field-path="sectionColorScheme"
    >
      <div
        ref={ref}
        className={`max-w-site mx-auto px-4 lg:px-12 ${animate ? `reveal ${inView ? 'is-visible' : ''}` : ''}`}
      >
        {introImage ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14 lg:mb-16">
            <div>{introContent}</div>
            <div className="img-zoom media-radius relative order-first lg:order-last">
              <img
                {...halfColumnImageProps(introImage)}
                alt={introImageAlt ?? ''}
                className="w-full object-cover"
                width={800}
                height={1000}
                style={{ aspectRatio: '4/5', objectPosition: 'top center' }}
                loading="lazy"
                decoding="async"
                data-sb-field-path="introImage"
              />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mb-14 lg:mb-16">{introContent}</div>
        )}

        {documents.length > 0 ? (
          <div className="mb-14 lg:mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h3
                className="font-display text-2xl lg:text-3xl italic"
                style={{ color: fg.heading }}
                data-sb-field-path="documentsSectionTitle"
              >
                {page?.documentsSectionTitle}
              </h3>
              <div
                className="hidden sm:block h-px flex-1"
                style={{ background: fg.divider }}
                aria-hidden
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {documents.map((asset, index) => (
                <PressKitAssetCard
                  key={`${asset.href}-${asset.title}`}
                  asset={asset}
                  downloadLabel={page?.downloadLabel ?? 'Download'}
                  index={page?.assets.indexOf(asset) ?? index}
                />
              ))}
            </div>
          </div>
        ) : null}

        {photos.length > 0 ? (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3
                className="font-display text-2xl lg:text-3xl italic"
                style={{ color: fg.heading }}
                data-sb-field-path="photosSectionTitle"
              >
                {page?.photosSectionTitle}
              </h3>
              <div
                className="hidden sm:block h-px flex-1"
                style={{ background: fg.divider }}
                aria-hidden
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {photos.map((asset, index) => (
                <PressKitAssetCard
                  key={`${asset.href}-${asset.title}`}
                  asset={asset}
                  downloadLabel={page?.downloadLabel ?? 'Download'}
                  index={page?.assets.indexOf(asset) ?? index}
                />
              ))}
            </div>
          </div>
        ) : null}

        {page?.muvacNote && page.muvacUrl ? (
          <p className="mt-14 lg:mt-16 font-body text-sm leading-relaxed" style={{ color: fg.body }}>
            <MuvacNoteLine note={page.muvacNote} url={page.muvacUrl} goldLinkStyle={goldLinkStyle} />
          </p>
        ) : null}
      </div>
    </section>
  )
}
