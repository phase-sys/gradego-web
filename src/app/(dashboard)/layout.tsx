import { ReactNode } from 'react'
import Link from 'next/link'

type DashboardLayoutProps = {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div>
      <header className="bg-gray-200 p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <nav>
          <ul className="flex gap-4">
            <>
              <li>
                <Link href="/teacher/classes">Classes</Link>
              </li>
              <li>
                <Link href="/teacher/students">Students</Link>
              </li>
            </>
          </ul>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  )
}
