import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { createClass } from '@/actions/teacherActions';
import { useClassStore } from '@/store/classStore';
import { useAuthStore } from '@/store/authStore';
import { Class } from '@/models/types';

const classSchema = z.object({
  name: z.string().min(3, { message: "Class name must be at least 3 characters." }),
  themeColor: z.string().optional(),
});

type ClassFormValues = z.infer<typeof classSchema>;

interface ClassFormProps {
  onSuccess: () => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const addClass = useClassStore(state => state.addClass);
  const teacher = useAuthStore(state => state.user);

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      themeColor: "blue",
    },
  });

  const onSubmit = async (values: ClassFormValues) => {
    if (!teacher) return;

    setIsLoading(true);
    
    const newClassData = {
        tenantId: teacher.tenantId,
        teacherId: teacher.id,
        name: values.name,
        enrollmentCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        themeColor: values.themeColor || "blue",
        bannerUrl: undefined,
        createdAt: new Date(),
    };

    // Simulate API call
    const result = await createClass(newClassData);
    
    if (result) {
        // Add the newly created class to the store
        addClass(result as Class);
        onSuccess();
    }
    
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="8th Grade Algebra" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Theme Color Picker Placeholder */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Class'}
        </Button>
      </form>
    </Form>
  );
};

export default ClassForm;