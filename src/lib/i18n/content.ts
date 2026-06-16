import {
  allBioPages,
  allCareerPages,
  allContactPages,
  allPrivacyPages,
  allGalleryPages,
  allHomes,
  allOrganizationLocaleBundles,
  allOrganizations,
  allOrganizationsPages,
  allRoleLocaleBundles,
  allRoles,
  allRolesPages,
  allScheduleEvents,
  allScheduleLocaleBundles,
  allSchedulePages,
} from 'content-collections'

import { DEFAULT_LOCALE, isLocale, type Locale } from './locales'

type WithMeta = { _meta: { path: string } }

type Organization = (typeof allOrganizations)[number]
type OrganizationPage = (typeof allOrganizationsPages)[number]
type Role = (typeof allRoles)[number]
type RolePage = (typeof allRolesPages)[number]
type ScheduleEvent = (typeof allScheduleEvents)[number]
type SchedulePage = (typeof allSchedulePages)[number]

const I18N_DOC_PREFIX = /^i18n\/(es|de|it)\//
const COLLECTION_DOC_PREFIX = /^(?:roles|schedule)\//

function localeFromDocument(doc: WithMeta): Locale {
  const match = doc._meta.path.match(/^i18n\/(es|de|it)\//)
  if (match?.[1] && isLocale(match[1])) return match[1]
  return DEFAULT_LOCALE
}

/** URL slug for roles/schedule items — stable across locales (`first-lady-die-zauberflote`). */
export function documentSlug(doc: WithMeta): string {
  const path = doc._meta.path
  const collectionMatch = path.match(/^(?:roles|schedule|organizations)\/(.+)$/)
  if (collectionMatch) return collectionMatch[1]
  return path
}

/** Stackbit / CMS object id for a content markdown file. */
export function contentMarkdownPath(doc: WithMeta): string {
  const path = doc._meta.path
  if (I18N_DOC_PREFIX.test(path) || COLLECTION_DOC_PREFIX.test(path)) {
    return `content/${path}.md`
  }
  if (path.includes('/')) return `content/${path}.md`
  return `content/roles/${path}.md`
}

function pickByLocale<T extends WithMeta>(items: T[], locale: Locale): T | undefined {
  const match = items.find((item) => localeFromDocument(item) === locale)
  if (match) return match
  if (locale !== DEFAULT_LOCALE) {
    return items.find((item) => localeFromDocument(item) === DEFAULT_LOCALE)
  }
  return items[0]
}

function organizationLocaleBundle(locale: Locale) {
  if (locale === DEFAULT_LOCALE) return undefined
  return allOrganizationLocaleBundles.find((bundle) => bundle.locale === locale)
}

function applyOrganizationOverlay(org: Organization, locale: Locale): Organization {
  if (locale === DEFAULT_LOCALE) return org

  const overlay = organizationLocaleBundle(locale)?.items[documentSlug(org)]
  if (!overlay) return org

  return {
    ...org,
    ...(overlay.summary !== undefined ? { summary: overlay.summary } : {}),
    ...(overlay.content !== undefined ? { content: overlay.content } : {}),
  }
}

function applyOrganizationsPageOverlay(page: OrganizationPage, locale: Locale): OrganizationPage {
  if (locale === DEFAULT_LOCALE) return page

  const pageOverlay = organizationLocaleBundle(locale)?.page
  if (!pageOverlay) return page

  return {
    ...page,
    ...(pageOverlay.heroEyebrow !== undefined ? { heroEyebrow: pageOverlay.heroEyebrow } : {}),
    ...(pageOverlay.heroTitle !== undefined ? { heroTitle: pageOverlay.heroTitle } : {}),
    ...(pageOverlay.heroDescription !== undefined
      ? { heroDescription: pageOverlay.heroDescription }
      : {}),
  }
}

function roleLocaleBundle(locale: Locale) {
  if (locale === DEFAULT_LOCALE) return undefined
  return allRoleLocaleBundles.find((bundle) => bundle.locale === locale)
}

function mergeRoleAppearances(
  base: Role['appearances'],
  overlay: NonNullable<ReturnType<typeof roleLocaleBundle>>['items'][string]['appearances'],
) {
  if (!overlay) return base
  return base.map((appearance, index) => {
    const item = overlay[index]
    if (!item) return appearance
    return {
      ...appearance,
      ...(item.notes !== undefined ? { notes: item.notes } : {}),
      ...(item.venue !== undefined ? { venue: item.venue } : {}),
    }
  })
}

function applyRoleOverlay(role: Role, locale: Locale): Role {
  if (locale === DEFAULT_LOCALE) return role

  const overlay = roleLocaleBundle(locale)?.items[documentSlug(role)]
  if (!overlay) return role

  return {
    ...role,
    ...(overlay.characterName !== undefined ? { characterName: overlay.characterName } : {}),
    ...(overlay.operaTitle !== undefined ? { operaTitle: overlay.operaTitle } : {}),
    ...(overlay.summary !== undefined ? { summary: overlay.summary } : {}),
    ...(overlay.tags !== undefined ? { tags: overlay.tags } : {}),
    ...(overlay.content !== undefined ? { content: overlay.content } : {}),
    ...(overlay.appearances !== undefined
      ? { appearances: mergeRoleAppearances(role.appearances, overlay.appearances) }
      : {}),
  }
}

function applyRolesPageOverlay(page: RolePage, locale: Locale): RolePage {
  if (locale === DEFAULT_LOCALE) return page

  const pageOverlay = roleLocaleBundle(locale)?.page
  if (!pageOverlay) return page

  return {
    ...page,
    ...(pageOverlay.heroEyebrow !== undefined ? { heroEyebrow: pageOverlay.heroEyebrow } : {}),
    ...(pageOverlay.heroTitle !== undefined ? { heroTitle: pageOverlay.heroTitle } : {}),
    ...(pageOverlay.heroDescription !== undefined
      ? { heroDescription: pageOverlay.heroDescription }
      : {}),
  }
}

function scheduleLocaleBundle(locale: Locale) {
  if (locale === DEFAULT_LOCALE) return undefined
  return allScheduleLocaleBundles.find((bundle) => bundle.locale === locale)
}

function mergeScheduleCast(
  base: NonNullable<ScheduleEvent['cast']>,
  overlay: NonNullable<
    NonNullable<ReturnType<typeof scheduleLocaleBundle>>['items'][string]['cast']
  >,
) {
  return base.map((member, index) => {
    const item = overlay[index]
    if (!item) return member
    return {
      ...member,
      ...(item.character !== undefined ? { character: item.character } : {}),
      ...(item.performer !== undefined ? { performer: item.performer } : {}),
    }
  })
}

function mergeScheduleProductionCredits(
  base: NonNullable<ScheduleEvent['productionCredits']>,
  overlay: NonNullable<
    NonNullable<ReturnType<typeof scheduleLocaleBundle>>['items'][string]['productionCredits']
  >,
) {
  return base.map((credit, index) => {
    const item = overlay[index]
    if (!item) return credit
    return {
      ...credit,
      ...(item.position !== undefined ? { position: item.position } : {}),
      ...(item.name !== undefined ? { name: item.name } : {}),
    }
  })
}

function applyScheduleOverlay(event: ScheduleEvent, locale: Locale): ScheduleEvent {
  if (locale === DEFAULT_LOCALE) return event

  const overlay = scheduleLocaleBundle(locale)?.items[documentSlug(event)]
  if (!overlay) return event

  return {
    ...event,
    ...(overlay.title !== undefined ? { title: overlay.title } : {}),
    ...(overlay.subtitle !== undefined ? { subtitle: overlay.subtitle } : {}),
    ...(overlay.plot !== undefined ? { plot: overlay.plot } : {}),
    ...(overlay.composer !== undefined ? { composer: overlay.composer } : {}),
    ...(overlay.venue !== undefined ? { venue: overlay.venue } : {}),
    ...(overlay.city !== undefined ? { city: overlay.city } : {}),
    ...(overlay.imageAlt !== undefined ? { imageAlt: overlay.imageAlt } : {}),
    ...(overlay.badges !== undefined ? { badges: overlay.badges } : {}),
    ...(overlay.content !== undefined ? { content: overlay.content } : {}),
    ...(overlay.cast !== undefined
      ? { cast: mergeScheduleCast(event.cast ?? [], overlay.cast) }
      : {}),
    ...(overlay.productionCredits !== undefined
      ? {
          productionCredits: mergeScheduleProductionCredits(
            event.productionCredits ?? [],
            overlay.productionCredits,
          ),
        }
      : {}),
  }
}

function applySchedulePageOverlay(page: SchedulePage, locale: Locale): SchedulePage {
  if (locale === DEFAULT_LOCALE) return page

  const pageOverlay = scheduleLocaleBundle(locale)?.page
  if (!pageOverlay) return page

  return {
    ...page,
    ...(pageOverlay.heroEyebrow !== undefined ? { heroEyebrow: pageOverlay.heroEyebrow } : {}),
    ...(pageOverlay.heroTitle !== undefined ? { heroTitle: pageOverlay.heroTitle } : {}),
    ...(pageOverlay.heroDescription !== undefined
      ? { heroDescription: pageOverlay.heroDescription }
      : {}),
  }
}

export function getHomePage(locale: Locale) {
  const page = pickByLocale(allHomes, locale) ?? allHomes[0]
  if (!page) return page

  const base = pickByLocale(allHomes, DEFAULT_LOCALE) ?? allHomes[0]
  if (!base || page === base) return page

  return {
    ...page,
    headerBrandLogo: page.headerBrandLogo ?? base.headerBrandLogo,
    footerBrandLogo: page.footerBrandLogo ?? base.footerBrandLogo,
  }
}

export function getBioPage(locale: Locale) {
  return pickByLocale(allBioPages, locale) ?? allBioPages[0]
}

export function getCareerPage(locale: Locale) {
  return pickByLocale(allCareerPages, locale) ?? allCareerPages[0]
}

export function getContactPage(locale: Locale) {
  return pickByLocale(allContactPages, locale) ?? allContactPages[0]
}

export function getPrivacyPage(locale: Locale) {
  return pickByLocale(allPrivacyPages, locale) ?? allPrivacyPages[0]
}

export function getGalleryPage(locale: Locale) {
  return pickByLocale(allGalleryPages, locale) ?? allGalleryPages[0]
}

export function getRolesPage(locale: Locale) {
  const page = allRolesPages[0]
  if (!page) return undefined
  return applyRolesPageOverlay(page, locale)
}

export function getOrganizationsPage(locale: Locale) {
  const page = allOrganizationsPages[0]
  if (!page) return undefined
  return applyOrganizationsPageOverlay(page, locale)
}

export function getSchedulePage(locale: Locale) {
  const page = allSchedulePages[0]
  if (!page) return undefined
  return applySchedulePageOverlay(page, locale)
}

export function getRole(slug: string, locale: Locale) {
  const base = allRoles.find((role) => documentSlug(role) === slug)
  if (!base) return undefined
  return applyRoleOverlay(base, locale)
}

export function getScheduleEvent(slug: string, locale: Locale) {
  const base = allScheduleEvents.find((event) => documentSlug(event) === slug)
  if (!base) return undefined
  return applyScheduleOverlay(base, locale)
}

export function getAllRoles(locale: Locale) {
  return allRoles
    .map((role) => applyRoleOverlay(role, locale))
    .filter((role): role is Role => Boolean(role))
}

export function getAllScheduleEvents(locale: Locale) {
  return allScheduleEvents
    .map((event) => applyScheduleOverlay(event, locale))
    .filter((event): event is ScheduleEvent => Boolean(event))
}

export function getOrganization(slug: string, locale: Locale) {
  const base = allOrganizations.find((org) => documentSlug(org) === slug)
  if (!base) return undefined
  return applyOrganizationOverlay(base, locale)
}

export function getAllOrganizations(locale: Locale) {
  return allOrganizations
    .map((org) => applyOrganizationOverlay(org, locale))
    .filter((org): org is Organization => Boolean(org))
}
