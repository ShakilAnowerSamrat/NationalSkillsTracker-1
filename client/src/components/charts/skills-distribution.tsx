import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Download } from "lucide-react";

// Type definition for skill distribution data from API
type SkillDistributionData = {
  id: number;
  category: string;
  value: number;
  region: string;
  updatedAt: string;
};

// Converted type for the chart
type SkillDistributionItem = {
  category: string;
  count: number;
};

const SkillsDistribution = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  const { data: rawDistributionData, isLoading } = useQuery<SkillDistributionData[]>({
    queryKey: ['/api/statistics/skills_distribution'],
  });

  // Convert API data format to our chart format
  const distributionData: SkillDistributionItem[] = rawDistributionData?.map(item => ({
    category: item.region,
    count: item.value
  })) || [];

  useEffect(() => {
    if (!distributionData.length || !chartRef.current) return;

    // Clear existing bars
    while (chartRef.current.firstChild) {
      chartRef.current.removeChild(chartRef.current.firstChild);
    }

    // Calculate the width based on container width divided by number of items
    const barGap = 2; // percentage gap between bars
    const containerWidth = 100;
    const barWidth = (containerWidth - (barGap * (distributionData.length - 1))) / distributionData.length;
    
    distributionData.forEach((item, index) => {
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      bar.style.position = 'absolute';
      bar.style.bottom = '0';
      bar.style.left = `${index * (barWidth + barGap)}%`;
      bar.style.width = `${barWidth}%`;
      bar.style.height = '0';
      bar.style.backgroundColor = '#006A4E';
      bar.style.transition = 'height 0.5s ease';
      bar.style.borderRadius = '4px 4px 0 0';
      
      // Add data attributes for tooltips if needed
      bar.dataset.value = item.count.toString();
      bar.dataset.sector = item.category;
      
      chartRef.current.appendChild(bar);
      
      // Animate bar height after a small delay
      setTimeout(() => {
        bar.style.height = `${item.count * 3}px`;
      }, 100 + (index * 100));
    });
  }, [distributionData]);

  // Handle download (this would be replaced with actual download logic)
  const handleDownload = () => {
    alert("Download functionality would be implemented here");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">Skills Distribution</CardTitle>
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
        <div className="chart-container h-[300px] relative" ref={chartRef}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <div className="text-[#006A4E]">Loading chart data...</div>
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t border-gray-200 mt-4">
          <div className="flex justify-between text-sm text-gray-600">
            {distributionData.length > 0 ? (
              distributionData.map((item, index) => (
                <div key={`skill_${index}`}>{item.category}</div>
              ))
            ) : (
              <>
                <div>IT & Technology</div>
                <div>Manufacturing</div>
                <div>Agriculture</div>
                <div>Healthcare</div>
                <div>Services</div>
                <div>Construction</div>
                <div>Education</div>
                <div>Other</div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsDistribution;
