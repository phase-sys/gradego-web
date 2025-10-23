import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GraduationCap } from 'lucide-react'

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">GradeGo!</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
