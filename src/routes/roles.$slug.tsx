import { createFileRoute, notFound } from '@tanstack/react-router'
import { allGalleries, allOrganizations, allRoles, allScheduleEvents } from 'content-collections'

import { NotFoundSection } from '@/components/NotFoundSection'
import { filterPublishedContent, isPublishedContent } from '@/lib/content-order'
import { pageHead, performanceRoleJsonLd } from '@/lib/seo'
import { RoleDetailSection } from '@/sections/RoleDetailSection'

export const Route = createFileRoute('/roles/$slug')({
  loader: ({ params }) => {
    const role = allRoles.find((entry) => entry._meta.path === params.slug)
    if (!role || !isPublishedContent(role.order)) throw notFound()
    return { role }
  },
  head: ({ loaderData }) => {
    const role = loaderData.role
    const path = `/roles/${role._meta.path}`

    return {
      ...pageHead({
        title: `${role.characterName} — ${role.operaTitle}`,
        description: role.summary,
        path,
        imagePath: role.heroImage,
        type: 'article',
      }),
      scripts: [
        performanceRoleJsonLd({
          characterName: role.characterName,
          operaTitle: role.operaTitle,
          composer: role.composer,
          summary: role.summary,
          path,
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

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id={`content/roles/${role._meta.path}.md`}>
      <RoleDetailSection
        role={role}
        galleryItems={filterPublishedContent(allGalleries)}
        organizations={allOrganizations}
        scheduleEvents={allScheduleEvents}
      />
    </div>
  )
}

function RoleNotFound() {
  return (
    <NotFoundSection
      eyebrow="Career · Performances"
      title="Role not found"
      description="This role is not in the repertoire listing yet — it may be unpublished or the link may be outdated."
      backHref="/roles"
      backLabel="Back to roles"
    />
  )
}
