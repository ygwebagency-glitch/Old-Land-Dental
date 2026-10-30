import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { useMemo } from "react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { SearchForm } from "@/components/sections/SearchForm";
import { AppLink } from "@/components/ui-custom/AppLink";
import { Highlight } from "@/components/ui-custom/Highlight";
import { search, searchGroups } from "@/data/searchIndex";
import { practice } from "@/data/practice";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional().catch("") }),
  head: () => ({
    ...seo({
      title: "Search",
      description: "Search the Oldland Dental Practice website for treatments, prices, team members and information.",
      path: "/search",
      noindex: true,
    }),
  }),
  component: SearchPage,
});

const suggestions = [
  { title: "Prices", url: "/about-the-practice/prices" },
  { title: "Emergencies", url: "/emergencies" },
  { title: "Book Online", url: practice.links.booking },
];

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const results = useMemo(() => search(q), [q]);
  return (
    <InnerPage hero="heroAbout" title="Search" crumbs={crumbsFor.single("Search")} shared={false}>
      <SearchForm key={q} initial={q} autoFocus={!q} />
      <div className="mt-10" aria-live="polite">
        {q.trim() ? (
          results.length ? (
            <>
              <p className="mb-8 text-ink-muted">
                {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
              </p>
              {searchGroups.map((g) => {
                const items = results.filter((r) => r.group === g);
                if (!items.length) return null;
                return (
                  <section key={g} className="mb-10" aria-label={g}>
                    <h2 className="eyebrow mb-3">{g}</h2>
                    <ul className="divide-y divide-line rounded-[24px] border border-line bg-card">
                      {items.map((r) => (
                        <li key={r.url + r.title}>
                          <AppLink to={r.url} className="group flex items-start gap-4 p-5 hover:bg-teal-soft/50">
                            <span className="flex-1">
                              <span className="block font-display text-xl text-charcoal">
                                <Highlight text={r.title} query={q} />
                              </span>
                              <span className="mt-1 block text-[0.95rem] text-ink-muted">
                                <Highlight text={r.snippet} query={q} />
                              </span>
                            </span>
                            <ArrowRight className="mt-1 size-5 text-teal-dark transition-transform group-hover:translate-x-1" />
                          </AppLink>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </>
          ) : (
            <div className="rounded-[24px] bg-sand p-8">
              <p className="font-display text-3xl text-charcoal">No results found</p>
              <p className="mt-2 text-ink-muted">Try one of these popular pages:</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <li key={s.title}>
                    <AppLink to={s.url} className="inline-flex min-h-11 items-center rounded-full bg-card px-5 font-semibold text-charcoal hover:bg-charcoal hover:text-on-dark">
                      {s.title}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          )
        ) : (
          <p className="text-ink-muted">Type a word above — for example “whitening”, “hygienist” or “emergency”.</p>
        )}
      </div>
    </InnerPage>
  );
}
