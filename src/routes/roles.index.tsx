import { createFileRoute } from '@tanstack/react-router'
import { allRoles, allRolesPages } from 'content-collections'

import { PageHeroSection } from '@/sections/PageHeroSection'
import { RolesIndexSection } from '@/sections/RolesIndexSection'

export const Route = createFileRoute('/roles/')({
  component: RolesPage,
})

function RolesPage() {
  const landing = allRolesPages[0]
  const roles = [...allRoles].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/roles-landing/page.md"
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme}
        heroEyebrow={landing?.heroEyebrow ?? 'Repertoire'}
        heroTitle={landing?.heroTitle ?? 'Roles'}
        heroDescription={
          landing?.heroDescription ??
          'Operatic characters Sol Risé has brought to the stage — with performance history and photography.'
        }
      />
      <RolesIndexSection
        roles={roles}
        listColorScheme={landing?.rolesListColorScheme}
        slideIn={landing?.rolesListSlideIn}
      />
    </div>
  )
}
