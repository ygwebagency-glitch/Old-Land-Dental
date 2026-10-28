import { practice } from "@/data/practice";

export type FeedbackPayload = {
  title?: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phone: string;
  email: string;
  comments: string;
  privacy: boolean;
};

export const countryCodes = [
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+353", label: "Ireland (+353)" },
  { code: "+33", label: "France (+33)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+48", label: "Poland (+48)" },
  { code: "+91", label: "India (+91)" },
  { code: "+1", label: "United States / Canada (+1)" },
];

export function buildFeedbackMailto(p: FeedbackPayload): string {
  const name = [p.title, p.firstName, p.lastName].filter(Boolean).join(" ");
  const body = [
    `Name: ${name}`,
    `Telephone: ${p.countryCode} ${p.phone}`,
    `Email: ${p.email}`,
    "",
    "Comments:",
    p.comments,
    "",
    "I have read and agree with the Privacy Policy.",
  ].join("\n");
  return `${practice.email.href}?subject=${encodeURIComponent("Website feedback")}&body=${encodeURIComponent(body)}`;
}

/**
 * Submit website feedback. There is no backend yet, so this opens the
 * visitor's email app with a prefilled message.
 * TODO(client): replace with a real endpoint (e.g. POST to a form service).
 */
export async function submitFeedback(payload: FeedbackPayload): Promise<{ ok: true }> {
  const href = buildFeedbackMailto(payload);
  if (typeof window !== "undefined") {
    window.location.href = href;
  }
  await new Promise((r) => setTimeout(r, 450));
  return { ok: true };
}
