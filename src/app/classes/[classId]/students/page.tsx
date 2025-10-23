"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClassDataStore } from "@/store/classDataStore";
import { useClassStore } from "@/store/classStore";
import { User, Trash2, ArrowLeft, Edit, Archive, Plus, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { showSuccess } from "@/utils/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StudentForm from "@/components/StudentForm";
import { useState } from "react";
import { Student } from "@/models/types";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Next.js specific hook to get dynamic parameters
import { useParams } from 'next/navigation';

const StudentCardActions: React.FC<{ student: Student, onEdit: (s: Student) => void }> = ({ student, onEdit }) => {
    const { deleteStudent, archiveStudent, unarchiveStudent } = useClassDataStore();
    
    return (
        <div className="flex space-x-2 mt-2 pt-2 border-t justify-end">
            <Button variant="outline" size="sm" onClick={() => onEdit(student)}>
                <Edit className="h-4 w-4" />
            </Button>
            {student.isArchived ? (
                <Button variant="secondary" size="sm" onClick={() => unarchiveStudent(student.id)}>
                    <RotateCcw className="h-4 w-4" /> Unarchive
                </Button>
            ) : (
                <Button variant="secondary" size="sm" onClick={() => archiveStudent(student.id)}>
                    <Archive className="h-4 w-4" /> Archive
                </Button>
            )}
            <Button variant="destructive" size="sm" onClick={() => deleteStudent(student.id)}>
                <Trash2 className="h-4 w-4" /> Delete
            </Button>
        </div>
    );
};

const StudentManagement = () => {
  const params = useParams();
  const classId = params.classId as string;
  const classIdNum = parseInt(classId || '0');
  const { classes } = useClassStore();
  const { students } = useClassDataStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);
  const [showArchived, setShowArchived] = useState(false);
  
  const currentClass = classes.find(c => c.id === classIdNum);

  if (!currentClass) {
    return (
      <MobileLayout>
        <div className="p-4">
          <p className="text-destructive">Class not found.</p>
          <Link href="/classes" className="text-primary hover:underline mt-4 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Classes
          </Link>
        </div>
      </MobileLayout>
    );
  }
  
  const handleEdit = (student: Student) => {
      setEditingStudent(student);
      setIsDialogOpen(true);
  }
  
  const handleDialogClose = () => {
      setIsDialogOpen(false);
      setEditingStudent(undefined);
  }
  
  // MOCK FILTERING: Since we don't have a join table, we assume all students belong to the class being viewed (ID 3).
  // If the class ID matches the mock class ID, we show all students. Otherwise, we show none.
  const studentsInClass = currentClass.id === 3 ? students : [];
  
  const filteredStudents = studentsInClass.filter(s => showArchived ? s.isArchived : !s.isArchived);

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <Link href="/classes" className="flex items-center text-sm text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Classes
        </Link>
        <h1 className="text-3xl font-bold">Students in {currentClass.name}</h1>
        <p className="text-muted-foreground">Enrollment Code: {currentClass.enrollmentCode}</p>
        
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
                <p className="font-medium">Show Archived Students</p>
                <p className="text-sm text-muted-foreground">
                  Toggle to view students who have been archived.
                </p>
            </div>
            <Switch
              checked={showArchived}
              onCheckedChange={setShowArchived}
            />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" onClick={() => handleEdit(undefined)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
                </DialogHeader>
                <StudentForm 
                    initialStudent={editingStudent} 
                    onSuccess={handleDialogClose} 
                />
              </DialogContent>
            </Dialog>
            <Button className="w-full" variant="outline" onClick={() => showSuccess("Invite link copied!")}>
                Invite Link
            </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{showArchived ? 'Archived Students' : 'Active Students'} ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredStudents.length > 0 ? (
                filteredStudents.map(student => {
                    const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                    return (
                      <div key={student.id} className="flex flex-col p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={student.photoUrl} alt={`${student.name}'s profile picture`} />
                                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{student.name} {student.isArchived && <span className="text-xs text-muted-foreground">(Archived)</span>}</span>
                            </div>
                            <Button variant="link" size="sm" asChild>
                                <Link href={`/students/${student.id}/profile`}>
                                    View Profile <ArrowRight className="h-4 w-4 ml-1" />
                                </Link>
                            </Button>
                        </div>
                        <StudentCardActions student={student} onEdit={handleEdit} />
                      </div>
                    );
                })
            ) : (
                <p className="text-muted-foreground text-center p-4">No {showArchived ? 'archived' : ' active'} students found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default StudentManagement;