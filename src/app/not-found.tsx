import Link from 'next/link'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-foreground p-4">
      <Frown className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-6">
        We couldn't find the page you were looking for.
      </p>
      <Link href="/login" className="text-primary hover:underline">
        Go back to Dashboard
      </Link>
    </div>
  )
}
