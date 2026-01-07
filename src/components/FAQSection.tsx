import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { question: "How do I book a cleaning?", answer: "Simply click 'Book Now', select your service type, enter your property details, choose a date and time, and complete the checkout." },
  { question: "What's included in a Standard Clean?", answer: "Dusting all surfaces, vacuuming and mopping floors, cleaning kitchen surfaces, sanitizing bathrooms, making beds, and emptying trash." },
  { question: "What areas do you serve?", answer: "NYC (all five boroughs), Long Island (Nassau and Suffolk Counties), and Northern New Jersey." },
  { question: "Are your cleaners background checked?", answer: "Yes. Every Otter Cleaning professional undergoes a thorough background check, interview, and training." },
  { question: "What if I'm not satisfied?", answer: "100% satisfaction guarantee. Let us know within 24 hours and we'll re-clean for free." },
  { question: "Do I need to be home?", answer: "No! Many customers provide entry instructions and go about their day." },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">FAQ</h2>
          <p className="text-muted-foreground text-sm">Everything you need to know about our services.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="text-left font-medium text-navy hover:text-blue py-3 text-sm">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-3 text-sm">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
