"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showSuccess } from "@/utils/toast";

const exportSchema = z.object({
  dataType: z.enum(["students", "grades", "attendance", "assessments"], {
    required_error: "Please select a data type to export.",
  }),
});

type ExportFormValues = z.infer<typeof exportSchema>;

const ExportData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ExportFormValues>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      dataType: "students",
    },
  });

  const onSubmit = async (values: ExportFormValues) => {
    setIsLoading(true);
    
    console.log(`Exporting data type: ${values.dataType}`);
    
    // Simulate data processing and download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showSuccess(`Successfully generated and downloaded ${values.dataType} data! (Mock Download)`);
    
    setIsLoading(false);
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold flex items-center">
            <Download className="h-6 w-6 mr-2" /> Export Data
        </h1>
        <p className="text-muted-foreground">Generate and download class data for external use or record keeping.</p>

        <Card>
          <CardHeader>
            <CardTitle>Data Export Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="dataType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Data Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select data type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="students">Student List (Roster)</SelectItem>
                          <SelectItem value="grades">Grades & Scores</SelectItem>
                          <SelectItem value="attendance">Attendance Records</SelectItem>
                          <SelectItem value="assessments">Assessment Details</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><FileText className="h-4 w-4 mr-2" /> Export as CSV</>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default ExportData;