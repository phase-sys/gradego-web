import { 
  Tenant, Teacher, Student, Class, Assessment, Question, 
  AttendanceRecord, Announcement, PlannerNote, Suggestion, 
  QuestionType, AttendanceStatus, UrgencyType 
} from "@/models/types";

// Mock Profile Pictures
const MOCK_PHOTOS = [
    "https://i.pravatar.cc/150?img=1", // Teacher
    "https://i.pravatar.cc/150?img=2", // Alice
    "https://i.pravatar.cc/150?img=3", // Bob
    "https://i.pravatar.cc/150?img=4", // Charlie
    "https://i.pravatar.cc/150?img=5", // Diana
    "https://i.pravatar.cc/150?img=6",
    "https://i.pravatar.cc/150?img=7",
    "https://i.pravatar.cc/150?img=8",
];

// Helper to generate IDs
let idCounter = 1;
const nextId = () => idCounter++;

// Mock Data Generation Functions
export const createMockTenant = (name: string, id: number): Tenant => ({
  id,
  name,
  createdAt: new Date(),
  theme: "default",
});

export const createMockTeacher = (tenantId: number, name: string, email: string, id: number, photoUrl?: string): Teacher => ({
  id,
  tenantId,
  email,
  name,
  profileBannerUrl: undefined,
  profilePhotoUrl: photoUrl,
  authUserId: `auth-${id}`, 
});

export const createMockClass = (tenantId: number, teacherId: number, name: string, id: number, isArchived: boolean = false): Class => ({
  id,
  tenantId,
  teacherId,
  name,
  enrollmentCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
  themeColor: "blue",
  bannerUrl: undefined,
  createdAt: new Date(),
  isArchived,
});

export const createMockStudent = (tenantId: number, name: string, id: number, email?: string, photoUrl?: string, isArchived: boolean = false): Student => ({
  id,
  tenantId,
  name,
  email,
  photoUrl,
  createdAt: new Date(),
  authUserId: email ? `auth-student-${id}` : undefined,
  isArchived,
});

export const createMockAssessment = (classId: number, id: number, title: string): Assessment => ({
  id,
  classId,
  title,
  type: "quiz",
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
  maxScore: 100,
  isPublished: true,
  createdAt: new Date(),
});

export const createMockQuestion = (assessmentId: number, text: string, type: QuestionType): Question => ({
  id: nextId(),
  assessmentId,
  text,
  type,
  score: 10,
  options: type === "multiple_choice" ? ["A", "B", "C"] : undefined,
  correctAnswer: type === "multiple_choice" ? "A" : undefined,
});

export const createMockAnnouncement = (classId: number, teacherId: number, id: number, title: string): Announcement => ({
    id,
    classId,
    teacherId,
    title,
    content: `This is an important announcement about ${title}.`,
    isShared: true,
    createdAt: new Date(),
});

export const createMockSuggestion = (tenantId: number, id: number, content: string, isAnonymous: boolean = false, isAnswered: boolean = false): Suggestion => ({
    id,
    tenantId,
    studentId: isAnonymous ? undefined : MOCK_STUDENTS[0].id,
    content,
    isAnonymous,
    isAnswered,
    createdAt: new Date(),
});

// --- Sample Data ---

// Reset counter for predictable IDs
idCounter = 1;

const mockTenant = createMockTenant("Acme School District", nextId()); // ID 1
const mockTeacher = createMockTeacher(mockTenant.id, "Ms. Frizzle", "frizzle@acme.edu", nextId(), MOCK_PHOTOS[0]); // ID 2
const mockClass = createMockClass(mockTenant.id, mockTeacher.id, "8th Grade Math", nextId()); // ID 3
const mockArchivedClass = createMockClass(mockTenant.id, mockTeacher.id, "7th Grade Science (Archived)", nextId(), true); // ID 4

export const MOCK_TENANT = mockTenant;
export const MOCK_TEACHER = mockTeacher;
export const MOCK_CLASS = mockClass;
export const MOCK_ARCHIVED_CLASS = mockArchivedClass;

export const MOCK_STUDENTS: Student[] = [
  createMockStudent(mockTenant.id, "Alice Johnson", nextId(), "alice@example.com", MOCK_PHOTOS[1]), // ID 5
  createMockStudent(mockTenant.id, "Bob Smith", nextId(), undefined, MOCK_PHOTOS[2]), // ID 6
  createMockStudent(mockTenant.id, "Charlie Brown", nextId(), "charlie@example.com", MOCK_PHOTOS[3]), // ID 7
  createMockStudent(mockTenant.id, "Diana Prince", nextId(), undefined, MOCK_PHOTOS[4], true), // ID 8 (Archived)
];

export const MOCK_STUDENT_USER = MOCK_STUDENTS[0]; // Alice is our mock student user

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: nextId(),
    classId: mockClass.id, // Class ID 3
    date: new Date(),
    status: "present" as AttendanceStatus,
    studentId: MOCK_STUDENTS[0].id,
  },
  {
    id: nextId(),
    classId: mockClass.id, // Class ID 3
    date: new Date(),
    status: "absent" as AttendanceStatus,
    studentId: MOCK_STUDENTS[1].id,
  },
];

export const MOCK_PLANNER_NOTES: PlannerNote[] = [
  {
    id: nextId(),
    teacherId: mockTeacher.id,
    date: new Date(),
    title: "Midterm Exam Review",
    content: "Review chapters 1-5. Bring questions.",
    isPrivate: false,
    classId: mockClass.id, // Class ID 3
    urgency: 'high' as UrgencyType,
  },
  {
    id: nextId(),
    teacherId: mockTeacher.id,
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    title: "Staff Meeting Prep",
    content: "Prepare Q3 budget report.",
    isPrivate: true,
    classId: undefined,
    urgency: 'medium' as UrgencyType,
  },
];

export const MOCK_ASSESSMENTS: Assessment[] = [
    createMockAssessment(mockClass.id, nextId(), "Unit 1 Test"), // Class ID 3
    createMockAssessment(mockClass.id, nextId(), "Homework 3"), // Class ID 3
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    createMockAnnouncement(mockClass.id, mockTeacher.id, nextId(), "Welcome Back!"), // Class ID 3
    createMockAnnouncement(mockClass.id, mockTeacher.id, nextId(), "Field Trip Reminder"), // Class ID 3
];

export const MOCK_SUGGESTIONS: Suggestion[] = [
    createMockSuggestion(mockTenant.id, nextId(), "Can we have more group projects?", false, false),
    createMockSuggestion(mockTenant.id, nextId(), "The cafeteria food is terrible.", true, true), // Mock answered
];