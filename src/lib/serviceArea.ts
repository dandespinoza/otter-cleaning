// Service area validation for NYC, Long Island, and New Jersey

export interface ServiceAreaResult {
  inServiceArea: boolean;
  region: "nyc" | "long-island" | "new-jersey" | "unknown";
  message: string;
}

// NYC ZIP codes (Manhattan, Brooklyn, Queens, Bronx, Staten Island)
const nycZipRanges = [
  { start: 10001, end: 10299 }, // Manhattan
  { start: 10301, end: 10314 }, // Staten Island
  { start: 10451, end: 10475 }, // Bronx
  { start: 11201, end: 11256 }, // Brooklyn
  { start: 11351, end: 11697 }, // Queens
];

// Long Island ZIP codes (Nassau & Suffolk counties)
const longIslandZipRanges = [
  { start: 11001, end: 11199 }, // Nassau County
  { start: 11501, end: 11599 }, // Nassau County
  { start: 11701, end: 11980 }, // Suffolk County
];

// New Jersey ZIP codes (Northern & Central NJ - our service area)
const newJerseyZipRanges = [
  { start: 7001, end: 7999 },   // Northern NJ
  { start: 8001, end: 8999 },   // Central/South NJ
];

function isInRange(zip: number, ranges: { start: number; end: number }[]): boolean {
  return ranges.some(range => zip >= range.start && zip <= range.end);
}

export function checkZipCode(zipCode: string): ServiceAreaResult {
  const zip = parseInt(zipCode.replace(/\D/g, ""), 10);

  if (isNaN(zip) || zipCode.length < 5) {
    return { inServiceArea: false, region: "unknown", message: "Please enter a valid ZIP code" };
  }

  if (isInRange(zip, nycZipRanges)) {
    return { inServiceArea: true, region: "nyc", message: "We service your area in NYC!" };
  }

  if (isInRange(zip, longIslandZipRanges)) {
    return { inServiceArea: true, region: "long-island", message: "We service your area in Long Island!" };
  }

  if (isInRange(zip, newJerseyZipRanges)) {
    return { inServiceArea: true, region: "new-jersey", message: "We service your area in New Jersey!" };
  }

  return {
    inServiceArea: false,
    region: "unknown",
    message: "We don't currently service your area. Contact us for special arrangements."
  };
}

// Background geolocation check using browser API
export async function checkServiceArea(): Promise<ServiceAreaResult> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ inServiceArea: false, region: "unknown", message: "Location not available" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Approximate bounds for our service areas
        // NYC: ~40.4 to 40.9 lat, -74.3 to -73.7 lon
        // Long Island: ~40.5 to 41.1 lat, -73.7 to -71.8 lon
        // NJ: ~39.5 to 41.3 lat, -75.5 to -73.9 lon

        // Check if in NYC area
        if (latitude >= 40.4 && latitude <= 40.95 && longitude >= -74.3 && longitude <= -73.7) {
          resolve({ inServiceArea: true, region: "nyc", message: "You're in our NYC service area!" });
          return;
        }

        // Check if in Long Island area
        if (latitude >= 40.5 && latitude <= 41.1 && longitude >= -73.8 && longitude <= -71.8) {
          resolve({ inServiceArea: true, region: "long-island", message: "You're in our Long Island service area!" });
          return;
        }

        // Check if in NJ area
        if (latitude >= 39.5 && latitude <= 41.3 && longitude >= -75.5 && longitude <= -74.0) {
          resolve({ inServiceArea: true, region: "new-jersey", message: "You're in our New Jersey service area!" });
          return;
        }

        resolve({
          inServiceArea: false,
          region: "unknown",
          message: "We may not service your exact location. Enter your ZIP to confirm."
        });
      },
      () => {
        // Geolocation denied or failed - that's okay, they can enter ZIP
        resolve({ inServiceArea: false, region: "unknown", message: "" });
      },
      { timeout: 5000, maximumAge: 300000 } // 5 second timeout, cache for 5 minutes
    );
  });
}
