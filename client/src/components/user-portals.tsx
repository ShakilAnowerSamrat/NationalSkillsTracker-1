import { Link } from "wouter";
import { Landmark, Building, User, Check } from "lucide-react";

const PortalCard = ({ 
  title, 
  icon, 
  description, 
  features, 
  linkText, 
  linkHref,
  isPulse = false 
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  linkText: string;
  linkHref: string;
  isPulse?: boolean;
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ${isPulse ? 'animate-pulse' : ''}`}>
      <div className="bg-[#006A4E] h-2"></div>
      <div className="p-6">
        <div className="rounded-full bg-[#4C9E81] bg-opacity-20 w-16 h-16 mb-4 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <ul className="text-gray-600 mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="text-green-600 mt-1 mr-2 h-4 w-4" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link 
          href={linkHref} 
          className="block text-center bg-[#006A4E] text-white font-medium py-2 px-4 rounded hover:bg-[#00563F] transition duration-300"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

const UserPortals = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">User Portals</h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          The National Skills Database serves different stakeholders with tailored resources and functionalities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Government Portal */}
          <PortalCard 
            title="Government Portal"
            icon={<Landmark className="text-[#006A4E] h-8 w-8" />}
            description="Access comprehensive workforce data, generate reports, and inform policy decisions."
            features={[
              "Policy analysis dashboards",
              "Regional skills mapping",
              "Trend forecasting tools"
            ]}
            linkText="Government Login"
            linkHref="/login?type=government"
          />
          
          {/* Employer Portal */}
          <PortalCard 
            title="Employer Portal"
            icon={<Building className="text-[#006A4E] h-8 w-8" />}
            description="Find qualified candidates, post job opportunities, and contribute to skills data."
            features={[
              "Candidate search tools",
              "Skills gap analysis",
              "Job posting platform"
            ]}
            linkText="Employer Portal"
            linkHref="/login?type=employer"
          />
          
          {/* Citizen Portal */}
          <PortalCard 
            title="Citizen Portal"
            icon={<User className="text-[#006A4E] h-8 w-8" />}
            description="Register your skills, find training opportunities, and discover career paths."
            features={[
              "Skills profile builder",
              "Training recommendations",
              "Job matching service"
            ]}
            linkText="Register Your Skills"
            linkHref="/register"
            isPulse={true}
          />
        </div>
      </div>
    </section>
  );
};

export default UserPortals;
