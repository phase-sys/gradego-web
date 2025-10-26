'use server'

import z from 'zod'
import { enrollActionSchema } from '@/sections/auth/enroll/step-schemas'
import { teachers, users } from '@/lib/db/schema'
import { db } from '@/lib/db/queries'
import { generateHashedPassword } from '@/lib/db/utils'
import { signIn } from '@/app/(auth)/auth'
import { NeonDbError } from '@neondatabase/serverless'

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

    // 1️⃣ Hash password
    const hashedPassword = generateHashedPassword(validated.password)

    // 2️⃣ Insert into users table
    const [user] = await db
      .insert(users)
      .values({
        email: validated.email,
        password: hashedPassword,
        role: 'teacher',
      })
      .returning({ id: users.id })

    // 3️⃣ Insert into teachers table
    await db.insert(teachers).values({
      userId: user.id,
      firstName: validated.firstName,
      middleName: validated.middleName,
      lastName: validated.lastName,
      extension: validated.extension,
    })

    // 4️⃣ Auto sign-in after registration
    const result = await signIn('credentials', {
      email: validated.email,
      password: validated.password,
      redirect: false,
    })

    if (!result || result.error) {
      return {
        status: 'failed',
        message: 'Account created but failed to sign in automatically.',
      }
    }

    return {
      status: 'success',
      message: 'Teacher account created successfully!',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: 'invalid_data',
        message: error.message ?? 'Invalid form data.',
      }
    }

    if (
      error instanceof Error &&
      'cause' in error &&
      error.cause instanceof NeonDbError
    ) {
      console.error('Database Error Code:', error.cause.code)

      if (error.cause.code === '23505') {
        return {
          status: 'failed',
          message: 'Email already exists. Please use a different one.',
        }
      }
    }

    return {
      status: 'failed',
      message: 'Registration failed. Please try again later.',
    }
  }
}

// Enroll Student Action
export interface EnrollActionState {
  status: 'idle' | 'success' | 'failed' | 'invalid_data'
  message: string | 'Currently Idle'
}

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
