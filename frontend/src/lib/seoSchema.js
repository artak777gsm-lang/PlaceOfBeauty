import { SITE_URL, SALON, PHONE, OKOLICE, BOOKSY_URL } from "@/data/depilacja";

export const SALON_ID = `${SITE_URL}/#salon`;

export function salonNode() {
  return {
    "@type": "BeautySalon",
    "@id": SALON_ID,
    name: SALON.name,
    url: SITE_URL,
    telephone: PHONE,
    priceRange: "15 zł - 750 zł",
    address: {
      "@type": "PostalAddress",
      streetAddress: SALON.street,
      addressLocality: SALON.city,
      postalCode: SALON.postalCode,
      addressRegion: SALON.region,
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SALON.lat,
      longitude: SALON.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SALON.rating,
      reviewCount: SALON.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [BOOKSY_URL, "https://www.facebook.com/placeofbeauty"],
  };
}

export function areaServedNodes() {
  return [SALON.city, ...OKOLICE].map((name) => ({ "@type": "City", name }));
}

/**
 * Service + oferty. `offers` przyjmuje wiersze cennika ({ name, price, duration, zone }).
 */
export function serviceJsonLd({ name, description, path, image, offers = [], serviceType }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    ...(image ? { image: `${SITE_URL}${image}` } : {}),
    serviceType: serviceType || "Depilacja laserowa",
    category: "Depilacja laserowa",
    provider: salonNode(),
    areaServed: areaServedNodes(),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: BOOKSY_URL,
      servicePhone: PHONE,
      serviceLocation: {
        "@type": "Place",
        name: SALON.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: SALON.street,
          addressLocality: SALON.city,
          postalCode: SALON.postalCode,
          addressCountry: "PL",
        },
      },
    },
    ...(offers.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Depilacja laserowa Primelase — cennik",
            itemListElement: offers.map((o) => ({
              "@type": "Offer",
              name: `Depilacja laserowa — ${o.name.toLowerCase()}`,
              price: String(o.price),
              priceCurrency: "PLN",
              url: `${SITE_URL}${path}`,
              availability: "https://schema.org/InStock",
              itemOffered: {
                "@type": "Service",
                name: `Depilacja laserowa ${o.name.toLowerCase()}`,
                ...(o.duration ? { termsOfService: `Czas zabiegu: ${o.duration}` } : {}),
              },
            })),
          },
        }
      : {}),
  };
}

export function faqJsonLd(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToJsonLd({ name, description, steps, totalTime }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.step,
      text: s.desc,
    })),
  };
}

export function webPageJsonLd({ name, description, path, image, breadcrumbId }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    inLanguage: "pl-PL",
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Place of Beauty", url: SITE_URL },
    about: { "@id": SALON_ID },
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${image}` } } : {}),
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
  };
}
