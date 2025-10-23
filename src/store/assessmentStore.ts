import { NewSubmission, NewAnswer } from "@/models/types";
import { create } from "zustand";

interface UnsyncedSubmission {
  submission: Omit<NewSubmission, 'id' | 'submittedAt' | 'isGraded' | 'totalScore'>;
  answers: NewAnswer[];
  tempId: string;
}

interface AssessmentState {
  unsyncedSubmissions: UnsyncedSubmission[];
  
  // Actions
  addUnsyncedSubmission: (submission: UnsyncedSubmission) => void;
  removeSyncedSubmission: (tempId: string) => void;
  // Placeholder for PWA background sync logic
  syncSubmissions: () => Promise<void>; 
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  unsyncedSubmissions: [],

  addUnsyncedSubmission: (submission) => set((state) => ({
    unsyncedSubmissions: [...state.unsyncedSubmissions, submission],
  })),

  removeSyncedSubmission: (tempId) => set((state) => ({
    unsyncedSubmissions: state.unsyncedSubmissions.filter(s => s.tempId !== tempId),
  })),

  syncSubmissions: async () => {
    const submissionsToSync = get().unsyncedSubmissions;
    if (submissionsToSync.length === 0) {
      console.log("No submissions to sync.");
      return;
    }

    console.log(`Attempting to sync ${submissionsToSync.length} submissions...`);
    
    // --- Placeholder for actual API call ---
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    // Assuming successful sync for all items for now
    submissionsToSync.forEach(s => {
      get().removeSyncedSubmission(s.tempId);
      console.log(`Synced submission ${s.tempId}`);
    });
    
    // In a real app, error handling and partial sync removal would be implemented here.
  },
}));