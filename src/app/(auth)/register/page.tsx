'use client'

import { useActionState, useEffect, useState } from 'react'
import Form from 'next/form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Home } from 'lucide-react'
import { registerTeacher, RegisterActionState } from '@/app/(auth)/actions'
import { showError, showSuccess } from '@/lib/toast'
import { useNextRouterNavigate } from '@/lib/navigation'
import AuthWrapper from '@/components/scaffolding/AuthWrapper'

export default function RegisterTeacherPage() {
  const { refresh } = useNextRouterNavigate()
  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    registerTeacher,
    { status: 'idle', message: 'Currently Idle', type: 'teacher' }
  )
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state.status === 'success') {
      showSuccess(state.message)
      refresh()
    } else if (state.status === 'failed' || state.status === 'invalid_data') {
      showError(state.message)
    }
  }, [state, refresh])

  return (
    <AuthWrapper>
      <Card className="w-full max-w-md shadow-xl border border-blue-100">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-blue-700">
            Teacher Registration
          </CardTitle>
          <p className="text-sm text-gray-500">
            Create your teacher account to manage classes
          </p>
        </CardHeader>

        <CardContent>
          <Form action={formAction} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input id="middleName" name="middleName" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="extension">Extension (optional)</Label>
                <Input id="extension" name="extension" placeholder="Jr., III" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative w-full">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Create Teacher Account
            </Button>
          </Form>

          {/* Already have an account */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors"
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthWrapper>
  )
}
