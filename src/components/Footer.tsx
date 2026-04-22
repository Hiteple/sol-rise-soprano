import { Link } from '@tanstack/react-router'
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react'

interface FooterProps {
  instagramUrl?: string
  youtubeUrl?: string
  facebookUrl?: string
  email?: string
}

export function Footer({
  instagramUrl = 'https://www.instagram.com/solrisesoprano/',
  youtubeUrl = 'https://youtube.com',
  facebookUrl = 'https://facebook.com',
  email = 'solrisesoprano@gmail.com',
}: FooterProps) {
  return (
    <footer
      className="border-t"
      style={{
        background: 'var(--section-background-color)',
        borderColor: 'color-mix(in srgb, var(--accent-color) 18%, transparent)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div
              className="font-display text-3xl mb-3"
              style={{ color: 'var(--accent-color)' }}
            >
              Sol Risé
              <br />
              <span className="italic" style={{ color: 'var(--body-color)' }}>
                Soprano
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mt-4"
              style={{ color: 'var(--subtle-text-color)' }}
            >
              Soprano · Stage Artist
              <br />
              Voice of Passion
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-6 font-body font-semibold"
              style={{ color: 'var(--accent-color)' }}
            >
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { to: '/' as const, label: 'Home' },
                { to: '/about' as const, label: 'About' },
                { to: '/productions' as const, label: 'Productions' },
                { to: '/gallery' as const, label: 'Gallery' },
                { to: '/contact' as const, label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm transition-colors duration-200 hover:opacity-100 font-body"
                  style={{ color: 'var(--subtle-text-color)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--body-color)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--subtle-text-color)')
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-6 font-body font-semibold"
              style={{ color: 'var(--accent-color)' }}
            >
              Connect
            </h4>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-90"
              style={{ color: 'var(--subtle-text-color)' }}
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
                  borderColor: 'color-mix(in srgb, var(--accent-color) 32%, transparent)',
                  color: 'var(--subtle-text-color)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-color)'
                  e.currentTarget.style.color = 'var(--accent-color)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'color-mix(in srgb, var(--accent-color) 32%, transparent)'
                  e.currentTarget.style.color = 'var(--subtle-text-color)'
                }}
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
                  borderColor: 'color-mix(in srgb, var(--accent-color) 32%, transparent)',
                  color: 'var(--subtle-text-color)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-color)'
                  e.currentTarget.style.color = 'var(--accent-color)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'color-mix(in srgb, var(--accent-color) 32%, transparent)'
                  e.currentTarget.style.color = 'var(--subtle-text-color)'
                }}
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
                  borderColor: 'color-mix(in srgb, var(--accent-color) 32%, transparent)',
                  color: 'var(--subtle-text-color)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-color)'
                  e.currentTarget.style.color = 'var(--accent-color)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'color-mix(in srgb, var(--accent-color) 32%, transparent)'
                  e.currentTarget.style.color = 'var(--subtle-text-color)'
                }}
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'color-mix(in srgb, var(--accent-color) 12%, transparent)' }}
        >
          <p className="text-xs" style={{ color: 'var(--subtle-text-color)' }}>
            © {new Date().getFullYear()} Isabella Cavalcanti. All rights reserved.
          </p>
          <p
            className="text-xs font-display italic"
            style={{ color: 'color-mix(in srgb, var(--accent-color) 48%, transparent)' }}
          >
            La musica è la lingua dell'anima
          </p>
        </div>
      </div>
    </footer>
  )
}
