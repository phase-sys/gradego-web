'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * A typed wrapper around Next.js router.push() for simple, declarative navigation.
 * Example: const navigate = useNextRouterNavigate(); navigate('/dashboard')
 */
export function useNextRouterNavigate() {
  const router = useRouter()

  const navigate = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router]
  )

  return navigate
}
