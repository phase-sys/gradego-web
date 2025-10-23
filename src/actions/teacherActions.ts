import { NewClass, NewAssessment, NewAnnouncement, NewPlannerNote, NewTenant, NewStudent } from "@/models/types";
import { showSuccess, showError } from "@/utils/toast";

// --- Authentication Placeholder (Replacing NextAuth) ---

export const loginUser = async (credentials: any) => {
  console.log("Attempting user login...", credentials);
  await new Promise(resolve => setTimeout(resolve, 500));
  // Success message will be handled by the component based on role
  return { success: true };
};

// --- Class Management ---

export const createClass = async (data: NewClass) => {
  console.log("Creating class:", data);
  await new Promise(resolve => setTimeout(resolve, 500));
  showSuccess(`Class '${data.name}' created.`);
  return { id: Date.now(), ...data };
};

// --- Assessment Management ---

export const createAssessment = async (data: NewAssessment) => {
  console.log("Creating assessment:", data);
  await new Promise(resolve => setTimeout(resolve, 500));
  showSuccess(`Assessment '${data.title}' saved.`);
  return { id: Date.now(), ...data };
};

// --- Announcement Management ---

export const postAnnouncement = async (data: NewAnnouncement) => {
  console.log("Posting announcement:", data);
  await new Promise(resolve => setTimeout(resolve, 500));
  showSuccess(`Announcement posted.`);
  return { id: Date.now(), ...data };
};

// --- Planner Management ---

export const savePlannerNote = async (data: NewPlannerNote) => {
  console.log("Saving planner note:", data);
  await new Promise(resolve => setTimeout(resolve, 500));
  showSuccess(`Planner note saved.`);
  return { id: Date.now(), ...data };
};

// --- Enrollment Flow ---

export const enrollStudentInTenant = async (data: Omit<NewStudent, 'tenantId'>, tenantId: number) => {
    console.log(`Student enrolling in tenant ${tenantId}:`, data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!data.name) {
        showError("Enrollment failed: Name is required.");
        return { success: false };
    }
    
    showSuccess("Tenant enrollment successful! Please proceed to class enrollment.");
    return { success: true, studentId: Date.now() };
};

export const enrollStudentInClass = async (studentId: number, classCode: string) => {
    console.log(`Student ${studentId} attempting to join class with code ${classCode}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (classCode !== "MOCKCODE") {
        showError("Class enrollment failed: Invalid code.");
        return { success: false };
    }
    
    showSuccess("Class enrollment successful!");
    return { success: true };
};