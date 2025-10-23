import { PlannerNote } from "@/models/types";
import { MOCK_PLANNER_NOTES } from "@/db/mockData";
import { create } from "zustand";

interface PlannerState {
  notes: PlannerNote[];
  selectedDate: Date;
  addNote: (note: PlannerNote) => void;
  updateNote: (note: PlannerNote) => void;
  deleteNote: (noteId: number) => void; // New action
  setSelectedDate: (date: Date) => void;
}

export const usePlannerStore = create<PlannerState>((set) => ({
  notes: MOCK_PLANNER_NOTES,
  selectedDate: new Date(),

  addNote: (note) => set((state) => ({
    notes: [...state.notes, note],
  })),

  updateNote: (updatedNote) => set((state) => ({
    notes: state.notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ),
  })),
  
  deleteNote: (noteId) => set((state) => ({
    notes: state.notes.filter(note => note.id !== noteId),
  })),

  setSelectedDate: (date) => set({ selectedDate: date }),
}));