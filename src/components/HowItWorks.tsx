import { Calendar, Key, Sparkles, MessageSquare, RefreshCcw } from "lucide-react";

const steps = [
  { icon: Calendar, step: 1, title: "Schedule us", description: "Available every day, cleans starting at 8am." },
  { icon: Key, step: 2, title: "Let us in", description: "Provide entry instructions and we'll be there!" },
  { icon: Sparkles, step: 3, title: "We clean", description: "Rigorous checklists, trained professionals." },
  { icon: MessageSquare, step: 4, title: "Give feedback", description: "Quick survey to help us improve." },
  { icon: RefreshCcw, step: 5, title: "Rinse & repeat", description: "Schedule recurring for a fresh home." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue font-medium text-sm uppercase tracking-wider mb-3">Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            How It Works
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          {steps.map((step, index) => (
            <div 
              key={step.step} 
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mx-auto w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mb-5 group hover:bg-blue/5 hover:border-blue/30 transition-all duration-300">
                <step.icon className="h-8 w-8 text-blue" />
                <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-blue text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {step.step}
                </span>
              </div>
              <h3 className="font-semibold text-navy text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
