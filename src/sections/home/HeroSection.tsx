import SectionWrapper from '@/components/scaffolding/SectionWrapper'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <SectionWrapper bg="background" width="7xl" className="text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-foreground leading-tight">
        GradeGo!
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
        The all-in-one platform for teachers. Streamline class management,
        grading, and student engagement effortlessly.
      </p>

      <div className="flex justify-center space-x-4">
        <Button asChild size="lg">
          <Link href="/register">Start Teaching for Free</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/pricing">View Pricing</Link>
        </Button>
      </div>

      <div className="mt-12 text-sm text-muted-foreground">
        <p className="flex items-center justify-center space-x-4">
          <span className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-1" /> No Credit Card
            Required
          </span>
          <span className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-1" /> Mobile-First
            Design
          </span>
        </p>
      </div>
    </SectionWrapper>
  )
}
