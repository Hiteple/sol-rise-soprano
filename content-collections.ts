import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

import { sectionColorSchemeSchema } from './schemas/color-scheme'
import {
  aboutPageSchema,
  bioPageSchema,
  contactPageSchema,
  galleryPageSchema,
  productionsPageSchema,
} from './schemas/site-pages'

const homeHeroColorSchemeSchema = z.preprocess((val) => {
  if (val === 'wine') return 'wine'
  if (val === 'clear' || val === 'bright' || val === 'soft' || val === '' || val === null || val === undefined) {
    return 'clear'
  }
  return 'wine'
}, z.enum(['clear', 'wine']))

const education = defineCollection({
  name: 'education',
  directory: 'content/education',
  include: '**/*.md',
  schema: z.object({
    school: z.string(),
    summary: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    tags: z.array(z.string()),
    content: z.string(),
  }),
})


const home = defineCollection({
  name: 'home',
  directory: 'content/home',
  include: 'data.md',
  schema: z.object({
    type: z.literal('HomePage'),
    headerBrandLine1: z.string().default('Sol Risé'),
    headerBrandLine2: z.string().default('Soprano'),
    headerNavLinks: z
      .array(
        z.union([
          z.string(),
          z.object({
            label: z.string(),
            href: z.string(),
          }),
        ]),
      )
      .default([
        { label: 'Home', href: '/' },
        { label: 'Bio', href: '/bio' },
        { label: 'Career', href: '/career' },
        { label: 'Productions', href: '/productions' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Contact', href: '/contact' },
      ]),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    heroTagline: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    primaryCtaLabel: z.string().optional(),
    primaryCtaHref: z.string().optional(),
    secondaryCtaLabel: z.string().optional(),
    secondaryCtaHref: z.string().optional(),
    heroColorScheme: homeHeroColorSchemeSchema.default('wine'),
    aboutSurface: sectionColorSchemeSchema.default('soft'),
    aboutEyebrow: z.string().optional(),
    aboutTitle: z.string(),
    aboutText: z.string(),
    aboutImage: z.string(),
    aboutImageAlt: z.string(),
    aboutLinkText: z.string(),
    aboutHref: z.string().optional(),
    mediaEyebrow: z.string(),
    mediaTitle: z.string(),
    mediaItems: z.array(z.string()).max(12).optional(),
    mediaGridColorScheme: sectionColorSchemeSchema.default('soft'),
    featureSurface: sectionColorSchemeSchema.default('soft'),
    featureEyebrow: z.string(),
    featureTitle: z.string(),
    featureText: z.string(),
    featureImage: z.string(),
    featureImageAlt: z.string(),
    featureCtaLabel: z.string().optional(),
    featureCtaHref: z.string().optional(),
    quoteBannerColorScheme: sectionColorSchemeSchema.default('soft'),
    quoteText: z.string(),
    quoteAuthor: z.string(),
    quoteImage: z.string(),
    quoteImageAlt: z.string().optional(),
    footerBrandLine1: z.string().default('Sol Risé'),
    footerBrandLine2: z.string().default('Soprano'),
    footerBrandTagline: z.string().default('Soprano · Stage Artist\nVoice of Passion'),
    footerNavLinks: z
      .array(
        z.union([
          z.string(),
          z.object({
            label: z.string(),
            href: z.string(),
          }),
        ]),
      )
      .default([
        { label: 'Home', href: '/' },
        { label: 'Bio', href: '/bio' },
        { label: 'Career', href: '/career' },
        { label: 'Productions', href: '/productions' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Contact', href: '/contact' },
      ]),
    instagramUrl: z.string(),
    youtubeUrl: z.string(),
    facebookUrl: z.string(),
    email: z.string(),
    content: z.string(),
  }),
})

const gallery = defineCollection({
  name: 'gallery',
  directory: 'content/gallery',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    category: z.string().optional(),
    order: z.number().optional(),
    content: z.string(),
  }),
})

const mediaItems = defineCollection({
  name: 'mediaItems',
  directory: 'content/media',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    type: z.enum(['video', 'image']),
    videoUrl: z.string().optional(),
    thumbnail: z.string(),
    description: z.string(),
    order: z.number().optional(),
    content: z.string(),
  }),
})

const productions = defineCollection({
  name: 'productions',
  directory: 'content/productions',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    role: z.string(),
    venue: z.string(),
    year: z.string(),
    image: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    content: z.string(),
  }),
})

const careerPage = defineCollection({
  name: 'careerPage',
  directory: 'content/career',
  include: 'page.md',
  schema: aboutPageSchema,
})

const galleryPage = defineCollection({
  name: 'galleryPage',
  directory: 'content/gallery-landing',
  include: 'page.md',
  schema: galleryPageSchema,
})

const contactPage = defineCollection({
  name: 'contactPage',
  directory: 'content/contact',
  include: 'page.md',
  schema: contactPageSchema,
})

const productionsPage = defineCollection({
  name: 'productionsPage',
  directory: 'content/productions-landing',
  include: 'page.md',
  schema: productionsPageSchema,
})

const bioPage = defineCollection({
  name: 'bioPage',
  directory: 'content/bio',
  include: 'page.md',
  schema: bioPageSchema,
})

export default defineConfig({
  collections: [
    education,
    home,
    gallery,
    mediaItems,
    productions,
    careerPage,
    galleryPage,
    bioPage,
    contactPage,
    productionsPage,
  ],
})
