import { compare } from 'bcrypt-ts'
import NextAuth, { type DefaultSession } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

export type UserType = 'student' | 'teacher' | 'admin' | 'idle'

// Extend next-auth types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      type: UserType
    } & DefaultSession['user']
  }

  interface User {
    id?: string
    email?: string | null
    type: UserType
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    type: UserType
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) return null

        // Replace this with your actual DB call
        // const userFromDb = await getUserByEmail(email) // implement this
        // if (!userFromDb || !userFromDb.password) return null

        // const passwordsMatch = await compare(password, userFromDb.password)
        // if (!passwordsMatch) return null

        // // Assign type dynamically based on DB info
        // const userType: UserType =
        //   userFromDb.role === 'teacher' ? 'teacher' : 'student'

        // return {
        //   id: userFromDb.id,
        //   email: userFromDb.email,
        //   type: userType,
        // }

        return {
          id: '123',
          email: 'you@example.com',
          type: 'teacher',
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.type = user.type
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.type = token.type
      }
      return session
    },
  },
})
