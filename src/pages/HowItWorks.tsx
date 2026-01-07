import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Key, Sparkles, MessageSquare, RefreshCcw, Shield, Camera, CheckCircle, ArrowRight } from "lucide-react";
import { SEO, webPageSchema } from "@/components/SEO";

const steps = [
  {
    icon: Calendar,
    step: 1,
    title: "Book Online",
    description: "Choose your service tier, pick a date, and book in under 60 seconds. We're available every day with cleans starting at 8am.",
  },
  {
    icon: Key,
    step: 2,
    title: "Provide Access",
    description: "Share entry instructions—doorman, lockbox, or meet us there. We handle the rest with complete discretion.",
  },
  {
    icon: Sparkles,
    step: 3,
    title: "We Clean",
    description: "Our trained professionals follow rigorous checklists specific to your service tier. Every surface, every standard.",
  },
  {
    icon: Camera,
    step: 4,
    title: "Photo Verification",
    description: "We document kitchens and bathrooms with before/after photos for accountability and your peace of mind.",
  },
  {
    icon: MessageSquare,
    step: 5,
    title: "Give Feedback",
    description: "Receive a same-day summary and quick survey. Your feedback helps us continuously improve.",
  },
  {
    icon: RefreshCcw,
    step: 6,
    title: "Schedule Recurring",
    description: "Set up weekly, bi-weekly, or monthly cleans and enjoy recurring discounts. A fresh home on autopilot.",
  },
];

const guarantees = [
  { icon: Shield, title: "Satisfaction Guarantee", description: "Not happy? Tell us within 24 hours and we'll return to address it—free." },
  { icon: CheckCircle, title: "Insured & Bonded", description: "Full coverage for your peace of mind. COI available on request." },
  { icon: Camera, title: "Photo Documentation", description: "Before/after photos on kitchens and bathrooms for accountability." },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/?book=true");
  };

  const pageSchema = webPageSchema(
    "How Our Cleaning Service Works",
    "Learn about our simple 6-step cleaning process: book online, provide access, we clean, photo verification, feedback, and recurring scheduling.",
    "/how-it-works"
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="How Our House Cleaning Service Works"
        description="Simple 6-step process: Book online in 60 seconds, provide access, our vetted cleaners work their magic, receive photo verification, give feedback, and schedule recurring cleans. 100% satisfaction guaranteed."
        keywords="how house cleaning works, cleaning service process, what to expect from cleaning service, professional cleaning process, book cleaning online"
        canonicalUrl="/how-it-works"
        structuredData={pageSchema}
      />
      <Header onBookNow={handleBookNow} />

      {/* Hero */}
      <section className="py-20 bg-cream overflow-hidden">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-4 py-2 rounded-full mb-6 animate-fade-in">
            <ArrowRight className="h-4 w-4" />
            <span className="text-sm font-medium">Simple 6-Step Process</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            How It Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            From booking to beautiful—here's our simple process for a sparkling clean home every time.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={step.step} 
                className="flex gap-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center relative group hover:bg-blue/10 transition-colors">
                    <step.icon className="h-7 w-7 text-blue" />
                    <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-blue text-white text-sm font-bold flex items-center justify-center shadow-lg">
                      {step.step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-blue/30 to-transparent mt-3" />
                  )}
                </div>
                <div className="pt-3 pb-10">
                  <h3 className="text-xl font-semibold text-navy mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue font-medium text-sm uppercase tracking-wider mb-3">Peace of Mind</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Our Guarantees</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {guarantees.map((item, index) => (
              <div 
                key={item.title} 
                className="group bg-card rounded-2xl p-8 border border-border text-center hover:shadow-lg hover:border-blue/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent group-hover:bg-blue/10 flex items-center justify-center mx-auto mb-5 transition-colors">
                  <item.icon className="h-8 w-8 text-blue" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-blue font-medium text-sm uppercase tracking-wider mb-3">Stay Informed</p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy">Communication Standards</h2>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              {[
                "Confirmations & ETAs sent by SMS or email",
                "Lead cleaner introduces themselves on arrival",
                "Work order with add-ons listed and confirmed",
                "Same-day feedback link after service",
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 py-4 border-b border-border last:border-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue" />
                  </div>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Book your first clean and see why 500+ clients trust Otter Cleaning.
          </p>
          <Button variant="red" size="lg" onClick={handleBookNow} className="animate-float">
            Book Your Cleaning
          </Button>
        </div>
      </section>

      <Footer onBookNow={handleBookNow} />
    </div>
  );
}
