import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { DEFAULT_LOCALE, isLocale, parseLocaleParam } from '@/lib/i18n'

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ params }) => {
    if (params.locale && !isLocale(params.locale)) {
      throw redirect({ to: '/' })
    }
    if (params.locale === DEFAULT_LOCALE) {
      throw redirect({ to: '/' })
    }
    const locale = parseLocaleParam(params.locale)
    return { locale }
  },
  component: () => <Outlet />,
})
