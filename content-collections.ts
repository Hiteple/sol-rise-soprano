import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

import { homeSectionSchema } from './schemas/home-sections'
import {
  aboutPageSchema,
  contactPageSchema,
  galleryPageSchema,
  productionsPageSchema,
} from './schemas/site-pages'

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
    instagramUrl: z.string(),
    youtubeUrl: z.string(),
    facebookUrl: z.string(),
    email: z.string(),
    content: z.string(),
  }),
})

const homeSections = defineCollection({
  name: 'homeSections',
  directory: 'content/home',
  include: 'sections.md',
  schema: z.object({
    type: z.literal('HomeSections'),
    sections: z.array(homeSectionSchema),
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

const aboutPage = defineCollection({
  name: 'aboutPage',
  directory: 'content/about',
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

export default defineConfig({
  collections: [
    education,
    home,
    homeSections,
    gallery,
    mediaItems,
    productions,
    aboutPage,
    galleryPage,
    contactPage,
    productionsPage,
  ],
})
