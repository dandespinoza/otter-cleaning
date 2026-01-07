import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ServicesSectionProps {
  onSelect: () => void;
}

// Prices match booking calculator (5% discounted, starting at Studio/1 bath)
const services = [
  {
    id: "standard",
    label: "Core maintenance",
    title: "Standard",
    description: "Routine cleaning to keep your home fresh and tidy. Perfect for recurring service.",
    checklist: "40+ Tasks",
    features: ["Surface cleaning", "Vacuum & mop", "Kitchen & bath sanitization"],
    price: "$105",
  },
  {
    id: "standard-plus",
    label: "Most popular",
    title: "Standard Plus",
    description: "Enhanced attention to detail including baseboards, high-touch areas, and edges.",
    checklist: "55+ Tasks",
    features: ["Everything in Standard", "Baseboard dusting", "Detail work"],
    price: "$143",
    popular: true,
  },
  {
    id: "deep",
    label: "Full reset",
    title: "Deep Clean",
    description: "Comprehensive cleaning including appliance interiors, windows, and grout work.",
    checklist: "67 Tasks",
    features: ["Everything in Std Plus", "Appliance interiors", "Interior windows"],
    price: "$277",
  },
  {
    id: "move",
    label: "Turnover ready",
    title: "Move In/Out",
    description: "Inspection-ready cleaning for vacant properties. Behind and under everything.",
    checklist: "67 Tasks",
    features: ["Everything in Deep", "Behind appliances", "Empty closets"],
    price: "$277",
  },
];

export function ServicesSection({ onSelect }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue font-medium text-sm uppercase tracking-wider mb-3">Four Service Tiers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            A Clean for Every Need
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From routine maintenance to full property turnovers, choose the level that fits your needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden p-6 hover:shadow-xl transition-all duration-300 flex flex-col animate-fade-in-up ${
                service.popular ? "ring-2 ring-blue shadow-lg" : "hover:border-blue/30"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-blue text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-bl-xl">
                  Popular
                </div>
              )}
              
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{service.label}</p>
              <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
              
              <p className="text-sm text-muted-foreground flex-grow leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex items-center gap-2 py-3 border-t border-b border-border mb-4">
                <Sparkles className="h-4 w-4 text-blue" />
                <p className="text-sm font-semibold text-blue">{service.checklist}</p>
              </div>

              <div className="space-y-2 mb-5">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-blue flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <p className="text-xs text-muted-foreground mb-1">Starting at</p>
                <p className="text-3xl font-bold text-navy">{service.price}</p>
              </div>

              <Button 
                variant={service.popular ? "red" : "blue"}
                className="w-full mt-auto group-hover:shadow-md transition-shadow"
                onClick={onSelect}
              >
                Book Now
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/checklist" className="inline-flex items-center gap-2 text-blue font-medium hover:underline group">
            View our complete 67-point cleaning checklist
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
