import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

const NewsCard = ({ 
  imageUrl, 
  category, 
  date, 
  title, 
  content, 
  linkText, 
  linkUrl 
}: {
  imageUrl: string;
  category: string;
  date: string;
  title: string;
  content: string;
  linkText: string;
  linkUrl: string;
}) => {
  // Determine badge color based on category
  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'announcement':
        return 'bg-[#006A4E]';
      case 'event':
        return 'bg-[#4C9E81]';
      case 'success story':
        return 'bg-[#4C9E81]';
      default:
        return 'bg-[#006A4E]';
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 border border-gray-200">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className={`${getBadgeColor(category)} text-white text-xs px-2 py-1 rounded`}>{category}</span>
          <span className="text-gray-500 text-sm ml-auto">{date}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">
          {content}
        </p>
        <Link href={linkUrl} className="text-[#006A4E] hover:underline font-medium inline-flex items-center">
          {linkText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const NewsUpdates = () => {
  const { data: newsItems, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">News & Updates</h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Stay informed about the latest developments, success stories, and upcoming events related to the National Skills Database.
        </p>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow border border-gray-200">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-24 h-6" />
                    <Skeleton className="w-24 h-4 ml-auto" />
                  </div>
                  <Skeleton className="w-full h-8 mb-3" />
                  <Skeleton className="w-full h-20 mb-4" />
                  <Skeleton className="w-28 h-6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems?.slice(0, 3).map((item) => (
              <NewsCard 
                key={item.id}
                imageUrl={item.imageUrl}
                category={item.category}
                date={formatDate(item.publishedDate)}
                title={item.title}
                content={item.content}
                linkText={item.category === 'Event' ? 'Register Now' : 'Read More'}
                linkUrl={`/news/${item.id}`}
              />
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Link 
            href="/news" 
            className="inline-block bg-white border border-[#006A4E] text-[#006A4E] hover:bg-[#006A4E] hover:text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            View All News & Updates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;
