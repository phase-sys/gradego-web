import { create } from "zustand";
import { Assessment, NewAssessment } from "@/models/types";
import { MOCK_ASSESSMENTS } from "@/db/mockData";
import { showSuccess } from "@/utils/toast";

interface AssessmentListState {
  assessments: Assessment[];
  addAssessment: (assessment: Assessment) => void;
  updateAssessment: (assessment: Assessment) => void;
  deleteAssessment: (assessmentId: number) => void;
}

export const useAssessmentListStore = create<AssessmentListState>((set) => ({
  assessments: MOCK_ASSESSMENTS,

  addAssessment: (assessment) => set((state) => ({
    assessments: [...state.assessments, assessment],
  })),

  updateAssessment: (updatedAssessment) => set((state) => ({
    assessments: state.assessments.map(a => 
      a.id === updatedAssessment.id ? updatedAssessment : a
    ),
  })),
  
  deleteAssessment: (assessmentId) => {
    set((state) => ({
      assessments: state.assessments.filter(a => a.id !== assessmentId),
    }));
    showSuccess("Assessment deleted.");
  },
}));