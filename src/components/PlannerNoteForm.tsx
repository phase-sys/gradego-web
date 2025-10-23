import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { savePlannerNote } from '@/actions/teacherActions';
import { usePlannerStore } from '@/store/plannerStore';
import { useAuthStore } from '@/store/authStore';
import { PlannerNote, NewPlannerNote, UrgencyType } from '@/models/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const urgencyOptions: { label: string, value: UrgencyType }[] = [
    { label: "Low (Blue)", value: 'low' },
    { label: "Medium (Yellow)", value: 'medium' },
    { label: "High (Red)", value: 'high' },
];

const noteSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z.string().min(5, { message: "Content is required." }),
  isPrivate: z.boolean(),
  classId: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high']),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface PlannerNoteFormProps {
  initialNote?: PlannerNote;
  date: Date;
  onSuccess: () => void;
}

const PlannerNoteForm: React.FC<PlannerNoteFormProps> = ({ initialNote, date, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNote, updateNote } = usePlannerStore();
  const teacher = useAuthStore(state => state.user);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: initialNote?.title || "",
      content: initialNote?.content || "",
      isPrivate: initialNote?.isPrivate ?? true,
      classId: initialNote?.classId?.toString() || "",
      urgency: initialNote?.urgency || 'medium',
    },
  });

  const onSubmit = async (values: NoteFormValues) => {
    if (!teacher) return;

    setIsLoading(true);
    
    const noteData: NewPlannerNote = {
        teacherId: teacher.id,
        date: date,
        title: values.title,
        content: values.content,
        isPrivate: values.isPrivate,
        classId: values.classId ? parseInt(values.classId) : undefined,
        urgency: values.urgency,
    };
    
    // Simulate API call
    const result = await savePlannerNote(noteData);
    
    if (result) {
        const finalNote: PlannerNote = { ...noteData, id: initialNote?.id || result.id, date: result.date };
        
        if (initialNote) {
            updateNote(finalNote);
        } else {
            addNote(finalNote);
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
                <Input placeholder="Lesson Plan / Meeting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Textarea placeholder="Detailed notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="urgency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Urgency / Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {urgencyOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Private Note</FormLabel>
                <p className="text-sm text-muted-foreground">
                  If checked, this note is only visible to you.
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (initialNote ? 'Save Changes' : 'Add Note')}
        </Button>
      </form>
    </Form>
  );
};

export default PlannerNoteForm;