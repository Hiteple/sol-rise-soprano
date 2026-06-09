import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { allGalleries, allOrganizations, allRoles } from 'content-collections'

import { RoleDetailSection } from '@/sections/RoleDetailSection'

export const Route = createFileRoute('/roles/$slug')({
  loader: ({ params }) => {
    const role = allRoles.find((entry) => entry._meta.path === params.slug)
    if (!role) throw notFound()
    return { role }
  },
  component: RoleDetailPage,
  notFoundComponent: RoleNotFound,
})

function RoleDetailPage() {
  const { role } = Route.useLoaderData()

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id={`content/roles/${role._meta.path}.md`}>
      <RoleDetailSection role={role} galleryItems={allGalleries} organizations={allOrganizations} />
    </div>
  )
}

function RoleNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl italic mb-4">Role not found</h1>
      <p className="font-body text-sm mb-8" style={{ color: 'var(--muted-text-color)' }}>
        This role page does not exist or has been moved.
      </p>
      <Link to="/roles" className="gold-link font-body text-xs uppercase tracking-widest">
        Back to roles
      </Link>
    </div>
  )
}
