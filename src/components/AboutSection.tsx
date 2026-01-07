import { Users, Award, Sparkles, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Sparkles, value: "15,000+", label: "Cleanings Done" },
  { icon: Heart, value: "100%", label: "Satisfaction Guarantee" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue font-medium text-sm uppercase tracking-wider mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            About Otter Cleaning
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border hover:shadow-md hover:border-blue/20 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-blue/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-7 w-7 text-blue" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-navy mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              <span className="text-navy font-semibold">Family-owned since 2009</span>, Otter Cleaning
              was founded with a simple mission: to provide exceptional cleaning services that give
              our customers back their most precious resource — time.
            </p>
            <p>
              Our team of vetted, background-checked professionals treat every home like their own.
              We use organic, non-toxic products safe for your family and pets, follow detailed
              67-point checklists, and maintain the highest standards of quality.
            </p>
            <p>
              From Manhattan apartments to Long Island estates to New Jersey family homes,
              we've completed over <span className="text-navy font-semibold">15,000 cleanings</span> and
              built our reputation one sparkling clean at a time.
            </p>
          </div>

          {/* Trust Points */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <h3 className="text-xl font-semibold text-navy mb-6">What Sets Us Apart</h3>
            <div className="space-y-4">
              {[
                { title: "Vetted & Insured", desc: "All cleaners are background-checked and we're fully insured & bonded" },
                { title: "Organic Products", desc: "Non-toxic, environmentally safe products for your family and pets" },
                { title: "Photo Verification", desc: "Before/after photos of kitchens and bathrooms for accountability" },
                { title: "24-Hour Guarantee", desc: "Not satisfied? We'll return within 24 hours to make it right — free" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-navy">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
