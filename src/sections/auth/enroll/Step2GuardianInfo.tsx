'use client'

import EnrollmentStep from '@/components/EnrollmentStep'
import Field from '@/components/Field'
import { EnrollFormValues } from '@/app/(auth)/enroll/page'
import z from 'zod'

// Step 2 schema
export const step2Schema = z.object({
  guardianFirstName: z.string().min(1, 'First name is required'),
  guardianMiddleName: z.string().optional(),
  guardianLastName: z.string().min(1, 'Last name is required'),
  guardianExtension: z.string().optional(),
  guardianRelationship: z.string().min(1, 'Relationship is required'),
  guardianNumber: z
    .string()
    .regex(
      /^09\d{9}$/,
      'Invalid number. Must start with 09 and have 11 digits'
    ),
})

// Type derived from schema
export type Step2FormValues = z.infer<typeof step2Schema>

const fields = [
  {
    label: 'Guardian First Name',
    name: 'guardianFirstName',
    placeholder: 'Maria',
  },
  {
    label: 'Guardian Middle Name',
    name: 'guardianMiddleName',
    placeholder: 'Optional',
  },
  {
    label: 'Guardian Last Name',
    name: 'guardianLastName',
    placeholder: 'Dela Cruz',
  },
  {
    label: 'Guardian Extension',
    name: 'guardianExtension',
    placeholder: 'Sr., Jr., etc. (optional)',
  },
  {
    label: 'Guardian Relationship',
    name: 'guardianRelationship',
    placeholder: 'Father, Mother, etc.',
  },
  {
    label: 'Guardian Contact Number',
    name: 'guardianNumber',
    placeholder: '09123456789',
  },
]

export default function Step2GuardianInfo({
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
      title="Guardian Information"
      description="Provide contact details of your parent or guardian."
    >
      {fields.map((field) => (
        <Field
          key={field.name}
          label={field.label}
          name={field.name}
          placeholder={field.placeholder}
          value={formValues[field.name as keyof EnrollFormValues] || ''}
          onChange={(e) =>
            handleChange(field.name as keyof EnrollFormValues, e.target.value)
          }
          error={errors[field.name as keyof EnrollFormValues]}
        />
      ))}
    </EnrollmentStep>
  )
}
