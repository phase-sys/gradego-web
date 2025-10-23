import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, BookOpen, Bell, Plus, ClipboardList, TrendingUp, MessageSquare, Download } from 'lucide-react';
import { MOCK_CLASS, MOCK_STUDENTS } from '@/db/mockData';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';
import { useClassDataStore } from '@/store/classDataStore';
import ClassPerformanceChart from '@/components/ClassPerformanceChart';
import AttendanceSummaryChart from '@/components/AttendanceSummaryChart';
import GradeDistributionChart from '@/components/GradeDistributionChart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { showSuccess } from '@/utils/toast';

const DashboardCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; link: string }> = ({ title, value, icon, link }) => (
  <Link href={link} className="block">
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  </Link>
);

const TeacherDashboard = () => {
  const teacher = useAuthStore(state => state.user);
  const { activeClassId, classes } = useClassStore();
  const { students } = useClassDataStore();
  const currentClass = classes.find(c => c.id === activeClassId) || MOCK_CLASS;
  
  // MOCK: Filter students based on active class ID. 
  // Since we don't have a join table, we assume all non-archived students belong to the active class for mock purposes.
  const activeStudentsInClass = students.filter(s => !s.isArchived);
  const totalStudents = activeStudentsInClass.length;

  // Mock data for top students based on the active list
  const mockTopStudents = activeStudentsInClass.slice(0, 3).map((s, i) => ({
      ...s,
      averageScore: 95 - i * 2, // Mock decreasing score
  }));

  if (!teacher) return null; // Should be protected by MobileLayout/Index
  
  const initials = teacher.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  const handleShare = () => {
    const enrollmentLink = `${window.location.origin}/enroll?tenantId=${teacher.tenantId}&classCode=${currentClass.enrollmentCode}`;
    navigator.clipboard.writeText(enrollmentLink);
    showSuccess("Enrollment link copied to clipboard!");
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src={teacher.profilePhotoUrl} alt={`${teacher.name}'s profile picture`} />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">Welcome back, {teacher.name}!</h1>
      </div>
      
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-xl">Current Class: {currentClass.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <p className="text-sm opacity-90">Enrollment Code: <span className="font-mono font-semibold">{currentClass.enrollmentCode}</span></p>
          <Button variant="secondary" size="sm" onClick={handleShare}>Share Link</Button>
        </CardContent>
      </Card>

      <section className="grid grid-cols-2 gap-4">
        <DashboardCard title="Total Students" value={totalStudents} icon={<Users className="h-4 w-4 text-muted-foreground" />} link={`/classes/${currentClass.id}/students`} />
        <DashboardCard title="Upcoming Exams" value={2} icon={<BookOpen className="h-4 w-4 text-muted-foreground" />} link="/planner" />
        <DashboardCard title="Pending Grades" value={15} icon={<Bell className="h-4 w-4 text-muted-foreground" />} link="/assessments" />
        <DashboardCard title="Attendance Today" value="Mark Now" icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />} link="/attendance" />
        <DashboardCard title="Class Average" value="82%" icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} link="/assessments" />
        <DashboardCard title="New Suggestions" value={1} icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />} link="/suggestions" />
      </section>

      <h2 className="text-2xl font-semibold mt-8">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4">
        <Button className="h-20 flex flex-col items-center justify-center" variant="outline" asChild>
            <Link href="/assessments">
                <Plus className="h-5 w-5 mb-1" />
                New Assessment
            </Link>
        </Button>
        <Button className="h-20 flex flex-col items-center justify-center" variant="outline" asChild>
            <Link href="/planner">
                <Calendar className="h-5 w-5 mb-1" />
                Add Planner Note
            </Link>
        </Button>
        <Button className="h-20 flex flex-col items-center justify-center" variant="outline" asChild>
            <Link href="/export">
                <Download className="h-5 w-5 mb-1" />
                Export Data
            </Link>
        </Button>
      </div>
      
      {/* Analytics Charts */}
      <div className="space-y-6">
        <ClassPerformanceChart />
        <AttendanceSummaryChart />
        <GradeDistributionChart />
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {mockTopStudents.map((student, index) => (
                <div key={student.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                    <div className="flex items-center space-x-3">
                        <span className="font-bold text-lg text-primary">{index + 1}.</span>
                        <span className="font-medium">{student.name}</span>
                    </div>
                    <span className="text-lg font-semibold text-green-600">{student.averageScore}%</span>
                </div>
            ))}
            {mockTopStudents.length === 0 && (
                <p className="text-muted-foreground text-center p-4">No active students in this class to rank.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;