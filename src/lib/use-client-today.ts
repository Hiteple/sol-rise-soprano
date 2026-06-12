import { useEffect, useState } from 'react'

/** Visitor-local “today” — avoids SSR timezone mismatches for TODAY badges. */
export function useClientToday(): Date | undefined {
  const [today, setToday] = useState<Date>()

  useEffect(() => {
    setToday(new Date())
  }, [])

  return today
}
