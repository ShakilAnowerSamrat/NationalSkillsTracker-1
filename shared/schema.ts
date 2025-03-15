import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table for all users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  district: text("district").notNull(),
  userType: text("user_type").notNull().default("citizen"), // citizen, employer, government
  createdAt: timestamp("created_at").defaultNow(),
});

// Skills data table
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  skillName: text("skill_name").notNull(),
  category: text("category").notNull(), // IT, Manufacturing, Agriculture, etc.
  proficiencyLevel: text("proficiency_level").notNull(), // Beginner, Intermediate, Advanced, Expert
  yearsOfExperience: integer("years_of_experience").notNull(),
  certifications: text("certifications"),
  validatedBy: integer("validated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Statistical data for dashboard
export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // registered_users, employers, institutions, placements
  value: integer("value").notNull(),
  region: text("region"), // Optional regional breakdown
  updatedAt: timestamp("updated_at").defaultNow(),
});

// News and updates
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // Announcement, Event, Success Story
  imageUrl: text("image_url"),
  publishedDate: timestamp("published_date").defaultNow(),
  isPublished: boolean("is_published").default(true),
});

// Schema for user insertion
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  phone: true,
  district: true,
  userType: true,
});

// Schema for skills insertion
export const insertSkillSchema = createInsertSchema(skills).pick({
  userId: true,
  skillName: true,
  category: true,
  proficiencyLevel: true,
  yearsOfExperience: true,
  certifications: true,
});

// Schema for statistics insertion
export const insertStatisticsSchema = createInsertSchema(statistics).pick({
  category: true,
  value: true,
  region: true,
});

// Schema for news insertion
export const insertNewsSchema = createInsertSchema(news).pick({
  title: true,
  content: true,
  category: true,
  imageUrl: true,
  isPublished: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export type InsertStatistics = z.infer<typeof insertStatisticsSchema>;
export type Statistics = typeof statistics.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

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

export type Registration = z.infer<typeof registrationSchema>;

// Login schema with validation
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type Login = z.infer<typeof loginSchema>;
