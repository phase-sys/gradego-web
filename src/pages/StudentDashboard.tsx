"use client";

import React from 'react';
import StudentLayout from "@/components/layout/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Student Dashboard (Placeholder)</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This is the student view. Navigation is handled by StudentLayout.</p>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;