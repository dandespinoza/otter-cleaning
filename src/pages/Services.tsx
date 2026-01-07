import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
import { SEO, serviceSchema } from "@/components/SEO";

// Prices match booking calculator (5% discounted, starting at Studio/1 bath)
const services = [
  {
    id: "standard",
    title: "Standard",
    tagline: "Our go-to clean",
    description: "Core maintenance cleaning designed to keep your home fresh and tidy on a regular basis.",
    price: "$105",
    time: "~2 hours",
    features: [
      "Surface cleaning throughout",
      "Vacuum & mop all floors",
      "Kitchen & bathroom sanitization",
      "Dust furniture & surfaces",
      "Trash removal & liner replacement",
    ],
  },
  {
    id: "standard-plus",
    title: "Standard Plus",
    tagline: "Enhanced essentials",
    description: "Enhanced version with additional attention to detail and high-touch areas.",
    price: "$143",
    time: "~3 hours",
    popular: true,
    features: [
      "Everything in Standard",
      "Baseboard dusting",
      "High-touch sanitation",
      "Edge vacuuming",
      "Detail dust decor & frames",
      "Window sills & tracks",
    ],
  },
  {
    id: "deep",
    title: "Deep Clean",
    tagline: "Full reset",
    description: "Comprehensive cleaning targeting hard-to-reach and neglected areas for a complete refresh.",
    price: "$277",
    time: "~5 hours",
    features: [
      "Everything in Standard Plus",
      "Interior windows",
      "Appliance interiors (oven, fridge)",
      "Cabinet & drawer interiors",
      "Baseboard washing",
      "Grout & scale removal",
    ],
  },
  {
    id: "move",
    title: "Move In/Out",
    tagline: "Turnover ready",
    description: "Specialized cleaning optimized for vacant homes with inspection-ready results.",
    price: "$277",
    time: "~5+ hours",
    features: [
      "Everything in Deep Clean",
      "Empty closet interiors",
      "Behind/under appliances",
      "All switches & outlets detailed",
      "Full grout descaling",
      "Inspection-ready finish",
    ],
  },
];

// Add-on prices match booking calculator (5% discounted)
const addOns = [
  { name: "Inside Fridge", price: "$43", unit: "per unit" },
  { name: "Inside Oven", price: "$43", unit: "per oven" },
  { name: "Inside Cabinets", price: "$43", unit: "flat rate" },
  { name: "Interior Windows", price: "$57", unit: "flat rate" },
  { name: "Laundry", price: "$43", unit: "per load" },
  { name: "Balcony", price: "$57", unit: "flat rate" },
  { name: "Basement", price: "$81", unit: "flat rate" },
  { name: "Closet Organization", price: "$48", unit: "flat rate" },
];

export default function Services() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="House Cleaning Services & Pricing"
        description="Compare our four cleaning service tiers: Standard ($105), Standard Plus ($143), Deep Clean ($277), and Move In/Out ($277). Professional house cleaning in NYC, Long Island & New Jersey with transparent pricing."
        keywords="house cleaning prices, cleaning service cost, deep cleaning service, move out cleaning cost, maid service pricing, professional cleaning rates NYC, Long Island cleaning prices"
        canonicalUrl="/services"
        structuredData={serviceSchema}
      />
      <Header onBookNow={handleBookNow} />

      {/* Hero */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto text-center">
          <p className="text-blue font-medium text-lg mb-3">Residential & Commercial Cleaning</p>
          <h1 className="text-4xl md:text-6xl font-bold text-navy mb-5">Professional Cleaning Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four service tiers designed for every home and budget. Organic products, transparent pricing, and a 100% satisfaction guarantee.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`relative overflow-hidden p-8 flex flex-col hover:shadow-card-hover transition-shadow ${
                  service.popular ? "ring-2 ring-blue" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-blue text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-bl-xl">
                    Most Popular
                  </div>
                )}

                {/* Header - fixed height */}
                <div className="min-h-[4.5rem]">
                  <p className="text-sm text-muted-foreground mb-1">{service.tagline}</p>
                  <h3 className="text-2xl font-bold text-navy">{service.title}</h3>
                </div>

                {/* Description - fixed height */}
                <p className="text-muted-foreground mb-6 min-h-[4.5rem]">{service.description}</p>

                {/* Pricing - fixed height */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="text-4xl font-bold text-navy">{service.price}</p>
                  <p className="text-sm text-muted-foreground">{service.time}</p>
                </div>

                {/* Features - grows to fill space */}
                <div className="border-t pt-6 space-y-3 flex-grow">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-blue flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button - always at bottom */}
                <Button variant="blue" className="w-full h-12 text-base mt-6" onClick={handleBookNow}>
                  Book Now
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">Compare Service Tiers</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-2xl border border-border">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-5 text-lg text-navy font-semibold">Feature</th>
                  <th className="text-center p-5 text-lg text-navy font-semibold">Standard</th>
                  <th className="text-center p-5 text-lg text-navy font-semibold bg-accent">Standard Plus</th>
                  <th className="text-center p-5 text-lg text-navy font-semibold">Deep Clean</th>
                  <th className="text-center p-5 text-lg text-navy font-semibold">Move In/Out</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-5 text-muted-foreground">General tidy & trash removal</td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5 bg-accent"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-5 text-muted-foreground">Vacuum & mop floors</td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5 bg-accent"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-5 text-muted-foreground">Kitchen & bath sanitization</td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5 bg-accent"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-5 text-muted-foreground">Baseboard dusting</td>
                  <td className="text-center p-5"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5 bg-accent"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-5 text-muted-foreground">Interior windows</td>
                  <td className="text-center p-5"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5 bg-accent"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-5 text-muted-foreground">Appliance interiors (oven/fridge)</td>
                  <td className="text-center p-5"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5 bg-accent"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-5 text-muted-foreground">Cabinet & drawer interiors</td>
                  <td className="text-center p-5"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5 bg-accent"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-5 text-muted-foreground">Behind/under appliances</td>
                  <td className="text-center p-5"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5 bg-accent"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5"><X className="h-5 w-5 text-muted-foreground/30 mx-auto" /></td>
                  <td className="text-center p-5"><Check className="h-5 w-5 text-blue mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Available Add-Ons</h2>
            <p className="text-lg text-muted-foreground">Customize your clean with additional services</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {addOns.map((addon) => (
              <Card key={addon.name} className="p-5 hover:shadow-card-hover transition-shadow">
                <h4 className="font-semibold text-navy mb-2">{addon.name}</h4>
                <p className="text-xl font-bold text-blue">{addon.price}</p>
                <p className="text-sm text-muted-foreground">{addon.unit}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto text-center">
          <Sparkles className="h-14 w-14 text-blue mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-5">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Book your cleaning in under 60 seconds. Transparent pricing, vetted professionals.
          </p>
          <Button variant="red" size="lg" className="h-14 px-10 text-lg" onClick={handleBookNow}>
            Book Your Cleaning
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
