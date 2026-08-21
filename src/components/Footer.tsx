import { Mail } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import {
  FacebookIcon,
  InstagramIcon,
  MuvacIcon,
  YoutubeIcon,
} from '@/components/brand-icons'
import { ExternalLink } from '@/components/ExternalLink'
import { SiteBrandLogo } from '@/components/SiteBrandLogo'
import { useLocale } from '@/components/LocaleContext'
import { getContactPage, getHomePage } from '@/lib/i18n/content'
import { localizeNavHref, translateNavLabel, localeRouteParams } from '@/lib/i18n'

import { parseSiteNavLinks } from '@/lib/nav-links'

const fallbackFooterLinks = [
  { label: 'Home', href: '/' },
  { label: 'Bio', href: '/bio' },
  { label: 'Career', href: '/career' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Videos', href: '/videos' },
  { label: 'Press Kit', href: '/press-kit' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const { locale, messages } = useLocale()
  const site = getHomePage(locale)
  const contact = getContactPage(locale)
  const footerLinks = parseSiteNavLinks(site?.footerNavLinks, fallbackFooterLinks)
  const footerBrandLine1 = site?.footerBrandLine1 ?? 'Sol Risé'
  const footerBrandLine2 = site?.footerBrandLine2 ?? 'Soprano'
  const footerBrandLogo = site?.footerBrandLogo?.trim()
  const instagramUrl = site?.instagramUrl ?? 'https://www.instagram.com/solrisesoprano/'
  const youtubeUrl =
    contact?.youtubeUrl ??
    site?.youtubeUrl ??
    'https://www.youtube.com/channel/UCgm68FC8sM_2r3cAXBQdbvw'
  const facebookUrl =
    contact?.facebookUrl ?? site?.facebookUrl ?? 'https://facebook.com/solrisesoprano'
  const muvacUrl = site?.muvacUrl ?? 'https://www.muvac.com/es/profile/florencia-sol-rise-lopez'
  const email = site?.email ?? 'solrisesoprano@gmail.com'

  return (
    <footer
      className="border-t"
      style={{
        background: 'var(--chrome-bg)',
        borderColor: 'var(--chrome-border)',
      }}
      data-sb-object-id="content/home/data.md"
    >
      <div className="max-w-site mx-auto px-4 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            {footerBrandLogo ? (
              <div>
                <SiteBrandLogo variant="footer" src={footerBrandLogo} fieldPath="footerBrandLogo" />
              </div>
            ) : (
              <div
                className="font-display text-3xl mb-3"
                style={{ color: 'var(--chrome-accent)' }}
                data-sb-field-path="footerBrandLine1"
              >
                {footerBrandLine1}
                <br />
                <span
                  className="italic"
                  style={{ color: 'var(--chrome-text)' }}
                  data-sb-field-path="footerBrandLine2"
                >
                  {footerBrandLine2}
                </span>
              </div>
            )}
          </div>

          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-6 font-body font-semibold"
              style={{ color: 'var(--chrome-accent)' }}
            >
              {messages.footer.navigate}
            </h4>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {footerLinks.map((link, idx) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  to={localizeNavHref(link.href, locale)}
                  className="text-sm transition-colors duration-200 font-body"
                  data-sb-field-path={`footerNavLinks.${idx}.label`}
                  style={{ color: 'var(--chrome-text-muted)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--chrome-text)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--chrome-text-muted)')
                  }
                >
                  {translateNavLabel(link.label, locale)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-6 font-body font-semibold"
              style={{ color: 'var(--chrome-accent)' }}
            >
              {messages.footer.connect}
            </h4>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-90"
              style={{ color: 'var(--chrome-text-muted)' }}
              data-sb-field-path="email"
            >
              <Mail size={14} />
              {email}
            </a>
            <div className="flex gap-4">
              <ExternalLink
                href={instagramUrl}
                aria-label="Sol Risé on Instagram"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: 'var(--chrome-border)',
                  color: 'var(--chrome-text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--chrome-accent)'
                  e.currentTarget.style.color = 'var(--chrome-accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--chrome-border)'
                  e.currentTarget.style.color = 'var(--chrome-text-muted)'
                }}
                data-sb-field-path="instagramUrl"
              >
                <InstagramIcon size={15} />
              </ExternalLink>
              <ExternalLink
                href={youtubeUrl}
                aria-label="Sol Risé on YouTube"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: 'var(--chrome-border)',
                  color: 'var(--chrome-text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--chrome-accent)'
                  e.currentTarget.style.color = 'var(--chrome-accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--chrome-border)'
                  e.currentTarget.style.color = 'var(--chrome-text-muted)'
                }}
                data-sb-field-path="youtubeUrl"
              >
                <YoutubeIcon size={15} />
              </ExternalLink>
              <ExternalLink
                href={facebookUrl}
                aria-label="Sol Risé on Facebook"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: 'var(--chrome-border)',
                  color: 'var(--chrome-text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--chrome-accent)'
                  e.currentTarget.style.color = 'var(--chrome-accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--chrome-border)'
                  e.currentTarget.style.color = 'var(--chrome-text-muted)'
                }}
                data-sb-field-path="facebookUrl"
              >
                <FacebookIcon size={15} />
              </ExternalLink>
              <ExternalLink
                href={muvacUrl}
                aria-label="Sol Risé on Muvac"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: 'var(--chrome-border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--chrome-accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--chrome-border)'
                }}
                data-sb-field-path="muvacUrl"
              >
                <MuvacIcon size={15} />
              </ExternalLink>
            </div>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--chrome-border)' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-xs" style={{ color: 'var(--chrome-text-muted)' }}>
              © {new Date().getFullYear()} Sol Risé Soprano. {messages.footer.rights}
            </p>
            <Link
              to="/{-$locale}/privacy"
              params={localeRouteParams(locale)}
              className="text-xs transition-colors duration-200 font-body underline underline-offset-2"
              style={{ color: 'var(--chrome-text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--chrome-text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--chrome-text-muted)'
              }}
            >
              {messages.footer.privacyLink}
            </Link>
          </div>
          <p
            className="text-xs font-display italic"
            style={{ color: 'color-mix(in srgb, var(--chrome-accent) 85%, var(--chrome-text) 15%)' }}
          >
            La musica è la lingua dell'anima
          </p>
        </div>
      </div>
    </footer>
  )
}
