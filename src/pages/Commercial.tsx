import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Building2,
  Users,
  Shield,
  Clock,
  Leaf,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ClipboardCheck,
  Award,
  Stethoscope,
  Store
} from "lucide-react";
import { toast } from "sonner";
import { SEO, webPageSchema } from "@/components/SEO";

const commercialServices = [
  {
    title: "Office Cleaning",
    description: "Daily, weekly, or custom schedules to keep your workplace spotless and professional.",
    icon: Building2,
  },
  {
    title: "Medical Facilities",
    description: "Specialized sanitization for clinics, dental offices, and healthcare spaces meeting strict hygiene standards.",
    icon: Stethoscope,
  },
  {
    title: "Retail Spaces",
    description: "Maintain a welcoming environment for your customers with regular cleaning services.",
    icon: Store,
  },
  {
    title: "Post-Construction",
    description: "Comprehensive cleanup after renovations, including fine dust removal and detail work.",
    icon: ClipboardCheck,
  },
  {
    title: "Property Management",
    description: "Reliable turnover cleaning and ongoing maintenance for rental properties.",
    icon: Award,
  },
  {
    title: "Gyms & Fitness",
    description: "High-touch sanitization and deep cleaning for fitness centers and wellness facilities.",
    icon: Users,
  },
];

const benefits = [
  { icon: Shield, title: "Insured & Bonded", description: "Full coverage for your peace of mind" },
  { icon: Users, title: "Trained Teams", description: "Background-checked professionals" },
  { icon: Clock, title: "Flexible Scheduling", description: "After hours & weekends available" },
  { icon: Leaf, title: "Organic Products", description: "Non-toxic products safe for employees" },
];

const propertyTypes = [
  "Office Building",
  "Medical Office/Clinic",
  "Dental Office",
  "Veterinary Clinic",
  "Retail Store",
  "Restaurant",
  "Gym/Fitness Center",
  "Warehouse",
  "Multi-Unit Residential",
  "Other",
];

