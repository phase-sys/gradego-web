import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import { Assessment, Student } from '@/models/types';
import { useClassDataStore } from '@/store/classDataStore';
import { showSuccess } from '@/utils/toast';

interface AssessmentGradingProps {
  assessment: Assessment;
  onClose: () => void;
}

const AssessmentGrading: React.FC<AssessmentGradingProps> = ({ assessment, onClose }) => {
  const { students } = useClassDataStore();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize scores state based on active students
  const initialScores = students.reduce((acc, student) => {
    // Mock: Assume score is 0 if not graded, or a random value if already graded
    acc[student.id] = Math.random() > 0.8 ? Math.floor(Math.random() * assessment.maxScore) : '';
    return acc;
  }, {} as Record<number, number | string>);
  
  const [scores, setScores] = useState(initialScores);

  const handleScoreChange = (studentId: number, value: string) => {
    setScores(prev => ({
      ...prev,
      [studentId]: value === '' ? '' : Math.min(parseInt(value) || 0, assessment.maxScore),
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Filter out empty scores and convert to number
    const finalScores = Object.entries(scores)
        .filter(([, score]) => score !== '')
        .map(([studentId, score]) => ({
            studentId: parseInt(studentId),
            score: score as number,
        }));
        
    console.log(`Submitting grades for Assessment ${assessment.id}:`, finalScores);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    showSuccess(`Grades saved for ${assessment.title}.`);
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Max Score: {assessment.maxScore}</p>
      <Card>
        <CardContent className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
          {students.filter(s => !s.isArchived).map(student => (
            <div key={student.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
              <span className="font-medium">{student.name}</span>
              <Input
                type="number"
                placeholder="Score"
                value={scores[student.id]}
                onChange={(e) => handleScoreChange(student.id, e.target.value)}
                className="w-24 text-right"
                max={assessment.maxScore}
                min={0}
              />
            </div>
          ))}
        </CardContent>
      </Card>
      <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> Save Grades</>}
      </Button>
    </div>
  );
};

export default AssessmentGrading;