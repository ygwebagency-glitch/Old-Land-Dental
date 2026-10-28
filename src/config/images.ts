/**
 * ============================================================
 *  CENTRAL IMAGE CONFIG — the ONE place every image lives.
 * ============================================================
 *  To replace an image: drop the new file in /public/images/ and change only
 *  `src` here (e.g. src: "/images/new-hero.jpg"). Layout will adapt
 *  automatically — every image renders inside a fixed-aspect container with
 *  object-fit: cover and the focal point below, so any size/ratio fits.
 *
 *  All images are currently hotlinked from the practice's original website.
 */

export const OLD = "https://www.oldlanddental.co.uk";

export type ImageEntry = {
  src: string;
  alt: string;
  /** CSS aspect-ratio for the default container, e.g. "16/9" */
  aspect: string;
  /** CSS object-position focal point */
  focal: string;
  /** Intrinsic size of the current source (prevents layout shift) */
  width: number;
  height: number;
  ratioNote: string;
  replaceNote: string;
};

const img = (e: ImageEntry) => e;

export const images = {
  logo: img({
    src: `${OLD}/images/logos/oldland-dental-logo.png`,
    alt: "Oldland Dental",
    aspect: "1073/140",
    focal: "50% 50%",
    width: 1073,
    height: 140,
    ratioNote: "Wordmark, shown 44px high (36px mobile)",
    replaceNote: "PNG/SVG ≥ 600px wide, transparent background",
  }),
  logoHouse: img({
    src: `${OLD}/images/logos/oldland-dental-logo-house.png`,
    alt: "Oldland Dental Practice building mark",
    aspect: "399/327",
    focal: "50% 50%",
    width: 399,
    height: 327,
    ratioNote: "64–96px square-ish mark",
    replaceNote: "≥ 256×256",
  }),
  heroHome: img({
    src: `${OLD}/images/carousel-location.jpg`,
    alt: "Smiling patient reclining in a dental chair while a dentist in blue gloves holds dental instruments",
    aspect: "16/9",
    focal: "70% 40%",
    width: 1600,
    height: 1067,
    ratioNote: "Full-bleed 16:9 desktop, 3:4 mobile; subject on the right half",
    replaceNote: "≥ 2400×1350 landscape",
  }),
  heroAbout: img({
    src: `${OLD}/images/carousel-about2.jpg`,
    alt: "Three young women laughing together outdoors",
    aspect: "21/9",
    focal: "50% 40%",
    width: 1600,
    height: 802,
    ratioNote: "21:9 banner desktop, 4:3 mobile",
    replaceNote: "≥ 2400×1000",
  }),
  heroTreatments: img({
    src: `${OLD}/images/carousel-dental-treatments.jpg`,
    alt: "Smiling man in a dental chair with a dentist holding a mirror and dental tools",
    aspect: "21/9",
    focal: "45% 40%",
    width: 1600,
    height: 802,
    ratioNote: "21:9 / 4:3",
    replaceNote: "≥ 2400×1000",
  }),
  heroContact: img({
    src: `${OLD}/images/carousel-prices.jpg`,
    alt: "Woman smiling and pointing at her cheeks",
    aspect: "21/9",
    focal: "50% 55%",
    width: 1600,
    height: 1030,
    ratioNote: "21:9 / 4:3",
    replaceNote: "≥ 2400×1000",
  }),
  heroEmergency: img({
    src: `${OLD}/images/carousel-emergencies.jpg`,
    alt: "Man holding his jaw in pain",
    aspect: "21/9",
    focal: "55% 45%",
    width: 1600,
    height: 802,
    ratioNote: "21:9 / 4:3",
    replaceNote: "≥ 2400×1000",
  }),
  heroInvisalign: img({
    src: `${OLD}/images/carousel-cosmetic2.jpg`,
    alt: "Close-up of clear aligner trays held in gloved hands",
    aspect: "21/9",
    focal: "50% 50%",
    width: 1600,
    height: 802,
    ratioNote: "21:9 / 4:3",
    replaceNote: "≥ 2400×1000",
  }),
  "tx.toothWhitening": img({
    src: `${OLD}/images/features-tooth-whitening.jpg`,
    alt: "Couple laughing together, representing a bright white smile",
    aspect: "4/3",
    focal: "50% 40%",
    width: 720,
    height: 528,
    ratioNote: "Stacking card 4:5; carousel 4:3",
    replaceNote: "≥ 1200×900 (4:3)",
  }),
  "tx.crownsBridges": img({
    src: `${OLD}/images/features-crowns-and-bridges.jpg`,
    alt: "Grey-haired couple laughing together",
    aspect: "4/3",
    focal: "50% 40%",
    width: 720,
    height: 528,
    ratioNote: "Stacking card 4:5; carousel 4:3",
    replaceNote: "≥ 1200×900",
  }),
  "tx.whiteFillings": img({
    src: `${OLD}/images/features-white-fillings.jpg`,
    alt: "Close-up of an open mouth with a dentist's tools and blue gloves",
    aspect: "4/3",
    focal: "50% 50%",
    width: 720,
    height: 528,
    ratioNote: "Stacking card 4:5; carousel 4:3",
    replaceNote: "≥ 1200×900",
  }),
  "tx.preventative": img({
    src: `${OLD}/images/features-preventative-dentistry.jpg`,
    alt: "Preventative dentistry at Oldland Dental Practice",
    aspect: "4/3",
    focal: "50% 45%",
    width: 720,
    height: 528,
    ratioNote: "Stacking card 4:5; carousel 4:3",
    replaceNote: "≥ 1200×900",
  }),
  "tx.rootCanal": img({
    src: `${OLD}/images/features-root-canal.jpg`,
    alt: "Root canal treatment at Oldland Dental Practice",
    aspect: "4/3",
    focal: "50% 45%",
    width: 720,
    height: 528,
    ratioNote: "Stacking card 4:5; carousel 4:3",
    replaceNote: "≥ 1200×900",
  }),
  "tx.cosmetic": img({
    src: `${OLD}/images/features-cosmetic-dentistry.jpg`,
    alt: "Cosmetic dentistry at Oldland Dental Practice",
    aspect: "4/3",
    focal: "50% 45%",
    width: 720,
    height: 528,
    ratioNote: "Stacking card 4:5; carousel 4:3",
    replaceNote: "≥ 1200×900",
  }),
  "tx.anxious": img({
    src: `${OLD}/images/features-anxious.jpg`,
    alt: "Relaxed patient — help for nervous patients",
    aspect: "4/3",
    focal: "50% 45%",
    width: 720,
    height: 528,
    ratioNote: "Stacking card 4:5; carousel 4:3",
    replaceNote: "≥ 1200×900",
  }),
  "tx.aesthetic": img({
    src: `${OLD}/images/features-facial-aesthetics.jpg`,
    alt: "Facial aesthetics — non surgical skin treatments",
    aspect: "4/3",
    focal: "50% 40%",
    width: 720,
    height: 528,
    ratioNote: "Stacking card 4:5",
    replaceNote: "≥ 1200×900",
  }),
  seeResults: img({
    src: `${OLD}/images/see-our-results.jpg`,
    alt: "Smiling couple, cheek to cheek",
    aspect: "4/5",
    focal: "50% 40%",
    width: 800,
    height: 609,
    ratioNote: "4:5 portrait card",
    replaceNote: "≥ 1200×1500 (or ≥ 1200 square)",
  }),
  "gallery.0": img({
    src: `${OLD}/images/features-facial-aesthetics.jpg`,
    alt: "Smile gallery — facial aesthetics result",
    aspect: "4/3",
    focal: "50% 40%",
    width: 720,
    height: 528,
    ratioNote: "Masonry tile",
    replaceNote: "≥ 1200 on long edge",
  }),
  "gallery.1": img({
    src: `${OLD}/images/features-tooth-whitening.jpg`,
    alt: "Smile gallery — tooth whitening result",
    aspect: "4/3",
    focal: "50% 40%",
    width: 720,
    height: 528,
    ratioNote: "Masonry tile",
    replaceNote: "≥ 1200 on long edge",
  }),
  "gallery.2": img({
    src: `${OLD}/images/features-preventative-dentistry.jpg`,
    alt: "Smile gallery — healthy smile",
    aspect: "4/3",
    focal: "50% 40%",
    width: 720,
    height: 528,
    ratioNote: "Masonry tile",
    replaceNote: "≥ 1200 on long edge",
  }),
  "ba.1.before": img({
    src: `${OLD}/images/1b.jpg`,
    alt: "Cosmetic result 1 — before treatment",
    aspect: "4/3",
    focal: "50% 50%",
    width: 225,
    height: 149,
    ratioNote: "4:3 comparison slider; before/after must have identical dimensions",
    replaceNote: "≥ 1200×900, identical to the 'after' image",
  }),
  "ba.1.after": img({
    src: `${OLD}/images/1a.jpg`,
    alt: "Cosmetic result 1 — after treatment",
    aspect: "4/3",
    focal: "50% 50%",
    width: 225,
    height: 149,
    ratioNote: "4:3 comparison slider",
    replaceNote: "≥ 1200×900, identical to the 'before' image",
  }),
  "ba.2.before": img({
    src: `${OLD}/images/2b.jpg`,
    alt: "Cosmetic result 2 — before treatment",
    aspect: "4/3",
    focal: "50% 50%",
    width: 225,
    height: 149,
    ratioNote: "4:3 comparison slider",
    replaceNote: "≥ 1200×900, identical to the 'after' image",
  }),
  "ba.2.after": img({
    src: `${OLD}/images/2a.jpg`,
    alt: "Cosmetic result 2 — after treatment",
    aspect: "4/3",
    focal: "50% 50%",
    width: 225,
    height: 149,
    ratioNote: "4:3 comparison slider",
    replaceNote: "≥ 1200×900, identical to the 'before' image",
  }),
  "team.katie": portrait(`${OLD}/images/staff/katie-2.jpg`, "Katie Davies, Principal Dentist", 600, 750),
  "team.lucy": portrait(`${OLD}/images/staff/lucy.jpg`, "Lucy Beard, Dental Surgeon", 600, 750),
  "team.kiran": portrait(`${OLD}/images/kiran-jun26.jpg`, "Kiran Naik, Dental Surgeon", 500, 667),
  "team.federico": portrait(`${OLD}/images/staff/federico.jpg`, "Federico Zanutto, Dental Surgeon", 600, 750),
  "team.manisha": portrait(`${OLD}/images/manisha.jpg`, "Manisha Mehendale, Dental Surgeon", 600, 604),
  "team.lois": portrait(`${OLD}/images/lois.jpg`, "Lois Newlands, Dental Surgeon", 600, 673),
  // File is named "amy" on the original site but it is Nicole Kasiya's photo.
  "team.nicole": portrait(`${OLD}/images/amy-sep26.jpg`, "Nicole Kasiya, Dental Surgeon", 500, 667),
  "team.alla": portrait(`${OLD}/images/staff/alla.jpg`, "Alla King, Dental Hygienist", 600, 750),
  "team.nurses": img({
    src: `${OLD}/images/dental-nurses.jpg`,
    alt: "The Oldland Dental Practice dental nursing team",
    aspect: "16/9",
    focal: "50% 40%",
    width: 1000,
    height: 750,
    ratioNote: "16:9 desktop, 4:3 mobile",
    replaceNote: "≥ 1600×900",
  }),
  // Instagram tiles: the original site loaded these from a live Instagram
  // widget. Practice photos are used for now.
  "instagram.0": insta(`${OLD}/images/carousel-about2.jpg`, "Smiling friends — from Oldland Dental on Instagram"),
  "instagram.1": insta(`${OLD}/images/see-our-results.jpg`, "Smiling couple — from Oldland Dental on Instagram"),
  "instagram.2": insta(`${OLD}/images/carousel-location.jpg`, "Happy patient — from Oldland Dental on Instagram"),
  "instagram.3": insta(`${OLD}/images/dental-nurses.jpg`, "Our team — from Oldland Dental on Instagram"),
} satisfies Record<string, ImageEntry>;

function portrait(src: string, alt: string, width: number, height: number): ImageEntry {
  return {
    src,
    alt,
    aspect: "4/5",
    focal: "50% 30%",
    width,
    height,
    ratioNote: "4:5 portrait card",
    replaceNote: "≥ 800×1000",
  };
}

function insta(src: string, alt: string): ImageEntry {
  return {
    src,
    alt,
    aspect: "1/1",
    focal: "50% 50%",
    width: 640,
    height: 640,
    ratioNote: "1:1 tile ~160–220px",
    // TODO(client): swap with client original Instagram posts (≥ 640×640)
    replaceNote: "swap with client original",
  };
}

export type ImageKey = keyof typeof images;
export const getImage = (key: ImageKey): ImageEntry => images[key];
