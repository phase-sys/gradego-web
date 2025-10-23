"use client";

import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';
import { MOCK_ASSESSMENTS, MOCK_ANNOUNCEMENTS, MOCK_TEACHER } from '@/db/mockData';
import Link from 'next/link';
import { format } from 'date-fns';
import { BookOpen, Bell, Users, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const { classes } = useClassStore();
  
  // Mock: Assuming the student is in the first active class
  const studentClass = classes.find(c => !c.isArchived);
  const teacher = MOCK_TEACHER; // Mock teacher associated with the class
  
  const upcomingAssessments = MOCK_ASSESSMENTS.filter(a => a.dueDate && a.dueDate > new Date()).slice(0, 2);
  const recentAnnouncements = MOCK_ANNOUNCEMENTS.slice(0, 2);

  return (
    <StudentLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Hello, {user?.name}!</h1>
        
        {studentClass && (
            <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Your Class: {studentClass.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-primary-foreground">
                        <AvatarImage src={teacher.profilePhotoUrl} alt={`${teacher.name}'s profile picture`} />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    <p className="text-sm opacity-90">Teacher: {teacher.name}</p>
                </CardContent>
            </Card>
        )}

        <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center">
                <BookOpen className="h-5 w-5 mr-2" /> Upcoming Work
            </h2>
            <div className="space-y-3">
                {upcomingAssessments.length > 0 ? (
                    upcomingAssessments.map(a => (
                        <Card key={a.id} className="p-3">
                            <p className="font-medium">{a.title}</p>
                            <p className="text-sm text-muted-foreground">Due: {a.dueDate ? format(a.dueDate, 'MMM do, p') : 'N/A'} | {a.maxScore} Points</p>
                            <Link href="/student/assessments" className="text-xs text-primary hover:underline mt-1 block">Start Assessment</Link>
                        </Card>
                    ))
                ) : (
                    <p className="text-muted-foreground">No upcoming assignments.</p>
                )}
            </div>
        </section>
        
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center">
                <Bell className="h-5 w-5 mr-2" /> Recent Announcements
            </h2>
            <div className="space-y-3">
                {recentAnnouncements.map(a => (
                    <Card key={a.id} className="p-3">
                        <p className="font-medium">{a.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{a.content}</p>
                        <Link href="/student/announcements" className="text-xs text-primary hover:underline mt-1 block">Read More</Link>
                    </Card>
                ))}
            </div>
        </section>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;