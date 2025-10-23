'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import TeacherDashboard from '@/pages/TeacherDashboard'
import StudentDashboard from '@/pages/StudentDashboard'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LandingHeader from '@/components/layout/LandingHeader'
import LandingFooter from '@/components/layout/LandingFooter'
import { Check, Users, BookOpen, Zap, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const FeatureCard: React.FC<{
  title: string
  description: string
  icon: React.ReactNode
}> = ({ title, description, icon }) => (
  <Card className="text-center">
    <CardHeader className="flex flex-col items-center">
      <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm">{description}</p>
    </CardContent>
  </Card>
)

const Index = () => {
  const { isAuthenticated, role } = useAuthStore()

  if (isAuthenticated) {
    if (role === 'teacher') {
      // Teacher dashboard is wrapped in MobileLayout and is at the root path
      return (
        <MobileLayout>
          <TeacherDashboard />
        </MobileLayout>
      )
    }
    if (role === 'student') {
      // Student dashboard uses StudentLayout internally
      return <StudentDashboard />
    }
  }

  // Landing page for unauthenticated users
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-foreground leading-tight">
            ClassFlow: <span className="text-primary">Simplify</span> Your
            Teaching
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            The all-in-one platform designed by teachers, for teachers.
            Streamline class management, grading, and student engagement
            effortlessly.
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
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Core Features Built for Efficiency
            </h2>
            <div className="grid gap-8 md:grid-cols-4">
              <FeatureCard
                title="Class Management"
                description="Easily manage student rosters, enrollment codes, and class archives."
                icon={<Users className="h-6 w-6" />}
              />
              <FeatureCard
                title="Assessment Tools"
                description="Create, distribute, and grade quizzes, exams, and homework efficiently."
                icon={<BookOpen className="h-6 w-6" />}
              />
              <FeatureCard
                title="Student Randomizer"
                description="Engage every student fairly with a built-in random student caller."
                icon={<Zap className="h-6 w-6" />}
              />
              <FeatureCard
                title="Integrated Planner"
                description="Keep track of lesson plans, meetings, and due dates in one place."
                icon={<Calendar className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Classroom?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of educators who are saving time and focusing more on
            teaching.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/register">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}

export default Index
