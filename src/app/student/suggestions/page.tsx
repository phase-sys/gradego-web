"use client";

import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useSuggestionStore } from '@/store/suggestionStore';
import { Suggestion } from '@/models/types';
import { useState } from 'react';

const suggestionSchema = z.object({
  content: z.string().min(10, { message: "Suggestion must be at least 10 characters long." }),
  isAnonymous: z.boolean(),
});

type SuggestionFormValues = z.infer<typeof suggestionSchema>;

const StudentSuggestions = () => {
  const { user } = useAuthStore();
  const addSuggestion = useSuggestionStore(state => state.addSuggestion);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      content: "",
      isAnonymous: false,
    },
  });

  const onSubmit = async (values: SuggestionFormValues) => {
    if (!user) return; // Should be protected by layout

    setIsLoading(true);
    
    // Mock submission delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newSuggestion: Suggestion = {
        id: Date.now(),
        tenantId: 1, // Mock tenant ID
        studentId: values.isAnonymous ? undefined : user.id,
        content: values.content,
        isAnonymous: values.isAnonymous,
        createdAt: new Date(),
    };
    
    addSuggestion(newSuggestion);
    form.reset();
    setIsLoading(false);
  };

  return (
    <StudentLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold flex items-center">
            <MessageSquare className="h-6 w-6 mr-2" /> Suggestions
        </h1>
        <p className="text-muted-foreground">Share your feedback with your teacher anonymously or with your name attached.</p>

        <Card>
          <CardHeader>
            <CardTitle>Submit a Suggestion</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Suggestion</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="I suggest we..." 
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isAnonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Submit Anonymously</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Your name will not be attached to this suggestion.
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
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit Suggestion'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentSuggestions;