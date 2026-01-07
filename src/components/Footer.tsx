import { Calendar, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import otterLogo from "@/assets/otter-logo.png";

// TikTok icon (not available in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface FooterProps {
  onBookNow?: () => void;
}

// Social media links - update these with your actual URLs
const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/ottercleaning", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/ottercleaning", icon: Instagram },
  { name: "TikTok", href: "https://tiktok.com/@ottercleaning", icon: TikTokIcon },
  { name: "Twitter", href: "https://twitter.com/ottercleaning", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/ottercleaning", icon: Linkedin },
  { name: "YouTube", href: "https://youtube.com/@ottercleaning", icon: Youtube },
];

export function Footer({ onBookNow }: FooterProps) {
  return (
    <footer className="bg-card border-t py-14 lg:py-16">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo & About */}
          <div className="md:col-span-2 lg:pr-8">
            <a href="/" className="inline-block mb-5">
              <img src={otterLogo} alt="Otter Cleaning Company" className="h-16 lg:h-20 w-auto" />
            </a>
            <p className="text-muted-foreground mb-5 max-w-md leading-relaxed">
              Family-owned since 2009. Trusted by 500+ clients across the Tri-State area.
              Organic products, vetted cleaners, and a 24-hour satisfaction guarantee.
            </p>
            <Button variant="red" onClick={onBookNow}>
              <Calendar className="h-4 w-4 mr-2" />
              Book Now
            </Button>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-blue hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-navy mb-4">Services</h4>
            <nav className="flex flex-col gap-2.5">
              <a href="/services" className="text-sm text-muted-foreground hover:text-blue transition-colors">All Services</a>
              <a href="/services#standard" className="text-sm text-muted-foreground hover:text-blue transition-colors">Standard Clean</a>
              <a href="/services#standard-plus" className="text-sm text-muted-foreground hover:text-blue transition-colors">Standard Plus</a>
              <a href="/services#deep" className="text-sm text-muted-foreground hover:text-blue transition-colors">Deep Clean</a>
              <a href="/services#move" className="text-sm text-muted-foreground hover:text-blue transition-colors">Move In/Out</a>
              <a href="/checklist" className="text-sm text-muted-foreground hover:text-blue transition-colors">67-Point Checklist</a>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-navy mb-4">Company</h4>
            <nav className="flex flex-col gap-2.5">
              <a href="/about" className="text-sm text-muted-foreground hover:text-blue transition-colors">About Us</a>
              <a href="/how-it-works" className="text-sm text-muted-foreground hover:text-blue transition-colors">How It Works</a>
              <a href="/faq" className="text-sm text-muted-foreground hover:text-blue transition-colors">FAQ</a>
              <a href="/contact" className="text-sm text-muted-foreground hover:text-blue transition-colors">Contact</a>
            </nav>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold text-navy mb-4">Legal</h4>
            <nav className="flex flex-col gap-2.5">
              <a href="/terms" className="text-sm text-muted-foreground hover:text-blue transition-colors">Terms & Conditions</a>
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-blue transition-colors">Privacy Policy</a>
            </nav>
            <h4 className="font-semibold text-navy mt-6 mb-3">Get in Touch</h4>
            <a href="mailto:hello@ottercleaning.com" className="text-sm text-blue hover:underline">
              hello@ottercleaning.com
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              <a href="tel:+19292741177" className="hover:text-blue transition-colors">(929) 274-1177</a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Otter Cleaning Company. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Serving NYC • Long Island • New Jersey
          </p>
        </div>
      </div>
    </footer>
  );
}
