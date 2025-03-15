import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Book, 
  BookOpen, 
  FileVideo, 
  FileImage, 
  Search, 
  Filter 
} from "lucide-react";

// Resource type
type Resource = {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "doc" | "video" | "image";
  category: "policy" | "guidelines" | "research" | "training";
  fileSize: string;
  downloadUrl: string;
  date: string;
};

// Sample resources
const resources: Resource[] = [
  {
    id: "1",
    title: "National Skills Framework - 2023 Edition",
    description: "Official framework defining skill standards and qualifications across industries in Bangladesh",
    type: "pdf",
    category: "policy",
    fileSize: "3.4 MB",
    downloadUrl: "#",
    date: "2023-05-15"
  },
  {
    id: "2",
    title: "Skills Data Submission Guidelines",
    description: "Step-by-step guide for educational institutions to submit skills data to the national database",
    type: "pdf",
    category: "guidelines",
    fileSize: "1.8 MB",
    downloadUrl: "#",
    date: "2023-04-10"
  },
  {
    id: "3",
    title: "IT Sector Skills Gap Analysis Report",
    description: "Research report on current and projected skills gaps in the information technology sector",
    type: "pdf",
    category: "research",
    fileSize: "5.2 MB",
    downloadUrl: "#",
    date: "2023-03-22"
  },
  {
    id: "4",
    title: "Skills Database User Manual",
    description: "Comprehensive guide to using the National Skills Database platform for all user types",
    type: "pdf",
    category: "guidelines",
    fileSize: "4.1 MB",
    downloadUrl: "#",
    date: "2023-02-15"
  },
  {
    id: "5",
    title: "Database API Documentation",
    description: "Technical documentation for developers integrating with the National Skills Database API",
    type: "doc",
    category: "guidelines",
    fileSize: "2.3 MB",
    downloadUrl: "#",
    date: "2023-01-30"
  },
  {
    id: "6",
    title: "Skills Training Best Practices",
    description: "Guide for training providers on effective skills development methodologies",
    type: "pdf",
    category: "training",
    fileSize: "3.7 MB",
    downloadUrl: "#",
    date: "2022-12-12"
  },
  {
    id: "7",
    title: "Regional Skills Distribution Map",
    description: "Visual representation of skills distribution across different regions of Bangladesh",
    type: "image",
    category: "research",
    fileSize: "8.5 MB",
    downloadUrl: "#",
    date: "2022-11-08"
  },
  {
    id: "8",
    title: "Introduction to the National Skills Database",
    description: "Video tutorial explaining the features and benefits of the National Skills Database",
    type: "video",
    category: "training",
    fileSize: "45 MB",
    downloadUrl: "#",
    date: "2022-10-20"
  }
];

const ResourceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-12 w-12 text-[#006A4E]" />;
    case 'doc':
      return <Book className="h-12 w-12 text-[#006A4E]" />;
    case 'video':
      return <FileVideo className="h-12 w-12 text-[#006A4E]" />;
    case 'image':
      return <FileImage className="h-12 w-12 text-[#006A4E]" />;
    default:
      return <BookOpen className="h-12 w-12 text-[#006A4E]" />;
  }
};

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  
  // Filter resources based on search term and category
  const filteredResources = resources.filter(resource => 
    (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     resource.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (category === "all" || resource.category === category)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#006A4E] mb-4">Resources</h1>
            <p className="text-gray-600 mb-8">
              Access official documents, guides, research papers, and training materials related to the National Skills Database initiative.
            </p>
            
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search resources..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="inline-flex items-center gap-2">
                <Filter className="text-gray-400" />
                <select 
                  className="border rounded-md px-3 py-2 bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="policy">Policy Documents</option>
                  <option value="guidelines">Guidelines</option>
                  <option value="research">Research & Reports</option>
                  <option value="training">Training Materials</option>
                </select>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="policy">Policy Documents</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                <TabsTrigger value="other">Other Materials</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResources.length > 0 ? (
                    filteredResources.map(resource => (
                      <Card key={resource.id} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-start space-y-0 gap-4">
                          <ResourceIcon type={resource.type} />
                          <div>
                            <CardTitle>{resource.title}</CardTitle>
                            <CardDescription className="mt-2">{resource.description}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>File type: {resource.type.toUpperCase()}</span>
                            <span>Size: {resource.fileSize}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Published: {new Date(resource.date).toLocaleDateString()}
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 flex justify-end">
                          <Button className="bg-[#006A4E] hover:bg-[#00563F] flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-700">No resources found</h3>
                      <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="policy" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResources.filter(r => r.category === 'policy').length > 0 ? (
                    filteredResources
                      .filter(r => r.category === 'policy')
                      .map(resource => (
                        <Card key={resource.id} className="overflow-hidden">
                          <CardHeader className="flex flex-row items-start space-y-0 gap-4">
                            <ResourceIcon type={resource.type} />
                            <div>
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription className="mt-2">{resource.description}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>File type: {resource.type.toUpperCase()}</span>
                              <span>Size: {resource.fileSize}</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Published: {new Date(resource.date).toLocaleDateString()}
                            </div>
                          </CardContent>
                          <CardFooter className="bg-gray-50 flex justify-end">
                            <Button className="bg-[#006A4E] hover:bg-[#00563F] flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  ) : (
                    <div className="col-span-2 py-12 text-center">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-700">No policy documents found</h3>
                      <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="guidelines" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResources.filter(r => r.category === 'guidelines').length > 0 ? (
                    filteredResources
                      .filter(r => r.category === 'guidelines')
                      .map(resource => (
                        <Card key={resource.id} className="overflow-hidden">
                          <CardHeader className="flex flex-row items-start space-y-0 gap-4">
                            <ResourceIcon type={resource.type} />
                            <div>
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription className="mt-2">{resource.description}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>File type: {resource.type.toUpperCase()}</span>
                              <span>Size: {resource.fileSize}</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Published: {new Date(resource.date).toLocaleDateString()}
                            </div>
                          </CardContent>
                          <CardFooter className="bg-gray-50 flex justify-end">
                            <Button className="bg-[#006A4E] hover:bg-[#00563F] flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  ) : (
                    <div className="col-span-2 py-12 text-center">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-700">No guidelines found</h3>
                      <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="other" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResources.filter(r => r.category === 'research' || r.category === 'training').length > 0 ? (
                    filteredResources
                      .filter(r => r.category === 'research' || r.category === 'training')
                      .map(resource => (
                        <Card key={resource.id} className="overflow-hidden">
                          <CardHeader className="flex flex-row items-start space-y-0 gap-4">
                            <ResourceIcon type={resource.type} />
                            <div>
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription className="mt-2">{resource.description}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>File type: {resource.type.toUpperCase()}</span>
                              <span>Size: {resource.fileSize}</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Published: {new Date(resource.date).toLocaleDateString()}
                            </div>
                          </CardContent>
                          <CardFooter className="bg-gray-50 flex justify-end">
                            <Button className="bg-[#006A4E] hover:bg-[#00563F] flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  ) : (
                    <div className="col-span-2 py-12 text-center">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-700">No other materials found</h3>
                      <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-10 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Request Custom Resources</h2>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Submit a request for specific data or resources related to the National Skills Database.
              </p>
              <Button className="bg-[#006A4E] hover:bg-[#00563F]">
                Submit Resource Request
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
