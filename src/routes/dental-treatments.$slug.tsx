import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { CtaBand, Prose } from "@/components/sections/CtaBand";
import { AppLink } from "@/components/ui-custom/AppLink";
import { BeforeAfter } from "@/components/ui-custom/BeforeAfter";
import { PdfIcon } from "@/components/ui-custom/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { SplitText } from "@/components/ui-custom/SplitText";
import { patientInfoPdfs } from "@/data/nav";
import { getTreatment, treatments } from "@/data/treatments";
import { EASE } from "@/lib/motion";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/dental-treatments/$slug")({
  loader: ({ params }) => {
    const t = getTreatment(params.slug);
    if (!t) throw notFound();
    return { slug: t.slug };
  },
  head: ({ params }) => {
    const t = getTreatment(params.slug);
    if (!t) return { meta: [{ title: "Treatment not found | Oldland Dental Practice, Bristol" }, { name: "robots", content: "noindex" }] };
    return seo({
      title: t.title,
      description: t.short.length > 158 ? t.short.slice(0, 155).trimEnd() + "…" : t.short,
      path: `/dental-treatments/${t.slug}`,
      breadcrumbs: crumbsFor.treatments(t.title),
    });
  },
  component: TreatmentPage,
});

function TreatmentPage() {
  const { slug } = Route.useLoaderData();
  const t = getTreatment(slug)!;
  const i = treatments.findIndex((x) => x.slug === slug);
  const prev = treatments[(i - 1 + treatments.length) % treatments.length]!;
  const next = treatments[(i + 1) % treatments.length]!;
  const related = treatments.filter((x) => x.slug !== slug);
  const whiteningPdfs = patientInfoPdfs.filter((p) => p.label === "Tooth Bleaching" || p.label === "Usage Instructions for Tooth Whitening Gel");

  return (
    <InnerPage hero="heroTreatments" title={t.title} crumbs={crumbsFor.treatments(t.title)} group="treatments">
      <Prose paragraphs={t.body} />

      {t.list ? (
        <div className="mt-10">
          <Reveal>
            <p className="text-lg font-semibold text-charcoal">{t.list.intro}</p>
          </Reveal>
          <RevealGroup as="ul" className="mt-5 grid gap-4 md:grid-cols-3">
            {t.list.items.map((item) => (
              <RevealItem as="li" key={item} className="rounded-[22px] bg-teal-soft p-6">
                <svg viewBox="0 0 24 24" className="mb-4 size-9" aria-hidden>
                  <circle cx="12" cy="12" r="11" className="fill-teal-dark" />
                  <motion.path
                    d="M7 12.5l3.2 3.2L17 9"
                    fill="none"
                    className="stroke-on-dark"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                  />
                </svg>
                <p className="font-semibold text-charcoal-deep">{item}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      ) : null}

      {t.slug === "cosmetic-dentistry" ? (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Reveal>
            <BeforeAfter before="ba.1.before" after="ba.1.after" label="Cosmetic result 1" />
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfter before="ba.2.before" after="ba.2.after" label="Cosmetic result 2" />
          </Reveal>
        </div>
      ) : null}

      {t.slug === "tooth-whitening" ? (
        <Reveal className="mt-12">
          <p className="eyebrow mb-4">Patient information</p>
          <div className="flex flex-wrap gap-3">
            {whiteningPdfs.map((p) => (
              <AppLink
                key={p.to}
                to={p.to}
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-line bg-card px-5 font-semibold text-charcoal shadow-soft transition-colors hover:border-teal hover:text-teal-dark"
              >
                <PdfIcon className="size-5 text-teal-dark" /> {p.label}
              </AppLink>
            ))}
          </div>
        </Reveal>
      ) : null}

      {t.hasPrices ? (
        <Reveal className="mt-8">
          <AppLink to="/about-the-practice/prices" className="inline-flex min-h-11 items-center gap-2 font-bold text-teal-dark hover:text-charcoal">
            <Tag className="size-4" /> View our prices
          </AppLink>
        </Reveal>
      ) : null}

      <CtaBand />

      <div className="mt-14">
        <SplitText as="h2" text="Related treatments" className="type-h3" />
        <RevealGroup as="ul" className="mt-5 flex flex-wrap gap-2">
          {related.map((r) => (
            <RevealItem as="li" key={r.slug}>
              <AppLink
                to={`/dental-treatments/${r.slug}`}
                className="inline-flex min-h-11 items-center rounded-full bg-sand px-5 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-on-dark"
              >
                {r.title}
              </AppLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <nav aria-label="Previous and next treatment" className="mt-12 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <AppLink to={`/dental-treatments/${prev.slug}`} className="group flex min-h-16 items-center gap-4 rounded-[20px] p-4 hover:bg-grey-light">
          <ArrowLeft className="size-5 text-teal-dark transition-transform group-hover:-translate-x-1" />
          <span>
            <span className="block text-xs font-bold tracking-widest text-ink-muted uppercase">Previous</span>
            <span className="font-display text-xl text-charcoal">{prev.title}</span>
          </span>
        </AppLink>
        <AppLink to={`/dental-treatments/${next.slug}`} className="group flex min-h-16 items-center justify-end gap-4 rounded-[20px] p-4 text-right hover:bg-grey-light">
          <span>
            <span className="block text-xs font-bold tracking-widest text-ink-muted uppercase">Next</span>
            <span className="font-display text-xl text-charcoal">{next.title}</span>
          </span>
          <ArrowRight className="size-5 text-teal-dark transition-transform group-hover:translate-x-1" />
        </AppLink>
      </nav>
    </InnerPage>
  );
}
