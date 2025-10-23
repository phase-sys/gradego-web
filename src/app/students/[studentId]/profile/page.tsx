"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Award, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useClassDataStore } from "@/store/classDataStore";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from 'next/navigation';

// Mock Data for Profile
const mockGrades = [
    { assessment: "Unit 1 Test", type: "exam", score: 85, max: 100, date: new Date(2024, 8, 1) },
    { assessment: "Homework 3", type: "homework", score: 9, max: 10, date: new Date(2024, 8, 5) },
    { assessment: "Quiz 2", type: "quiz", score: 70, max: 80, date: new Date(2024, 8, 10) },
    { assessment: "Unit 2 Quiz", type: "quiz", score: 18, max: 20, date: new Date(2024, 8, 15) },
    { assessment: "Chapter 4 HW", type: "homework", score: 10, max: 10, date: new Date(2024, 8, 18) },
];

const calculateCategoryPerformance = (grades: typeof mockGrades) => {
    const categories: Record<string, { totalScore: number, totalMax: number, items: typeof mockGrades }> = {};
    
    grades.forEach(grade => {
        const type = grade.type.charAt(0).toUpperCase() + grade.type.slice(1); // Quiz, Homework, Exam
        if (!categories[type]) {
            categories[type] = { totalScore: 0, totalMax: 0, items: [] };
        }
        categories[type].totalScore += grade.score;
        categories[type].totalMax += grade.max;
        categories[type].items.push(grade);
    });
    
    return categories;
};

const StudentProfile = () => {
  const params = useParams();
  const studentId = params.studentId as string;
  const id = parseInt(studentId || '0');
  const { students, attendance } = useClassDataStore();
  
  const student = students.find(s => s.id === id);
  const categorizedGrades = calculateCategoryPerformance(mockGrades);
  
  if (!student) {
    return (
      <MobileLayout>
        <div className="p-4">
          <p className="text-destructive">Student not found.</p>
          <Link href="/classes/1/students" className="text-primary hover:underline mt-4 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Student List
          </Link>
        </div>
      </MobileLayout>
    );
  }
  
  const recentAttendance = attendance
    .filter(r => r.studentId === id)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);
    
  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <Link href="/classes/1/students" className="flex items-center text-sm text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Student List
        </Link>
        
        <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-primary/50">
                <AvatarImage src={student.photoUrl} alt={`${student.name}'s profile picture`} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">{student.name}'s Profile</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact & Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                Email: {student.email || 'N/A'}
            </div>
            <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                Enrollment Date: {format(student.createdAt, 'MMM do, yyyy')}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" /> Grades & Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(categorizedGrades).map(([category, data]) => {
                const percentage = data.totalMax > 0 ? Math.round((data.totalScore / data.totalMax) * 100) : 0;
                const colorClass = percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600';
                
                return (
                    <div key={category} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">{category} Performance</h3>
                            <span className={`text-xl font-bold ${colorClass}`}>{percentage}%</span>
                        </div>
                        <div className="space-y-1 text-sm">
                            {data.items.map((grade, index) => (
                                <div key={index} className="flex justify-between text-muted-foreground">
                                    <span>{grade.assessment}</span>
                                    <span>{grade.score}/{grade.max}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            {Object.keys(categorizedGrades).length === 0 && (
                <p className="text-muted-foreground">No grades recorded yet.</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAttendance.length > 0 ? (
                recentAttendance.map((record, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                        <span>{format(record.date, 'MMM do')}</span>
                        <span className={`font-semibold capitalize ${record.status === 'absent' ? 'text-red-500' : record.status === 'late' ? 'text-yellow-500' : 'text-green-500'}`}>
                            {record.status}
                        </span>
                    </div>
                ))
            ) : (
                <p className="text-muted-foreground">No recent attendance records.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default StudentProfile;