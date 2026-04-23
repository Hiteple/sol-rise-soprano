import { Instagram, Youtube, Facebook, Mail } from 'lucide-react'
import { allHomes } from 'content-collections'

import { parseSiteNavLinks } from '@/lib/nav-links'

const fallbackFooterLinks = [
  { label: 'Home', href: '/' },
  { label: 'Bio', href: '/bio' },
  { label: 'Career', href: '/about' },
  { label: 'Productions', href: '/productions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const site = allHomes[0]
  const footerLinks = parseSiteNavLinks(site?.footerNavLinks, fallbackFooterLinks)
  const footerBrandLine1 = site?.footerBrandLine1 ?? 'Sol Risé'
  const footerBrandLine2 = site?.footerBrandLine2 ?? 'Soprano'
  const footerTagline = site?.footerBrandTagline ?? 'Soprano · Stage Artist\nVoice of Passion'
  const instagramUrl = site?.instagramUrl ?? 'https://www.instagram.com/solrisesoprano/'
  const youtubeUrl = site?.youtubeUrl ?? 'https://youtube.com'
  const facebookUrl = site?.facebookUrl ?? 'https://facebook.com'
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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div
              className="font-display text-3xl mb-3"
              style={{ color: 'var(--chrome-accent)' }}
              data-sb-field-path="footerBrandLine1"
            >
              {footerBrandLine1}
              <br />
              <span className="italic" style={{ color: 'var(--chrome-text)' }} data-sb-field-path="footerBrandLine2">
                {footerBrandLine2}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mt-4"
              style={{ color: 'var(--chrome-text-muted)', whiteSpace: 'pre-line' }}
              data-sb-field-path="footerBrandTagline"
            >
              {footerTagline}
            </p>
          </div>

          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-6 font-body font-semibold"
              style={{ color: 'var(--chrome-accent)' }}
            >
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link, idx) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  className="text-sm transition-colors duration-200 font-body"
                  data-sb-field-path={`footerNavLinks.${idx}`}
                  style={{ color: 'var(--chrome-text-muted)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--chrome-text)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--chrome-text-muted)')
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-6 font-body font-semibold"
              style={{ color: 'var(--chrome-accent)' }}
            >
              Connect
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
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
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
                <Instagram size={15} />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
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
                <Youtube size={15} />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
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
                <Facebook size={15} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--chrome-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--chrome-text-muted)' }}>
            © {new Date().getFullYear()} Sol Risé Soprano. All rights reserved.
          </p>
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
