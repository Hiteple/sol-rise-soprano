import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const jobs = defineCollection({
  name: 'jobs',
  directory: 'content/jobs',
  include: '**/*.md',
  schema: z.object({
    jobTitle: z.string(),
    summary: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    company: z.string(),
    location: z.string(),
    tags: z.array(z.string()),
    content: z.string(),
  }),
})

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

const blog = defineCollection({
  name: 'blog',
  directory: 'content/blog',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    content: z.string(),
  }),
})

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    github: z.string().optional(),
    liveUrl: z.string().optional(),
    image: z.string().optional(),
    content: z.string(),
  }),
})

const home = defineCollection({
  name: 'home',
  directory: 'content/home',
  include: '**/*.md',
  schema: z.object({
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    heroTagline: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    aboutTitle: z.string(),
    aboutText: z.string(),
    aboutImage: z.string(),
    aboutImageAlt: z.string(),
    aboutLinkText: z.string(),
    featureTitle: z.string(),
    featureText: z.string(),
    featureImage: z.string(),
    featureImageAlt: z.string(),
    quoteText: z.string(),
    quoteAuthor: z.string(),
    quoteImage: z.string(),
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

export default defineConfig({
  collections: [jobs, education, blog, projects, home, gallery, mediaItems, productions],
})
