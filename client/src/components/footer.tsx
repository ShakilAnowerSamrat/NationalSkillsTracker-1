import { Link } from "wouter";

const BdLogo = () => (
  <svg className="h-10 w-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="50" fill="#F42A41"/>
    <circle cx="50" cy="50" r="30" fill="#006A4E"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <BdLogo />
              </div>
              <div>
                <h2 className="text-lg font-bold">National Skills Database</h2>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering Bangladesh's workforce through skills development, data-driven planning, and connecting talent with opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About the Initiative</Link></li>
              <li><Link href="/data-insights" className="text-gray-400 hover:text-white transition">Data & Insights</Link></li>
              <li><Link href="/user-portal" className="text-gray-400 hover:text-white transition">User Portal</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-white transition">Resources</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white transition">News & Updates</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Stakeholders</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Ministry of Education</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Ministry of Labour</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Technical Education Board</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Industry Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Educational Institutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">International Collaborations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#F42A41]"></i>
                <span>Ministry of Education, Bangladesh Secretariat, Dhaka-1000</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3 text-[#F42A41]"></i>
                <span>+880 2-9545082</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-[#F42A41]"></i>
                <span>skills@moedu.gov.bd</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/about" className="bg-[#F42A41] text-white px-4 py-2 rounded inline-block hover:bg-opacity-90 transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-700 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} National Skills Database. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
