'use client'

import LandingHeader from '@/components/scaffolding/LandingHeader'
import LandingFooter from '@/components/scaffolding/LandingFooter'
import { useNextRouterNavigate } from '@/utils/navigation'
import { useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import PageWrapper from '@/components/scaffolding/PageWrapper'
import HeroSection from '@/sections/home/HeroSection'
import { CTASection } from '@/components/CTASection'
import { FeaturesSection } from '@/sections/home/FeaturesSection'

export default function Index() {
  // const navigate = useNextRouterNavigate()

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (role === 'teacher') {
  //       navigate('/teacher/dashboard')
  //     }
  //     if (role === 'student') {
  //       navigate('/student/dashboard')
  //     }
  //   }
  // }, [isAuthenticated, role, navigate])

  // if (isAuthenticated) {
  //   return <LoadingScreen />
  // }

  return (
    <PageWrapper>
      <LandingHeader />

      <HeroSection />
      <FeaturesSection />
      <CTASection
        title="Ready to Transform Your Classroom?"
        description="Join thousands of educators who are saving time and focusing more on teaching."
        primaryLabel="Get Started Now"
        primaryHref="/register"
        secondaryLabel="Learn More"
        secondaryHref="/about"
      />

      <LandingFooter />
    </PageWrapper>
  )
}
