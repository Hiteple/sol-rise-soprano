import { createFileRoute, Link } from '@tanstack/react-router'
import { allHomes } from 'content-collections'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function netlifyImg(url: string, w: number, h?: number, fit = 'cover') {
  const params = new URLSearchParams({ url, w: String(w), fit })
  if (h) params.set('h', String(h))
  return `/.netlify/images?${params.toString()}`
}

const highlights = [
  { number: '20+', label: 'Years on Stage' },
  { number: '47', label: 'Leading Roles' },
  { number: '28', label: 'Opera Houses' },
  { number: '3', label: 'Continents' },
]

const timeline = [
  {
    year: '2004',
    title: 'Conservatory Debut',
    description:
      'Graduated with distinction from the Conservatorio di Musica di Milano, specialising in bel canto technique.',
  },
  {
    year: '2007',
    title: 'European Breakthrough',
    description:
      'First leading role at the Glyndebourne Festival Opera — Mimì in La Bohème — earning rave reviews from the international press.',
  },
  {
    year: '2011',
    title: 'Metropolitan Opera Debut',
    description:
      'A triumphant debut at the Metropolitan Opera in New York as Tosca, catapulting Isabella to global recognition.',
  },
  {
    year: '2016',
    title: 'La Scala Residency',
    description:
      'Appointed artist-in-residence at Teatro alla Scala — the first soprano in a generation to hold this prestigious honour.',
  },
  {
    year: '2022',
    title: 'Salzburg Festival',
    description:
      'The luminous Countess in Le Nozze di Figaro at the Salzburg Festival, conducted by the Vienna Philharmonic.',
  },
  {
    year: '2024',
    title: 'Teaching & Legacy',
    description:
      'Launched the Cavalcanti Voice Academy, an international programme for the next generation of opera singers.',
  },
]

function AboutPage() {
  const page = allHomes[0]

  return (
    <div style={{ background: 'var(--obsidian)' }}>
      {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section
        className="pt-40 pb-24 lg:pt-52 lg:pb-36"
        style={{ background: 'var(--obsidian-soft)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-6"
                style={{ color: 'var(--gold)' }}
              >
                Biography
              </p>
              <h1
                className="font-display italic leading-none mb-8"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  color: 'var(--ivory)',
                }}
              >
                The Voice
                <br />
                <span style={{ color: 'var(--gold)' }}>Behind</span>
                <br />
                the Legend
              </h1>
              <div className="w-16 h-px mb-8" style={{ background: 'var(--gold)' }} />
              <p
                className="font-body text-lg leading-relaxed"
                style={{ color: 'var(--ivory-dim)' }}
              >
                Born in Verona into a family of musicians, Isabella Cavalcanti
                discovered her voice at age seven. What began as a childhood
                fascination became a lifelong calling — and an extraordinary career
                that has taken her to the world's most celebrated stages.
              </p>
            </div>

            <div className="relative img-zoom">
              <img
                src={netlifyImg(
                  page?.aboutImage ??
                    'https://picsum.photos/seed/aboutpage/800/1000',
                  800,
                  1000,
                )}
                alt="Isabella Cavalcanti portrait"
                className="w-full object-cover"
                style={{ maxHeight: 680 }}
              />
              <div
                className="absolute bottom-6 left-6 right-6 p-6"
                style={{
                  background: 'rgba(14,12,11,0.88)',
                  backdropFilter: 'blur(8px)',
                  borderLeft: '3px solid var(--gold)',
                }}
              >
                <p className="font-display italic text-xl" style={{ color: 'var(--ivory)' }}>
                  "Singing is not what I do — it is who I am."
                </p>
                <p
                  className="font-body text-xs mt-2 uppercase tracking-widest"
                  style={{ color: 'var(--gold)' }}
                >
                  — Isabella Cavalcanti
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ borderTop: '1px solid rgba(184, 151, 90, 0.2)', borderBottom: '1px solid rgba(184, 151, 90, 0.2)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {highlights.map((h) => (
              <div key={h.number} className="text-center">
                <div
                  className="font-display text-5xl lg:text-6xl italic mb-2"
                  style={{ color: 'var(--gold)' }}
                >
                  {h.number}
                </div>
                <div
                  className="font-body text-xs uppercase tracking-widest"
                  style={{ color: 'var(--warm-gray)' }}
                >
                  {h.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL BIO ──────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p
            className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-6"
            style={{ color: 'var(--gold)' }}
          >
            Full Biography
          </p>
          <div
            className="font-body text-base leading-relaxed space-y-6"
            style={{ color: 'var(--ivory-dim)' }}
          >
            <p>
              Isabella Cavalcanti is widely regarded as one of the most compelling sopranos of
              her generation. Born in Verona to a family of musicians — her father a conductor,
              her mother a concert pianist — she was immersed in the operatic tradition from infancy.
              By age twelve she had already performed in youth choir productions across northern Italy;
              by twenty she had enrolled at the Conservatorio di Musica di Milano on a full scholarship.
            </p>
            <p>
              Her technical mastery is matched only by her interpretive depth. Critics have frequently
              noted the extraordinary emotional intelligence she brings to every role — an ability to
              inhabit a character so completely that the boundary between singer and story dissolves
              entirely. Whether portraying the tragic sacrifice of Violetta, the fierce passion of Tosca,
              or the heartbroken dignity of the Countess, Isabella makes each heroine feel newly discovered.
            </p>
            <p>
              Off stage, Isabella is a committed pedagogue. She has been a faculty member at leading
              international masterclass programmes, and in 2024 she founded the Cavalcanti Voice Academy —
              an initiative dedicated to nurturing exceptional emerging singers from underrepresented
              backgrounds, offering intensive training, mentorship, and performance opportunities.
            </p>
            <p>
              She resides between Milan and Vienna, and is a proud mother of two. In her rare moments
              of leisure, she tends to an extensive garden, insisting that "growing things quietly is
              the great counterbalance to the operatic life."
            </p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-36"
        style={{ background: 'var(--obsidian-soft)' }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <p
            className="text-xs uppercase tracking-[0.35em] font-body font-semibold mb-4"
            style={{ color: 'var(--gold)' }}
          >
            Career Milestones
          </p>
          <h2
            className="font-display italic text-4xl lg:text-5xl mb-16"
            style={{ color: 'var(--ivory)' }}
          >
            A Life in Music
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px"
              style={{ background: 'rgba(184, 151, 90, 0.3)' }}
            />

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-8 lg:gap-16 ${
                    idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-0 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full mt-1 border-2"
                    style={{
                      background: 'var(--obsidian)',
                      borderColor: 'var(--gold)',
                      zIndex: 1,
                    }}
                  />

                  <div
                    className={`ml-8 lg:ml-0 lg:w-5/12 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:pl-16'}`}
                  >
                    <span
                      className="font-display italic text-2xl"
                      style={{ color: 'var(--gold)' }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="font-display text-xl mt-1 mb-3"
                      style={{ color: 'var(--ivory)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: 'var(--ivory-dim)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2
            className="font-display italic text-4xl mb-6"
            style={{ color: 'var(--ivory)' }}
          >
            Ready to Experience
            <br />
            the Voice Live?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/productions"
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              style={{ background: 'var(--gold)', color: 'var(--obsidian)' }}
            >
              Upcoming Productions
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 font-body text-xs uppercase tracking-widest font-semibold border transition-all duration-300"
              style={{ borderColor: 'rgba(184,151,90,0.5)', color: 'var(--gold)' }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
