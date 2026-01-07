import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "service";
  structuredData?: object;
  noindex?: boolean;
}

const SITE_NAME = "Otter Cleaning";
const DEFAULT_TITLE = "Otter Cleaning | Professional House Cleaning Services in NYC, Long Island & NJ";
const DEFAULT_DESCRIPTION = "Award-winning residential and commercial cleaning services in NYC, Long Island & New Jersey. Organic products safe for families and pets. Vetted cleaners, 100% satisfaction guarantee. Book online in 60 seconds.";
const DEFAULT_KEYWORDS = "house cleaning services, residential cleaning, commercial cleaning, deep cleaning, move in cleaning, move out cleaning, maid service, home cleaning NYC, cleaning service Long Island, New Jersey cleaners, eco-friendly cleaning, organic cleaning products";
const SITE_URL = "https://ottercleaning.com";
const DEFAULT_OG_IMAGE = "https://ottercleaning.com/og-image.jpg";

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  structuredData,
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonical = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Otter Cleaning Company" />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@OtterCleaning" />
      <meta name="twitter:creator" content="@OtterCleaning" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO Tags */}
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="New York" />
      <meta name="theme-color" content="#1B3A57" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Structured Data Schemas
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ottercleaning.com/#organization",
  name: "Otter Cleaning",
  image: "https://ottercleaning.com/og-image.jpg",
  description: "Professional residential and commercial cleaning services serving NYC, Long Island, and New Jersey since 2009. Organic products, vetted cleaners, 100% satisfaction guarantee.",
  url: "https://ottercleaning.com",
  telephone: "(929) 274-1177",
  email: "hello@ottercleaning.com",
  foundingDate: "2009",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.7128,
    longitude: -74.0060,
  },
  areaServed: [
    {
      "@type": "City",
      name: "New York City",
      "@id": "https://en.wikipedia.org/wiki/New_York_City",
    },
    {
      "@type": "Place",
      name: "Long Island",
    },
    {
      "@type": "State",
      name: "New Jersey",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://twitter.com/OtterCleaning",
    "https://facebook.com/OtterCleaning",
    "https://instagram.com/OtterCleaning",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Standard Cleaning",
          description: "Core maintenance cleaning for regular upkeep",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Deep Cleaning",
          description: "Comprehensive cleaning targeting hard-to-reach areas",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Move In/Out Cleaning",
          description: "Thorough cleaning for property turnovers",
        },
      },
    ],
  },
};

// Prices match booking calculator (5% discounted, starting at Studio/1 bath)
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "House Cleaning Service",
  provider: {
    "@type": "LocalBusiness",
    name: "Otter Cleaning",
    "@id": "https://ottercleaning.com/#organization",
  },
  areaServed: ["New York City", "Long Island", "New Jersey"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Cleaning Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Standard Cleaning",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Standard Cleaning",
              description: "Surface cleaning, vacuuming, mopping, kitchen and bathroom sanitization",
            },
            price: "105.00",
            priceCurrency: "USD",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Standard Plus Cleaning",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Standard Plus Cleaning",
              description: "Enhanced cleaning with baseboard dusting, high-touch sanitization, and edge vacuuming",
            },
            price: "143.00",
            priceCurrency: "USD",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Deep Cleaning",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Deep Cleaning",
              description: "Comprehensive cleaning including interior windows, appliance interiors, cabinet cleaning, and grout removal",
            },
            price: "277.00",
            priceCurrency: "USD",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Move In/Out Cleaning",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Move In/Out Cleaning",
              description: "Complete property turnover cleaning with inspection-ready results",
            },
            price: "277.00",
            priceCurrency: "USD",
          },
        ],
      },
    ],
  },
};

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `https://ottercleaning.com${item.url}`,
  })),
});

export const webPageSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  description,
  url: `https://ottercleaning.com${url}`,
  isPartOf: {
    "@type": "WebSite",
    name: "Otter Cleaning",
    url: "https://ottercleaning.com",
  },
  provider: {
    "@type": "LocalBusiness",
    name: "Otter Cleaning",
    "@id": "https://ottercleaning.com/#organization",
  },
});
