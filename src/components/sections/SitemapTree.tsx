import { aboutGroup, contactGroup, patientInfoPdfs, treatmentsGroup } from "@/data/nav";
import { practice } from "@/data/practice";
import { AppLink } from "@/components/ui-custom/AppLink";
import { PdfIcon } from "@/components/ui-custom/icons";
import { RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";

type Node = { label: string; to: string; pdf?: boolean; children?: Node[] };

const tree: Node[] = [
  { label: "Home", to: "/" },
  { label: "About The Practice", to: "/about-the-practice", children: aboutGroup.slice(1) },
  { label: "Dental Treatments", to: "/dental-treatments", children: treatmentsGroup.slice(1) },
  { label: "Contact Us", to: "/contact-us", children: contactGroup.slice(1) },
  { label: "Emergencies", to: "/emergencies" },
  { label: "Invisalign", to: "/invisalign" },
  { label: "Facial Aesthetics", to: "/facial-aesthetics" },
  { label: "Our Smile Gallery", to: "/our-smile-gallery" },
  { label: "Patient Information", to: "", children: patientInfoPdfs },
  { label: "Privacy Policy", to: practice.links.privacyPdf, pdf: true },
  { label: "Search", to: "/search" },
];

const linkCls = "inline-flex min-h-10 items-center gap-2 text-ink hover:text-teal-dark";

export function SitemapTree() {
  return (
    <RevealGroup className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {tree.map((n) => (
        <RevealItem key={n.label}>
          <div className="h-full rounded-[24px] border border-line bg-card p-6">
            {n.to ? (
              <AppLink to={n.to} className="inline-flex min-h-11 items-center gap-2 font-display text-2xl text-charcoal hover:text-teal-dark">
                {n.pdf ? <PdfIcon className="size-5 text-teal-dark" /> : null}
                {n.label}
              </AppLink>
            ) : (
              <p className="font-display text-2xl text-charcoal">{n.label}</p>
            )}
            {n.children ? (
              <ul className="mt-3 border-l border-line pl-4">
                {n.children.map((c) => (
                  <li key={c.to}>
                    <AppLink to={c.to} className={linkCls}>
                      {c.pdf ? <PdfIcon className="size-4 shrink-0 text-teal-dark" /> : null}
                      {c.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
