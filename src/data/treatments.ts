import type { ImageKey } from "@/config/images";

export type Treatment = {
  slug: string;
  title: string;
  short: string;
  /** Paragraphs of verbatim page copy */
  body: string[];
  list?: { intro: string; items: string[] };
  image: ImageKey;
  hasPrices?: boolean;
};

const whiteningShort =
  "Tooth whitening helps restore the natural colour of teeth. The process is simple. Bleaching agents break down within the tooth, releasing oxygen which removes the stains without damaging the tooth structure – creating a healthy, white smile.";
const crownsShort =
  "If teeth have been cracked or weakened by large fillings, crowns will preserve and protect them. Crowns are made either of thin gold, used in areas which cannot be seen when you smile, or porcelain, which is tooth colored and looks natural.";
const fillingsShort =
  "If you have silver amalgam fillings, you may want to consider replacing them with tooth-coloured fillings which can be more aesthetically more pleasing.";
const rootShort =
  "Root canal treatment involves the removal of the pulp tissues (the innermost part of the tooth where the nerve is found) from the tooth in the event that it gets infected or inflamed. The pulp can be infected or inflamed for many reasons, but usually because of deep decay, an extensive filling or trauma.";
const cosmetic =
  "If any aspect of your dental appearance concerns you, no matter how trivial it may seem, please do discuss it with us. Simple procedures, for example, white fillings, tooth whitening or replacing a gap with a simple bridge can make a huge difference to your smile.";
const anxiousShort =
  "We understand that some people feel nervous about visiting the dentist. For most patients, our calm, comfortable surroundings and friendly dentists are enough to put them at ease.";

export const treatments: Treatment[] = [
  {
    slug: "tooth-whitening",
    title: "Tooth Whitening",
    short: whiteningShort,
    image: "tx.toothWhitening",
    hasPrices: true,
    body: [
      "Tooth whitening helps restore the natural colour of teeth. The process is simple. Bleaching agents break down within the tooth, releasing oxygen which removes the stains without damaging the tooth structure – creating a healthy, white smile. The degree of whiteness will vary from patient to patient, depending on the structure of the teeth and the period for which the product is applied.",
      "Tooth whitening is a process that lightens discolourations of enamel and dentine and can be conveniently done at home. The system uses a mild solution of the bleaching gel. A custom made mouth tray is made and filled with bleaching gel and placed over the teeth at night. Research indicates that whitening teeth with 9-16% carbamide peroxide under the supervision of a dentist is completely safe for teeth and gums.",
    ],
  },
  {
    slug: "crowns-and-bridges",
    title: "Crowns & Bridges",
    short: crownsShort,
    image: "tx.crownsBridges",
    hasPrices: true,
    body: [crownsShort + " A bridge is made up of crowns joined together, and is used to fill spaces where teeth are missing."],
  },
  {
    slug: "white-fillings",
    title: "White Fillings",
    short: fillingsShort,
    image: "tx.whiteFillings",
    hasPrices: true,
    body: [
      fillingsShort,
      "Using very large white fillings in back teeth can sometimes cause problems, so in these cases porcelain crowns or inlays can be used to reinforce teeth, while maintaining a natural look. White fillings are not usually as durable as amalgam fillings, but with good oral care they can still last for many years. And with new advances in dentistry, materials are improving all the time.",
    ],
  },
  {
    slug: "preventative-dentistry",
    title: "Preventative Dentistry",
    short:
      "A visit to your dentist or hygienist is possibly the most important part of maintaining good oral health and hygiene. On occasions the Dentist may carry out this important visit for you as part of an ongoing course of treatment.",
    image: "tx.preventative",
    body: [
      "A visit to Your Dentist or Hygienist is possibly the most important part of maintaining good oral health and hygiene. On occasions the Dentist may carry out this important visit for you as part of an ongoing course of treatment.",
    ],
    list: {
      intro: "We can advise you on the following areas:",
      items: [
        "Detection and prevention of gum disease and tooth decay",
        "Therapeutic treatment of gum disease and tooth decay",
        "Fresh breath treatment",
      ],
    },
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    short: rootShort,
    image: "tx.rootCanal",
    hasPrices: true,
    body: [
      rootShort,
      "Root canal treatment saves teeth that would otherwise have been extracted. It involves removal of the infected or inflamed pulp using small, specially designed hand or rotary files and back filling each nerve canal with a filling material. The tooth may eventually need a crown depending on how much tooth tissue is left.",
    ],
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    short: cosmetic,
    image: "tx.cosmetic",
    hasPrices: true,
    body: [cosmetic],
  },
  {
    slug: "feeling-anxious",
    title: "Feeling Anxious",
    short: anxiousShort,
    image: "tx.anxious",
    body: [
      anxiousShort,
      "For those who need a little more reassurance, we provide anti-anxiety medicine to take before your appointment. Please discuss your fears with us and we will do everything we can to help.",
    ],
  },
];

/** Home-page only 8th card → /facial-aesthetics */
export const aestheticCard = {
  title: "Aesthetic Treatment",
  short:
    "Oldland Dental Practice now provides comprehensive, non surgical solutions for those who seek to improve and maintain the appearance of their skin. We now offer treatments for lines and wrinkles",
  image: "tx.aesthetic" as ImageKey,
};

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
