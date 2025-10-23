import { create } from "zustand";
import { Suggestion } from "@/models/types";
import { MOCK_SUGGESTIONS } from "@/db/mockData";
import { showSuccess } from "@/utils/toast";

interface SuggestionState {
  suggestions: Suggestion[];
  addSuggestion: (suggestion: Suggestion) => void;
  deleteSuggestion: (suggestionId: number) => void;
  markAnswered: (suggestionId: number, isAnswered: boolean) => void;
}

export const useSuggestionStore = create<SuggestionState>((set) => ({
  suggestions: MOCK_SUGGESTIONS,

  addSuggestion: (suggestion) => {
    set((state) => ({
      suggestions: [...state.suggestions, suggestion],
    }));
    showSuccess("Suggestion submitted successfully!");
  },
  
  deleteSuggestion: (suggestionId) => {
    set((state) => ({
      suggestions: state.suggestions.filter(s => s.id !== suggestionId),
    }));
    showSuccess("Suggestion dismissed.");
  },
  
  markAnswered: (suggestionId, isAnswered) => {
    set((state) => ({
      suggestions: state.suggestions.map(s => 
        s.id === suggestionId ? { ...s, isAnswered } : s
      ),
    }));
    showSuccess(isAnswered ? "Suggestion marked as answered." : "Suggestion marked as unanswered.");
  }
}));