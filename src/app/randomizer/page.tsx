"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClassDataStore } from "@/store/classDataStore"; // Renamed store
import { useClassStore } from "@/store/classStore";
import { useState } from "react";
import { Zap, RotateCcw } from "lucide-react";
import { MOCK_CLASS } from "@/db/mockData";

const Randomizer = () => {
  const { callRandomStudent, resetCalledStudents, students, calledStudentIds } = useClassDataStore();
  const { activeClassId, classes } = useClassStore();
  const [currentStudent, setCurrentStudent] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  
  const currentClass = classes.find(c => c.id === activeClassId) || MOCK_CLASS;
  
  // MOCK FILTERING: Assume all non-archived students belong to the active class for mock purposes.
  const studentsInClass = students.filter(s => !s.isArchived);
  
  const studentsRemaining = studentsInClass.length - calledStudentIds.length;

  const handleRandomize = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentStudent(null);

    // Simulate spinning animation duration
    setTimeout(() => {
      // Note: callRandomStudent internally uses the global student list, but we rely on the UI check above.
      // In a real app, callRandomStudent would take activeClassId as a parameter and filter internally.
      const student = callRandomStudent(activeClassId); 
      setCurrentStudent(student ? student.name : "All students called!");
      setIsSpinning(false);
    }, 1500);
  };
  
  const handleReset = () => {
      resetCalledStudents();
      setCurrentStudent(null);
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Randomizer Tool</h1>
        <p className="text-muted-foreground">Class: {currentClass.name}</p>

        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle className="text-xl">Who's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm text-muted-foreground">
                {studentsRemaining} students remaining
            </div>
            <div className={
              `h-32 w-full flex items-center justify-center text-4xl font-extrabold rounded-lg border-4 transition-all duration-300 
              ${isSpinning ? 'bg-yellow-100 text-yellow-800 border-yellow-500 animate-pulse' : 'bg-primary text-primary-foreground border-primary'}`
            }>
              {isSpinning ? (
                <Zap className="h-10 w-10 animate-spin" />
              ) : (
                currentStudent || "Click to Spin"
              )}
            </div>
            
            <Button 
              onClick={handleRandomize} 
              className="mt-6 w-full" 
              size="lg"
              disabled={isSpinning || studentsRemaining === 0}
            >
              {isSpinning ? "Spinning..." : "Randomize Student"}
            </Button>
            
            <Button 
                variant="outline" 
                onClick={handleReset}
                className="mt-4 w-full"
                disabled={calledStudentIds.length === 0}
            >
                <RotateCcw className="h-4 w-4 mr-2" /> Reset Chosen List ({calledStudentIds.length})
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Randomizer;