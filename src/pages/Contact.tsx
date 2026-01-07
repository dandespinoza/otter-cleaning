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
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Send
} from "lucide-react";
import { toast } from "sonner";
import { SEO, localBusinessSchema } from "@/components/SEO";

const inquiryTypes = [
  "General Question",
  "Request a Quote",
  "Existing Booking",
  "Commercial Inquiry",
  "Partnership",
  "Feedback",
  "Other",
];

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
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
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us - Get in Touch"
        description="Contact Otter Cleaning for questions, quotes, or support. Call (929) 274-1177 or email hello@ottercleaning.com. Serving NYC, Long Island & New Jersey. Response within 24 hours."
        keywords="contact cleaning service, cleaning company phone number, house cleaning quote, cleaning service email, NYC cleaning contact, Long Island cleaner contact"
        canonicalUrl="/contact"
        structuredData={localBusinessSchema}
      />
      <Header onBookNow={() => navigate("/booking")} />

      {/* Hero */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto text-center">
          <p className="text-blue font-medium mb-2 text-lg">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or need a custom quote? We're here to help. Reach out and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-center hover:shadow-card-hover transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-blue/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-7 w-7 text-blue" />
              </div>
              <h3 className="font-semibold text-navy mb-2 text-lg">Call or Text</h3>
              <a href="tel:+19292741177" className="text-muted-foreground hover:text-blue transition-colors">(929) 274-1177</a>
            </Card>
            <Card className="p-6 text-center hover:shadow-card-hover transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-blue/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-blue" />
              </div>
              <h3 className="font-semibold text-navy mb-2 text-lg">Email</h3>
              <p className="text-muted-foreground">hello@ottercleaning.com</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-card-hover transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-blue/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 text-blue" />
              </div>
              <h3 className="font-semibold text-navy mb-2 text-lg">Service Area</h3>
              <p className="text-muted-foreground">NYC, Long Island, NJ</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-card-hover transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-blue/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-blue" />
              </div>
              <h3 className="font-semibold text-navy mb-2 text-lg">Hours</h3>
              <p className="text-muted-foreground">Mon–Sat: 7AM–6PM</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-3xl">
          {isSubmitted ? (
            <Card className="p-12 text-center shadow-card">
              <CheckCircle className="h-16 w-16 text-blue mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-navy mb-3">Message Received!</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for reaching out. Our team will get back to you within 24 hours.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" size="lg" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
                <Button variant="blue" size="lg" onClick={() => navigate("/booking")}>
                  Book a Cleaning
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="overflow-hidden shadow-card">
              <div className="bg-navy px-8 py-5 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
                <h2 className="text-xl font-semibold text-primary-foreground">Send Us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-base">Your Name</Label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} required className="h-12 text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Email Address</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="h-12 text-base" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-base">Phone (optional)</Label>
                    <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="(555) 555-5555" className="h-12 text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Inquiry Type</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-base py-3">{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Your Message</Label>
                  <Textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange}
                    required
                    placeholder="How can we help you?"
                    className="min-h-[150px] text-base"
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
                  {isSubmitting ? "Sending..." : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">Looking for Something Specific?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="blue" size="lg" onClick={() => navigate("/booking")}>
              Book Residential Cleaning
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/commercial")}>
              Commercial Services
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/services")}>
              View All Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
