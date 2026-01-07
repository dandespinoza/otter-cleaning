import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ValueProps } from "@/components/ValueProps";
import { ServicesSection } from "@/components/ServicesSection";
import { HowItWorks } from "@/components/HowItWorks";
import { AboutSection } from "@/components/AboutSection";
import { ExpectSection } from "@/components/ExpectSection";
import { FAQSection } from "@/components/FAQSection";
import { LocationsSection } from "@/components/LocationsSection";
import { CTABookingSection } from "@/components/CTABookingSection";
import { Footer } from "@/components/Footer";
import { SEO, localBusinessSchema } from "@/components/SEO";

const Index = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Professional House Cleaning Services"
        description="Trusted residential and commercial cleaning in NYC, Long Island & New Jersey. Family-owned since 2009 with 500+ satisfied clients. Eco-friendly products, vetted cleaners, 24-hour satisfaction guarantee. Book online in 60 seconds."
        keywords="house cleaning NYC, maid service Long Island, cleaning service New Jersey, residential cleaning, deep cleaning service, move out cleaning, eco-friendly cleaning, professional cleaners near me, home cleaning services"
        canonicalUrl="/"
        structuredData={localBusinessSchema}
      />
      <Header onBookNow={handleBookNow} />
      <HeroSection onBookNow={handleBookNow} />
      <ValueProps />
      <ServicesSection onSelect={handleBookNow} />
      <HowItWorks />
      <AboutSection />
      <ExpectSection />
      <FAQSection />
      <LocationsSection />
      <CTABookingSection onBookNow={handleBookNow} />
      <Footer onBookNow={handleBookNow} />
    </div>
  );
};

export default Index;
