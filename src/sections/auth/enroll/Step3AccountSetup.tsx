'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import EnrollmentStep from '@/components/EnrollmentStep'
import { EnrollFormValues } from '@/app/(auth)/enroll/page'

export default function Step3AccountSetup({
  formValues,
  setFormValues,
  errors,
}: {
  formValues: EnrollFormValues
  setFormValues: (values: EnrollFormValues) => void
  errors: Partial<Record<keyof EnrollFormValues, string>>
}) {
  const handleChange = <K extends keyof EnrollFormValues>(
    field: K,
    value: string
  ) => {
    setFormValues({ ...formValues, [field]: value })
  }

  return (
    <EnrollmentStep
      title="Create Your Account"
      description="Set up your student account for login access."
    >
      <div>
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="student@example.com"
          value={formValues.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div>
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="••••••••"
          value={formValues.password || ''}
          onChange={(e) => handleChange('password', e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>
    </EnrollmentStep>
  )
}
