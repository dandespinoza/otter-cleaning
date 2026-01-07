import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Skip to main content link for keyboard/screen reader users
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
    >
      Skip to main content
    </a>
  );
}

// Announce route changes to screen readers
export function RouteAnnouncer() {
  const location = useLocation();

  useEffect(() => {
    // Get page title for announcement
    const pageTitle = document.title || "Page";

    // Create or get the announcer element
    let announcer = document.getElementById("route-announcer");
    if (!announcer) {
      announcer = document.createElement("div");
      announcer.id = "route-announcer";
      announcer.setAttribute("aria-live", "polite");
      announcer.setAttribute("aria-atomic", "true");
      announcer.className = "sr-only";
      document.body.appendChild(announcer);
    }

    // Announce the page change
    announcer.textContent = `Navigated to ${pageTitle}`;

    // Clear after announcement
    const timer = setTimeout(() => {
      if (announcer) announcer.textContent = "";
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

// Focus management for modals and dialogs
export function useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => element.removeEventListener("keydown", handleKeyDown);
  }, [ref, isActive]);
}
