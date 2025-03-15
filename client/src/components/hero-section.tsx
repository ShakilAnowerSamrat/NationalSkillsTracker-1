import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="bg-white py-8 md:py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[#006A4E] opacity-5 skew-y-6 transform origin-top-right"></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#006A4E] mb-4">National Skills Database</h2>
            <h3 className="text-xl md:text-2xl text-gray-700 mb-6">Empowering Bangladesh's Workforce</h3>
            <p className="text-gray-600 mb-8 text-lg">
              A centralized platform connecting skills, education, and employment opportunities to drive economic growth and workforce development across Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/register" className="bg-[#006A4E] hover:bg-[#00563F] text-white font-bold py-3 px-6 rounded-md transition duration-300 text-center">
                Get Started
              </Link>
              <Link href="/about" className="border border-[#006A4E] text-[#006A4E] hover:bg-gray-50 font-bold py-3 px-6 rounded-md transition duration-300 text-center">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Bangladesh workforce collaboration" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#F42A41] text-white p-3 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">3.2M+</div>
                <div className="text-sm">Skills Registered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
