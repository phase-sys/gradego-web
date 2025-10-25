'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * A typed wrapper around Next.js router.push() for simple, declarative navigation
 * with an option to refresh the current route.
 * Example:
 *   const { navigate, refresh } = useNextRouterNavigate();
 *   navigate('/dashboard');
 *   refresh();
 */
export function useNextRouterNavigate() {
  const router = useRouter()

  const navigate = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router]
  )

  const refresh = useCallback(() => {
    router.refresh()
  }, [router])

  return { navigate, refresh }
}
