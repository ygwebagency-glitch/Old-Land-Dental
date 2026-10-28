import { treatments } from "./treatments";

const DOCS = "https://www.oldlanddental.co.uk/documents/";

export type NavChild = { label: string; to: string; description?: string; external?: boolean; pdf?: boolean };
export type NavItem = { label: string; to?: string; children?: NavChild[]; mega?: boolean };

export const patientInfoPdfs: NavChild[] = [
  { label: "What To Do Following An Extraction", to: DOCS + "extraction.pdf" },
  { label: "Tooth Bleaching", to: DOCS + "bleaching.pdf" },
  { label: "Usage Instructions for Tooth Whitening Gel", to: DOCS + "whitening-instructions.pdf" },
  { label: "Denture Care", to: DOCS + "denture.pdf" },
  { label: "Healthy Eating", to: DOCS + "eating.pdf" },
  { label: "Temporomandibular (jaw) Joint Problems", to: DOCS + "tmj.pdf" },
  { label: "Dry Mouth (Xerostomia)", to: DOCS + "dry.pdf" },
  { label: "Dental Visits Following Surgery", to: DOCS + "operations-logo.pdf" },
  { label: "Cold Sores", to: DOCS + "cold-sores.pdf" },
  { label: "Passport Countersignatory", to: DOCS + "countersigning-passports-logo.pdf" },
].map((p) => ({ ...p, external: true, pdf: true }));

export const aboutGroup: NavChild[] = [
  { label: "About The Practice", to: "/about-the-practice" },
  { label: "Location", to: "/about-the-practice/location" },
  { label: "Our Team", to: "/about-the-practice/our-team" },
  { label: "Surgery Hours", to: "/about-the-practice/surgery-hours" },
  { label: "Prices", to: "/about-the-practice/prices" },
  { label: "Fee Comparison Table", to: "/about-the-practice/fee-comparison-table" },
  { label: "Links", to: "/about-the-practice/links" },
];

export const treatmentsGroup: NavChild[] = [
  { label: "Dental Treatments", to: "/dental-treatments" },
  ...treatments.map((t) => ({ label: t.title, to: `/dental-treatments/${t.slug}` })),
];

export const contactGroup: NavChild[] = [
  { label: "Contact Us", to: "/contact-us" },
  { label: "Appointments", to: "/contact-us/appointments" },
  { label: "Registration", to: "/contact-us/registration" },
  { label: "Complaints", to: "/contact-us/complaints" },
];

export const mainNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About The Practice", to: "/about-the-practice", children: aboutGroup.slice(1) },
  { label: "Dental Treatments", to: "/dental-treatments", children: treatmentsGroup.slice(1), mega: true },
  { label: "Contact Us", to: "/contact-us", children: contactGroup.slice(1) },
  { label: "Emergencies", to: "/emergencies" },
  { label: "Patient Information", children: patientInfoPdfs },
];

export const sideNavGroups = {
  about: aboutGroup,
  treatments: treatmentsGroup,
  contact: contactGroup,
} as const;
export type SideNavGroup = keyof typeof sideNavGroups;
