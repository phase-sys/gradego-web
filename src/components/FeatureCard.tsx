import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
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
}
