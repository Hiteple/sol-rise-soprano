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
        background: 'var(--chrome-bg)',
        borderColor: 'var(--chrome-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div
              className="font-display text-3xl mb-3"
              style={{ color: 'var(--chrome-accent)' }}
            >
              Sol Risé
              <br />
              <span className="italic" style={{ color: 'var(--chrome-text)' }}>
                Soprano
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mt-4"
              style={{ color: 'var(--chrome-text-muted)' }}
            >
              Soprano · Stage Artist
              <br />
              Voice of Passion
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
                  className="text-sm transition-colors duration-200 font-body"
                  style={{ color: 'var(--chrome-text-muted)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--chrome-text)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--chrome-text-muted)')
                  }
                >
                  {link.label}
                </Link>
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
            © {new Date().getFullYear()} Isabella Cavalcanti. All rights reserved.
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
