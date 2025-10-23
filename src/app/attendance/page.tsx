"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClassDataStore } from "@/store/classDataStore";
import { useClassStore } from "@/store/classStore";
import { MOCK_CLASS } from "@/db/mockData";
import { Check, X, Clock, Calendar as CalendarIcon } from "lucide-react";
import { AttendanceRecord } from "@/models/types";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Attendance = () => {
  const { students, attendance, markAttendance, attendanceDate, setAttendanceDate } = useClassDataStore();
  const { activeClassId, classes } = useClassStore();
  const [studentFilter, setStudentFilter] = useState('');
  
  const currentClass = classes.find(c => c.id === activeClassId) || MOCK_CLASS;
  
  const selectedDateString = format(attendanceDate, 'yyyy-MM-dd');
  
  const getAttendanceStatus = (studentId: number): AttendanceRecord['status'] | undefined => {
    const record = attendance.find(r => 
      r.studentId === studentId && format(r.date, 'yyyy-MM-dd') === selectedDateString
    );
    return record?.status;
  };

  const getStatusColor = (status: AttendanceRecord['status'] | undefined) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };
  
  // MOCK FILTERING: Filter students based on the active class ID. 
  // Since we don't have a join table, we assume all non-archived students belong to the active class for mock purposes.
  const studentsInClass = students.filter(s => !s.isArchived);
  
  const filteredStudents = studentsInClass.filter(student => 
    student.name.toLowerCase().includes(studentFilter.toLowerCase())
  );

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Daily Attendance</h1>
        <p className="text-muted-foreground">Class: {currentClass.name}</p>

        <div className="flex flex-col space-y-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !attendanceDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {attendanceDate ? format(attendanceDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={attendanceDate}
                  onSelect={(date) => date && setAttendanceDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Input 
                placeholder="Filter students by name..."
                value={studentFilter}
                onChange={(e) => setStudentFilter(e.target.value)}
            />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mark Students ({format(attendanceDate, 'PPP')})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredStudents.length > 0 ? (
                filteredStudents.map(student => {
                  const status = getAttendanceStatus(student.id);
                  return (
                    <div key={student.id} className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(status)}`}>
                      <span className="font-medium">{student.name}</span>
                      <div className="flex space-x-2">
                        <Button 
                          size="icon" 
                          variant={status === 'present' ? 'default' : 'outline'}
                          onClick={() => markAttendance(student.id, 'present')}
                          className={status === 'present' ? 'bg-green-600 hover:bg-green-700' : 'border-green-500 text-green-600 hover:bg-green-50'}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant={status === 'late' ? 'default' : 'outline'}
                          onClick={() => markAttendance(student.id, 'late')}
                          className={status === 'late' ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-yellow-500 text-yellow-600 hover:bg-yellow-50'}
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant={status === 'absent' ? 'destructive' : 'outline'}
                          onClick={() => markAttendance(student.id, 'absent')}
                          className={status === 'absent' ? '' : 'border-red-500 text-red-600 hover:bg-red-50'}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })
            ) : (
                <p className="text-muted-foreground">No students found matching "{studentFilter}" in this class.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Attendance;