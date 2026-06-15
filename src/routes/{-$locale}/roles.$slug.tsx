import { createFileRoute, notFound } from '@tanstack/react-router'
import { allGalleries } from 'content-collections'

import { NotFoundSection } from '@/components/NotFoundSection'
import { useLocale } from '@/components/LocaleContext'
import { filterPublishedContent, isPublishedContent } from '@/lib/content-order'
import {
  contentMarkdownPath,
  documentSlug,
  getAllOrganizations,
  getAllScheduleEvents,
  getRole,
} from '@/lib/i18n/content'
import { localizePath } from '@/lib/i18n'
import { pageHead, performanceRoleJsonLd, seoLocaleFromParams } from '@/lib/seo'
import { RoleDetailSection } from '@/sections/RoleDetailSection'

export const Route = createFileRoute('/{-$locale}/roles/$slug')({
  loader: ({ params }) => {
    const locale = seoLocaleFromParams(params)
    const role = getRole(params.slug, locale)
    if (!role || !isPublishedContent(role.order)) throw notFound()
    return { role }
  },
  head: ({ loaderData, params }) => {
    const { role } = loaderData
    const locale = seoLocaleFromParams(params)
    const slug = documentSlug(role)
    const path = `/roles/${slug}`

    return {
      ...pageHead({
        title: `${role.characterName} — ${role.operaTitle}`,
        description: role.summary,
        path,
        imagePath: role.heroImage,
        type: 'article',
        locale,
        alternateLocales: false,
      }),
      scripts: [
        performanceRoleJsonLd({
          characterName: role.characterName,
          operaTitle: role.operaTitle,
          composer: role.composer,
          summary: role.summary,
          path: localizePath(path, locale),
          heroImage: role.heroImage,
        }),
      ],
    }
  },
  component: RoleDetailPage,
  notFoundComponent: RoleNotFound,
})

function RoleDetailPage() {
  const { role } = Route.useLoaderData()
  const { locale } = useLocale()

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id={contentMarkdownPath(role)}>
      <RoleDetailSection
        role={role}
        galleryItems={filterPublishedContent(allGalleries)}
        organizations={getAllOrganizations(locale)}
        scheduleEvents={getAllScheduleEvents(locale)}
      />
    </div>
  )
}

function RoleNotFound() {
  const { messages } = useLocale()
  const nf = messages.role.notFound

  return (
    <NotFoundSection
      eyebrow={nf.eyebrow}
      title={nf.title}
      description={nf.description}
      backHref="/roles"
      backLabel={nf.backLabel}
    />
  )
}
