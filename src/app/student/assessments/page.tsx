"use client";

import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClassStore } from '@/store/classStore';
import { useAssessmentListStore } from '@/store/assessmentListStore';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, Clock, FileText } from 'lucide-react';

// Mock function to determine assessment status
const getAssessmentStatus = (assessmentId: number) => {
    // Mock logic: 1 is completed, 2 is pending, others are not started
    if (assessmentId % 3 === 1) return { status: 'Completed', variant: 'default', icon: <CheckCircle className="h-4 w-4 mr-1" />, buttonText: 'View Score' };
    if (assessmentId % 3 === 2) return { status: 'Pending Grade', variant: 'secondary', icon: <Clock className="h-4 w-4 mr-1" />, buttonText: 'View Submission' };
    return { status: 'Not Started', variant: 'default', icon: <FileText className="h-4 w-4 mr-1" />, buttonText: 'Start Assessment' };
}

const StudentAssessments = () => {
  const { activeClassId } = useClassStore();
  const { assessments } = useAssessmentListStore();
  
  // Filter assessments for the active class
  const classAssessments = assessments.filter(a => a.classId === activeClassId);

  return (
    <StudentLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold flex items-center">
            <BookOpen className="h-6 w-6 mr-2" /> Assessments
        </h1>
        <p className="text-muted-foreground">View your assignments and exams for the active class.</p>

        <div className="space-y-4">
            {classAssessments.length > 0 ? (
                classAssessments.map(a => {
                    const status = getAssessmentStatus(a.id);
                    return (
                        <Card key={a.id} className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{a.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {a.type} | {a.maxScore} Points
                                    </p>
                                    {a.dueDate && (
                                        <p className="text-xs text-red-500 mt-1">
                                            Due: {format(a.dueDate, 'MMM do, p')}
                                        </p>
                                    )}
                                </div>
                                <Button size="sm" variant={status.variant as "default" | "secondary"}>
                                    {status.buttonText}
                                </Button>
                            </div>
                            <div className="mt-3 pt-3 border-t flex items-center text-sm text-muted-foreground">
                                {status.icon} Status: {status.status}
                            </div>
                        </Card>
                    );
                })
            ) : (
                <p className="text-muted-foreground text-center p-8">No assessments found for this class.</p>
            )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentAssessments;