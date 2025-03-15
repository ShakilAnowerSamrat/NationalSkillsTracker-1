import Header from "@/components/header";
import Footer from "@/components/footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#006A4E] mb-6">About the Initiative</h1>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
              <p className="text-gray-600 mb-6">
                The National Skills Database is a centralized platform that collects, displays, and analyzes the skill sets 
                of Bangladesh's national workforce. This resource supports policy-making, education planning, employment matching, 
                and skills gap analysis to drive economic growth and workforce development.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">Vision</h3>
              <p className="text-gray-600 mb-6">
                To create a comprehensive digital ecosystem that connects talent, education, and employment opportunities 
                while providing valuable data for strategic workforce development initiatives across Bangladesh.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">Key Objectives</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li><span className="font-medium text-gray-700">Inform and Engage:</span> Clearly communicate the benefits and functionalities of the national skills database.</li>
                <li><span className="font-medium text-gray-700">Facilitate Data Access:</span> Provide an intuitive interface for users to search, submit, and analyze skill-related data.</li>
                <li><span className="font-medium text-gray-700">Enhance Transparency:</span> Share insights and statistics on national skills development to inform policy and public discussion.</li>
                <li><span className="font-medium text-gray-700">Promote Collaboration:</span> Encourage participation from multiple stakeholders, including public, private, and educational sectors.</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits for Bangladesh</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-[#006A4E] mb-2">For Government</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>- Data-driven policy making</li>
                    <li>- Effective resource allocation</li>
                    <li>- National skills gap analysis</li>
                    <li>- Educational program planning</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-[#006A4E] mb-2">For Employers</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>- Access to qualified talent</li>
                    <li>- Recruitment cost reduction</li>
                    <li>- Industry-specific talent insights</li>
                    <li>- Streamlined hiring processes</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-[#006A4E] mb-2">For Educational Institutions</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>- Curriculum alignment with market needs</li>
                    <li>- Graduate employment tracking</li>
                    <li>- Enhanced industry partnerships</li>
                    <li>- Evidence-based program development</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-[#006A4E] mb-2">For Citizens</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>- Career guidance and planning</li>
                    <li>- Improved job matching</li>
                    <li>- Skill development recommendations</li>
                    <li>- Recognition of informal skills</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Approach</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#006A4E] mb-2">Inclusive Data Collection</h3>
                  <p className="text-gray-600">
                    The database incorporates skills information from formal education, technical training, professional certification, 
                    and informal learning to ensure comprehensive representation of Bangladesh's workforce capabilities.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-[#006A4E] mb-2">Multi-stakeholder Collaboration</h3>
                  <p className="text-gray-600">
                    We actively engage government ministries, educational institutions, industry associations, employers, and workers 
                    to create a shared platform that serves diverse needs while maintaining data integrity.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-[#006A4E] mb-2">Technology-enabled Access</h3>
                  <p className="text-gray-600">
                    Through web and mobile interfaces, the database is accessible to users across Bangladesh, with special 
                    consideration for users with limited connectivity or technological familiarity.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-[#006A4E] mb-2">Continuous Improvement</h3>
                  <p className="text-gray-600">
                    The platform evolves through regular feedback, updated data collection methods, and technological enhancements 
                    to serve the changing needs of Bangladesh's dynamic economy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
