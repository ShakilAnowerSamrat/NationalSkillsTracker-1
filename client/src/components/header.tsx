import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const BdLogo = () => (
  <svg className="h-12 w-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="50" fill="#F42A41"/>
    <circle cx="50" cy="50" r="30" fill="#006A4E"/>
  </svg>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const { data: user } = useQuery({
    queryKey: ['/api/user'],
    staleTime: 60000,
    retry: false,
    throwOnError: false
  });

  const handleLogout = async () => {
    await apiRequest('POST', '/api/logout');
    queryClient.invalidateQueries({ queryKey: ['/api/user'] });
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActiveLink = (path: string) => location === path;

  return (
    <header className="bg-[#006A4E] text-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top Bar with Government Logo and User Controls */}
        <div className="flex justify-between items-center py-3 border-b border-[#4C9E81]">
          <div className="flex items-center">
            <div className="mr-3">
              <BdLogo />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</h1>
              <p className="text-sm md:text-base">Government of the People's Republic of Bangladesh</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#" className="text-white hover:text-gray-200 text-sm">English</Link>
            <Link href="#" className="text-white hover:text-gray-200 text-sm">বাংলা</Link>
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/profile" className="bg-white text-[#006A4E] px-4 py-1 rounded font-medium text-sm hover:bg-gray-100 transition">
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent text-white border-white hover:bg-white hover:text-[#006A4E]"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" className="bg-white text-[#006A4E] px-4 py-1 rounded font-medium text-sm hover:bg-gray-100 transition">
                Login
              </Link>
            )}
          </div>
          <button 
            className="md:hidden text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Main Navigation */}
        <nav className="hidden md:block py-3">
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/" 
                className={`text-white hover:text-gray-200 font-medium py-2 ${isActiveLink('/') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`text-white hover:text-gray-200 font-medium py-2 ${isActiveLink('/about') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/data-insights" 
                className={`text-white hover:text-gray-200 font-medium py-2 ${isActiveLink('/data-insights') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}
              >
                Data & Insights
              </Link>
            </li>
            <li>
              <Link 
                href="/user-portal" 
                className={`text-white hover:text-gray-200 font-medium py-2 ${isActiveLink('/user-portal') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}
              >
                User Portal
              </Link>
            </li>
            <li>
              <Link 
                href="/resources" 
                className={`text-white hover:text-gray-200 font-medium py-2 ${isActiveLink('/resources') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}
              >
                Resources
              </Link>
            </li>
            <li>
              <Link 
                href="/news" 
                className={`text-white hover:text-gray-200 font-medium py-2 ${isActiveLink('/news') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}
              >
                News & Updates
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#4C9E81]">
            <ul className="space-y-2">
              <li>
                <Link href="/" className={`text-white block py-2 px-3 ${isActiveLink('/') ? 'bg-[#00563F]' : 'hover:bg-[#00563F]'} rounded-md`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={`text-white block py-2 px-3 ${isActiveLink('/about') ? 'bg-[#00563F]' : 'hover:bg-[#00563F]'} rounded-md`}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/data-insights" className={`text-white block py-2 px-3 ${isActiveLink('/data-insights') ? 'bg-[#00563F]' : 'hover:bg-[#00563F]'} rounded-md`}>
                  Data & Insights
                </Link>
              </li>
              <li>
                <Link href="/user-portal" className={`text-white block py-2 px-3 ${isActiveLink('/user-portal') ? 'bg-[#00563F]' : 'hover:bg-[#00563F]'} rounded-md`}>
                  User Portal
                </Link>
              </li>
              <li>
                <Link href="/resources" className={`text-white block py-2 px-3 ${isActiveLink('/resources') ? 'bg-[#00563F]' : 'hover:bg-[#00563F]'} rounded-md`}>
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/news" className={`text-white block py-2 px-3 ${isActiveLink('/news') ? 'bg-[#00563F]' : 'hover:bg-[#00563F]'} rounded-md`}>
                  News & Updates
                </Link>
              </li>
              <li className="pt-2 border-t border-[#4C9E81] mt-2">
                <div className="flex space-x-2">
                  <Link href="#" className="text-white block py-2 px-3 hover:bg-[#00563F] rounded-md flex-1 text-center">English</Link>
                  <Link href="#" className="text-white block py-2 px-3 hover:bg-[#00563F] rounded-md flex-1 text-center">বাংলা</Link>
                </div>
                {user ? (
                  <div className="flex flex-col space-y-2 mt-2">
                    <Link href="/profile" className="bg-white text-[#006A4E] block py-2 px-3 rounded-md text-center font-medium">
                      Profile
                    </Link>
                    <Button 
                      variant="outline" 
                      className="bg-transparent text-white border-white hover:bg-white hover:text-[#006A4E] w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login" className="bg-white text-[#006A4E] block py-2 px-3 rounded-md text-center mt-2 font-medium">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
