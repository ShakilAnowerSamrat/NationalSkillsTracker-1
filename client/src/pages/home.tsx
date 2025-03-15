import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import KeyStatistics from "@/components/key-statistics";
import UserPortals from "@/components/user-portals";
import DataVisualizations from "@/components/data-visualizations";
import UserRegistration from "@/components/user-registration";
import NewsUpdates from "@/components/news-updates";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <KeyStatistics />
        <UserPortals />
        <DataVisualizations />
        <UserRegistration />
        <NewsUpdates />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
