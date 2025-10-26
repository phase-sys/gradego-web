import { ReactNode } from 'react'

interface EnrollmentStepProps {
  title: string
  description?: string
  children: ReactNode
}

export default function EnrollmentStep({
  title,
  description,
  children,
}: EnrollmentStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  )
}
