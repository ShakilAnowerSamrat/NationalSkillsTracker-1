import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Shield, Building, User, FileText, Search, Award, BarChart2 } from "lucide-react";

const UserPortal = () => {
  const [location, setLocation] = useLocation();
  
  // Get current user if any
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/user'],
    retry: false
  });

  // Redirect to login if not authenticated
  const redirectToLogin = (userType: string) => {
    setLocation(`/login?type=${userType}`);
  };

  const redirectToRegister = () => {
    setLocation('/register');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#006A4E] mb-4">User Portal</h1>
            <p className="text-gray-600 mb-8">
              Access specialized tools and resources based on your role in Bangladesh's workforce development ecosystem.
            </p>

            {user ? (
              // If user is logged in, show appropriate portal based on user type
              <Tabs defaultValue={user && user.userType ? user.userType : "citizen"} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="government">Government</TabsTrigger>
                  <TabsTrigger value="employer">Employer</TabsTrigger>
                  <TabsTrigger value="citizen">Citizen</TabsTrigger>
                </TabsList>
                
                <TabsContent value="government" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="h-6 w-6 mr-2 text-[#006A4E]" />
                        Government Official Dashboard
                      </CardTitle>
                      <CardDescription>
                        Access policy tools, analytics, and administrative functions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/data-insights" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <BarChart2 className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Advanced Analytics</h3>
                            <p className="text-sm text-gray-600">Access comprehensive workforce data analytics and reports</p>
                          </div>
                        </Link>
                        
                        <Link href="/data-insights" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <FileText className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Policy Recommendations</h3>
                            <p className="text-sm text-gray-600">AI-driven policy suggestions based on skills data</p>
                          </div>
                        </Link>
                        
                        <Link href="/data-insights" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <Search className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Skills Gap Analysis</h3>
                            <p className="text-sm text-gray-600">Identify critical skills shortages by region and industry</p>
                          </div>
                        </Link>
                        
                        <Link href="/data-insights" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <Award className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Training Program Management</h3>
                            <p className="text-sm text-gray-600">Oversee national training initiatives and results</p>
                          </div>
                        </Link>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Link href="/data-insights">
                        <Button variant="outline" className="mr-2">View All Features</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="employer" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="h-6 w-6 mr-2 text-[#006A4E]" />
                        Employer Dashboard
                      </CardTitle>
                      <CardDescription>
                        Find qualified candidates and manage your company's skills data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/profile" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <Search className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Talent Search</h3>
                            <p className="text-sm text-gray-600">Find candidates based on skills and qualifications</p>
                          </div>
                        </Link>
                        
                        <Link href="/profile" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <FileText className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Post Job Openings</h3>
                            <p className="text-sm text-gray-600">List employment opportunities and requirements</p>
                          </div>
                        </Link>
                        
                        <Link href="/data-insights" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <BarChart2 className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Industry Insights</h3>
                            <p className="text-sm text-gray-600">Access sector-specific talent analytics</p>
                          </div>
                        </Link>
                        
                        <Link href="/resources" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <Award className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Training Partnerships</h3>
                            <p className="text-sm text-gray-600">Connect with institutions for customized training</p>
                          </div>
                        </Link>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Link href="/profile">
                        <Button variant="outline" className="mr-2">Manage Company Profile</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="citizen" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-6 w-6 mr-2 text-[#006A4E]" />
                        Citizen Dashboard
                      </CardTitle>
                      <CardDescription>
                        Manage your skills profile and explore opportunities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/profile" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <FileText className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Skills Profile</h3>
                            <p className="text-sm text-gray-600">Update your skills, experience, and qualifications</p>
                          </div>
                        </Link>
                        
                        <Link href="/profile" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <Search className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Job Matching</h3>
                            <p className="text-sm text-gray-600">Discover jobs that match your skills</p>
                          </div>
                        </Link>
                        
                        <Link href="/resources" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <Award className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Training Recommendations</h3>
                            <p className="text-sm text-gray-600">Personalized learning opportunities</p>
                          </div>
                        </Link>
                        
                        <Link href="/data-insights" className="block p-4 border rounded-lg hover:bg-gray-50 transition flex items-start">
                          <BarChart2 className="h-6 w-6 mr-3 text-[#006A4E]" />
                          <div>
                            <h3 className="font-bold text-gray-800">Career Insights</h3>
                            <p className="text-sm text-gray-600">Explore trends in your field</p>
                          </div>
                        </Link>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Link href="/profile">
                        <Button variant="outline">Manage Skills Profile</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              // If not logged in, show the three portal options
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Government Portal */}
                <Card className="overflow-hidden">
                  <div className="bg-[#006A4E] h-2"></div>
                  <CardHeader>
                    <div className="rounded-full bg-[#4C9E81] bg-opacity-20 w-16 h-16 mb-4 flex items-center justify-center">
                      <Shield className="text-[#006A4E] h-8 w-8" />
                    </div>
                    <CardTitle>Government Portal</CardTitle>
                    <CardDescription>
                      Access comprehensive workforce data, generate reports, and inform policy decisions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-600 mb-6 space-y-2">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 mt-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Policy analysis dashboards</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 mt-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Regional skills mapping</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 mt-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Trend forecasting tools</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-[#006A4E] hover:bg-[#00563F]"
                      onClick={() => redirectToLogin("government")}
                    >
                      Government Login
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Employer Portal */}
                <Card className="overflow-hidden">
                  <div className="bg-[#006A4E] h-2"></div>
                  <CardHeader>
                    <div className="rounded-full bg-[#4C9E81] bg-opacity-20 w-16 h-16 mb-4 flex items-center justify-center">
                      <Building className="text-[#006A4E] h-8 w-8" />
                    </div>
                    <CardTitle>Employer Portal</CardTitle>
                    <CardDescription>
                      Find qualified candidates, post job opportunities, and contribute to skills data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-600 mb-6 space-y-2">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 mt-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Candidate search tools</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 mt-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Skills gap analysis</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 mt-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Job posting platform</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-[#006A4E] hover:bg-[#00563F]"
                      onClick={() => redirectToLogin("employer")}
                    >
                      Employer Portal
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Citizen Portal */}
                <Card className="overflow-hidden animate-pulse">
                  <div className="bg-[#006A4E] h-2"></div>
                  <CardHeader>
                    <div className="rounded-full bg-[#4C9E81] bg-opacity-20 w-16 h-16 mb-4 flex items-center justify-center">
                      <User className="text-[#006A4E] h-8 w-8" />
                    </div>
                    <CardTitle>Citizen Portal</CardTitle>
                    <CardDescription>
                      Register your skills, find training opportunities, and discover career paths.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-600 mb-6 space-y-2">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 mt-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Skills profile builder</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 mt-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Training recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 mt-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Job matching service</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-[#006A4E] hover:bg-[#00563F]"
                      onClick={redirectToRegister}
                    >
                      Register Your Skills
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            <Separator className="my-10" />

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Assistance?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you need help with registration, data submission, or have questions about the National Skills Database, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/resources">
                  <Button variant="outline" className="border-[#006A4E] text-[#006A4E]">
                    View FAQ
                  </Button>
                </Link>
                <Link href="/about">
                  <Button className="bg-[#006A4E] hover:bg-[#00563F]">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserPortal;
