import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownAZ, ArrowUpAZ, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { Prose } from "@/components/sections/CtaBand";
import { Btn } from "@/components/ui-custom/Btn";
import { Reveal } from "@/components/ui-custom/Reveal";
import { Highlight } from "@/components/ui-custom/Highlight";
import { feeIntro, fees } from "@/data/fees";
import { practice } from "@/data/practice";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about-the-practice/fee-comparison-table")({
  head: () =>
    seo({
      title: "Fee Comparison Table",
      description: "Compare regular private dental fees with discounted Practice Plan member fees at Oldland Dental Practice.",
      path: "/about-the-practice/fee-comparison-table",
      breadcrumbs: crumbsFor.about("Fee Comparison Table"),
    }),
  component: FeesPage,
});

function Cell({ v, kind }: { v: string; kind: "saving" | "plain" }) {
  if (!v) return <span className="text-ink-muted">—</span>;
  if (v === "N/A") return <span className="text-ink-muted/80">N/A</span>;
  if (kind === "saving") return <span className="rounded-full bg-teal-soft px-3 py-1 font-bold text-teal-dark">{v}</span>;
  return <span>{v}</span>;
}

function FeesPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"none" | "asc" | "desc">("none");
  const rows = useMemo(() => {
    const filtered = fees.filter((f) => f.item.toLowerCase().includes(q.trim().toLowerCase()));
    if (sort === "none") return filtered;
    return [...filtered].sort((a, b) => (sort === "asc" ? 1 : -1) * a.item.localeCompare(b.item));
  }, [q, sort]);

  return (
    <InnerPage hero="heroAbout" title="Fee Comparison Table" crumbs={crumbsFor.about("Fee Comparison Table")} group="about">
      <Prose paragraphs={feeIntro} />
      <Reveal className="mt-8">
        <Btn to={practice.links.practicePlan} variant="accent" size="lg" arrow>
          Join our Practice Plan
        </Btn>
      </Reveal>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-full border border-line bg-card px-4 focus-within:border-teal">
          <Search className="size-4 text-ink-muted" aria-hidden />
          <span className="sr-only">Filter treatments</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search treatments…"
            className="h-12 w-full bg-transparent text-base text-charcoal outline-none placeholder:text-ink-muted"
          />
        </label>
        <button
          type="button"
          onClick={() => setSort((s) => (s === "asc" ? "desc" : s === "desc" ? "none" : "asc"))}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-charcoal px-5 font-semibold text-charcoal hover:bg-charcoal hover:text-on-dark"
        >
          {sort === "desc" ? <ArrowUpAZ className="size-4" /> : <ArrowDownAZ className="size-4" />}
          {sort === "none" ? "Sort by name" : sort === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {rows.length} treatments shown
      </p>

      {/* Desktop table */}
      <div className="mt-6 hidden overflow-clip rounded-[24px] border border-line bg-card shadow-soft md:block">
        <table className="w-full text-left">
          <caption className="sr-only">Private fees compared to Practice Plan member fees</caption>
          <thead className="sticky top-[var(--header-h)] z-10 bg-charcoal text-on-dark">
            <tr>
              <th scope="col" className="px-6 py-4 text-sm font-bold tracking-wider uppercase">Treatment Item</th>
              <th scope="col" className="px-4 py-4 text-sm font-bold tracking-wider uppercase">Private Fees</th>
              <th scope="col" className="px-4 py-4 text-sm font-bold tracking-wider uppercase">Members Fee</th>
              <th scope="col" className="px-6 py-4 text-sm font-bold tracking-wider uppercase">Saving</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.item} className={cn("border-t border-line", i % 2 === 1 && "bg-sand/50")}>
                <th scope="row" className="px-6 py-3.5 font-semibold text-charcoal">
                  <Highlight text={r.item} query={q} />
                </th>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Cell v={r.privateFee} kind="plain" />
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Cell v={r.members} kind="plain" />
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap">
                  <Cell v={r.saving} kind="saving" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="mt-6 space-y-3 md:hidden">
        {rows.map((r) => (
          <li key={r.item} className="rounded-[20px] border border-line bg-card p-5">
            <p className="font-semibold text-charcoal">
              <Highlight text={r.item} query={q} />
            </p>
            <dl className="mt-3 space-y-2 text-[0.95rem]">
              {[
                ["Private Fees", r.privateFee, "plain"],
                ["Members Fee", r.members, "plain"],
                ["Saving", r.saving, "saving"],
              ].map(([k, v, kind]) => (
                <div key={k} className="flex items-center justify-between gap-4 border-t border-line pt-2">
                  <dt className="text-ink-muted">{k}</dt>
                  <dd>
                    <Cell v={v} kind={kind as "saving" | "plain"} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      {!rows.length ? <p className="mt-6 text-ink-muted">No treatments match “{q}”.</p> : null}
    </InnerPage>
  );
}
