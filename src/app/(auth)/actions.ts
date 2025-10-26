import { getSession, signIn } from 'next-auth/react'
import z from 'zod'
import { UserType } from './auth'
import { step1Schema } from '@/sections/auth/enroll/Step1StudentInfo'
import { step2Schema } from '@/sections/auth/enroll/Step2GuardianInfo'
import { step3Schema } from '@/sections/auth/enroll/Step3AccountSetup'

// Login Action
const authFormSchema = z.object({
  email: z.email().nonempty('Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

export interface LoginActionState {
  status: 'idle' | 'success' | 'failed' | 'invalid_data'
  message: string | 'Currently Idle'
}

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    const result = await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    })

    if (!result || result.error) {
      return { status: 'failed', message: 'Invalid credentials.' }
    }

    return {
      status: 'success',
      message: 'Successfully signed in!',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: 'invalid_data',
        message: 'Failed validating your submission.',
      }
    }

    return { status: 'failed', message: 'Invalid credentials.' }
  }
}

// Register Teacher Action
export interface RegisterActionState {
  status: 'idle' | 'success' | 'failed' | 'invalid_data'
  message: string | 'Currently Idle'
  type: UserType
}

const teacherRegisterSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  extension: z.string().optional(),
  email: z.email('Invalid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

export const registerTeacher = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const data = Object.fromEntries(formData.entries())
    const validated = teacherRegisterSchema.parse(data)

    // Example DB save
    // await db.teacher.create({ data: { ...validated } })

    // Auto sign-in after registration
    const result = await signIn('credentials', {
      email: validated.email,
      password: validated.password,
      redirect: false,
    })

    if (!result || result.error) {
      return {
        status: 'failed',
        message: 'Account created but failed to sign in automatically.',
        type: 'teacher',
      }
    }

    const session = await getSession()
    const userType = session?.user?.type ?? 'teacher'

    return {
      status: 'success',
      message: 'Teacher account created successfully!',
      type: userType as UserType,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: 'invalid_data',
        message: error.message ?? 'Invalid form data.',
        type: 'teacher',
      }
    }

    return {
      status: 'failed',
      message: 'Registration failed. Please try again later.',
      type: 'teacher',
    }
  }
}

// Enroll Student Action
export interface EnrollActionState {
  status: 'idle' | 'success' | 'failed' | 'invalid_data'
  message: string | 'Currently Idle'
}

export const enrollActionSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
})

export async function enrollStudent(
  _: EnrollActionState,
  formData: FormData
): Promise<EnrollActionState> {
  try {
    const data = Object.fromEntries(formData.entries())
    const validatedData = enrollActionSchema.parse(data)

    // Example DB insert (replace with your ORM/DB call)
    // await db.student.create({ data: parsed.data })

    const result = await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    })

    if (!result || result.error) {
      return { status: 'failed', message: 'Invalid credentials.' }
    }

    return {
      status: 'success',
      message: 'Enrollment submitted successfully!',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: 'invalid_data',
        message: 'Failed validating your submission.',
      }
    }

    return { status: 'failed', message: 'Invalid credentials.' }
  }
}
