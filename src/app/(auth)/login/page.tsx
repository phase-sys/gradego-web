'use client'

import { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import Form from 'next/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { login, LoginActionState } from '../actions'
import { showError, showSuccess } from '@/lib/toast'
import { useNextRouterNavigate } from '@/lib/navigation'

export default function SignInPage() {
  const { navigate } = useNextRouterNavigate()
  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: 'idle',
      message: 'Currently Idle',
      type: 'idle',
    }
  )
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state.status === 'failed') {
      showError(state.message)
    } else if (state.status === 'invalid_data') {
      showError(state.message)
    } else if (state.status === 'success') {
      showSuccess(state.message)
      navigate(`/${state.type}`)
    }
  }, [state.status, state.message, state.type, navigate])

  const handleSubmit = (formData: FormData) => {
    formAction(formData)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
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
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Sign In
            </Button>
          </Form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
