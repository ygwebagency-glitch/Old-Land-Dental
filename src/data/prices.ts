// Prices July 2026 — verbatim from the practice's price list.
export type PriceRow = { name: string; note?: string; price: string };
export type PriceGroup = { subheading?: string; rows: PriceRow[] };
export type PriceCategory = {
  id: string;
  label: string;
  title: string;
  note?: string;
  groups: PriceGroup[];
};

export const pricesTitle = "Prices July 2026";
export const pricesConsultNote = "For accurate treatment costs, please book in for a consultation.";
export const cancellationPolicy =
  "We require a minimum of 48 hours notice for all cancellations so that we can allocate the time to someone else. As like many other practices we regret that we will have to apply a late cancellation or missed appointment charge of £2 per minute for all appointments. This is to cover staff and ever increasing overhead costs. Patients booking a hygienist and/or treatment appointment will be required to pay a deposit of 50% of the appointment cost at the time of booking the appointment. We trust you will understand our policy and thank you for your cooperation.";

export const practicePlan = {
  note: "please note from 1st July this will be our updated Practice plan prices",
  levels: [
    { name: "LEVEL 1", price: "£21.74" },
    { name: "LEVEL 2", price: "£29.36" },
    { name: "LEVEL 3", price: "£44.60" },
    { name: "LEVEL 4", price: "£23.88" },
    { name: "LEVEL 5", price: "£39.13" },
  ],
};

export const newPatientIncludes = [
  "Dental Check up",
  "Oral Cancer Screen",
  "X-Rays as Needed",
  "Comprehensive Discussion of Your Oral Health Needs",
  "Preventative Advice",
  "Customised Treatment Plan",
];

