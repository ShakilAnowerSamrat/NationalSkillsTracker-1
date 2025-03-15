import { Link } from "wouter";
import SkillsDistribution from "./charts/skills-distribution";
import RegionalDistribution from "./charts/regional-distribution";

const DataVisualizations = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">Data Insights</h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Explore interactive visualizations of Bangladesh's workforce skills data.
        </p>
        
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          {/* Skills Distribution Chart */}
          <div className="md:w-1/2">
            <SkillsDistribution />
          </div>
          
          {/* Regional Distribution Map */}
          <div className="md:w-1/2">
            <RegionalDistribution />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/data-insights" className="inline-flex items-center text-[#006A4E] hover:underline font-medium">
            View Full Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DataVisualizations;
