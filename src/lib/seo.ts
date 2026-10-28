import { practice } from "@/data/practice";
import { hours } from "@/data/hours";

export const SITE_URL = "https://www.oldlanddental.co.uk";
const SUFFIX = "Oldland Dental Practice, Bristol";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title verbatim (Home) instead of "{title} | suffix" */
  rawTitle?: boolean;
  noindex?: boolean;
  breadcrumbs?: { name: string; path?: string }[];
};

export function seo({ title, description, path, rawTitle, noindex, breadcrumbs }: SeoInput) {
  const fullTitle = rawTitle ? title : `${title} | ${SUFFIX}`;
  const url = SITE_URL + path;
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: practice.name },
    { property: "og:locale", content: "en_GB" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  if (noindex) meta.push({ name: "robots", content: "noindex" });
  const scripts = breadcrumbs
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.name,
              ...(b.path ? { item: SITE_URL + b.path } : {}),
            })),
          }),
        },
      ]
    : [];
  return { meta, links: [{ rel: "canonical", href: url }], scripts };
}

const dayMap: Record<string, string> = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
};

export const dentistJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: practice.name,
  url: SITE_URL,
  telephone: practice.phone.e164,
  email: practice.email.display,
  image: `${SITE_URL}/images/carousel-location.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: practice.address.street,
    addressLocality: `${practice.address.locality}, ${practice.address.city}`,
    postalCode: practice.address.postcode,
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: practice.geo.lat, longitude: practice.geo.lng },
  openingHoursSpecification: hours.flatMap((d) =>
    d.sessions.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayMap[d.day]}`,
      opens: s.open,
      closes: s.close,
    })),
  ),
  sameAs: [practice.links.instagram],
  foundingDate: String(practice.established),
};
