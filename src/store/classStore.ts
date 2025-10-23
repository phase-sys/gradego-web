import { create } from "zustand";
import { Class } from "@/models/types";
import { MOCK_CLASS, MOCK_ARCHIVED_CLASS } from "@/db/mockData";
import { showError, showSuccess } from "@/utils/toast";

interface ClassState {
  classes: Class[];
  activeClassId: number;
  addClass: (newClass: Class) => void;
  updateClass: (updatedClass: Class) => void;
  deleteClass: (classId: number) => void;
  archiveClass: (classId: number) => void;
  unarchiveClass: (classId: number) => void; // New action
  setActiveClass: (classId: number) => void;
}

export const useClassStore = create<ClassState>((set, get) => ({
  classes: [MOCK_CLASS, MOCK_ARCHIVED_CLASS], // Start with mock classes
  activeClassId: MOCK_CLASS.id, // Set to 3

  setActiveClass: (classId) => set({ activeClassId: classId }),

  addClass: (newClass) => set((state) => ({
    classes: [...state.classes, newClass],
  })),
  
  updateClass: (updatedClass) => set((state) => ({
    classes: state.classes.map(cls => 
      cls.id === updatedClass.id ? updatedClass : cls
    ),
  })),
  
  deleteClass: (classId) => {
    set((state) => {
      const newClasses = state.classes.filter(cls => cls.id !== classId);
      
      // If deleting the active class, switch to the first available class
      let newActiveClassId = state.activeClassId;
      if (state.activeClassId === classId) {
          newActiveClassId = newClasses.find(cls => !cls.isArchived)?.id || 0;
      }
      
      return {
        classes: newClasses,
        activeClassId: newActiveClassId,
      };
    });
    showSuccess("Class deleted successfully.");
  },
  
  archiveClass: (classId) => {
    set((state) => {
      const updatedClasses = state.classes.map(cls => 
        cls.id === classId ? { ...cls, isArchived: true } : cls
      );
      
      // If archiving the active class, switch to the first non-archived class
      let newActiveClassId = state.activeClassId;
      if (state.activeClassId === classId) {
          const nextActive = updatedClasses.find(cls => !cls.isArchived);
          newActiveClassId = nextActive?.id || 0;
      }
      
      return {
        classes: updatedClasses,
        activeClassId: newActiveClassId,
      };
    });
    showSuccess("Class archived.");
  },
  
  unarchiveClass: (classId) => {
    set((state) => ({
      classes: state.classes.map(cls => 
        cls.id === classId ? { ...cls, isArchived: false } : cls
      ),
    }));
    showSuccess("Class unarchived and reactivated.");
  },
}));