import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTABookingSectionProps { 
  onBookNow: () => void; 
}

export function CTABookingSection({ onBookNow }: CTABookingSectionProps) {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="bg-card rounded-3xl p-10 shadow-2xl max-w-2xl mx-auto text-center border border-border">
          <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Book in 60 Seconds</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Ready for a Sparkling Clean Home?
          </h2>
          <p className="text-muted-foreground mb-8">
            Transparent pricing, vetted professionals, satisfaction guaranteed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-6">
            <Input 
              placeholder="Enter your ZIP code" 
              className="bg-background h-12 text-center sm:text-left" 
            />
            <Button variant="red" className="h-12 px-8" onClick={onBookNow}>
              Get Quote
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Serving NYC • Long Island • New Jersey
          </p>
        </div>
      </div>
    </section>
  );
}
