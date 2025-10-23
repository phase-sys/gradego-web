import { pgTable, serial, text, timestamp, boolean, integer, primaryKey, uniqueIndex, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// --- Core Entities ---

export const tenants = pgTable("tenant", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  theme: text("theme").default("default"), // Customization of tenant theme
});

export const teachers = pgTable("teacher", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id").references(() => tenants.id).notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  profileBannerUrl: text("profile_banner_url"),
  profilePhotoUrl: text("profile_photo_url"),
  // Placeholder for NextAuth user ID
  authUserId: text("auth_user_id").unique().notNull(), 
});

export const students = pgTable("student", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id").references(() => tenants.id).notNull(),
  email: text("email").unique(), // Optional/nullable if student enrollment is link-based without required email
  name: text("name").notNull(),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // Placeholder for NextAuth user ID (if students log in)
  authUserId: text("auth_user_id").unique(), 
});

export const classes = pgTable("class", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id").references(() => tenants.id).notNull(),
  teacherId: integer("teacher_id").references(() => teachers.id).notNull(),
  name: text("name").notNull(),
  enrollmentCode: text("enrollment_code").unique().notNull(),
  themeColor: text("theme_color").default("blue"),
  bannerUrl: text("banner_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const studentToClass = pgTable("student_to_class", {
  studentId: integer("student_id").references(() => students.id).notNull(),
  classId: integer("class_id").references(() => classes.id).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.studentId, t.classId] }),
}));

// --- Teacher Tools & Content ---

export const assessments = pgTable("assessment", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").references(() => classes.id).notNull(),
  title: text("title").notNull(),
  type: text("type", { enum: ["quiz", "exam", "homework"] }).notNull(),
  dueDate: timestamp("due_date"),
  maxScore: integer("max_score").notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const questions = pgTable("question", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").references(() => assessments.id).notNull(),
  text: text("text").notNull(),
  type: text("type", { enum: ["multiple_choice", "checkbox", "rating", "text"] }).notNull(),
  score: integer("score").notNull(),
  options: jsonb("options"), // JSON structure for choices/rating scale
  correctAnswer: jsonb("correct_answer"), // JSON structure for correct answer
});

export const attendanceRecords = pgTable("attendance_record", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").references(() => classes.id).notNull(),
  date: timestamp("date").notNull(),
  status: text("status", { enum: ["present", "absent", "late"] }).notNull(),
  studentId: integer("student_id").references(() => students.id).notNull(),
}, (t) => ({
  uniqueDateStudent: uniqueIndex("unique_date_student").on(t.date, t.studentId),
}));

export const announcements = pgTable("announcement", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").references(() => classes.id).notNull(),
  teacherId: integer("teacher_id").references(() => teachers.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isShared: boolean("is_shared").default(false).notNull(), // Shared with students or private teacher note
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const suggestions = pgTable("suggestion", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id").references(() => tenants.id).notNull(),
  studentId: integer("student_id").references(() => students.id), // Nullable for anonymous
  content: text("content").notNull(),
  isAnonymous: boolean("is_anonymous").default(false).notNull(),
  isAnswered: boolean("is_answered").default(false).notNull(), // New field
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const plannerNotes = pgTable("planner_note", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id").references(() => teachers.id).notNull(),
  date: timestamp("date").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isPrivate: boolean("is_private").default(true).notNull(), // Private or shared (e.g., exam schedule)
  classId: integer("class_id").references(() => classes.id), // Optional link to a specific class
});

// --- Assessment Submissions ---

export const submissions = pgTable("submission", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").references(() => assessments.id).notNull(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  isGraded: boolean("is_graded").default(false).notNull(),
  totalScore: integer("total_score"),
});

export const answers = pgTable("answer", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").references(() => submissions.id).notNull(),
  questionId: integer("question_id").references(() => questions.id).notNull(),
  response: jsonb("response"), // Student's answer data
  score: integer("score"), // Score received for this specific question
});

// --- Relations (Optional but good for Drizzle typing) ---

export const relationsConfig = relations(classes, ({ many }) => ({
  students: many(studentToClass),
  assessments: many(assessments),
  attendanceRecords: many(attendanceRecords),
  announcements: many(announcements),
}));