import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useClassDataStore } from '@/store/classDataStore';
import { Student } from '@/models/types';

const studentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentFormProps {
  initialStudent?: Student;
  onSuccess: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialStudent, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addStudent, updateStudent } = useClassDataStore();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: initialStudent?.name || "",
      email: initialStudent?.email || "",
    },
  });

  const onSubmit = async (values: StudentFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (initialStudent) {
        const updatedStudent: Student = {
            ...initialStudent,
            name: values.name,
            email: values.email || undefined,
        };
        updateStudent(updatedStudent);
    } else {
        const newStudentData = {
            name: values.name,
            email: values.email || undefined,
            photoUrl: undefined,
            authUserId: undefined,
        };
        addStudent(newStudentData);
    }
    
    onSuccess();
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
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (initialStudent ? 'Save Changes' : 'Add Student')}
        </Button>
      </form>
    </Form>
  );
};

export default StudentForm;