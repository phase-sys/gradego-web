import { db } from '@/lib/db/queries'
import { users } from '@/lib/db/schema'
import { compare } from 'bcrypt-ts'
import { eq } from 'drizzle-orm'
import NextAuth, { type DefaultSession } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

export type UserType = 'student' | 'teacher' | 'admin' | 'idle'

// ============================
// Type Extensions
// ============================
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      type: UserType
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    type: UserType
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    type: UserType
  }
}

// ============================
// NextAuth Configuration
// ============================
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

        if (!email || !password) return null

        // ✅ Query user by email
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1)

        if (!user) return null

        // ✅ Verify password
        const passwordsMatch = await compare(password, user.password)
        if (!passwordsMatch) return null

        // ✅ Derive role/type safely
        const userType: UserType =
          user.role === 'teacher'
            ? 'teacher'
            : user.role === 'admin'
            ? 'admin'
            : 'student'

        // ✅ Return normalized user for NextAuth
        return {
          id: user.id.toString(),
          email: user.email,
          type: userType,
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/error',
  },

  callbacks: {
    // Add custom fields to JWT
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.type = user.type
      }
      return token
    },

    // Add custom fields to session
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.type = token.type
      }
      return session
    },
  },
})
