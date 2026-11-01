import { createFileRoute } from "@tanstack/react-router";
import { FileText, Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useSectionSpy } from "@/hooks/use-section-spy";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { Btn } from "@/components/ui-custom/Btn";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { Highlight } from "@/components/ui-custom/Highlight";
import { practice } from "@/data/practice";
import { cancellationPolicy, practicePlan, priceCategories, pricesConsultNote, pricesTitle, type PriceRow } from "@/data/prices";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about-the-practice/prices")({
  head: () =>
    seo({
      title: pricesTitle,
      description:
        "Private dental prices at Oldland Dental Practice, Bristol: examinations, hygiene, fillings, root canal, crowns, cosmetic, Invisalign Go, dentures and Practice Plan.",
      path: "/about-the-practice/prices",
      breadcrumbs: crumbsFor.about("Prices"),
    }),
  component: PricesPage,
});

const tabs = [{ id: "practice-plan", label: "Practice Plan" }, ...priceCategories.map((c) => ({ id: c.id, label: c.label }))];

function Row({ row, q }: { row: PriceRow; q: string }) {
  const from = row.price.startsWith("From");
  const value = from ? row.price.replace(/^From\s*/, "") : row.price;
  return (
    <li className="py-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
        <span className="font-semibold text-charcoal sm:max-w-[60%]">
          <Highlight text={row.name} query={q} />
        </span>
        <span aria-hidden className="dotted-leader hidden sm:block" />
        <span className="flex items-center gap-2 font-display text-xl whitespace-nowrap text-charcoal sm:text-2xl">
          {from ? <span className="rounded-full bg-teal-soft px-2 py-0.5 font-sans text-[0.68rem] font-bold tracking-wider text-teal-dark uppercase">From</span> : null}
          {value}
        </span>
      </div>
      {row.note ? <p className="mt-1 text-sm text-ink-muted">{row.note}</p> : null}
    </li>
  );
}

function PricesPage() {
  const [q, setQ] = useState("");
  const ids = useMemo(() => tabs.map((t) => t.id), []);
  const query = q.trim().toLowerCase();
  const barRef = useRef<HTMLDivElement>(null);
  const { active, linkProps } = useSectionSpy(ids, barRef, query);

  const filtered = priceCategories
    .map((c) => ({
      ...c,
      groups: c.groups
        .map((g) => ({
          ...g,
          rows: g.rows.filter((r) => !query || `${c.title} ${g.subheading ?? ""} ${r.name} ${r.note ?? ""}`.toLowerCase().includes(query)),
        }))
        .filter((g) => g.rows.length),
    }))
    .filter((c) => c.groups.length);

  const showPlan = !query || "practice plan level".includes(query) || practicePlan.levels.some((l) => l.name.toLowerCase().includes(query));

  return (
    <InnerPage hero="heroAbout" title={pricesTitle} crumbs={crumbsFor.about("Prices")} group="about">
      <Reveal>
        <p className="font-display text-2xl text-charcoal italic">{pricesConsultNote}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <div role="note" className="mt-8 rounded-[24px] border-l-4 border-charcoal bg-sand p-6 text-[1rem] leading-relaxed text-charcoal-deep md:p-8">
          {cancellationPolicy}
        </div>
      </Reveal>

      {/* Sticky tabs + filter */}
      <div ref={barRef} className="sticky top-[calc(var(--header-h)+8px)] z-20 mt-12 -mx-2 space-y-2 rounded-[22px] border border-line bg-background/92 p-2 shadow-soft backdrop-blur-md">
        <nav aria-label="Price categories">
          <ul className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {tabs.map((t) => (
              <li key={t.id} className="shrink-0">
                <a
                  {...linkProps(t.id)}
                  className={cn(
                    "inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-semibold whitespace-nowrap transition-colors",
                    active === t.id ? "bg-charcoal text-on-dark" : "text-charcoal hover:bg-teal-soft",
                  )}
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <label className="flex items-center gap-2 rounded-full bg-grey-light px-4">
          <Search className="size-4 text-ink-muted" aria-hidden />
          <span className="sr-only">Search treatments</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search treatments…"
            className="h-11 w-full bg-transparent text-base text-charcoal outline-none placeholder:text-ink-muted"
          />
        </label>
      </div>

      <div className="mt-10 space-y-14">
        {showPlan ? (
          <section id="practice-plan" className="scroll-mt-48" aria-labelledby="pp-h">
            <h2 id="pp-h" className="type-h3">Practice Plan</h2>
            <p className="mt-2 text-ink-muted italic">{practicePlan.note}</p>
            <RevealGroup className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {practicePlan.levels.map((l) => (
                <RevealItem key={l.name} className="rounded-[20px] bg-teal-soft p-5 text-center">
                  <p className="text-xs font-bold tracking-[0.16em] text-teal-dark">{l.name}</p>
                  <p className="mt-2 font-display text-3xl text-charcoal">{l.price}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-6 max-w-[68ch] text-ink">
              Our Practice Membership focuses on prevention and helping you maintain optimum oral health of your teeth and gums
              by the means of a comprehensive care package, please click here to see the packages we offer &amp; the additional
              benefits included. To view our Practice Plan Policy click here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn to={practice.links.practicePlan} variant="accent" arrow>
                View Practice Plan packages
              </Btn>
              <Btn to={practice.links.practicePlanPolicy} variant="ghost" icon={<FileText className="size-4" />}>
                Practice Plan Policy
              </Btn>
            </div>
          </section>
        ) : null}

        {filtered.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-48" aria-labelledby={`${c.id}-h`}>
            <Reveal>
              <h2 id={`${c.id}-h`} className="type-h3">
                {c.title}
              </h2>
              {c.note ? <p className="mt-2 text-ink-muted italic">{c.note}</p> : null}
              <div className="mt-4 rounded-[24px] border border-line bg-card px-5 md:px-7">
                {c.groups.map((g, gi) => (
                  <div key={gi} className={cn(gi > 0 && "border-t border-line")}>
                    {g.subheading ? <p className="eyebrow pt-5">{g.subheading}</p> : null}
                    <ul className="divide-y divide-line">
                      {g.rows.map((r, ri) => (
                        <Row key={ri} row={r} q={q} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        ))}
        {!filtered.length && !showPlan ? <p className="text-ink-muted">No treatments match “{q}”.</p> : null}
      </div>
    </InnerPage>
  );
}
