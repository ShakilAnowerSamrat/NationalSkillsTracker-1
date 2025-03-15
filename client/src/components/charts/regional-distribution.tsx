import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Download } from "lucide-react";

// Type definition for API data format
type RegionalDistributionData = {
  id: number;
  category: string;
  value: number;
  region: string;
  updatedAt: string;
};

// Type for our component consumption
type RegionalDistributionItem = {
  region: string;
  value: number;
};

// Bangladesh map component
const BangladeshMap = ({ distributionData }: { distributionData?: RegionalDistributionItem[] }) => {
  // Default data if no API data is available
  const defaultRegionalData = [
    { region: "dhaka", value: 42 },
    { region: "chittagong", value: 23 },
    { region: "khulna", value: 12 },
    { region: "rajshahi", value: 8 },
    { region: "sylhet", value: 6 },
    { region: "barisal", value: 5 },
    { region: "rangpur", value: 4 },
    { region: "mymensingh", value: 3 }
  ];

  const data = distributionData || defaultRegionalData;
  
  // Calculate the size of circles based on value
  const getCircleSize = (value: number) => {
    const minSize = 5;
    const maxSize = 20;
    const maxPossibleValue = 50; // Maximum expected percentage value
    
    // Linear scale between min and max size based on value
    return minSize + ((value / maxPossibleValue) * (maxSize - minSize));
  };

  // Get opacity based on value
  const getOpacity = (value: number) => {
    const minOpacity = 0.2;
    const maxOpacity = 0.7;
    const maxPossibleValue = 50; // Maximum expected percentage value
    
    // Linear scale between min and max opacity based on value
    return minOpacity + ((value / maxPossibleValue) * (maxOpacity - minOpacity));
  };

  return (
    <svg viewBox="0 0 500 350" className="w-full h-full">
      <path 
        d="M120,50 C150,30 200,20 250,30 C300,40 350,20 400,50 C450,80 480,150 470,200 C460,250 480,300 450,320 C420,340 350,350 300,340 C250,330 200,350 150,330 C100,310 70,250 80,200 C90,150 90,70 120,50 Z" 
        fill="#E9ECEF" 
        stroke="#006A4E" 
        strokeWidth="2" 
      />
      
      {/* Division markers */}
      <circle 
        cx="180" cy="120" 
        r={getCircleSize(data.find(d => d.region === "dhaka")?.value || 0)} 
        fill="#006A4E" 
        fillOpacity={getOpacity(data.find(d => d.region === "dhaka")?.value || 0)} 
        data-region="Dhaka" 
        className="cursor-pointer hover:fill-opacity-1 transition-all" 
      />
      <circle 
        cx="320" cy="100" 
        r={getCircleSize(data.find(d => d.region === "chittagong")?.value || 0)} 
        fill="#006A4E" 
        fillOpacity={getOpacity(data.find(d => d.region === "chittagong")?.value || 0)} 
        data-region="Chittagong" 
        className="cursor-pointer hover:fill-opacity-1 transition-all" 
      />
      <circle 
        cx="220" cy="220" 
        r={getCircleSize(data.find(d => d.region === "khulna")?.value || 0)} 
        fill="#006A4E" 
        fillOpacity={getOpacity(data.find(d => d.region === "khulna")?.value || 0)} 
        data-region="Khulna" 
        className="cursor-pointer hover:fill-opacity-1 transition-all" 
      />
      <circle 
        cx="150" cy="180" 
        r={getCircleSize(data.find(d => d.region === "rajshahi")?.value || 0)} 
        fill="#006A4E" 
        fillOpacity={getOpacity(data.find(d => d.region === "rajshahi")?.value || 0)} 
        data-region="Rajshahi" 
        className="cursor-pointer hover:fill-opacity-1 transition-all" 
      />
      <circle 
        cx="380" cy="180" 
        r={getCircleSize(data.find(d => d.region === "sylhet")?.value || 0)} 
        fill="#006A4E" 
        fillOpacity={getOpacity(data.find(d => d.region === "sylhet")?.value || 0)} 
        data-region="Sylhet" 
        className="cursor-pointer hover:fill-opacity-1 transition-all" 
      />
      <circle 
        cx="280" cy="280" 
        r={getCircleSize(data.find(d => d.region === "barisal")?.value || 0)} 
        fill="#006A4E" 
        fillOpacity={getOpacity(data.find(d => d.region === "barisal")?.value || 0)} 
        data-region="Barisal" 
        className="cursor-pointer hover:fill-opacity-1 transition-all" 
      />
      <circle 
        cx="120" cy="120" 
        r={getCircleSize(data.find(d => d.region === "rangpur")?.value || 0)} 
        fill="#006A4E" 
        fillOpacity={getOpacity(data.find(d => d.region === "rangpur")?.value || 0)} 
        data-region="Rangpur" 
        className="cursor-pointer hover:fill-opacity-1 transition-all" 
      />
      <circle 
        cx="350" cy="240" 
        r={getCircleSize(data.find(d => d.region === "mymensingh")?.value || 0)} 
        fill="#006A4E" 
        fillOpacity={getOpacity(data.find(d => d.region === "mymensingh")?.value || 0)} 
        data-region="Mymensingh" 
        className="cursor-pointer hover:fill-opacity-1 transition-all" 
      />
    </svg>
  );
};

const RegionalDistribution = () => {
  // Fetch raw data from API
  const { data: rawDistributionData, isLoading } = useQuery<RegionalDistributionData[]>({
    queryKey: ['/api/statistics/regional_distribution'],
  });

  // Convert API data to our component format
  const distributionData: RegionalDistributionItem[] = rawDistributionData?.map(item => ({
    region: item.region,
    value: item.value
  })) || [];

  // Handle download (this would be replaced with actual download logic)
  const handleDownload = () => {
    alert("Download functionality would be implemented here");
  };

  // Get the top regions to display in the grid
  const topRegions = distributionData.length > 0
    ? [...distributionData].sort((a, b) => b.value - a.value).slice(0, 4)
    : [
        { region: "dhaka", value: 42 },
        { region: "chittagong", value: 23 },
        { region: "khulna", value: 12 },
        { region: "other", value: 23 }
      ];

  // Format region name to capitalize first letter
  const formatRegionName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">Regional Distribution</CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-sm text-[#006A4E] border border-[#006A4E] px-3 py-1 rounded-md hover:bg-[#006A4E] hover:text-white transition"
            onClick={handleDownload}
          >
            <Download size={16} className="mr-1" />
            Download
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition"
          >
            <MoreVertical size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-4 aspect-h-3 mb-4">
          <div className="w-full h-72 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                <div className="text-[#006A4E]">Loading map data...</div>
              </div>
            ) : (
              <BangladeshMap distributionData={distributionData} />
            )}
            <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-2 rounded text-xs">
              Circle size represents registered workforce
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {topRegions.map((region, index) => (
            <div key={`region_${index}`} className="bg-[#006A4E] bg-opacity-10 p-2 rounded text-center">
              <div className="text-sm font-medium text-gray-700">{formatRegionName(region.region)}</div>
              <div className="text-lg font-bold text-[#006A4E]">{region.value}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalDistribution;
