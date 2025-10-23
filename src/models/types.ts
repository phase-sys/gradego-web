import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { 
  tenants, teachers, students, classes, assessments, questions, 
  attendanceRecords, announcements, suggestions, plannerNotes, submissions, answers 
} from "@/db/schema";

// --- Core Types ---
export type Tenant = InferSelectModel<typeof tenants>;
export type NewTenant = InferInsertModel<typeof tenants>;

export type Teacher = InferSelectModel<typeof teachers>;
export type NewTeacher = InferInsertModel<typeof teachers>;

// Extending Student type for client-side state management (isArchived)
export type Student = InferSelectModel<typeof students> & { isArchived?: boolean };
export type NewStudent = InferInsertModel<typeof students>;

// Extending Class type for client-side state management (isArchived)
export type Class = InferSelectModel<typeof classes> & { isArchived?: boolean };
export type NewClass = InferInsertModel<typeof classes>;

// --- Content & Tools Types ---
export type Assessment = InferSelectModel<typeof assessments>;
export type NewAssessment = InferInsertModel<typeof assessments>;

export type Question = InferSelectModel<typeof questions>;
export type NewQuestion = InferInsertModel<typeof questions>;
export type QuestionType = Question["type"];

export type AttendanceRecord = InferSelectModel<typeof attendanceRecords>;
export type NewAttendanceRecord = InferInsertModel<typeof attendanceRecords>;
export type AttendanceStatus = AttendanceRecord["status"];

export type Announcement = InferSelectModel<typeof announcements>;
export type NewAnnouncement = InferInsertModel<typeof announcements>;

// Updated Suggestion type
export type Suggestion = InferSelectModel<typeof suggestions> & { isAnswered: boolean };
export type NewSuggestion = InferInsertModel<typeof suggestions>;

// Adding urgency to PlannerNote
export type UrgencyType = 'low' | 'medium' | 'high';
export type PlannerNote = InferSelectModel<typeof plannerNotes> & { urgency: UrgencyType };
export type NewPlannerNote = InferInsertModel<typeof plannerNotes> & { urgency: UrgencyType };

// --- Submission Types ---
export type Submission = InferSelectModel<typeof submissions>;
export type NewSubmission = InferInsertModel<typeof submissions>;

export type Answer = InferSelectModel<typeof answers>;
export type NewAnswer = InferInsertModel<typeof answers>;

// Utility type for complex JSON fields (e.g., Question options/answers)
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };