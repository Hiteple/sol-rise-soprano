import { createFileRoute } from '@tanstack/react-router'
import { allOrganizations, allOrganizationsPages } from 'content-collections'

import { OrganizationsIndexSection } from '@/sections/OrganizationsIndexSection'
import { publishedContentSorted } from '@/lib/content-order'
import { PageHeroSection } from '@/sections/PageHeroSection'

export const Route = createFileRoute('/organizations')({
  component: OrganizationsPage,
})

function OrganizationsPage() {
  const landing = allOrganizationsPages[0]
  const organizations = publishedContentSorted(allOrganizations)

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/organizations-landing/page.md"
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme ?? 'bright'}
        heroEyebrow={landing?.heroEyebrow ?? 'Career'}
        heroTitle={landing?.heroTitle ?? 'Organizations'}
        heroDescription={
          landing?.heroDescription ??
          'Opera houses, festivals, and companies where Sol Risé has performed.'
        }
      />
      <OrganizationsIndexSection
        organizations={organizations}
        listColorScheme={landing?.organizationsListColorScheme}
        slideIn={landing?.organizationsListSlideIn}
      />
    </div>
  )
}
