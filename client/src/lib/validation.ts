import { z } from "zod";

// Login schema with validation
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Registration schema with validation
export const registrationSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  district: z.string().min(1, "Please select a district"),
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
  userType: z.enum(["citizen", "employer", "government"]).default("citizen"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Skill schema with validation
export const skillSchema = z.object({
  userId: z.number(),
  skillName: z.string().min(2, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  proficiencyLevel: z.string().min(1, "Proficiency level is required"),
  yearsOfExperience: z.number().min(0, "Years of experience must be 0 or greater"),
  certifications: z.string().optional(),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  district: z.string().min(1, "Please select a district"),
});

// Password change schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmNewPassword: z.string().min(8, "Please confirm your new password"),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

// Education schema
export const educationSchema = z.object({
  userId: z.number(),
  institution: z.string().min(2, "Institution name is required"),
  degree: z.string().min(2, "Degree/Certificate is required"),
  fieldOfStudy: z.string().min(2, "Field of study is required"),
  startDate: z.string().min(4, "Start date is required"),
  endDate: z.string().optional(),
  isOngoing: z.boolean().default(false),
  description: z.string().optional(),
});

// Certification schema
export const certificationSchema = z.object({
  userId: z.number(),
  certificationName: z.string().min(2, "Certification name is required"),
  issuingOrganization: z.string().min(2, "Issuing organization is required"),
  issueDate: z.string().min(4, "Issue date is required"),
  expirationDate: z.string().optional(),
  doesNotExpire: z.boolean().default(false),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});
