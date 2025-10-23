"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Share2, Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AssessmentForm from "@/components/AssessmentForm";
import AssessmentGrading from "@/components/AssessmentGrading";
import { useAssessmentListStore } from "@/store/assessmentListStore";
import { useState } from "react";
import { Assessment } from "@/models/types";
import { format } from "date-fns";
import { showSuccess } from "@/utils/toast";

const Assessments = () => {
  const { assessments, deleteAssessment } = useAssessmentListStore();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isGradingDialogOpen, setIsGradingDialogOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | undefined>(undefined);
  const [gradingAssessment, setGradingAssessment] = useState<Assessment | undefined>(undefined);
  
  const handleEdit = (assessment: Assessment | undefined) => {
      setEditingAssessment(assessment);
      setIsFormDialogOpen(true);
  }
  
  const handleGrade = (assessment: Assessment) => {
      setGradingAssessment(assessment);
      setIsGradingDialogOpen(true);
  }
  
  const handleFormDialogClose = () => {
      setIsFormDialogOpen(false);
      setEditingAssessment(undefined);
  }
  
  const handleGradingDialogClose = () => {
      setIsGradingDialogOpen(false);
      setGradingAssessment(undefined);
  }
  
  const handleShare = (assessmentId: number) => {
      // Use window.location.origin for Next.js environment
      const shareLink = `${window.location.origin}/student/assessment/${assessmentId}`;
      navigator.clipboard.writeText(shareLink);
      showSuccess("Assessment link copied to clipboard!");
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Assessments</h1>
        
        {/* Assessment Form Dialog */}
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" onClick={() => handleEdit(undefined)}>
              <Plus className="h-4 w-4 mr-2" /> Create New Assessment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAssessment ? 'Edit Assessment' : 'Create New Assessment'}</DialogTitle>
            </DialogHeader>
            <AssessmentForm 
                initialAssessment={editingAssessment} 
                onSuccess={handleFormDialogClose} 
            />
          </DialogContent>
        </Dialog>
        
        {/* Grading Dialog */}
        <Dialog open={isGradingDialogOpen} onOpenChange={setIsGradingDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Grade: {gradingAssessment?.title}</DialogTitle>
            </DialogHeader>
            {gradingAssessment && (
                <AssessmentGrading 
                    assessment={gradingAssessment} 
                    onClose={handleGradingDialogClose} 
                />
            )}
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>All Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assessments.map(assessment => (
                <div key={assessment.id} className="border p-3 rounded-md flex flex-col space-y-2">
                    <p className="font-semibold">{assessment.title} <span className="text-xs text-muted-foreground">({assessment.type})</span></p>
                    <p className="text-sm text-muted-foreground">Due: {assessment.dueDate ? format(assessment.dueDate, 'MMM do') : 'N/A'} | {assessment.maxScore} Points</p>
                    <div className="flex space-x-2 pt-1">
                        <Button variant="outline" size="sm" onClick={() => handleGrade(assessment)}>
                            <Award className="h-4 w-4 mr-1" /> Grade
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleShare(assessment.id)}>
                            <Share2 className="h-4 w-4 mr-1" /> Share
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(assessment)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteAssessment(assessment.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
            {assessments.length === 0 && (
                <p className="text-muted-foreground">No assessments created yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Assessments;