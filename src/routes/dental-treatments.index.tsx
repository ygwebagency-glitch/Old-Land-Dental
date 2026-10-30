import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { Prose } from "@/components/sections/CtaBand";
import { AppLink } from "@/components/ui-custom/AppLink";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui-custom/Reveal";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { treatments } from "@/data/treatments";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/dental-treatments/")({
  head: () =>
    seo({
      title: "Dental Treatments",
      description:
        "NHS and private dental treatments at Oldland Dental Practice, Bristol: tooth whitening, crowns & bridges, white fillings, preventative dentistry, root canal and more.",
      path: "/dental-treatments",
      breadcrumbs: crumbsFor.treatments(),
    }),
  component: TreatmentsPage,
});

const paragraphs = [
  "NHS and private treatment are both available. NHS dental treatment includes all treatment necessary to secure and maintain oral health. We also provide a full range of private treatments for patients who choose to have treatment that is not available under the NHS, for example cosmetic treatment such as tooth whitening.",
  "We may suggest referral to a specialist, if this is appropriate – for example orthodontic treatment, complex root fillings and implants. Some specialist treatment is only available privately. Children are always welcome, however young they are. We aim to prevent dental disease rather than treat it at a later date.",
  "It is our practice philosophy to promote dental health at all times. Therefore we recommend regular check ups. It is advisable for each patient to see one dentist on a continuing basis, especially once a course of treatment has commenced. However, if this is not possible for any reason, suitable alternative arrangements will be made for you to see someone else within the practice. Please ask our reception staff.",
  "To help you find out more about specific procedures, we've listed some of the most common treatments. For more detailed information about any of these, please contact the practice direct, where a member of the team will be happy to advise you.",
];

function TreatmentsPage() {
  return (
    <InnerPage hero="heroTreatments" title="Dental Treatments" crumbs={crumbsFor.treatments()} group="treatments">
      <Prose paragraphs={paragraphs} />

      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {treatments.map((t) => (
          <RevealItem key={t.slug}>
            <AppLink
              to={`/dental-treatments/${t.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-card shadow-soft transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <SmartImage imageKey={t.image} aspect="4/3" imgClassName="transition-transform duration-700 group-hover:scale-[1.06]" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-h3">{t.title}</h2>
                <p className="mt-3 line-clamp-4 flex-1 text-[0.98rem] text-ink-muted">{t.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-teal-dark">
                  Find out more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </AppLink>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal className="rounded-[24px] bg-teal-soft p-8">
          <p className="eyebrow">NHS</p>
          <p className="mt-3 text-lg text-charcoal-deep">
            NHS dental treatment includes all treatment necessary to secure and maintain oral health.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="rounded-[24px] bg-sand p-8">
          <p className="eyebrow">Private</p>
          <p className="mt-3 text-lg text-charcoal-deep">
            We also provide a full range of private treatments for patients who choose to have treatment that is not available
            under the NHS, for example cosmetic treatment such as tooth whitening.
          </p>
        </Reveal>
      </div>
    </InnerPage>
  );
}
