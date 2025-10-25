import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const secret = process.env.NEXTAUTH_SECRET

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret })

  const { pathname } = req.nextUrl

  // Redirect logged-in users away from login page
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL(`/${token.type}`, req.url))
  }

  // Protect routes
  if (pathname.startsWith('/student')) {
    if (!token || token.type !== 'student') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if (pathname.startsWith('/teacher')) {
    if (!token || token.type !== 'teacher') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if (pathname.startsWith('/admin')) {
    if (!token || token.type !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/student/:path*', '/teacher/:path*', '/admin/:path*'],
}
