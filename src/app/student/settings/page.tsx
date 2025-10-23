"use client";

import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Save, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import ProfilePictureUploader from '@/components/ProfilePictureUploader';
import { Student } from '@/models/types';

const studentProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')),
});

type StudentProfileFormValues = z.infer<typeof studentProfileSchema>;

const StudentSettings = () => {
  const { user, updateProfile } = useAuthStore();
  const student = user as Student;
  const [isLoading, setIsLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(student?.photoUrl || undefined);

  const form = useForm<StudentProfileFormValues>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      name: student?.name || "",
      email: student?.email || "",
    },
  });

  const onSubmit = async (values: StudentProfileFormValues) => {
    if (!student) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    updateProfile({
        name: values.name,
        email: values.email || undefined,
        photoUrl: photoUrl,
    });
    
    setIsLoading(false);
  };
  
  if (!student) return <StudentLayout><div className="p-4">Loading...</div></StudentLayout>;

  return (
    <StudentLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold flex items-center">
            <User className="h-6 w-6 mr-2" /> Profile Settings
        </h1>
        <p className="text-muted-foreground">Manage your personal information and profile picture.</p>

        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ProfilePictureUploader 
                currentPhotoUrl={photoUrl}
                onPhotoSelect={setPhotoUrl}
                name={student.name}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
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
                        <Input placeholder="Jane Doe" {...field} />
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
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentSettings;