import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "otter_cookie_consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === "accepted") {
      initializeAnalytics();
    }
  }, []);

  const initializeAnalytics = () => {
    // Initialize Google Analytics if ID is configured
    const gaId = import.meta.env.VITE_GA_TRACKING_ID;
    if (gaId && typeof window !== "undefined") {
      // Load gtag script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", gaId, {
        anonymize_ip: true,
        cookie_flags: "SameSite=None;Secure",
      });

      // Make gtag available globally
      (window as any).gtag = gtag;
    }
  };

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowBanner(false);
    initializeAnalytics();
  };

  const declineCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-card border-t shadow-lg animate-slide-up"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 id="cookie-title" className="font-semibold text-navy mb-1">
              We Value Your Privacy
            </h2>
            <p id="cookie-description" className="text-sm text-muted-foreground">
              We use cookies to enhance your experience, analyze site traffic, and understand where our visitors come from.
              By clicking "Accept", you consent to our use of cookies.{" "}
              <a href="/privacy" className="text-blue hover:underline">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={declineCookies}>
              Decline
            </Button>
            <Button variant="blue" size="sm" onClick={acceptCookies}>
              Accept
            </Button>
          </div>
          <button
            onClick={declineCookies}
            className="absolute top-2 right-2 sm:static p-1 text-muted-foreground hover:text-navy transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Declare gtag types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
