import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/roles')({
  component: RolesLayout,
})

function RolesLayout() {
  return <Outlet />
}
