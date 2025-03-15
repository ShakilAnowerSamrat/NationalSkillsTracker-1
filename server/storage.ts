import { 
  users, type User, type InsertUser,
  skills, type Skill, type InsertSkill,
  statistics, type Statistics, type InsertStatistics,
  news, type News, type InsertNews
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(userType?: string): Promise<User[]>;
  
  // Skills methods
  getSkill(id: number): Promise<Skill | undefined>;
  getUserSkills(userId: number): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  getSkillsDistribution(): Promise<{category: string, count: number}[]>;
  
  // Statistics methods
  getStatistics(): Promise<Statistics[]>;
  getStatisticsByCategory(category: string): Promise<Statistics[]>;
  createStatistics(statistics: InsertStatistics): Promise<Statistics>;
  updateStatistics(id: number, value: number): Promise<Statistics | undefined>;
  
  // News methods
  getNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skills: Map<number, Skill>;
  private statisticsData: Map<number, Statistics>;
  private newsItems: Map<number, News>;
  
  private currentUserId: number;
  private currentSkillId: number;
  private currentStatisticsId: number;
  private currentNewsId: number;

  constructor() {
    this.users = new Map();
    this.skills = new Map();
    this.statisticsData = new Map();
    this.newsItems = new Map();
    
    this.currentUserId = 1;
    this.currentSkillId = 1;
    this.currentStatisticsId = 1;
    this.currentNewsId = 1;
    
    // Initialize with sample statistics data
    this.initializeStatistics();
    this.initializeNews();
  }

  // Initialize sample statistics data
  private initializeStatistics() {
    const defaultStats = [
      { category: "registered_users", value: 1600000, region: "all" },
      { category: "employers", value: 42000, region: "all" },
      { category: "institutions", value: 850, region: "all" },
      { category: "placements", value: 320000, region: "all" },
      { category: "skills", value: 3200000, region: "all" },
      // Regional distribution
      { category: "regional_distribution", value: 42, region: "dhaka" },
      { category: "regional_distribution", value: 23, region: "chittagong" },
      { category: "regional_distribution", value: 12, region: "khulna" },
      { category: "regional_distribution", value: 8, region: "rajshahi" },
      { category: "regional_distribution", value: 6, region: "sylhet" },
      { category: "regional_distribution", value: 5, region: "barisal" },
      { category: "regional_distribution", value: 4, region: "rangpur" },
      // Skills distribution
      { category: "skills_distribution", value: 28, region: "IT & Technology" },
      { category: "skills_distribution", value: 22, region: "Manufacturing" },
      { category: "skills_distribution", value: 18, region: "Agriculture" },
      { category: "skills_distribution", value: 15, region: "Healthcare" },
      { category: "skills_distribution", value: 12, region: "Services" },
      { category: "skills_distribution", value: 10, region: "Construction" },
      { category: "skills_distribution", value: 8, region: "Education" },
      { category: "skills_distribution", value: 5, region: "Other" }
    ];

    for (const stat of defaultStats) {
      const id = this.currentStatisticsId++;
      const timestamp = new Date();
      this.statisticsData.set(id, {
        id,
        category: stat.category,
        value: stat.value,
        region: stat.region,
        updatedAt: timestamp
      });
    }
  }

  // Initialize sample news data
  private initializeNews() {
    const defaultNews = [
      {
        title: "National Skills Database Officially Launched",
        content: "The Ministry of Education and Ministry of Labour jointly launched the National Skills Database at an event in Dhaka.",
        category: "Announcement",
        imageUrl: "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
        isPublished: true
      },
      {
        title: "Upcoming: National Skills Fair 2023",
        content: "Over 200 employers will be present at the upcoming Skills Fair to recruit qualified candidates from the database.",
        category: "Event",
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
        isPublished: true
      },
      {
        title: "5,000 Youth Placed Through Skills Matching",
        content: "The database has successfully facilitated job placements for 5,000 young workers in its first quarter of operation.",
        category: "Success Story",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
        isPublished: true
      }
    ];

    for (const item of defaultNews) {
      const id = this.currentNewsId++;
      const publishedDate = new Date();
      this.newsItems.set(id, {
        id,
        title: item.title,
        content: item.content,
        category: item.category,
        imageUrl: item.imageUrl,
        publishedDate,
        isPublished: item.isPublished
      });
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getUsers(userType?: string): Promise<User[]> {
    const allUsers = Array.from(this.users.values());
    if (userType) {
      return allUsers.filter(user => user.userType === userType);
    }
    return allUsers;
  }

  // Skills methods
  async getSkill(id: number): Promise<Skill | undefined> {
    return this.skills.get(id);
  }

  async getUserSkills(userId: number): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(
      (skill) => skill.userId === userId
    );
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const skill: Skill = { ...insertSkill, id, createdAt: new Date() };
    this.skills.set(id, skill);
    return skill;
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(
      (skill) => skill.category === category
    );
  }

  async getSkillsDistribution(): Promise<{category: string, count: number}[]> {
    const categoryMap = new Map<string, number>();
    
    Array.from(this.skills.values()).forEach(skill => {
      const current = categoryMap.get(skill.category) || 0;
      categoryMap.set(skill.category, current + 1);
    });
    
    // If no skills yet, return the sample distribution
    if (categoryMap.size === 0) {
      const distributionStats = Array.from(this.statisticsData.values())
        .filter(stat => stat.category === "skills_distribution")
        .map(stat => ({
          category: stat.region || "",
          count: stat.value
        }));
      
      return distributionStats;
    }
    
    return Array.from(categoryMap.entries()).map(([category, count]) => ({
      category,
      count
    }));
  }

  // Statistics methods
  async getStatistics(): Promise<Statistics[]> {
    return Array.from(this.statisticsData.values());
  }

  async getStatisticsByCategory(category: string): Promise<Statistics[]> {
    return Array.from(this.statisticsData.values()).filter(
      (stat) => stat.category === category
    );
  }

  async createStatistics(insertStatistics: InsertStatistics): Promise<Statistics> {
    const id = this.currentStatisticsId++;
    const statistics: Statistics = { ...insertStatistics, id, updatedAt: new Date() };
    this.statisticsData.set(id, statistics);
    return statistics;
  }

  async updateStatistics(id: number, value: number): Promise<Statistics | undefined> {
    const statistics = this.statisticsData.get(id);
    if (!statistics) return undefined;
    
    const updated: Statistics = { ...statistics, value, updatedAt: new Date() };
    this.statisticsData.set(id, updated);
    return updated;
  }

  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.newsItems.values()).filter(
      news => news.isPublished
    ).sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.newsItems.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const news: News = { ...insertNews, id, publishedDate: new Date() };
    this.newsItems.set(id, news);
    return news;
  }
}

// Export storage instance
export const storage = new MemStorage();
