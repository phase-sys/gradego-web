'use client'

import { ReactNode } from 'react'

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Vibrant animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-400 to-cyan-300 animate-gradient" />

      {/* Strong glassmorphism blur layer */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl saturate-150" />

      {/* Foreground content */}
      <div className="relative z-10 flex w-full items-center justify-center">
        {children}
      </div>
    </div>
  )
}
