import { z } from 'zod'

// Step 1 schema
export const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  extension: z.string().optional(),
  sex: z.string().min(1, 'Please select from the choices'),
  gender: z.string().optional(),
  birthday: z.string().min(1, 'Birthday is required'),
  lrn: z.string().superRefine((val, ctx) => {
    if (!val || val.trim() === '') {
      ctx.addIssue({ code: 'custom', message: 'LRN is required' })
      return
    }
    if (!/^\d+$/.test(val)) {
      ctx.addIssue({ code: 'custom', message: 'LRN must contain only numbers' })
    }
  }),
  interestingFact: z.string().optional(),
})

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

// Step 3 schema
export const step3Schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// Combined schema for enrollment action
export const enrollActionSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
})
