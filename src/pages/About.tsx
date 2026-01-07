import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Users, Heart, Leaf, Award, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO, localBusinessSchema } from "@/components/SEO";

const stats = [
  { value: "2009", label: "Founded" },
  { value: "500+", label: "Clients Served" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction Guarantee" },
];

const values = [
  { icon: Heart, title: "Respect", description: "For people, property, and cultural practices. We treat every home like our own." },
  { icon: Shield, title: "Consistency", description: "Via training, SOPs, and quality control. Every clean meets the same high standards." },
  { icon: Users, title: "Integrity", description: "In pricing and communication. No hidden fees, no surprises—just honest service." },
  { icon: Leaf, title: "Sustainability", description: "Eco-friendly products, HEPA vacuums, and microfiber systems for a healthier home." },
];

const differentiators = [
  { icon: Award, title: "Family-Owned Since 2009", description: "Stability, continuity, accountability" },
  { icon: Users, title: "500+ Clients Served", description: "Proven, referenceable track record" },
  { icon: Shield, title: "Four-Tier SOPs", description: "Clear scope; crews know exactly what \"done\" means" },
  { icon: Leaf, title: "Eco-Only Supplies", description: "Low-VOC, HEPA vacuums, microfiber" },
  { icon: Clock, title: "Photo Verification", description: "Before/after documentation for accountability" },
  { icon: Heart, title: "Observant-Home Expertise", description: "Kosher-aware processes & scheduling" },
];

export default function About() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/?book=true");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us - Family-Owned Cleaning Company Since 2009"
        description="Learn about Otter Cleaning, a family-owned cleaning company serving NYC, Long Island, and New Jersey since 2009. 500+ satisfied clients, eco-friendly products, and a 100% satisfaction guarantee."
        keywords="about Otter Cleaning, family-owned cleaning company, NYC cleaning company, Long Island cleaners, New Jersey cleaning service, eco-friendly cleaning company"
        canonicalUrl="/about"
        structuredData={localBusinessSchema}
      />
      <Header onBookNow={handleBookNow} />

      {/* Hero */}
      <section className="py-20 bg-cream overflow-hidden">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Family-Owned Since 2009</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            About Otter Cleaning
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            A family-owned cleaning company built on precision, respect, and reliability. Serving 500+ happy clients across the Tri-State area.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-navy">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-blue font-medium text-sm uppercase tracking-wider">Our Story</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p className="animate-fade-in">
                Founded in <strong className="text-navy">2009</strong> by a family who believed cleaning is a craft, 
                Otter Cleaning grew through referrals from neighbors, facility managers, and property professionals.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Today, we serve <strong className="text-navy">500+ clients</strong> across the 
                <strong className="text-navy"> NYC, Long Island, and New Jersey</strong> area with the same values 
                we started with: do it right, respect the home, and stand by your work.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Our trained teams follow detailed checklists, document completion with photos, and stand behind 
                our work with a 24-hour satisfaction guarantee. From residential homes to commercial offices, 
                we deliver eco-friendly, SOP-driven cleaning that exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-navy rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <p className="text-blue font-medium text-sm uppercase tracking-wider mb-4">Our Mission</p>
          <p className="text-2xl md:text-3xl text-navy font-medium max-w-3xl mx-auto leading-relaxed">
            "Make spaces healthier, calmer, and truly ready—through exacting SOPs and genuine care."
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue font-medium text-sm uppercase tracking-wider mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className="group bg-card rounded-2xl p-6 border border-border hover:border-blue/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent group-hover:bg-blue/10 flex items-center justify-center mb-5 transition-colors">
                  <value.icon className="h-7 w-7 text-blue" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue font-medium text-sm uppercase tracking-wider mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">What Sets Us Apart</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {differentiators.map((item, index) => (
              <div 
                key={item.title} 
                className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-blue" />
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kosher Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-blue font-medium text-sm uppercase tracking-wider mb-3">Specialized Care</p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy">For Observant Jewish Households</h2>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm space-y-5">
              {[
                { label: "Kosher-aware:", text: "Color-coded cloths/sponges for meat/dairy/pareve; never cross-use." },
                { label: "Zone respect:", text: "Separate sinks/boards remain separate; do not relocate kashered items." },
                { label: "Scheduling:", text: "Avoid Shabbat/holiday conflicts; finish pre-sundown on Fridays in winter." },
                { label: "Pre-Passover:", text: "Crumb-trace of cabinets/appliances/crevices available under Deep or Move-In/Out." },
              ].map((item, index) => (
                <div 
                  key={item.label} 
                  className="flex items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-6 h-6 rounded-full bg-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-navy">{item.label}</strong> {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Experience the Otter Difference?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join 500+ satisfied clients who trust us with their homes and offices.
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
