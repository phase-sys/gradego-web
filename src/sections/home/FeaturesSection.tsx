import FeatureCard from '@/components/FeatureCard'
import SectionWrapper from '@/components/scaffolding/SectionWrapper'
import { Users, BookOpen, Zap, Calendar } from 'lucide-react'

export const featuresData = [
  {
    title: 'Class Management',
    description:
      'Easily manage student rosters, enrollment codes, and class archives.',
    icon: Users,
  },
  {
    title: 'Assessment Tools',
    description:
      'Create, distribute, and grade quizzes, exams, and homework efficiently.',
    icon: BookOpen,
  },
  {
    title: 'Student Randomizer',
    description:
      'Engage every student fairly with a built-in random student caller.',
    icon: Zap,
  },
  {
    title: 'Integrated Planner',
    description:
      'Keep track of lesson plans, meetings, and due dates in one place.',
    icon: Calendar,
  },
]

export function FeaturesSection() {
  return (
    <SectionWrapper bg="muted" width="7xl" className="text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">
          Core Features Built for Efficiency
        </h2>
        <div className="grid gap-8 md:grid-cols-4">
          {featuresData.map(({ title, description, icon: Icon }) => (
            <FeatureCard
              key={title}
              title={title}
              description={description}
              icon={<Icon className="h-6 w-6 text-primary" />}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
