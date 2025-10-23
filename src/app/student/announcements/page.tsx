"use client";

import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClassStore } from '@/store/classStore';
import { MOCK_ANNOUNCEMENTS } from '@/db/mockData';
import { format } from 'date-fns';
import { Bell } from 'lucide-react';

const StudentAnnouncements = () => {
  const { activeClassId } = useClassStore();
  
  // Filter announcements for the active class (MOCK_ANNOUNCEMENTS are already tied to MOCK_CLASS.id=1)
  const classAnnouncements = MOCK_ANNOUNCEMENTS.filter(a => a.classId === activeClassId);

  return (
    <StudentLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold flex items-center">
            <Bell className="h-6 w-6 mr-2" /> Announcements
        </h1>
        <p className="text-muted-foreground">Important updates from your teacher.</p>

        <div className="space-y-4">
            {classAnnouncements.length > 0 ? (
                classAnnouncements.map(a => (
                    <Card key={a.id} className="p-4">
                        <CardTitle className="text-lg mb-2">{a.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mb-3">
                            Posted: {format(a.createdAt, 'MMM do, p')}
                        </p>
                        <CardContent className="p-0">
                            <p className="text-base whitespace-pre-wrap">{a.content}</p>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-muted-foreground text-center p-8">No announcements posted yet.</p>
            )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentAnnouncements;