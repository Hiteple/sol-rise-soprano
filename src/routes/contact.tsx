import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { allHomes } from 'content-collections'
import { Instagram, Youtube, Facebook, Send, Check } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const page = allHomes[0]
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      url: page?.instagramUrl ?? '#',
      handle: '@isabellacavalcanti',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      url: page?.youtubeUrl ?? '#',
      handle: 'Isabella Cavalcanti',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      url: page?.facebookUrl ?? '#',
      handle: 'Isabella Cavalcanti Soprano',
    },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    fetch('/contact.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(
        formData as unknown as Record<string, string>,
      ).toString(),
    })
      .then(() => {
        setSubmitted(true)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  return (
    <div style={{ background: 'var(--page-background-color)' }}>
      {/* Page Header */}
      <section
        className="pt-40 pb-16 lg:pt-52 lg:pb-24"
        style={{ background: 'var(--section-background-color)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p
            className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
            style={{ color: 'var(--accent-color)' }}
          >
            Reach Out
          </p>
          <h1
            className="font-display italic leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--heading-color)' }}
          >
            Contact
          </h1>
        </div>
      </section>

      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div data-sb-object-id="content/home/data.md">
              <h2
                className="font-display italic text-3xl lg:text-4xl mb-6"
                style={{ color: 'var(--heading-color)' }}
              >
                Let's Begin a Conversation
              </h2>
              <div
                className="w-12 h-px mb-8"
                style={{ background: 'var(--accent-color)' }}
              />
              <p
                className="font-body text-base leading-relaxed mb-12"
                style={{ color: 'var(--muted-text-color)' }}
              >
                Whether you are a concert promoter, festival organiser, music journalist,
                or an aspiring singer seeking mentorship — Isabella welcomes all enquiries.
                Please allow 3–5 business days for a personal response.
              </p>

              {/* Email */}
              <div className="mb-12">
                <p
                  className="text-xs uppercase tracking-widest font-body font-semibold mb-3"
                  style={{ color: 'var(--accent-color)' }}
                >
                  Direct Email
                </p>
                <a
                  href={`mailto:${page?.email ?? 'contact@isabellacavalcanti.com'}`}
                  className="font-display text-xl italic transition-opacity hover:opacity-70"
                  style={{ color: 'var(--heading-color)' }}
                  data-sb-field-path="email"
                >
                  {page?.email ?? 'contact@isabellacavalcanti.com'}
                </a>
              </div>

              {/* Social Links */}
              <div>
                <p
                  className="text-xs uppercase tracking-widest font-body font-semibold mb-6"
                  style={{ color: 'var(--accent-color)' }}
                >
                  Social Channels
                </p>
                <div className="space-y-4">
                  {socialLinks.map(({ icon: Icon, label, url, handle }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group transition-opacity hover:opacity-80"
                    >
                      <div
                        className="w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-opacity-100"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--accent-color) 32%, transparent)',
                          color: 'var(--accent-color)',
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div>
                        <p
                          className="font-body text-xs uppercase tracking-widest"
                          style={{ color: 'var(--subtle-text-color)' }}
                        >
                          {label}
                        </p>
                        <p
                          className="font-body text-sm font-semibold"
                          style={{ color: 'var(--body-color)' }}
                        >
                          {handle}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {submitted ? (
                <div
                  className="h-full flex flex-col items-center justify-center text-center p-12 border"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--accent-color) 24%, transparent)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-6"
                    style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                  >
                    <Check size={28} />
                  </div>
                  <h3
                    className="font-display italic text-3xl mb-4"
                    style={{ color: 'var(--heading-color)' }}
                  >
                    Message Sent
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed mb-8"
                    style={{ color: 'var(--muted-text-color)' }}
                  >
                    Thank you for reaching out. Isabella or her team will respond
                    within 3–5 business days.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="gold-link"
                  >
                    Send Another Message →
                  </button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p hidden>
                    <label>
                      Don't fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  {[
                    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Isabella Rossi' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Booking Enquiry · Press · Teaching' },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block font-body text-xs uppercase tracking-widest font-semibold mb-2"
                        style={{ color: 'var(--subtle-text-color)' }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        required
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 font-body text-sm outline-none transition-all duration-300 border-b bg-transparent"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--accent-color) 24%, transparent)',
                          color: 'var(--body-color)',
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = 'var(--accent-color)')
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor =
                            'color-mix(in srgb, var(--accent-color) 24%, transparent)')
                        }
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-body text-xs uppercase tracking-widest font-semibold mb-2"
                      style={{ color: 'var(--subtle-text-color)' }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Please share the details of your enquiry..."
                      className="w-full px-4 py-3 font-body text-sm outline-none transition-all duration-300 border resize-none bg-transparent"
                      style={{
                        borderColor: 'color-mix(in srgb, var(--accent-color) 24%, transparent)',
                        color: 'var(--body-color)',
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = 'var(--accent-color)')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          'color-mix(in srgb, var(--accent-color) 24%, transparent)')
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 font-body text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                    style={{
                      background: loading ? 'var(--pill-track-background-color)' : 'var(--accent-color)',
                      color: loading ? 'var(--subtle-text-color)' : 'var(--on-accent-text-color)',
                    }}
                  >
                    <Send size={14} />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
