import { Student, AttendanceRecord, NewStudent } from "@/models/types";
import { MOCK_STUDENTS, MOCK_ATTENDANCE, MOCK_TEACHER } from "@/db/mockData";
import { create } from "zustand";
import { format } from "date-fns";
import { showSuccess } from "@/utils/toast";

interface ClassDataState {
  students: Student[];
  attendance: AttendanceRecord[];
  calledStudentIds: number[];
  attendanceDate: Date;
  
  // Student CRUD Actions
  addStudent: (newStudent: Omit<NewStudent, 'tenantId'>) => void;
  updateStudent: (updatedStudent: Student) => void;
  deleteStudent: (studentId: number) => void;
  archiveStudent: (studentId: number) => void;
  unarchiveStudent: (studentId: number) => void;
  
  // Attendance & Randomizer Actions
  markAttendance: (studentId: number, status: AttendanceRecord['status']) => void;
  setAttendanceDate: (date: Date) => void;
  callRandomStudent: (classId: number) => Student | null;
  resetCalledStudents: () => void;
}

export const useClassDataStore = create<ClassDataState>((set, get) => ({
  students: MOCK_STUDENTS,
  attendance: MOCK_ATTENDANCE,
  calledStudentIds: [],
  attendanceDate: new Date(),

  // --- Student CRUD ---
  addStudent: (newStudentData) => {
    const newStudent: Student = {
        ...newStudentData,
        id: Date.now(), // Mock ID
        tenantId: MOCK_TEACHER.tenantId, // Assume teacher's tenant
        createdAt: new Date(),
        isArchived: false,
    };
    set((state) => ({
        students: [...state.students, newStudent],
    }));
    showSuccess(`Student ${newStudent.name} added.`);
  },
  
  updateStudent: (updatedStudent) => {
    set((state) => ({
        students: state.students.map(s => s.id === updatedStudent.id ? updatedStudent : s),
    }));
    showSuccess(`Student ${updatedStudent.name} updated.`);
  },
  
  deleteStudent: (studentId) => {
    set((state) => ({
        students: state.students.filter(s => s.id !== studentId),
    }));
    showSuccess("Student permanently removed.");
  },
  
  archiveStudent: (studentId) => {
    set((state) => ({
        students: state.students.map(s => s.id === studentId ? { ...s, isArchived: true } : s),
    }));
    showSuccess("Student archived.");
  },
  
  unarchiveStudent: (studentId) => {
    set((state) => ({
        students: state.students.map(s => s.id === studentId ? { ...s, isArchived: false } : s),
    }));
    showSuccess("Student unarchived.");
  },

  // --- Attendance & Randomizer ---
  setAttendanceDate: (date) => set({ attendanceDate: date }),

  markAttendance: (studentId, status) => {
    const selectedDate = get().attendanceDate;
    const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
    
    set((state) => {
      const existingIndex = state.attendance.findIndex(
        (record) => record.studentId === studentId && format(record.date, 'yyyy-MM-dd') === selectedDateString
      );

      const newRecord: AttendanceRecord = {
        id: Date.now(), // Mock ID
        classId: 1, // Assuming a single mock class for simplicity
        date: selectedDate,
        status,
        studentId,
      };

      if (existingIndex !== -1) {
        const newAttendance = [...state.attendance];
        newAttendance[existingIndex] = newRecord;
        return { attendance: newAttendance };
      } else {
        return { attendance: [...state.attendance, newRecord] };
      }
    });
  },

  callRandomStudent: (classId) => {
    const state = get();
    const today = new Date().toDateString();
    
    // Identify absentees for the current class and day
    const absentees = state.attendance
      .filter(r => r.classId === classId && r.date.toDateString() === today && r.status === 'absent')
      .map(r => r.studentId);

    // Filter out absentees, archived, and already called students
    const availableStudents = state.students.filter(
      s => !s.isArchived && !absentees.includes(s.id) && !state.calledStudentIds.includes(s.id)
    );

    if (availableStudents.length === 0) {
      return null; // No students available
    }

    const randomIndex = Math.floor(Math.random() * availableStudents.length);
    const selectedStudent = availableStudents[randomIndex];

    set((state) => ({
        calledStudentIds: [...state.calledStudentIds, selectedStudent.id]
    }));
    return selectedStudent;
  },
  
  resetCalledStudents: () => set({ calledStudentIds: [] }),
}));