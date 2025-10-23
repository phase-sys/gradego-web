"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { loginUser } from '@/actions/teacherActions';
import { useAuthStore } from '@/store/authStore';
import { MOCK_TEACHER, MOCK_STUDENT_USER } from '@/db/mockData';
import Link from 'next/link';
import { showError, showSuccess } from '@/utils/toast';
import { useNextRouterNavigate } from '@/utils/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);
  const navigate = useNextRouterNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // Default to teacher credentials for easy testing
      email: "frizzle@acme.edu",
      password: "password123",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    // Mock authentication logic
    let userToLogin = null;
    let role: 'teacher' | 'student' | null = null;

    if (values.email === MOCK_TEACHER.email && values.password === "password123") {
        userToLogin = MOCK_TEACHER;
        role = 'teacher';
    } else if (values.email === MOCK_STUDENT_USER.email && values.password === "password123") {
        userToLogin = MOCK_STUDENT_USER;
        role = 'student';
    }

    if (userToLogin && role) {
        // Simulate successful login API call
        await loginUser(values);
        login(userToLogin, role);
        showSuccess(`Logged in as ${role}.`);
        
        if (role === 'teacher') {
            navigate('/'); // Teacher dashboard is at root
        } else {
            navigate('/student/dashboard');
        }
    } else {
        showError("Invalid credentials. Try Teacher: frizzle@acme.edu / password123 or Student: alice@example.com / password123");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto pt-10 min-h-screen flex items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Login</CardTitle>
          <CardDescription>Sign in as a Teacher or Student.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="user@school.edu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Log In'}
              </Button>
            </form>
          </Form>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Don't have an account? <Link href="/register" className="text-primary hover:underline font-medium">Register as a Teacher</Link>
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Hint: Use teacher email (frizzle@acme.edu) or student email (alice@example.com) with password 'password123'.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;