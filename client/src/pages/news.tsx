import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar, ArrowRight } from "lucide-react";

// Type definition for news item
type NewsItem = {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  publishedDate: string;
  isPublished: boolean;
};

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Fetch news items
  const { data: newsItems, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
  });
  
  // Filter news items based on search term and category
  const filteredNews = newsItems?.filter(item => 
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (category === "all" || item.category.toLowerCase() === category)
  ) || [];
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  
  // Total pages
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Get badge color based on category
  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'announcement':
        return 'bg-[#006A4E] text-white';
      case 'event':
        return 'bg-[#4C9E81] text-white';
      case 'success story':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#006A4E] mb-4">News & Updates</h1>
            <p className="text-gray-600 mb-8">
              Stay informed about the latest developments, success stories, and upcoming events related to the National Skills Database.
            </p>
            
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search news..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="inline-flex items-center gap-2">
                <select 
                  className="border rounded-md px-3 py-2 bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="announcement">Announcements</option>
                  <option value="event">Events</option>
                  <option value="success story">Success Stories</option>
                </select>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all" onClick={() => setCategory("all")}>All News</TabsTrigger>
                <TabsTrigger value="announcement" onClick={() => setCategory("announcement")}>Announcements</TabsTrigger>
                <TabsTrigger value="event" onClick={() => setCategory("event")}>Events</TabsTrigger>
                <TabsTrigger value="success" onClick={() => setCategory("success story")}>Success Stories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardHeader>
                          <div className="flex justify-between mb-2">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-24" />
                          </div>
                          <Skeleton className="h-8 w-full mb-2" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3 mt-2" />
                        </CardHeader>
                        <CardFooter>
                          <Skeleton className="h-10 w-28" />
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : currentItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-48 object-cover"
                        />
                        <CardHeader>
                          <div className="flex justify-between mb-2">
                            <span className={`text-xs px-2 py-1 rounded ${getBadgeColor(item.category)}`}>
                              {item.category}
                            </span>
                            <span className="text-gray-500 text-sm flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(item.publishedDate)}
                            </span>
                          </div>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <CardDescription className="line-clamp-3 mt-2">
                            {item.content}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button variant="link" className="text-[#006A4E] p-0 flex items-center">
                            {item.category === 'Event' ? 'Register Now' : 'Read More'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="mx-auto bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-700">No news items found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                  </div>
                )}
                
                {/* Pagination */}
                {!isLoading && filteredNews.length > itemsPerPage && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            href="#" 
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </TabsContent>
              
              {/* Other tabs content will automatically be filtered by the category selector */}
              <TabsContent value="announcement" className="space-y-6">
                {/* Content will be same as "all" but filtered */}
              </TabsContent>
              
              <TabsContent value="event" className="space-y-6">
                {/* Content will be same as "all" but filtered */}
              </TabsContent>
              
              <TabsContent value="success" className="space-y-6">
                {/* Content will be same as "all" but filtered */}
              </TabsContent>
            </Tabs>
            
            <div className="mt-10 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Subscribe to Updates</h2>
              <p className="text-gray-600 mb-4">
                Receive the latest news, event announcements, and success stories directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input type="email" placeholder="Your email address" className="flex-grow" />
                <Button className="bg-[#006A4E] hover:bg-[#00563F]">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
