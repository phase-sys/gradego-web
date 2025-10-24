import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SectionWrapper from '@/components/scaffolding/SectionWrapper'

interface CTASectionProps {
  title: string
  description?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
  bg?: 'primary' | 'secondary' | 'muted' | 'background'
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  bg = 'primary',
}: CTASectionProps) {
  return (
    <SectionWrapper
      bg={bg}
      width="7xl"
      className="text-center text-primary-foreground"
    >
      <h2 className="text-4xl font-bold mb-4">{title}</h2>

      {description && (
        <p className="text-lg text-primary-foreground/90 mb-8">{description}</p>
      )}

      <div className="space-x-4">
        {/* Primary CTA */}
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="hover:opacity-90"
        >
          <Link href={primaryHref}>{primaryLabel}</Link>
        </Button>

        {/* Secondary CTA */}
        {secondaryLabel && secondaryHref && (
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/15"
          >
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        )}
      </div>
    </SectionWrapper>
  )
}
