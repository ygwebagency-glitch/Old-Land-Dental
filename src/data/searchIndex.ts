import { treatments } from "./treatments";
import { dentists, hygienist } from "./team";
import { priceCategories, practicePlan } from "./prices";

export type SearchGroup = "Pages" | "Treatments" | "Team" | "Prices";
export type SearchEntry = { title: string; url: string; snippet: string; group: SearchGroup; keywords?: string };

const pages: SearchEntry[] = [
  { title: "Home", url: "/", snippet: "Welcome To Oldland Dental — an established dental practice in Oldland Common, Bristol for over 20 years.", group: "Pages" },
  { title: "About The Practice", url: "/about-the-practice", snippet: "Established in 2003 to provide quality and affordable dental care in a friendly, relaxed environment.", group: "Pages", keywords: "independent victorian nhs private wheelchair parking cqc" },
  { title: "Location", url: "/about-the-practice/location", snippet: "On the main high street in the village of Oldland Common, five doors away from the doctor's surgery.", group: "Pages", keywords: "address directions map parking the clamp bath bristol" },
  { title: "Our Team", url: "/about-the-practice/our-team", snippet: "Everyone at our practice is committed to providing you with the very best in dental healthcare.", group: "Pages", keywords: "dentists hygienist nurses reception staff" },
  { title: "Surgery Hours", url: "/about-the-practice/surgery-hours", snippet: "Our normal surgery hours are listed below.", group: "Pages", keywords: "opening times open closed" },
  { title: "Prices", url: "/about-the-practice/prices", snippet: "Prices July 2026. For accurate treatment costs, please book in for a consultation.", group: "Pages", keywords: "fees cost price list" },
  { title: "Fee Comparison Table", url: "/about-the-practice/fee-comparison-table", snippet: "Compare our regular private dental prices to the discounted Practice Plan rates.", group: "Pages", keywords: "practice plan members saving" },
  { title: "Useful Links", url: "/about-the-practice/links", snippet: "CQC report, NHS Choices and the General Dental Council.", group: "Pages", keywords: "cqc nhs gdc" },
  { title: "Dental Treatments", url: "/dental-treatments", snippet: "NHS and private treatment are both available.", group: "Pages" },
  { title: "Contact Us", url: "/contact-us", snippet: "We are always keen to hear your views so please feel free to call us or use our online feedback form.", group: "Pages", keywords: "feedback email phone" },
  { title: "Appointments", url: "/contact-us/appointments", snippet: "You can book an appointment online here or by calling the practice during opening hours.", group: "Pages", keywords: "book booking cancel missed deposit" },
  { title: "Registration", url: "/contact-us/registration", snippet: "We're excited to welcome you as a new patient with Oldland dental practice.", group: "Pages", keywords: "new patient sign up register" },
  { title: "Complaints", url: "/contact-us/complaints", snippet: "Oldland Dental Practice takes complaints very seriously.", group: "Pages", keywords: "complaint procedure policy" },
  { title: "In An Emergency", url: "/emergencies", snippet: "We always aim to see emergencies the same day. Out of hours NHS patients: call 111.", group: "Pages", keywords: "emergency pain urgent 111 out of hours" },
  { title: "Invisalign & Aligners", url: "/invisalign", snippet: "Removable, nearly invisible, clear braces that can, over time, straighten your teeth.", group: "Pages", keywords: "invisalign aligners braces orthodontic straighten" },
  { title: "Facial Aesthetics", url: "/facial-aesthetics", snippet: "Non surgical solutions for those who seek to improve and maintain the appearance of their skin.", group: "Pages", keywords: "skin lines wrinkles" },
  { title: "Our Smile Gallery", url: "/our-smile-gallery", snippet: "See how we can transform your smile and improve your confidence.", group: "Pages", keywords: "before after results gallery" },
  { title: "Site map", url: "/sitemap", snippet: "Every page on the Oldland Dental website.", group: "Pages" },
];

const treatmentEntries: SearchEntry[] = treatments.map((t) => ({
  title: t.title,
  url: `/dental-treatments/${t.slug}`,
  snippet: t.short,
  group: "Treatments",
  keywords: t.body.join(" "),
}));

const team: SearchEntry[] = [...dentists, hygienist].map((p) => ({
  title: p.name,
  url: `/about-the-practice/our-team#${p.id}`,
  snippet: [p.role, p.qualifications, p.gdc ? `GDC No. ${p.gdc}` : ""].filter(Boolean).join(" · "),
  group: "Team",
  keywords: p.bio.join(" "),
}));

const priceRows: SearchEntry[] = [
  ...practicePlan.levels.map((l) => ({
    title: `Practice Plan ${l.name}`,
    url: "/about-the-practice/prices#practice-plan",
    snippet: l.price,
    group: "Prices" as const,
  })),
  ...priceCategories.flatMap((c) =>
    c.groups.flatMap((g) =>
      g.rows.map((r) => ({
        title: `${g.subheading ? g.subheading + " — " : ""}${r.name}`,
        url: `/about-the-practice/prices#${c.id}`,
        snippet: `${c.title} · ${r.price}`,
        group: "Prices" as const,
        keywords: r.note,
      })),
    ),
  ),
];

export const searchIndex: SearchEntry[] = [...pages, ...treatmentEntries, ...team, ...priceRows];

export function search(query: string, limit?: number): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const scored = searchIndex
    .map((e) => {
      const title = e.title.toLowerCase();
      const hay = `${title} ${e.snippet.toLowerCase()} ${(e.keywords ?? "").toLowerCase()}`;
      if (!terms.every((t) => hay.includes(t))) return null;
      let score = 0;
      for (const t of terms) {
        if (title.startsWith(t)) score += 6;
        else if (title.includes(t)) score += 4;
        else if (e.snippet.toLowerCase().includes(t)) score += 2;
        else score += 1;
      }
      return { e, score };
    })
    .filter((x): x is { e: SearchEntry; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.e);
  return limit ? scored.slice(0, limit) : scored;
}

export const searchGroups: SearchGroup[] = ["Pages", "Treatments", "Team", "Prices"];
