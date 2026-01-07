import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressComponents {
  street: string;
  apt: string;
  city: string;
  state: string;
  zipCode: string;
  fullAddress: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect: (components: AddressComponents) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

// Declare google types
declare global {
  interface Window {
    google: typeof google;
    initGoogleMaps: () => void;
  }
}

let googleMapsLoaded = false;
let googleMapsLoading = false;
const loadCallbacks: (() => void)[] = [];

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve) => {
    if (googleMapsLoaded) {
      resolve();
      return;
    }

    loadCallbacks.push(resolve);

    if (googleMapsLoading) {
      return;
    }

    googleMapsLoading = true;

    window.initGoogleMaps = () => {
      googleMapsLoaded = true;
      googleMapsLoading = false;
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
}

function parseAddressComponents(place: google.maps.places.PlaceResult): AddressComponents {
  const components: AddressComponents = {
    street: "",
    apt: "",
    city: "",
    state: "",
    zipCode: "",
    fullAddress: place.formatted_address || "",
  };

  let streetNumber = "";
  let streetName = "";

  place.address_components?.forEach((component) => {
    const types = component.types;

    if (types.includes("street_number")) {
      streetNumber = component.long_name;
    }
    if (types.includes("route")) {
      streetName = component.long_name;
    }
    if (types.includes("subpremise")) {
      components.apt = component.long_name;
    }
    if (types.includes("locality") || types.includes("sublocality_level_1")) {
      components.city = component.long_name;
    }
    // Handle NYC boroughs
    if (types.includes("sublocality") && !components.city) {
      components.city = component.long_name;
    }
    if (types.includes("administrative_area_level_1")) {
      components.state = component.short_name;
    }
    if (types.includes("postal_code")) {
      components.zipCode = component.long_name;
    }
  });

  components.street = streetNumber ? `${streetNumber} ${streetName}` : streetName;

  return components;
}

export function AddressAutocomplete({
  value,
  onChange,
  onAddressSelect,
  placeholder = "Start typing your address...",
  className,
  id,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.warn("Google Maps API key not configured. Address autocomplete disabled.");
      return;
    }

    loadGoogleMapsScript(apiKey).then(() => {
      setIsLoaded(true);
    });
  }, [apiKey]);

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    // Restrict to US addresses in our service areas
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "formatted_address", "geometry"],
      types: ["address"],
    });

    // Bias results toward NYC/NJ/Long Island area
    const nycBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(39.5, -75.5), // SW: South Jersey
      new window.google.maps.LatLng(41.3, -71.8)  // NE: East Long Island
    );
    autocompleteRef.current.setBounds(nycBounds);

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place && place.address_components) {
        const components = parseAddressComponents(place);
        onChange(components.street);
        onAddressSelect(components);
      }
    });

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, onChange, onAddressSelect]);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn("h-12 text-base pl-10", className)}
        autoComplete="off"
      />
      <MapPin
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
          isFocused ? "text-blue" : "text-muted-foreground"
        )}
      />
    </div>
  );
}