export default function Commercial() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    propertyType: "",
    squareFootage: "",
    address: "",
    city: "",
    zipCode: "",
    frequency: "",
    message: "",
    termsAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Quote request submitted! We'll contact you within 24 hours.");
  };

  const commercialSchema = webPageSchema(
    "Commercial Cleaning Services",
    "Professional commercial cleaning services for offices, retail spaces, and businesses in NYC, Long Island, and New Jersey.",
    "/commercial"
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Commercial Cleaning Services for Offices & Businesses"
        description="Professional commercial cleaning for offices, retail spaces, medical facilities, and more in NYC, Long Island & New Jersey. Flexible scheduling, insured & bonded teams, eco-friendly products. Request a free quote."
        keywords="commercial cleaning services, office cleaning NYC, business cleaning service, retail cleaning, post-construction cleaning, janitorial services, commercial cleaners Long Island, NJ office cleaning"
        canonicalUrl="/commercial"
        structuredData={commercialSchema}
      />
      <Header onBookNow={() => navigate("/booking")} />

      {/* Hero */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <p className="text-blue font-medium mb-3 text-lg">Commercial Cleaning Services</p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Keep Your Business<br />Spotless & Professional
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Reliable commercial cleaning for offices, retail spaces, and businesses. Flexible scheduling, trained teams, and organic products trusted by 500+ clients.
          </p>
          <Button variant="red" size="lg" className="h-14 px-8 text-lg" onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Request a Free Quote
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue font-medium mb-2 text-lg">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Commercial Cleaning Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored cleaning programs designed for your industry and schedule.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialServices.map((service) => (
              <Card key={service.title} className="p-8 hover:shadow-card-hover transition-shadow">
                <service.icon className="h-12 w-12 text-blue mb-5" />
                <h3 className="text-xl font-semibold text-navy mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why Choose Otter Cleaning?</h2>
            <p className="text-lg text-muted-foreground">Trusted by 500+ clients since 2009</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-blue/10 flex items-center justify-center mx-auto mb-5">
                  <benefit.icon className="h-8 w-8 text-blue" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-20 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Sparkles className="h-12 w-12 text-blue mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Request a Free Quote</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Tell us about your space and we'll create a customized cleaning program for your business.
            </p>
          </div>

          {isSubmitted ? (
            <Card className="p-12 text-center shadow-card">
              <CheckCircle className="h-16 w-16 text-blue mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-navy mb-3">Quote Request Received!</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for your interest. Our commercial team will contact you within 24 hours to discuss your needs.
              </p>
              <Button variant="blue" size="lg" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </Card>
          ) : (
            <Card className="overflow-hidden shadow-card">
              <div className="bg-navy px-8 py-5">
                <h3 className="text-xl font-semibold text-primary-foreground">Business Information</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-base">Company Name</Label>
                    <Input name="companyName" value={formData.companyName} onChange={handleInputChange} required className="h-12 text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Contact Name</Label>
                    <Input name="contactName" value={formData.contactName} onChange={handleInputChange} required className="h-12 text-base" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-base">Email</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="h-12 text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Phone</Label>
                    <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="h-12 text-base" placeholder="(555) 555-5555" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-base">Property Type</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-base py-3">{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Approximate Square Footage</Label>
                    <Input name="squareFootage" value={formData.squareFootage} onChange={handleInputChange} placeholder="e.g., 5,000 sq ft" className="h-12 text-base" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Property Address</Label>
                  <Input name="address" value={formData.address} onChange={handleInputChange} required className="h-12 text-base" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-base">City</Label>
                    <Input name="city" value={formData.city} onChange={handleInputChange} required className="h-12 text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">ZIP Code</Label>
                    <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} required className="h-12 text-base" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Preferred Cleaning Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily" className="text-base py-3">Daily</SelectItem>
                      <SelectItem value="weekly" className="text-base py-3">Weekly</SelectItem>
                      <SelectItem value="bi-weekly" className="text-base py-3">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly" className="text-base py-3">Monthly</SelectItem>
                      <SelectItem value="one-time" className="text-base py-3">One-Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Additional Details</Label>
                  <Textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange}
                    placeholder="Tell us about your specific cleaning needs, preferred schedule, or any special requirements..."
                    className="min-h-[120px] text-base"
                  />
                </div>

                <div className="pt-4 border-t">
                  <label className="flex items-start gap-4 cursor-pointer">
                    <Checkbox
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked === true }))}
                      className="h-5 w-5 mt-0.5"
                    />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the{" "}
                      <a href="/terms" target="_blank" className="text-blue hover:underline font-medium">Terms & Conditions</a>
                      {" "}and{" "}
                      <a href="/privacy" target="_blank" className="text-blue hover:underline font-medium">Privacy Policy</a>.
                    </span>
                  </label>
                </div>

                <Button type="submit" variant="red" size="lg" className="w-full h-14 text-lg font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-14 w-14 rounded-xl bg-blue/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-7 w-7 text-blue" />
              </div>
              <h3 className="font-semibold text-navy mb-1 text-lg">Call or Text</h3>
              <a href="tel:+19292741177" className="text-muted-foreground hover:text-blue transition-colors">(929) 274-1177</a>
            </div>
            <div className="text-center">
              <div className="h-14 w-14 rounded-xl bg-blue/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-blue" />
              </div>
              <h3 className="font-semibold text-navy mb-1 text-lg">Email Us</h3>
              <a href="mailto:hello@ottercleaning.com" className="text-muted-foreground hover:text-blue transition-colors">hello@ottercleaning.com</a>
            </div>
            <div className="text-center">
              <div className="h-14 w-14 rounded-xl bg-blue/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 text-blue" />
              </div>
              <h3 className="font-semibold text-navy mb-1 text-lg">Service Area</h3>
              <p className="text-muted-foreground">NYC, Long Island, New Jersey</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