export const priceCategories: PriceCategory[] = [
  {
    id: "examinations",
    label: "Examinations",
    title: "Examinations",
    groups: [
      {
        rows: [
          { name: "New Patient Consultation", note: "Includes - " + newPatientIncludes.join(" - "), price: "£70.00" },
          { name: "Routine examination", price: "£66.00" },
          { name: "X-rays", price: "Included" },
        ],
      },
    ],
  },
  {
    id: "emergency",
    label: "Emergency",
    title: "Emergency Appointments",
    groups: [
      {
        rows: [
          { name: "Registered patient emergency appointment (inc x-rays)", price: "£68.00 + Treatment costs" },
          { name: "Non registered emergency appointment (inc x-rays)", price: "£120.00 + Treatment costs" },
        ],
      },
    ],
  },
  {
    id: "preventative",
    label: "Preventative",
    title: "Preventative",
    groups: [
      {
        rows: [
          { name: "Routine hygiene appointment with hygienist/30 mins", price: "£99.00" },
          { name: "Anti-grinding/clenching guard from", price: "From £126.00" },
        ],
      },
    ],
  },
  {
    id: "fillings",
    label: "Fillings",
    title: "Fillings",
    groups: [
      {
        rows: [
          { name: "Tooth coloured filling", price: "From £152.00" },
          { name: "Metal filling", price: "From £133.50" },
          { name: "Biodentine + filling", price: "£288.50" },
        ],
      },
    ],
  },
  {
    id: "root-canal",
    label: "Root Canal",
    title: "Root Canal Treatment",
    groups: [
      {
        rows: [
          { name: "single rooted", price: "From £424.70" },
          { name: "multi rooted", price: "From £455.20" },
        ],
      },
    ],
  },
  {
    id: "extractions",
    label: "Extractions",
    title: "Extractions",
    groups: [
      {
        rows: [
          { name: "Simple extractions", price: "£157.50" },
          { name: "Surgical extractions", price: "£296.50" },
        ],
      },
    ],
  },
  {
    id: "crown-bridges",
    label: "Crown & Bridges",
    title: "Crown & Bridges",
    groups: [
      {
        rows: [
          { name: "Crown – white", price: "£710.00" },
          { name: "Onlay / Inlay", price: "£710.00" },
          { name: "Veneer (per tooth)", price: "£710.00" },
          { name: "Maryland bridge", price: "£710.00" },
          { name: "Recement of crown or bridges", price: "£134.50" },
        ],
      },
    ],
  },
  {
    id: "cosmetic",
    label: "Cosmetic",
    title: "Cosmetic",
    groups: [
      {
        rows: [
          { name: "Home teeth whitening/White Dental Beauty", price: "£399.00" },
          { name: "Whitening Trays ONLY (upper AND lower)", price: "£295.00" },
          { name: "Whitening Gel (3ml refill syringe)", price: "£30.00" },
          { name: "Composite bonding/veneers", price: "From £250.00" },
          { name: "Composite edge bonding", price: "From £199.00" },
          { name: "Porcelain veneers", price: "From £710.00" },
        ],
      },
    ],
  },
  {
    id: "sports-guard",
    label: "Sports Guard",
    title: "Sports Guard",
    groups: [
      {
        rows: [
          { name: "1x stripe", price: "£134.20" },
          { name: "2x stripe", price: "£138.60" },
          { name: "3x stripe", price: "£143.00" },
          { name: "Name tag", price: "£25.00" },
        ],
      },
    ],
  },
  {
    id: "invisalign-go",
    label: "Invisalign Go",
    title: "Invisalign Go",
    note: "assessment fee will be included in total cost if patient proceeds with treatment",
    groups: [
      {
        rows: [
          { name: "Assessment fee", price: "£250.00" },
          { name: "Single arch (upper OR lower)", note: "Includes DURATAIN removable retainers", price: "From £2999.00" },
          { name: "Dual arch (inc whitening)", note: "Includes whitening and DURATAIN removeable retainers", price: "£3999.00" },
          { name: "INVISALIGN GO BUNDLE (Inc whitening and composite bonding up to 6 teeth)", price: "£4999.00" },
        ],
      },
    ],
  },
  {
    id: "sundries",
    label: "Sundries",
    title: "Sundries",
    groups: [
      {
        rows: [
          { name: "Fixed retainers (Upper OR lower)", price: "From £175.00" },
          { name: "Fixed retainers (Upper AND lower)", price: "From £300.00" },
          { name: "Removable retainers (Upper OR lower)", price: "From £165.00" },
          { name: "Removable retainers (Upper AND lower)", price: "From £265.00" },
          { name: "Removable retainers (Double set, 2xUs & 2xLs)", price: "From £365.00" },
        ],
      },
    ],
  },
  {
    id: "dentures",
    label: "Dentures",
    title: "Denture Price List",
    groups: [
      {
        subheading: "Acrylic",
        rows: [
          { name: "Full Upper and Lower", price: "£1,452.00" },
          { name: "Full Upper or Lower", price: "£847.00" },
          { name: "1-3 Teeth", price: "£689.50" },
          { name: "4-7 Teeth", price: "£786.50" },
        ],
      },
      {
        subheading: "Chromes",
        rows: [
          { name: "1-3 Teeth", price: "£1,089.00" },
          { name: "Up to 4 Teeth", price: "£1,185.80" },
          { name: "Up to 5 Teeth", price: "£1,282.60" },
          { name: "Up to 6 Teeth", price: "£1,379.40" },
          { name: "Up to 7 Teeth", price: "£1,476.20" },
          { name: "Up to 12 Teeth", price: "£1,600.00" },
        ],
      },
      {
        subheading: "Sundries",
        rows: [
          { name: "Relines", price: "£272.25" },
          { name: "Addition of one tooth", price: "From £202.20" },
          { name: "Repairs with impression", price: "£90.75" },
          { name: "Valplast Denture", price: "From £850.00" },
        ],
      },
    ],
  },
];

export const invisalignGo = priceCategories.find((c) => c.id === "invisalign-go")!;
export const emergencyPrices = priceCategories.find((c) => c.id === "emergency")!;
