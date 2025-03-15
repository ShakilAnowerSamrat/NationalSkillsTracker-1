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
      cookie: { 
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'lax',
        httpOnly: true
      },
      name: 'nsdb.sid' // Custom session name to avoid conflicts
    })
  );
  
  console.log('[server] Session middleware configured');

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  console.log('[server] Passport initialized');

  // Configure Passport local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log(`[auth] Authenticating user: ${username}`);
        const user = await storage.getUserByUsername(username);
        
        if (!user) {
          console.log(`[auth] User not found: ${username}`);
          return done(null, false, { message: "Incorrect username." });
        }
        
        if (user.password !== password) {
          console.log(`[auth] Invalid password for user: ${username}`);
          return done(null, false, { message: "Incorrect password." });
        }
        
        console.log(`[auth] Authentication successful for user: ${username}`);
        return done(null, user);
      } catch (err) {
        console.error(`[auth] Authentication error:`, err);
        return done(err);
      }
    })
  );

  // Serialize and deserialize user
  passport.serializeUser<number>((user: Express.User, done) => {
    console.log(`[auth] Serializing user:`, (user as any).id);
    done(null, (user as any).id);
  });

  passport.deserializeUser<number>(async (id, done) => {
    try {
      console.log(`[auth] Deserializing user ID: ${id}`);
      const user = await storage.getUser(id);
      
      if (!user) {
        console.log(`[auth] Failed to deserialize - user not found for ID: ${id}`);
        return done(null, false);
      }
      
      console.log(`[auth] Deserialized user: ${user.username}`);
      done(null, user as any);
    } catch (err) {
      console.error(`[auth] Deserialization error:`, err);
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
      console.log('[server] Login request received:', { username: req.body.username });
      try {
        loginSchema.parse(req.body);
        console.log('[server] Login data validated');
        next();
      } catch (error) {
        console.error('[server] Login validation error:', error);
        if (error instanceof ZodError) {
          return res.status(400).json({ 
            message: "Validation error", 
            errors: error.errors 
          });
        }
        next(error);
      }
    },
    (req: Request, res: Response, next) => {
      passport.authenticate("local", (err: any, user: any, info: any) => {
        console.log('[server] Passport authenticate result:', { err: !!err, user: !!user, info });
        
        if (err) {
          console.error('[server] Authentication error:', err);
          return next(err);
        }
        
        if (!user) {
          console.log('[server] Authentication failed:', info);
          return res.status(401).json({ message: info?.message || "Authentication failed" });
        }
        
        req.logIn(user, (loginErr) => {
          if (loginErr) {
            console.error('[server] Login error:', loginErr);
            return next(loginErr);
          }
          
          console.log('[server] User logged in successfully:', user.id);
          const { password, ...userWithoutPassword } = user;
          return res.json({ 
            message: "Login successful", 
            user: userWithoutPassword 
          });
        });
      })(req, res, next);
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
    console.log('[server] GET /api/user - Session ID:', req.sessionID);
    console.log('[server] GET /api/user - Is authenticated:', req.isAuthenticated());
    
    if (!req.isAuthenticated()) {
      console.log('[server] GET /api/user - No authenticated user found');
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    console.log('[server] GET /api/user - User found:', (req.user as any).id);
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
