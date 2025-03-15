import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertSkillSchema, 
  insertStatisticsSchema, 
  insertNewsSchema, 
  registrationSchema, 
  loginSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import MemoryStore from "memorystore";

export async function registerRoutes(app: Express): Promise<Server> {
  // Define a session store
  const SessionStore = MemoryStore(session);

  // Configure session middleware
  app.use(
    session({
      store: new SessionStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      secret: process.env.SESSION_SECRET || "national-skills-database-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production" }
    })
  );

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Passport local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Serialize and deserialize user
  passport.serializeUser<number>((user: Express.User, done) => {
    done(null, (user as any).id);
  });

  passport.deserializeUser<number>(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user as any);
    } catch (err) {
      done(err);
    }
  });

  // User Routes
  
  // Register a new user
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      const userData = registrationSchema.parse(req.body);
      
      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // Create new user (remove confirmPassword and agreeToTerms fields)
      const { confirmPassword, agreeToTerms, ...userToInsert } = userData;
      const user = await storage.createUser(userToInsert);
      
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Login route
  app.post(
    "/api/login",
    (req: Request, res: Response, next) => {
      try {
        loginSchema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({ 
            message: "Validation error", 
            errors: error.errors 
          });
        }
        next(error);
      }
    },
    passport.authenticate("local"),
    (req: Request, res: Response) => {
      const { password, ...userWithoutPassword } = req.user as any;
      res.json({ 
        message: "Login successful", 
        user: userWithoutPassword 
      });
    }
  );

  // Logout route
  app.post("/api/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error during logout" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // Get current user
  app.get("/api/user", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const { password, ...userWithoutPassword } = req.user as any;
    res.json(userWithoutPassword);
  });

  // Skills Routes

  // Get user skills
  app.get("/api/skills/user/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const skills = await storage.getUserSkills(userId);
      console.log(`[server] GET /api/skills/user/${userId} - Skills found:`, skills);
      res.json(skills);
    } catch (error) {
      console.error(`[server] Error fetching skills for user ${req.params.userId}:`, error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Add a skill
  app.post("/api/skills", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        console.log('[server] POST /api/skills - Not authenticated');
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      console.log('[server] POST /api/skills - Request body:', req.body);
      
      const skillData = insertSkillSchema.parse(req.body);
      console.log('[server] POST /api/skills - Validated data:', skillData);
      
      const skill = await storage.createSkill(skillData);
      console.log('[server] POST /api/skills - Created skill:', skill);
      
      res.status(201).json(skill);
    } catch (error) {
      console.error('[server] POST /api/skills - Error:', error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get skills distribution
  app.get("/api/skills/distribution", async (_req: Request, res: Response) => {
    try {
      const distribution = await storage.getSkillsDistribution();
      res.json(distribution);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Statistics Routes

  // Get all statistics
  app.get("/api/statistics", async (_req: Request, res: Response) => {
    try {
      const statistics = await storage.getStatistics();
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get statistics by category
  app.get("/api/statistics/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const statistics = await storage.getStatisticsByCategory(category);
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // News Routes

  // Get all news
  app.get("/api/news", async (_req: Request, res: Response) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get news by ID
  app.get("/api/news/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }
      
      const news = await storage.getNewsById(id);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create news (admin only)
  app.post("/api/news", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = req.user as any;
      if (user.userType !== "government") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const newsData = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(newsData);
      res.status(201).json(news);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
