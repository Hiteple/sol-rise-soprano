import { createRouter } from '@tanstack/react-router'

import { NotFoundSection } from '@/components/NotFoundSection'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => (
      <NotFoundSection
        eyebrow="Lost in the wings"
        title="Page not found"
        description="The page you are looking for does not exist, may have moved, or is not yet published."
        backHref="/"
        backLabel="Return home"
        homeLabel="Return home"
      />
    ),
  })

  return router
}
