"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { usePlannerStore } from "@/store/plannerStore";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PlannerNoteForm from "@/components/PlannerNoteForm";
import { useState } from "react";
import { PlannerNote, UrgencyType } from "@/models/types";

const getUrgencyColor = (urgency: UrgencyType) => {
    switch (urgency) {
        case 'high': return 'border-red-500';
        case 'medium': return 'border-yellow-500';
        case 'low': return 'border-blue-500';
        default: return 'border-gray-300';
    }
}

const Planner = () => {
  const { selectedDate, setSelectedDate, notes, deleteNote } = usePlannerStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<PlannerNote | undefined>(undefined);
  
  const notesForSelectedDay = notes.filter(note => 
    format(note.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );
  
  const handleEdit = (note: PlannerNote) => {
      setEditingNote(note);
      setIsDialogOpen(true);
  }
  
  const handleDialogClose = () => {
      setIsDialogOpen(false);
      setEditingNote(undefined);
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Planner & Calendar</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" onClick={() => handleEdit(undefined)}>
              <Plus className="h-4 w-4 mr-2" /> Add Note for {format(selectedDate, 'MMM do')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingNote ? 'Edit Note' : 'Add New Note'}</DialogTitle>
            </DialogHeader>
            <PlannerNoteForm 
                date={selectedDate} 
                initialNote={editingNote} 
                onSuccess={handleDialogClose} 
            />
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>Notes for {format(selectedDate, 'PPP')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notesForSelectedDay.length > 0 ? (
              notesForSelectedDay.map(note => (
                <div key={note.id} className={`border-l-4 ${getUrgencyColor(note.urgency)} p-3 bg-muted/50 rounded-r-md flex justify-between items-start`}>
                  <div>
                    <p className="font-semibold">{note.title} <span className="text-xs text-muted-foreground">({note.urgency})</span> {note.isPrivate && <span className="text-xs text-gray-500">(Private)</span>}</p>
                    <p className="text-sm text-muted-foreground">{note.content}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(note)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No notes scheduled for this day.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Planner;