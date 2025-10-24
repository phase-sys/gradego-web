'use client'

import { GraduationCap } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="relative flex flex-col items-center justify-center">
        <GraduationCap className="h-20 w-20 text-primary animate-pulse" />
        <p className="text-base text-muted-foreground mt-6 animate-pulse">
          Preparing your classroom...
        </p>
      </div>
    </div>
  )
}
