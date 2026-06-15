import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/schedule')({
  component: ScheduleLayout,
})

function ScheduleLayout() {
  return <Outlet />
}
