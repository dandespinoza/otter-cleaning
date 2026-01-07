import { useState } from "react";
import { Menu, X, Calendar, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import otterLogo from "@/assets/otter-logo.png";

// TikTok icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/ottercleaning", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/ottercleaning", icon: Instagram },
  { name: "TikTok", href: "https://tiktok.com/@ottercleaning", icon: TikTokIcon },
  { name: "Twitter", href: "https://twitter.com/ottercleaning", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/ottercleaning", icon: Linkedin },
  { name: "YouTube", href: "https://youtube.com/@ottercleaning", icon: Youtube },
];

interface HeaderProps {
  onBookNow?: () => void;
}

export function Header({ onBookNow }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white hidden md:block">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Service Areas */}
            <div className="flex items-center gap-4">
              <span className="text-slate-400">Serving:</span>
              <span className="font-medium">NYC</span>
              <span className="text-slate-600">|</span>
              <span className="font-medium">Long Island</span>
              <span className="text-slate-600">|</span>
              <span className="font-medium">New Jersey</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Follow us:</span>
              <div className="flex items-center gap-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={otterLogo} alt="Otter Cleaning Company" className="h-16 md:h-20 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/services" className="text-base font-medium text-muted-foreground hover:text-navy transition-colors">Services</a>
            <a href="/commercial" className="text-base font-medium text-muted-foreground hover:text-navy transition-colors">Commercial</a>
            <a href="/how-it-works" className="text-base font-medium text-muted-foreground hover:text-navy transition-colors">How It Works</a>
            <a href="/about" className="text-base font-medium text-muted-foreground hover:text-navy transition-colors">About</a>
            <a href="/blog" className="text-base font-medium text-muted-foreground hover:text-navy transition-colors">Blog</a>
            <a href="/contact" className="text-base font-medium text-muted-foreground hover:text-navy transition-colors">Contact</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+19292741177"
              className="flex items-center gap-2 text-muted-foreground hover:text-blue transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">(929) 274-1177</span>
            </a>
            <a href="/booking">
              <Button variant="red" size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col gap-2 px-4 mb-4">
              <a href="/services" className="text-lg font-medium text-navy py-3">Services</a>
              <a href="/commercial" className="text-lg font-medium text-navy py-3">Commercial</a>
              <a href="/how-it-works" className="text-lg font-medium text-navy py-3">How It Works</a>
              <a href="/about" className="text-lg font-medium text-navy py-3">About</a>
              <a href="/blog" className="text-lg font-medium text-navy py-3">Blog</a>
              <a href="/contact" className="text-lg font-medium text-navy py-3">Contact</a>
              <a href="/faq" className="text-lg font-medium text-navy py-3">FAQ</a>
            </nav>
            <div className="px-4 space-y-3">
              <a
                href="tel:+19292741177"
                className="flex items-center justify-center gap-2 h-12 rounded-lg border border-border text-navy font-medium hover:bg-muted transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call or Text: (929) 274-1177
              </a>
              <a href="/booking">
                <Button variant="red" className="w-full h-12 text-base">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
    </div>
  );
}
