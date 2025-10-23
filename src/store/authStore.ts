import { create } from "zustand";
import { Teacher, Student } from "@/models/types";
import { MOCK_TEACHER, MOCK_STUDENT_USER } from "@/db/mockData";
import { showSuccess } from "@/utils/toast";

type User = Teacher | Student;

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: 'teacher' | 'student' | null;
  login: (user: User, role: 'teacher' | 'student') => void;
  logout: (navigate: (path: string) => void) => void;
  updateProfile: (updates: Partial<User>) => void; // New action
  mockStudentLogin: () => void; 
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,

  login: (user, role) => set({ user, isAuthenticated: true, role }),
  
  logout: (navigate) => {
    set({ user: null, isAuthenticated: false, role: null });
    navigate('/'); // Redirect to landing page
  },
  
  updateProfile: (updates) => set((state) => {
    if (!state.user) return state;
    
    const updatedUser = { ...state.user, ...updates };
    showSuccess("Profile updated successfully!");
    
    return { user: updatedUser as User };
  }),
  
  mockStudentLogin: () => set({ user: MOCK_STUDENT_USER, isAuthenticated: true, role: 'student' }),
}));