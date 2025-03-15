import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SkillsDistribution from "@/components/charts/skills-distribution";
import RegionalDistribution from "@/components/charts/regional-distribution";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for charts (would be fetched from API)
const skillsTrendData = [
  { year: "2018", IT: 18, Manufacturing: 15, Agriculture: 22, Healthcare: 12, Services: 10 },
  { year: "2019", IT: 20, Manufacturing: 16, Agriculture: 20, Healthcare: 14, Services: 11 },
  { year: "2020", IT: 22, Manufacturing: 18, Agriculture: 19, Healthcare: 14, Services: 12 },
  { year: "2021", IT: 24, Manufacturing: 20, Agriculture: 18, Healthcare: 15, Services: 12 },
  { year: "2022", IT: 26, Manufacturing: 21, Agriculture: 18, Healthcare: 15, Services: 12 },
  { year: "2023", IT: 28, Manufacturing: 22, Agriculture: 18, Healthcare: 15, Services: 12 },
];

const employmentRateData = [
  { month: "Jan", employed: 68, unemployed: 32 },
  { month: "Feb", employed: 69, unemployed: 31 },
  { month: "Mar", employed: 70, unemployed: 30 },
  { month: "Apr", employed: 72, unemployed: 28 },
  { month: "May", employed: 72, unemployed: 28 },
  { month: "Jun", employed: 73, unemployed: 27 },
  { month: "Jul", employed: 74, unemployed: 26 },
  { month: "Aug", employed: 75, unemployed: 25 },
  { month: "Sep", employed: 76, unemployed: 24 },
  { month: "Oct", employed: 77, unemployed: 23 },
  { month: "Nov", employed: 78, unemployed: 22 },
  { month: "Dec", employed: 79, unemployed: 21 },
];

const DataInsights = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: statistics, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/statistics'],
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Data & Insights Dashboard</h1>
              <p className="text-gray-600 mt-2">Explore detailed analytics about Bangladesh's workforce skills</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="bg-[#006A4E] text-white px-4 py-2 rounded-md hover:bg-[#00563F] transition mr-2"
                onClick={() => alert("This would download a comprehensive report")}
              >
                Export Report
              </button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
              <TabsTrigger value="employment">Employment Trends</TabsTrigger>
              <TabsTrigger value="regional">Regional Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkillsDistribution />
                <RegionalDistribution />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Skills Trend Analysis (5-Year)</CardTitle>
                  <CardDescription>
                    Percentage distribution of major skill categories over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={skillsTrendData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="IT" stroke="#006A4E" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Manufacturing" stroke="#F42A41" />
                      <Line type="monotone" dataKey="Agriculture" stroke="#4C9E81" />
                      <Line type="monotone" dataKey="Healthcare" stroke="#00563F" />
                      <Line type="monotone" dataKey="Services" stroke="#6C757D" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Distribution by Sector</CardTitle>
                  <CardDescription>
                    Detailed breakdown of workforce skills by economic sector
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <SkillsDistribution />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Gap Analysis</CardTitle>
                    <CardDescription>
                      Comparison between available skills and market demand
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'IT & Tech', available: 28, demand: 35 },
                          { name: 'Manufacturing', available: 22, demand: 25 },
                          { name: 'Agriculture', available: 18, demand: 15 },
                          { name: 'Healthcare', available: 15, demand: 18 },
                          { name: 'Services', available: 12, demand: 15 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="available" name="Available Skills" fill="#006A4E" />
                        <Bar dataKey="demand" name="Market Demand" fill="#F42A41" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Education Level vs Skill Category</CardTitle>
                    <CardDescription>
                      Relationship between education and skill specialization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { education: 'Secondary', technical: 35, business: 30, arts: 45 },
                          { education: 'Higher Secondary', technical: 45, business: 40, arts: 35 },
                          { education: 'Undergraduate', technical: 65, business: 55, arts: 40 },
                          { education: 'Graduate', technical: 85, business: 70, arts: 50 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="education" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="technical" name="Technical Skills" fill="#006A4E" />
                        <Bar dataKey="business" name="Business Skills" fill="#4C9E81" />
                        <Bar dataKey="arts" name="Arts & Humanities" fill="#00563F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="employment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employment Rate Trends (2023)</CardTitle>
                  <CardDescription>
                    Monthly employment rate fluctuations across the country
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={employmentRateData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="employed" name="Employed %" stackId="a" fill="#006A4E" />
                      <Bar dataKey="unemployed" name="Unemployed %" stackId="a" fill="#F42A41" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills to Job Placement Ratio</CardTitle>
                    <CardDescription>
                      Successful job placements by skill category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { skill: 'Programming', placement: 75 },
                          { skill: 'Engineering', placement: 68 },
                          { skill: 'Healthcare', placement: 82 },
                          { skill: 'Agriculture', placement: 58 },
                          { skill: 'Education', placement: 62 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="skill" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="placement" name="Placement Rate %" fill="#006A4E" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Time to Employment After Training</CardTitle>
                    <CardDescription>
                      Average months before employment by sector
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { sector: 'IT & Tech', months: 2.3 },
                          { sector: 'Manufacturing', months: 3.5 },
                          { sector: 'Agriculture', months: 4.1 },
                          { sector: 'Healthcare', months: 1.8 },
                          { sector: 'Services', months: 3.2 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sector" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="months" name="Avg. Months" fill="#006A4E" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="regional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Skills Distribution</CardTitle>
                  <CardDescription>
                    Geographic distribution of skills across Bangladesh
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <RegionalDistribution />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Urban vs Rural Skills Comparison</CardTitle>
                    <CardDescription>
                      Skills distribution by settlement type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { category: 'IT & Tech', urban: 32, rural: 8 },
                          { category: 'Manufacturing', urban: 25, rural: 18 },
                          { category: 'Agriculture', urban: 10, rural: 35 },
                          { category: 'Healthcare', urban: 18, rural: 12 },
                          { category: 'Services', urban: 15, rural: 8 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="urban" name="Urban %" fill="#006A4E" />
                        <Bar dataKey="rural" name="Rural %" fill="#4C9E81" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Employment Rates</CardTitle>
                    <CardDescription>
                      Employment percentage by division
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { region: 'Dhaka', rate: 78 },
                          { region: 'Chittagong', rate: 72 },
                          { region: 'Khulna', rate: 68 },
                          { region: 'Rajshahi', rate: 65 },
                          { region: 'Sylhet', rate: 70 },
                          { region: 'Barisal', rate: 62 },
                          { region: 'Rangpur', rate: 60 },
                          { region: 'Mymensingh', rate: 64 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="rate" name="Employment Rate %" fill="#006A4E" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataInsights;
