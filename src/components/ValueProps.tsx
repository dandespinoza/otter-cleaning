import { ClipboardCheck, Users, Zap, Leaf, Shield, Heart } from "lucide-react";

const props = [
  {
    icon: ClipboardCheck,
    title: "SOP-Driven",
    description: "67-point checklists ensure nothing gets missed. Crews know exactly what 'done' means."
  },
  {
    icon: Users,
    title: "Trusted Since 2009",
    description: "500+ clients served. All cleaners are vetted, background-checked, and trained."
  },
  {
    icon: Shield,
    title: "Insured & Guaranteed",
    description: "Fully bonded with a 24-hour satisfaction guarantee. Not happy? We'll make it right."
  },
  {
    icon: Leaf,
    title: "Organic & Safe",
    description: "Non-toxic, environmentally safe products. Safe for kids, pets, and those with allergies."
  },
  {
    icon: Heart,
    title: "Kosher-Aware",
    description: "Color-coded supplies, zone respect, and Shabbat/holiday scheduling available."
  },
  {
    icon: Zap,
    title: "Seamless Booking",
    description: "Book online in 60 seconds. Manage everything from your phone. Cleaning made easy."
  },
];

export function ValueProps() {
  return (
    <section className="py-16 bg-background border-b border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <div 
              key={prop.title} 
              className="group flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent group-hover:bg-blue/10 flex items-center justify-center flex-shrink-0 transition-colors">
                <prop.icon className="h-5 w-5 text-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-navy text-base mb-1.5">{prop.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{prop.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
