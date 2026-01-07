import { CheckCircle2 } from "lucide-react";

const StatueIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-current" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 8L30 16M32 8L34 16M32 8V4M28 4H36" />
    <circle cx="32" cy="22" r="4" />
    <path d="M28 26L24 48M36 26L40 48" />
    <path d="M24 48H40L42 56H22L24 48Z" />
    <path d="M20 56H44V60H20V56Z" />
  </svg>
);

const LighthouseIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-current" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M28 20H36L38 56H26L28 20Z" />
    <path d="M30 20V12H34V20" />
    <path d="M24 56H40" />
    <circle cx="32" cy="28" r="3" />
    <path d="M18 28H24M40 28H46" />
    <path d="M29 38H35V44H29V38Z" />
  </svg>
);

const SkylineIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-current" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 56H56" />
    <path d="M12 56V40H20V56" />
    <path d="M22 56V32H30V56" />
    <path d="M32 56V36H40V56" />
    <path d="M42 56V44H50V56" />
  </svg>
);

const regions = [
  { name: "NYC", Icon: StatueIcon, description: "All Five Boroughs" },
  { name: "Long Island", Icon: LighthouseIcon, description: "Nassau & Suffolk" },
  { name: "New Jersey", Icon: SkylineIcon, description: "Northern NJ Metro" },
];

const reasons = [
  "Vetted cleaners",
  "Transparent pricing",
  "60-second booking",
  "100% satisfaction",
  "Eco-friendly products",
  "Flexible scheduling",
];

export function LocationsSection() {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2">
            Serving The Tri-State Area
          </h2>
          <p className="text-muted-foreground text-sm">Professional cleaning wherever you call home.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
          {regions.map((region) => (
            <div key={region.name} className="text-center p-6 bg-card rounded-xl shadow-card">
              <div className="text-blue mx-auto mb-3 flex justify-center">
                <region.Icon />
              </div>
              <h3 className="font-semibold text-lg text-navy mb-1">{region.name}</h3>
              <p className="text-muted-foreground text-xs">{region.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 max-w-3xl mx-auto shadow-card">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {reasons.map((reason) => (
              <div key={reason} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
