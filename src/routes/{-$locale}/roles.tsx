import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/roles')({
  component: RolesLayout,
})

function RolesLayout() {
  return <Outlet />
}
