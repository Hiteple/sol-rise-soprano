import { Link } from '@tanstack/react-router'
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react'

interface FooterProps {
  instagramUrl?: string
  youtubeUrl?: string
  facebookUrl?: string
  email?: string
}

export function Footer({
  instagramUrl = 'https://instagram.com',
  youtubeUrl = 'https://youtube.com',
  facebookUrl = 'https://facebook.com',
  email = 'contact@isabellacavalcanti.com',
}: FooterProps) {
  return (
    <footer
      className="border-t"
      style={{
        background: '#080605',
        borderColor: 'rgba(184, 151, 90, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div
              className="font-display text-3xl mb-3"
              style={{ color: 'var(--gold)' }}
            >
              Isabella
              <br />
              <span className="italic" style={{ color: 'var(--ivory)' }}>
                Cavalcanti
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mt-4"
              style={{ color: 'var(--warm-gray)' }}
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
              style={{ color: 'var(--gold)' }}
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
                  style={{ color: 'var(--warm-gray)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--ivory)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--warm-gray)')
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
              style={{ color: 'var(--gold)' }}
            >
              Connect
            </h4>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm mb-6 transition-colors hover:text-ivory"
              style={{ color: 'var(--warm-gray)' }}
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
                  borderColor: 'rgba(184, 151, 90, 0.4)',
                  color: 'var(--warm-gray)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)'
                  e.currentTarget.style.color = 'var(--gold)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(184, 151, 90, 0.4)'
                  e.currentTarget.style.color = 'var(--warm-gray)'
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
                  borderColor: 'rgba(184, 151, 90, 0.4)',
                  color: 'var(--warm-gray)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)'
                  e.currentTarget.style.color = 'var(--gold)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(184, 151, 90, 0.4)'
                  e.currentTarget.style.color = 'var(--warm-gray)'
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
                  borderColor: 'rgba(184, 151, 90, 0.4)',
                  color: 'var(--warm-gray)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)'
                  e.currentTarget.style.color = 'var(--gold)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(184, 151, 90, 0.4)'
                  e.currentTarget.style.color = 'var(--warm-gray)'
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
          style={{ borderColor: 'rgba(184, 151, 90, 0.1)' }}
        >
          <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>
            © {new Date().getFullYear()} Isabella Cavalcanti. All rights reserved.
          </p>
          <p className="text-xs font-display italic" style={{ color: 'rgba(184, 151, 90, 0.5)' }}>
            La musica è la lingua dell'anima
          </p>
        </div>
      </div>
    </footer>
  )
}
