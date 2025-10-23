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
import Link from 'next/link';
import { showSuccess } from '@/utils/toast';
import { useNextRouterNavigate } from '@/utils/navigation';

const registrationSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const TeacherRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNextRouterNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsLoading(true);
    
    // Mock registration logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    showSuccess(`Registration successful for ${values.name}! Please log in.`);
    navigate('/login');
    
    setIsLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto pt-10 min-h-screen flex items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Teacher Registration</CardTitle>
          <CardDescription>Create your new ClassFlow account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ms. Frizzle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="teacher@school.edu" {...field} />
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
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Register Account'}
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Log In</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherRegistration;