import { useQuery } from "@tanstack/react-query";
import { User, Building, GraduationCap, Handshake } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Statistic = {
  id: number;
  category: string;
  value: number;
  region?: string;
  updatedAt: Date;
};

const KeyStatistics = () => {
  const { data: statistics, isLoading } = useQuery<Statistic[]>({
    queryKey: ['/api/statistics'],
  });

  // Helper to get a specific statistic
  const getStatValue = (category: string) => {
    if (isLoading || !statistics) return null;
    const stat = statistics.find(s => s.category === category && s.region === 'all');
    return stat?.value;
  };

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Helper to determine the suffix (K, M, etc.)
  const formatWithSuffix = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return formatNumber(value);
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">Key Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Registered Users */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="rounded-full bg-[#4C9E81] bg-opacity-20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <User className="text-[#006A4E] h-8 w-8" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mx-auto mb-2" />
            ) : (
              <div className="text-3xl font-bold text-[#006A4E] mb-2">
                {formatWithSuffix(getStatValue('registered_users') || 0)}
              </div>
            )}
            <div className="text-gray-600">Registered Users</div>
          </div>
          
          {/* Registered Employers */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="rounded-full bg-[#4C9E81] bg-opacity-20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Building className="text-[#006A4E] h-8 w-8" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mx-auto mb-2" />
            ) : (
              <div className="text-3xl font-bold text-[#006A4E] mb-2">
                {formatWithSuffix(getStatValue('employers') || 0)}
              </div>
            )}
            <div className="text-gray-600">Registered Employers</div>
          </div>
          
          {/* Training Institutions */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="rounded-full bg-[#4C9E81] bg-opacity-20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <GraduationCap className="text-[#006A4E] h-8 w-8" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mx-auto mb-2" />
            ) : (
              <div className="text-3xl font-bold text-[#006A4E] mb-2">
                {formatWithSuffix(getStatValue('institutions') || 0)}
              </div>
            )}
            <div className="text-gray-600">Training Institutions</div>
          </div>
          
          {/* Successful Placements */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="rounded-full bg-[#4C9E81] bg-opacity-20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Handshake className="text-[#006A4E] h-8 w-8" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mx-auto mb-2" />
            ) : (
              <div className="text-3xl font-bold text-[#006A4E] mb-2">
                {formatWithSuffix(getStatValue('placements') || 0)}
              </div>
            )}
            <div className="text-gray-600">Successful Placements</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyStatistics;
