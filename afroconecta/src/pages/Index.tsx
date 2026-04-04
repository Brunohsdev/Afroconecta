import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import BraidTypes from "@/components/home/BraidTypes";
import FeaturedBraiders from "@/components/home/FeaturedBraiders";
import Testimonials from "@/components/home/Testimonials";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <div id="como-funciona">
          <HowItWorks />
        </div>
        <BraidTypes />
        <FeaturedBraiders />
        <Testimonials />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
