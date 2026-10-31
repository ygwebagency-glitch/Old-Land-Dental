import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { practice, external } from "@/data/practice";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about-the-practice/links")({
  head: () =>
    seo({
      title: "Useful Links",
      description: "Our most recent CQC report plus useful sites: NHS Choices and the General Dental Council.",
      path: "/about-the-practice/links",
      breadcrumbs: crumbsFor.about("Links"),
    }),
  component: LinksPage,
});

const others = [
  {
    name: "NHS Choices",
    url: practice.links.nhs,
    text: "Information from the National Health Service on conditions, treatments, local services & healthy living.",
  },
  { name: "GDC", url: practice.links.gdc, text: "General Dental Council" },
];

function LinksPage() {
  return (
    <InnerPage hero="heroAbout" title="Useful Links" crumbs={crumbsFor.about("Links")} group="about">
      <Reveal>
        <a
          href={practice.links.cqc}
          {...external}
          className="group flex flex-col gap-6 rounded-[24px] bg-charcoal p-8 text-on-dark shadow-lift transition-transform duration-500 hover:-translate-y-1 sm:flex-row sm:items-center md:p-10"
        >
          <span className="flex size-20 shrink-0 items-center justify-center rounded-[20px] bg-on-dark text-charcoal">
            <ShieldCheck className="size-10" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-3xl text-on-dark">CQC – Care Quality Commission</span>
            <span className="mt-2 block text-on-dark-muted">Please click here to view a copy of our most recent CQC report.</span>
          </span>
          <ExternalLink className="size-6 text-teal transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
      </Reveal>
      <h2 className="type-h3 mt-14 mb-6">Other Useful Sites</h2>
      <RevealGroup className="grid gap-5 md:grid-cols-2">
        {others.map((o) => (
          <RevealItem key={o.name}>
            <a
              href={o.url}
              {...external}
              className="group flex h-full flex-col rounded-[24px] border border-line bg-card p-7 shadow-soft transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="flex items-center justify-between font-display text-2xl text-charcoal">
                {o.name}
                <ExternalLink className="size-5 text-teal-dark" aria-hidden />
              </span>
              <span className="mt-3 text-ink-muted">{o.text}</span>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </InnerPage>
  );
}
