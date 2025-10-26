'use client'

import { signOut } from 'next-auth/react'

export default function StudentPage() {
  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </header>

      <main>
        <p>Welcome to your dashboard!</p>
        {/* Other content here */}
      </main>
    </div>
  )
}
