import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { createAssessment } from '@/actions/teacherActions';
import { useAssessmentListStore } from '@/store/assessmentListStore';
import { useClassStore } from '@/store/classStore';
import { Assessment, NewAssessment } from '@/models/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const assessmentSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  maxScore: z.string().regex(/^\d+$/, { message: "Must be a number." }).transform(Number),
  type: z.enum(["quiz", "exam", "homework"]),
  dueDate: z.string().optional(), // Simplified date handling for form
});

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

interface AssessmentFormProps {
  initialAssessment?: Assessment;
  onSuccess: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ initialAssessment, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addAssessment, updateAssessment } = useAssessmentListStore();
  const { activeClassId } = useClassStore();

  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: initialAssessment?.title || "",
      maxScore: initialAssessment?.maxScore || 100,
      type: initialAssessment?.type || "quiz",
      dueDate: initialAssessment?.dueDate ? initialAssessment.dueDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (values: AssessmentFormValues) => {
    if (!activeClassId) return;

    setIsLoading(true);
    
    const assessmentData: NewAssessment = {
        classId: activeClassId,
        title: values.title,
        type: values.type,
        dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
        maxScore: values.maxScore,
        isPublished: initialAssessment?.isPublished ?? false,
        createdAt: initialAssessment?.createdAt || new Date(),
    };

    // Simulate API call
    const result = await createAssessment(assessmentData);
    
    if (result) {
        const finalAssessment: Assessment = { ...assessmentData, id: initialAssessment?.id || result.id };
        
        if (initialAssessment) {
            updateAssessment(finalAssessment);
        } else {
            addAssessment(finalAssessment);
        }
        onSuccess();
    }
    
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Chapter 1 Quiz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assessment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="homework">Homework</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Score</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (initialAssessment ? 'Save Changes' : 'Create Assessment')}
        </Button>
      </form>
    </Form>
  );
};

export default AssessmentForm;