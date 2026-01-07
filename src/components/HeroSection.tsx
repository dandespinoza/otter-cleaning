import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Award, Shield, Users, Leaf, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/clean-living-room.jpg";
import { checkServiceArea, type ServiceAreaResult } from "@/lib/serviceArea";

interface HeroSectionProps {
  onBookNow: () => void;
}

export function HeroSection({ onBookNow }: HeroSectionProps) {
  const navigate = useNavigate();
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");
  const [zipCode, setZipCode] = useState("");
  const [serviceArea, setServiceArea] = useState<ServiceAreaResult | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  // Background location check on mount
  useEffect(() => {
    const checkLocation = async () => {
      setIsCheckingLocation(true);
      try {
        const result = await checkServiceArea();
        if (result.inServiceArea) {
          setServiceArea(result);
        }
      } catch {
        // Silently fail - ZIP code entry is the fallback
      }
      setIsCheckingLocation(false);
    };
    checkLocation();
  }, []);

  const handleGetQuote = () => {
    // Build URL params for pre-filling the booking form
    const params = new URLSearchParams();
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (bathrooms) params.set("bathrooms", bathrooms);
    if (zipCode) params.set("zip", zipCode);

    const queryString = params.toString();
    navigate(queryString ? `/booking?${queryString}` : "/booking");
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-background">
      {/* Background Image - Right Side */}
      <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full">
        <img
          src={heroImage}
          alt="Professionally cleaned living room showcasing our house cleaning services"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent lg:via-background/40" />
      </div>

      <div className="container relative z-10 mx-auto py-12 lg:py-16">
        <div className="max-w-xl">
          {/* Family-Owned Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/15 text-navy px-4 py-2 rounded-full mb-6">
            <Award className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium">Family-Owned Since 2009 • 500+ Happy Clients</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-[1.1] mb-5">
            <span className="whitespace-nowrap">Professional Cleaning</span>
            <span className="block text-blue">You Can Trust.</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Award-winning residential and commercial cleaning in NYC, Long Island & New Jersey.
            Organic products, vetted cleaners, and a 100% satisfaction guarantee.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Leaf className="h-5 w-5 text-green-600" aria-hidden="true" />
              <span>100% Organic Products</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-blue" aria-hidden="true" />
              <span>Insured & Bonded</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-5 w-5 text-blue" aria-hidden="true" />
              <span>Background-Checked</span>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/50">
            <h2 className="font-semibold text-navy mb-3">Get Your Free Instant Quote</h2>

            {/* Service Area Badge - shows if detected in service area */}
            {serviceArea?.inServiceArea && (
              <div className="flex items-center gap-2 text-sm text-blue bg-blue/10 px-3 py-1.5 rounded-full mb-3 w-fit">
                <MapPin className="h-4 w-4" />
                <span>{serviceArea.message}</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <label htmlFor="hero-bedrooms" className="text-xs text-muted-foreground mb-1 block">Bedrooms</label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger id="hero-bedrooms" className="bg-background h-10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Studio</SelectItem>
                    <SelectItem value="1">1 Bed</SelectItem>
                    <SelectItem value="2">2 Beds</SelectItem>
                    <SelectItem value="3">3 Beds</SelectItem>
                    <SelectItem value="4">4 Beds</SelectItem>
                    <SelectItem value="5">5+ Beds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="hero-bathrooms" className="text-xs text-muted-foreground mb-1 block">Bathrooms</label>
                <Select value={bathrooms} onValueChange={setBathrooms}>
                  <SelectTrigger id="hero-bathrooms" className="bg-background h-10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bath</SelectItem>
                    <SelectItem value="2">2 Baths</SelectItem>
                    <SelectItem value="3">3 Baths</SelectItem>
                    <SelectItem value="4">4 Baths</SelectItem>
                    <SelectItem value="5">5+ Baths</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="hero-zip" className="text-xs text-muted-foreground mb-1 block">ZIP Code</label>
                <Input
                  id="hero-zip"
                  placeholder="Enter ZIP"
                  className="bg-background h-10"
                  aria-label="Your ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  maxLength={5}
                />
              </div>
            </div>
            <Button
              variant="red"
              size="lg"
              className="w-full"
              onClick={handleGetQuote}
            >
              Get Instant Pricing
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Free cancellation within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
