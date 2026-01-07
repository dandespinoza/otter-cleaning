import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail, ArrowRight } from "lucide-react";
import { SEO, faqSchema } from "@/components/SEO";

const faqCategories = [
  {
    title: "Booking & Scheduling",
    faqs: [
      {
        question: "How do I book a cleaning?",
        answer: "You can book online in under 60 seconds. Simply select your service tier, choose your date and time, and fill in your details. You'll receive an instant confirmation via email and SMS.",
      },
      {
        question: "What areas do you serve?",
        answer: "We serve the entire Tri-State area including NYC (all five boroughs), Long Island, and New Jersey. Contact us to confirm availability in your specific location.",
      },
      {
        question: "What time do cleanings start?",
        answer: "Cleanings are available every day starting at 8am. You can select your preferred time slot during booking.",
      },
      {
        question: "Can I reschedule or cancel my cleaning?",
        answer: "Yes, you can reschedule or cancel with at least 24 hours notice at no charge. Cancellations within 24 hours may incur a fee.",
      },
      {
        question: "Do you offer recurring cleaning services?",
        answer: "Absolutely! We offer weekly, bi-weekly, and monthly recurring options with discounts: 10% off weekly, 7% off bi-weekly, and 5% off monthly.",
      },
    ],
  },
  {
    title: "Service & Pricing",
    faqs: [
      {
        question: "What's the difference between your service tiers?",
        answer: "We offer four tiers: Standard (routine maintenance), Standard Plus (enhanced detail), Deep Clean (comprehensive reset including appliance interiors), and Move In/Out (vacant property turnover). Each tier has a detailed checklist—view our Services page for the full comparison.",
      },
      {
        question: "How are prices calculated?",
        answer: "Pricing is based on your selected service tier, number of bedrooms and bathrooms, and any add-ons. You'll see the total price before confirming your booking—no hidden fees.",
      },
      {
        question: "Do you bring your own supplies?",
        answer: "Yes, we bring all supplies and equipment including eco-friendly cleaning products, HEPA vacuums, and microfiber cloths. Fragrance-free products available on request.",
      },
      {
        question: "What if I need something not included?",
        answer: "We offer many add-ons including oven/fridge interiors, window cleaning, carpet shampooing, and laundry. Check our Services page for the full list with pricing.",
      },
    ],
  },
  {
    title: "Access & Security",
    faqs: [
      {
        question: "Do I need to be home during the cleaning?",
        answer: "No, many clients provide access via doorman, lockbox, or key. Just include your entry instructions when booking, and we'll handle everything securely.",
      },
      {
        question: "Are your cleaners background-checked?",
        answer: "Yes, all team members are thoroughly vetted, background-checked, and trained to uphold our standards. We're also fully insured and bonded.",
      },
      {
        question: "Do you have a satisfaction guarantee?",
        answer: "Absolutely. If you're not satisfied, let us know within 24 hours and we'll return to address any concerns—free of charge.",
      },
    ],
  },
  {
    title: "Special Requests",
    faqs: [
      {
        question: "Do you accommodate observant Jewish households?",
        answer: "Yes! We're experienced with kosher homes: color-coded supplies for meat/dairy/pareve, respecting kitchen zones, scheduling around Shabbat/holidays, and pre-Passover deep cleaning.",
      },
      {
        question: "Can I request fragrance-free products?",
        answer: "Absolutely. We use low-VOC, eco-friendly products and can provide fragrance-free options on request. Just note this in your booking.",
      },
      {
        question: "Do you handle pets?",
        answer: "We're pet-friendly! Just let us know about any pets in your home, their location during cleaning, and any special instructions.",
      },
      {
        question: "What about tipping?",
        answer: "Tips are never expected but always appreciated. If you'd like to tip, you can do so in cash to the cleaner or add it during checkout.",
      },
    ],
  },
  {
    title: "Safety & Boundaries",
    faqs: [
      {
        question: "What do you NOT clean?",
        answer: "We don't handle biohazards, mold remediation, major appliance disconnects, or high-rise exterior windows. We also don't open closed drawers/closets unless included in your booked scope (Deep/Move-In/Out).",
      },
      {
        question: "Are you insured?",
        answer: "Yes, we're fully insured and bonded. Certificate of Insurance (COI) available upon request.",
      },
      {
        question: "How do you ensure quality?",
        answer: "Every clean follows our detailed checklist (up to 67 items). Lead cleaners take before/after photos of kitchens and baths. Field supervisors conduct random weekly audits.",
      },
    ],
  },
];

export default function FAQ() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/?book=true");
  };

  // Generate FAQ schema from all categories
  const allFaqs = faqCategories.flatMap(cat => cat.faqs);
  const structuredFaqData = faqSchema(allFaqs);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Frequently Asked Questions About Our Cleaning Services"
        description="Find answers to common questions about house cleaning services: booking, pricing, service tiers, cancellation policy, satisfaction guarantee, and more. Serving NYC, Long Island & New Jersey."
        keywords="house cleaning FAQ, cleaning service questions, maid service FAQ, deep cleaning questions, cleaning service cancellation policy, cleaning guarantee"
        canonicalUrl="/faq"
        structuredData={structuredFaqData}
      />
      <Header onBookNow={handleBookNow} />

      {/* Hero */}
      <section className="py-20 bg-cream overflow-hidden">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-4 py-2 rounded-full mb-6 animate-fade-in">
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Got Questions?</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Everything you need to know about our professional cleaning services.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-3xl">
          {faqCategories.map((category, catIndex) => (
            <div 
              key={category.title} 
              className="mb-12 animate-fade-in-up"
              style={{ animationDelay: `${catIndex * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-border" />
                <h2 className="text-lg font-semibold text-navy">{category.title}</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {category.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.title}-${index}`}
                    className="bg-card border border-border rounded-xl px-5 hover:border-blue/30 transition-colors data-[state=open]:border-blue/30 data-[state=open]:shadow-md"
                  >
                    <AccordionTrigger className="text-left text-navy hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto text-center">
          <Mail className="h-12 w-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            We're here to help. Reach out and our team will get back to you promptly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="whiteOutline"
              size="lg"
              onClick={() => window.location.href = "mailto:hello@ottercleaning.com"}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Us
            </Button>
            <Button variant="red" size="lg" onClick={handleBookNow} className="animate-float">
              Book a Cleaning
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer onBookNow={handleBookNow} />
    </div>
  );
}
