import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield,
  Award,
  Plus,
  Edit,
  Trash,
  Save,
  X,
  LogOut
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Type definitions
type User = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  userType: string;
  createdAt: string;
};

type Skill = {
  id: number;
  userId: number;
  skillName: string;
  category: string;
  proficiencyLevel: string;
  yearsOfExperience: number;
  certifications?: string;
  validatedBy?: number;
  createdAt: string;
};

type NewSkill = {
  userId: number;
  skillName: string;
  category: string;
  proficiencyLevel: string;
  yearsOfExperience: number;
  certifications?: string;
};

const SkillCategoryOptions = [
  "IT & Technology",
  "Manufacturing",
  "Agriculture",
  "Healthcare",
  "Services",
  "Construction",
  "Education",
  "Other"
];

const ProficiencyLevelOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert"
];

const Profile = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<Partial<NewSkill>>({
    skillName: "",
    category: "",
    proficiencyLevel: "",
    yearsOfExperience: 0,
    certifications: ""
  });
  const [showNewSkillForm, setShowNewSkillForm] = useState(false);
  
  // Fetch current user
  const { data: user, isLoading: userLoading, error: userError } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  
  // If not logged in or error loading user, redirect to login
  if (!userLoading && (userError || !user)) {
    setLocation('/login');
    return null;
  }
  
  // Fetch user skills
  const { data: skills, isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ['/api/skills/user', user?.id],
    enabled: !!user,
  });
  
  // Add new skill mutation
  const addSkillMutation = useMutation({
    mutationFn: async (skillData: NewSkill) => {
      return await apiRequest('POST', '/api/skills', skillData);
    },
    onSuccess: () => {
      toast({
        title: "Skill added",
        description: "Your skill has been added successfully.",
      });
      
      // Reset form and hide it
      setNewSkill({
        skillName: "",
        category: "",
        proficiencyLevel: "",
        yearsOfExperience: 0,
        certifications: ""
      });
      setShowNewSkillForm(false);
      
      // Refresh skills list
      queryClient.invalidateQueries({ queryKey: ['/api/skills/user', user?.id] });
    },
    onError: (error) => {
      toast({
        title: "Failed to add skill",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/logout');
    },
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      
      // Invalidate user query and redirect to home
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      setLocation('/');
    },
    onError: (error) => {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  // Handle new skill submission
  const handleAddSkill = () => {
    if (!user) return;
    
    if (!newSkill.skillName || !newSkill.category || !newSkill.proficiencyLevel || !newSkill.yearsOfExperience) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    addSkillMutation.mutate({
      userId: user.id,
      skillName: newSkill.skillName || "",
      category: newSkill.category || "",
      proficiencyLevel: newSkill.proficiencyLevel || "",
      yearsOfExperience: Number(newSkill.yearsOfExperience) || 0,
      certifications: newSkill.certifications
    });
  };
  
  // Format user type for display
  const formatUserType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  // Get avatar fallback text
  const getAvatarFallback = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length === 1) return name.charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006A4E] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-[#006A4E]">
                  <AvatarImage src="" alt={user?.fullName} />
                  <AvatarFallback className="text-xl bg-[#006A4E] text-white">
                    {getAvatarFallback(user?.fullName || "")}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{user?.fullName}</h1>
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#006A4E] text-white mt-2 md:mt-0">
                      {formatUserType(user?.userType || "")}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span>{user?.username}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{user?.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{user?.district.charAt(0).toUpperCase() + user?.district.slice(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to log out of your account?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleLogout}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Logout
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Skills Profile</CardTitle>
                      <CardDescription>
                        Manage your skills, expertise levels, and experience
                      </CardDescription>
                    </div>
                    <Button 
                      className="bg-[#006A4E] hover:bg-[#00563F] flex items-center gap-2"
                      onClick={() => setShowNewSkillForm(true)}
                      disabled={showNewSkillForm}
                    >
                      <Plus className="h-4 w-4" />
                      Add Skill
                    </Button>
                  </CardHeader>
                  
                  <CardContent>
                    {showNewSkillForm && (
                      <div className="mb-6 p-4 border border-dashed rounded-md bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Add New Skill</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-500"
                            onClick={() => setShowNewSkillForm(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Skill Name*
                            </label>
                            <Input 
                              placeholder="e.g. Java Programming" 
                              value={newSkill.skillName}
                              onChange={(e) => setNewSkill({...newSkill, skillName: e.target.value})}
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category*
                            </label>
                            <Select 
                              value={newSkill.category} 
                              onValueChange={(value) => setNewSkill({...newSkill, category: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {SkillCategoryOptions.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Proficiency Level*
                            </label>
                            <Select 
                              value={newSkill.proficiencyLevel} 
                              onValueChange={(value) => setNewSkill({...newSkill, proficiencyLevel: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select proficiency" />
                              </SelectTrigger>
                              <SelectContent>
                                {ProficiencyLevelOptions.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Years of Experience*
                            </label>
                            <Input 
                              type="number" 
                              min="0" 
                              max="50"
                              placeholder="e.g. 3" 
                              value={newSkill.yearsOfExperience}
                              onChange={(e) => setNewSkill({...newSkill, yearsOfExperience: Number(e.target.value)})}
                              required
                            />
                          </div>
                          
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Certifications (Optional)
                            </label>
                            <Textarea 
                              placeholder="List any relevant certifications..."
                              value={newSkill.certifications}
                              onChange={(e) => setNewSkill({...newSkill, certifications: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowNewSkillForm(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            className="bg-[#006A4E] hover:bg-[#00563F]"
                            onClick={handleAddSkill}
                            disabled={addSkillMutation.isPending}
                          >
                            {addSkillMutation.isPending ? "Adding..." : "Add Skill"}
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {skillsLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006A4E] mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading skills...</p>
                      </div>
                    ) : skills && skills.length > 0 ? (
                      <div className="space-y-4">
                        {skills.map((skill) => (
                          <div 
                            key={skill.id} 
                            className="border rounded-md p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between">
                              <div className="flex items-start gap-3">
                                <Award className="h-6 w-6 text-[#006A4E] mt-1" />
                                <div>
                                  <h4 className="font-medium text-gray-900">{skill.skillName}</h4>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    <span className="inline-block px-2 py-1 rounded text-xs bg-[#4C9E81] bg-opacity-20 text-[#006A4E]">
                                      {skill.category}
                                    </span>
                                    <span className="inline-block px-2 py-1 rounded text-xs bg-gray-200 text-gray-800">
                                      {skill.proficiencyLevel}
                                    </span>
                                    <span className="inline-block px-2 py-1 rounded text-xs bg-gray-200 text-gray-800">
                                      {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
                                    </span>
                                  </div>
                                  {skill.certifications && (
                                    <p className="text-sm text-gray-600 mt-2">
                                      <span className="font-medium">Certifications:</span> {skill.certifications}
                                    </p>
                                  )}
                                  {skill.validatedBy && (
                                    <p className="text-sm text-green-600 mt-1 flex items-center">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Validated
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="text-gray-500">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-md bg-gray-50">
                        <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700">No skills added yet</h3>
                        <p className="text-gray-500 mt-1">Add your skills to enhance your profile and discover matching opportunities</p>
                        <Button 
                          className="mt-4 bg-[#006A4E] hover:bg-[#00563F]"
                          onClick={() => setShowNewSkillForm(true)}
                        >
                          Add Your First Skill
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Education History</CardTitle>
                    <CardDescription>
                      Manage your educational qualifications and training
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="text-center py-8 border rounded-md bg-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-700">No education history added yet</h3>
                      <p className="text-gray-500 mt-1">Add your education details to complete your profile</p>
                      <Button className="mt-4 bg-[#006A4E] hover:bg-[#00563F]">
                        Add Education
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="certifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                    <CardDescription>
                      Manage your professional certifications and achievements
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="text-center py-8 border rounded-md bg-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-700">No certifications added yet</h3>
                      <p className="text-gray-500 mt-1">Add certifications to showcase your qualifications and expertise</p>
                      <Button className="mt-4 bg-[#006A4E] hover:bg-[#00563F]">
                        Add Certification
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
