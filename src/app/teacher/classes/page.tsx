"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useClassStore } from "@/store/classStore";
import { Users, Plus, Edit, Trash2, Archive, Share2, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ClassForm from "@/components/ClassForm";
import { useState } from "react";
import { Class } from "@/models/types";
import { showSuccess } from "@/utils/toast";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

const ClassCardActions: React.FC<{ cls: Class }> = ({ cls }) => {
    const { deleteClass, archiveClass, unarchiveClass } = useClassStore();
    
    const handleShare = () => {
        const enrollmentLink = `${window.location.origin}/enroll?tenantId=${cls.tenantId}&classCode=${cls.enrollmentCode}`;
        navigator.clipboard.writeText(enrollmentLink);
        showSuccess("Enrollment link copied to clipboard!");
    };
    
    return (
        <div className="flex space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => console.log("Edit class", cls.id)}>
                <Edit className="h-4 w-4" />
            </Button>
            {cls.isArchived ? (
                <Button variant="secondary" size="sm" onClick={() => unarchiveClass(cls.id)}>
                    <RotateCcw className="h-4 w-4" />
                </Button>
            ) : (
                <Button variant="outline" size="sm" onClick={() => archiveClass(cls.id)}>
                    <Archive className="h-4 w-4" />
                </Button>
            )}
            <Button variant="destructive" size="sm" onClick={() => deleteClass(cls.id)}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

const Classes = () => {
  const { classes, activeClassId, setActiveClass } = useClassStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  
  const filteredClasses = classes.filter(cls => showArchived ? cls.isArchived : !cls.isArchived);

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Class Management</h1>
        
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
                <p className="font-medium">Show Archived Classes</p>
                <p className="text-sm text-muted-foreground">
                  Toggle to view classes that are no longer active.
                </p>
            </div>
            <Switch
              checked={showArchived}
              onCheckedChange={setShowArchived}
            />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Create New Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
            </DialogHeader>
            <ClassForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {filteredClasses.map(cls => {
            const isActive = cls.id === activeClassId;
            return (
              <Card key={cls.id} className={isActive ? "border-2 border-primary" : ""}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{cls.name} {cls.isArchived && <span className="text-sm text-muted-foreground">(Archived)</span>}</CardTitle>
                  <Users className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <p>Enrollment Code: <span className="font-mono font-semibold">{cls.enrollmentCode}</span></p>
                  <p className="text-sm text-muted-foreground mt-2">4 Students Enrolled (Mock Data)</p>
                  
                  <ClassCardActions cls={cls} />
                  
                  <div className="mt-4 flex justify-between items-center">
                    <Button 
                        variant="link" 
                        className="p-0 h-auto" 
                        asChild
                    >
                        <Link href={`/teacher/classes/${cls.id}/students`}>
                            Manage Students <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                    </Button>
                    {!cls.isArchived && !isActive && (
                        <Button variant="secondary" size="sm" onClick={() => setActiveClass(cls.id)}>
                            Set Active
                        </Button>
                    )}
                    {isActive && (
                        <span className="text-sm text-primary font-semibold">Active Class</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {filteredClasses.length === 0 && (
              <p className="text-center text-muted-foreground p-8">No {showArchived ? 'archived' : 'active'} classes found.</p>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Classes;