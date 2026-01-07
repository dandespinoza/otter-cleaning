import { Check, Clock, Shield, Sparkles, MessageCircle, RefreshCcw, Camera, Leaf } from "lucide-react";

const expectations = [
  { icon: Clock, title: "On-Time Arrival", description: "Your cleaner arrives within the scheduled window—every time." },
  { icon: Check, title: "67-Point Checklists", description: "Every room cleaned to our comprehensive, documented standards." },
  { icon: Shield, title: "Insured & Bonded", description: "Full coverage and COI available for your peace of mind." },
  { icon: Leaf, title: "Eco-Friendly Products", description: "Low-VOC, fragrance-free on request. Safe for families & pets." },
  { icon: Camera, title: "Photo Verification", description: "Before/after documentation for kitchens and bathrooms." },
  { icon: RefreshCcw, title: "Satisfaction Guarantee", description: "Not happy? We'll re-clean within 24 hours—free." },
];

export function ExpectSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue font-medium text-sm uppercase tracking-wider mb-3">Every Clean, Every Time</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">What to Expect</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every clean comes with our commitment to excellence and accountability.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {expectations.map((item, index) => (
            <div 
              key={item.title} 
              className="group bg-card rounded-xl p-6 border border-border hover:border-blue/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent group-hover:bg-blue/10 flex items-center justify-center mb-4 transition-colors">
                <item.icon className="h-5 w-5 text-blue" />
              </div>
              <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
