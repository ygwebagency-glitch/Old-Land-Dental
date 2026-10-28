// Fee Comparison Table — verbatim. Kept separate from prices.ts on purpose:
// these are two different documents on the practice's original site.
export type FeeRow = { item: string; privateFee: string; members: string; saving: string };

export const feeIntro = [
  "This table compares our regular private dental prices to the discounted rates you'd pay with our Practice Plan, highlighting your potential savings!",
  "Please note that this is a guide and you will be provided with an itemised and personalised estimate of your treatment costs after consultation with your dentist.",
  "These prices will take effect on 1st April 2025.",
];

const r = (item: string, privateFee: string, members: string, saving: string): FeeRow => ({ item, privateFee, members, saving });

export const fees: FeeRow[] = [
  r("New Patient Examination (adult)", "£70.00", "N/A", "N/A"),
  r("Routine Examination (adult)", "£66.00", "Included", "N/A"),
  r("Emergency Appointment (inc. x-rays)", "£68.00", "1 included", "N/A"),
  r("Non-Registered Emergency Appointment (inc. x-rays)", "£120.00", "N/A", "N/A"),
  r("Extractions, from", "£157.50", "£141.75", "£15.75"),
  r("Surgical Extractions, from", "£296.50", "£266.85", "£29.65"),
  r("Hygiene Appointment", "£99.00", "Included", "N/A"),
  r("Composite Filling (White), from", "£152.00", "£136.80", "£15.20"),
  r("Amalgam Filling, from", "£133.50", "£120.15", "£13.35"),
  r("Root Canal Treatment (Single Rooted), from", "£424.70", "£382.23", "£42.47"),
  r("Root Canal Treatment (Multi-Rooted), from", "£455.20", "£409.68", "£45.52"),
  r("Specialist Root Canal Treatment (Single Rooted), from", "£514.25", "£462.82", "£51.43"),
  r("Specialist Root Canal Treatment (Premolars), from", "£665.50", "£598.95", "£66.55"),
  r("Specialist Root Canal Treatment (Molars), from", "£999.00", "£899.10", "£99.90"),
  r("Specialist Re-Root Canal Treatment (Single Rooted), from", "£577.50", "£519.75", "£57.75"),
  r("Specialist Re-Root Canal Treatment (Premolars), from", "£770.00", "£693.00", "£77.00"),
  r("Specialist Re-Root Canal Treatment (Molars), from", "£1,155.00", "£1,039.50", "£115.50"),
  r("Review with Root Canal Specialist", "£66.00", "N/A", "N/A"),
  r("Biodentine, from", "£288.50", "£259.65", "£28.85"),
  r("Dentures (Valplast), from", "£907.50", "£825.00", "£82.50"),
  r("Dentures (Acrylic) Full, from", "£847.00", "£762.30", "£84.70"),
  r("Dentures (Acrylic) Partial, from", "£689.50", "£620.55", "£68.95"),
  r("Dentures (Chrome) Full, from", "£1,476.20", "£1,328.58", "£147.62"),
  r("Dentures (Chrome) Partial, from", "£1,089.00", "£980.10", "£108.90"),
  r("Denture Relines", "£272.25", "£245.02", "£27.23"),
  r("Denture Addition", "£212.20", "£181.98", "£20.22"),
  r("Denture Repair", "£90.75", "£81.67", "£9.08"),
  r("Bridges (per unit), from", "£710.00", "£639.00", "£71.00"),
  r("Crown (White), from", "£710.00", "£639.00", "£71.00"),
  r("Onlay/Inlay, from", "£710.00", "£639.00", "£71.00"),
  r("Composite Edge Bonding, from", "£199.00", "N/A", "N/A"),
  r("Composite Bonding/Veneers, from", "£250.00", "N/A", "N/A"),
  r("Invisalign Go, from", "£2999.00", "N/A", "N/A"),
  r("Removable Retainers (Upper AND Lower), from", "£265.00", "N/A", "N/A"),
  r("Removable Retainers Double Set (2xUppers; 2xLowers), from", "£365.00", "N/A", "N/A"),
  r("Fixed Retainers (per arch), from", "£175.00", "N/A", "N/A"),
  r("Fixed Retainers (both arches), from", "£300.00", "N/A", "N/A"),
  r("Teeth Whitening (Trays and Gel Bundle)", "£399.00", "N/A", "N/A"),
  r("Teeth Whitening Trays ONLY, U&L", "£295.00", "N/A", "N/A"),
  r("Teeth Whitening 3ml Refill Syringe, from", "£30.00", "N/A", "N/A"),
  r("Teeth Whitening 1.2ml 4x pack, from", "Priced to order", "N/A", "N/A"),
  r("Sports Mouthguard, from", "£134.20", "N/A", "N/A"),
  r("Anti-Grinding/Cleanching Guard, from", "£126.00", "£113.40", "£12.60"),
];
