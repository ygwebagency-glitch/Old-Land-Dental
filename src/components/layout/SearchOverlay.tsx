import { useNavigate } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { search, searchGroups } from "@/data/searchIndex";
import { useSiteUI } from "./site-ui";
import { cn } from "@/lib/utils";
import { Highlight } from "@/components/ui-custom/Highlight";

const popular = [
  { title: "Prices", url: "/about-the-practice/prices" },
  { title: "Emergencies", url: "/emergencies" },
  { title: "Our Team", url: "/about-the-practice/our-team" },
  { title: "Registration", url: "/contact-us/registration" },
];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useSiteUI();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => search(q, 24), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  const go = (url: string) => {
    setSearchOpen(false);
    const [path, hash] = url.split("#");
    navigate({ to: path as "/", hash });
  };
  const seeAll = () => {
    setSearchOpen(false);
    navigate({ to: "/search", search: { q } });
  };

  const grouped = searchGroups
    .map((g) => ({ g, items: results.filter((r) => r.group === g) }))
    .filter((x) => x.items.length);
  const flat = grouped.flatMap((x) => x.items);

  return (
    <DialogPrimitive.Root open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-charcoal-deep/60 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-[60] mx-auto flex max-h-[100dvh] w-full max-w-3xl flex-col p-3 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-4 md:top-[8vh] md:max-h-[84vh] md:p-0"
        >
          <DialogPrimitive.Title className="sr-only">Search the website</DialogPrimitive.Title>
          <div className="flex min-h-0 flex-col overflow-hidden rounded-[26px] bg-popover shadow-lift">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                if (flat[active]) go(flat[active].url);
                else if (q.trim()) seeAll();
              }}
              className="flex items-center gap-3 border-b border-line px-5"
            >
              <Search className="size-5 shrink-0 text-teal-dark" aria-hidden />
              <label htmlFor="site-search" className="sr-only">
                Search
              </label>
              <input
                id="site-search"
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(flat.length - 1, a + 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(0, a - 1));
                  }
                }}
                placeholder="Search treatments, prices, team…"
                autoComplete="off"
                aria-controls="search-results"
                aria-activedescendant={flat[active] ? `sr-${active}` : undefined}
                className="h-16 w-full bg-transparent text-lg text-charcoal outline-none placeholder:text-ink-muted"
              />
              <DialogPrimitive.Close aria-label="Close search" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-charcoal hover:bg-grey-light">
                <X className="size-5" />
              </DialogPrimitive.Close>
            </form>

            <div id="search-results" role="listbox" className="min-h-0 overflow-y-auto overscroll-contain p-3" data-lenis-prevent>
              {!q.trim() ? (
                <div className="p-3">
                  <p className="eyebrow mb-3">Popular pages</p>
                  <ul className="flex flex-wrap gap-2">
                    {popular.map((p) => (
                      <li key={p.url}>
                        <button type="button" onClick={() => go(p.url)} className="min-h-11 rounded-full bg-teal-soft px-4 text-sm font-semibold text-charcoal hover:bg-sand">
                          {p.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : flat.length === 0 ? (
                <p className="p-6 text-center text-ink-muted">No results found for “{q}”.</p>
              ) : (
                grouped.map(({ g, items }) => (
                  <div key={g} className="mb-2">
                    <p className="eyebrow px-3 pt-3 pb-2">{g}</p>
                    <ul>
                      {items.map((r) => {
                        const idx = flat.indexOf(r);
                        return (
                          <li key={r.url + r.title} id={`sr-${idx}`} role="option" aria-selected={idx === active}>
                            <button
                              type="button"
                              onMouseEnter={() => setActive(idx)}
                              onClick={() => go(r.url)}
                              className={cn(
                                "flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors",
                                idx === active ? "bg-teal-soft" : "hover:bg-grey-light",
                              )}
                            >
                              <span className="min-w-0 flex-1">
                                <span className="block font-semibold text-charcoal">
                                  <Highlight text={r.title} query={q} />
                                </span>
                                <span className="mt-0.5 line-clamp-1 block text-sm text-ink-muted">
                                  <Highlight text={r.snippet} query={q} />
                                </span>
                              </span>
                              <ArrowRight className="mt-1 size-4 shrink-0 text-teal-dark" aria-hidden />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>
            {q.trim() ? (
              <div className="border-t border-line p-3">
                <button type="button" onClick={seeAll} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-charcoal font-semibold text-on-dark hover:bg-charcoal-deep">
                  See all results <ArrowRight className="size-4" />
                </button>
              </div>
            ) : null}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
