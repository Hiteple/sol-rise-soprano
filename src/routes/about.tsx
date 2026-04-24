import { createFileRoute } from '@tanstack/react-router'
import { Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutRedirect,
})

function AboutRedirect() {
  return <Navigate to="/career" replace />
}
