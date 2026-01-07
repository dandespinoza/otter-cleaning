import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, ClipboardCheck, ArrowRight } from "lucide-react";
import { SEO, webPageSchema } from "@/components/SEO";

interface ChecklistItem {
  task: string;
  standard: boolean;
  standardPlus: boolean;
  deep: boolean;
  moveInOut: boolean;
}

const wholeHome: ChecklistItem[] = [
  { task: "Remove trash; replace liners", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "General tidy/straighten", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Dust reachable fans/light shades", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Cobweb removal (corners/edges)", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Dust furniture surfaces (tops/fronts)", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Detail dust decor/frames/lamps", standard: false, standardPlus: true, deep: true, moveInOut: false },
  { task: "Wipe switches & door handles", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Wipe door fronts & top edges", standard: false, standardPlus: true, deep: true, moveInOut: false },
  { task: "Baseboards dusted", standard: false, standardPlus: true, deep: false, moveInOut: false },
  { task: "Baseboards washed/detailed", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Windowsills & tracks (reachable)", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Interior windows (reachable)", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Spot clean walls & scuffs", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Vents/returns dusted", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Outlet/switch plates detailed", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Mirrors glass-polished", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Edge vacuum along baseboards", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Vacuum floors & stairs", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Mop hard floors", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Detailed floor scrub (corners/grout)", standard: false, standardPlus: false, deep: true, moveInOut: true },
];

const kitchen: ChecklistItem[] = [
  { task: "Clear & disinfect counters", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Backsplash wiped", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Sink scrub/sanitize; polish faucet", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Appliance exteriors (fridge/oven/dw)", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Microwave inside & out", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Small appliance exteriors", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Cabinet fronts & pulls", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Pulls/edge seams brushed", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Stovetop degreased (grates)", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Hood underside & filter wipe", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Oven interior (incl. racks/door)", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Fridge interior (shelves/bins)", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Dishwasher gasket & filter wipe", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Cabinet & drawer interiors (empty)", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Behind/under appliances (if safe)", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Light fixtures cleaned (reachable)", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Floor vacuum & mop", standard: true, standardPlus: true, deep: true, moveInOut: true },
];

const bathrooms: ChecklistItem[] = [
  { task: "Mirrors streak-free", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Sink/vanity scrub & disinfect", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Faucets & drains detailed/polished", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Toilet bowl/seat/hinges/base disinfected", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Tub/shower walls scrubbed & rinsed", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Glass door soap-scum removal", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Grout/caulk edge brushing", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Fixture trim & undersides detailed", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Fan cover/vent dusted", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Holders/shelves wiped", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Baseboards & door detailed", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Floors vacuum & mop (edges)", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Tile/grout descale/deep", standard: false, standardPlus: false, deep: true, moveInOut: true },
];

const bedroomsLiving: ChecklistItem[] = [
  { task: "Make beds (linen change if provided)", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Furniture tops/fronts dusted", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Under-lip/ledge dusting", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Upholstery vacuum (surface/crevices)", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Under/behind furniture (if accessible)", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Blinds/soft treatments dusted", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Closet shelves/rods exterior surfaces", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Closet interiors (empty)", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Glass doors/patio sliders (interior)", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Door frames/trim detailed", standard: false, standardPlus: false, deep: true, moveInOut: true },
];

const entryLaundry: ChecklistItem[] = [
  { task: "Entry door & handle wiped", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Shoe rack/console dust & tidy", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Stair rails/balusters wiped", standard: false, standardPlus: true, deep: true, moveInOut: true },
  { task: "Laundry surfaces wiped", standard: true, standardPlus: true, deep: true, moveInOut: true },
  { task: "Washer gasket & lint areas", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Interior closets/cabinets (empty)", standard: false, standardPlus: false, deep: true, moveInOut: true },
  { task: "Deodorize/air out", standard: true, standardPlus: true, deep: true, moveInOut: true },
];

const CheckMark = ({ included }: { included: boolean }) => (
  included ? (
    <div className="w-6 h-6 rounded-full bg-blue/10 flex items-center justify-center">
      <Check className="h-3.5 w-3.5 text-blue" />
    </div>
  ) : (
    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
      <X className="h-3.5 w-3.5 text-muted-foreground/40" />
    </div>
  )
);

const ChecklistTable = ({ title, items }: { title: string; items: ChecklistItem[] }) => (
  <div className="mb-10">
    <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
      <div className="w-1 h-6 bg-blue rounded-full" />
      {title}
    </h3>
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left p-4 font-semibold text-navy">Task</th>
            <th className="text-center p-4 font-semibold text-navy w-20">Standard</th>
            <th className="text-center p-4 font-semibold text-navy w-20 bg-blue/5">Std Plus</th>
            <th className="text-center p-4 font-semibold text-navy w-20">Deep</th>
            <th className="text-center p-4 font-semibold text-navy w-20">Move</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
              <td className="p-4 text-muted-foreground">{item.task}</td>
              <td className="text-center p-4"><div className="flex justify-center"><CheckMark included={item.standard} /></div></td>
              <td className="text-center p-4 bg-blue/5"><div className="flex justify-center"><CheckMark included={item.standardPlus} /></div></td>
              <td className="text-center p-4"><div className="flex justify-center"><CheckMark included={item.deep} /></div></td>
              <td className="text-center p-4"><div className="flex justify-center"><CheckMark included={item.moveInOut} /></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function Checklist() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/?book=true");
  };

  const totalItems = wholeHome.length + kitchen.length + bathrooms.length + bedroomsLiving.length + entryLaundry.length;

  const checklistSchema = webPageSchema(
    "Professional Cleaning Checklist",
    `Our comprehensive ${totalItems}-point cleaning checklist covering whole home, kitchen, bathrooms, bedrooms, and more.`,
    "/checklist"
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${totalItems}-Point Professional Cleaning Checklist`}
        description={`See our comprehensive ${totalItems}-point cleaning checklist. Compare what's included in Standard, Standard Plus, Deep Clean, and Move In/Out services. Kitchen, bathroom, bedroom, and whole-home tasks detailed.`}
        keywords="house cleaning checklist, professional cleaning checklist, deep cleaning checklist, move out cleaning checklist, what cleaners do, cleaning service tasks"
        canonicalUrl="/checklist"
        structuredData={checklistSchema}
      />
      <Header onBookNow={handleBookNow} />

      {/* Hero */}
      <section className="py-20 bg-cream overflow-hidden">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-4 py-2 rounded-full mb-6 animate-fade-in">
            <ClipboardCheck className="h-4 w-4" />
            <span className="text-sm font-medium">{totalItems}-Point Inspection</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Our Cleaning Checklist
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Every clean follows our comprehensive checklist. Our crews know exactly what "done" means—no guesswork, no shortcuts.
          </p>
        </div>
      </section>

      {/* Legend */}
      <section className="py-6 bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue/10 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 text-blue" />
              </div>
              <span className="text-muted-foreground">Included</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <X className="h-3.5 w-3.5 text-muted-foreground/40" />
              </div>
              <span className="text-muted-foreground">Not included</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue/5 border border-blue/20 rounded" />
              <span className="text-muted-foreground">Most popular tier</span>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <ChecklistTable title="Whole Home (All Rooms)" items={wholeHome} />
            <ChecklistTable title="Kitchen" items={kitchen} />
            <ChecklistTable title="Bathrooms" items={bathrooms} />
            <ChecklistTable title="Bedrooms & Living Areas" items={bedroomsLiving} />
            <ChecklistTable title="Entry, Laundry & Misc" items={entryLaundry} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for a Meticulous Clean?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Choose your service tier and let our trained professionals handle the rest.
          </p>
          <Button variant="red" size="lg" onClick={handleBookNow} className="animate-float">
            Book Your Cleaning
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer onBookNow={handleBookNow} />
    </div>
  );
}
