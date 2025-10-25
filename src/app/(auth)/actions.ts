import { getSession, signIn } from 'next-auth/react'
import z from 'zod'
import { UserType } from './auth'

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
  type: UserType
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
      return { status: 'failed', message: 'Invalid credentials.', type: 'idle' }
    }

    // Get the session to know the user type
    const session = await getSession()
    const userType = session?.user?.type ?? 'idle'

    return {
      status: 'success',
      message: 'Successfully signed in!',
      type: userType as UserType,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: 'invalid_data',
        message: 'Failed validating your submission.',
        type: 'idle',
      }
    }

    return { status: 'failed', message: 'Invalid credentials.', type: 'idle' }
  }
}
