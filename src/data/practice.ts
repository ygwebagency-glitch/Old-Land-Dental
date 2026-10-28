// Single source of truth for practice facts. Every phone, address, link and
// offer shown on the site comes from here.

export const practice = {
  name: "Oldland Dental Practice",
  wordmark: "Oldland Dental",
  address: {
    lines: ["Oldland Dental Practice", "206 High Street", "Oldland Common", "Bristol", "BS30 9QW"],
    street: "206 High Street",
    locality: "Oldland Common",
    city: "Bristol",
    postcode: "BS30 9QW",
    oneLine: "206 High Street, Oldland Common, Bristol, BS30 9QW",
  },
  phone: {
    display: "0117 9324455",
    href: "tel:01179324455",
    e164: "+441179324455",
  },
  outOfHours: { display: "111", href: "tel:111" },
  email: {
    display: "info@oldlanddental.co.uk",
    href: "mailto:info@oldlanddental.co.uk",
  },
  geo: { lat: 51.43978, lng: -2.47337 },
  established: 2003,
  links: {
    instagram: "https://instagram.com/oldlanddental",
    instagramHandle: "@oldlanddental",
    maps: "https://goo.gl/maps/ENNfS62JPC5hFF5X7",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.0004660467494!2d-2.4733703489724865!3d51.43978532336615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487185a277f4156f%3A0xd7d839eb4a0ed62!2sOldland%20Dental%20Practice!5e0!3m2!1sen!2suk!4v1625746798005!5m2!1sen!2suk",
    booking: "https://booking.uk.hsone.app/soe/new?pid=UKOLF01",
    practicePlan: "https://signup.practiceplan.co.uk/Patient/Home/CUHETP",
    practicePlanPolicy: "https://www.oldlanddental.co.uk/documents/practice-plan-policy-logo.pdf",
    cqc: "http://www.cqc.org.uk/location/1-1402485423",
    nhs: "https://www.nhs.uk/",
    gdc: "https://www.gdc-uk.org/",
    complaintsPdf: "https://www.oldlanddental.co.uk/documents/complaints23.pdf",
    privacyPdf: "https://www.oldlanddental.co.uk/documents/privacy-policy.pdf",
  },
  newPatientOffer: "We are accepting new patients – now only £70 including x-rays",
  newPatientOfferAlt: "We are accepting new patients - now only £70 including x-rays",
  emergencyFooterText:
    "Registered patients of the practice may access an emergency appointment by phoning the practice. For Out Of Hours Treatment: For NHS patients including children : call 111 For Practice Plan and Private patients: The practice is part of the Keynsham and District Emergency Rota Team of dentists. Please telephone the practice on 0117 9324455 and details of the on-call dentist will be available on the answer machine.",
  trustStrip: [
    "NHS & Private care",
    "CQC registered",
    "Independent practice",
    "Children always welcome",
    "Wheelchair accessible",
    "On-site parking",
    "New patients welcome",
  ],
} as const;

export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
