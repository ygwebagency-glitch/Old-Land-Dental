import { useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { sideNavGroups, type SideNavGroup } from "@/data/nav";
import { AppLink } from "@/components/ui-custom/AppLink";
import { cn } from "@/lib/utils";

/** Section navigation: sticky left column on desktop, scrollable pills on mobile. */
export function SideNav({ group }: { group: SideNavGroup }) {
  const items = sideNavGroups[group];
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pillsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = pillsRef.current?.querySelector<HTMLElement>("[aria-current=page]");
    if (el && pillsRef.current) {
      pillsRef.current.scrollLeft = el.offsetLeft - 20;
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile / tablet pills */}
      <nav aria-label="Section" className="-mx-5 mb-10 lg:hidden">
        <ul ref={pillsRef} className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1">
          {items.map((it) => {
            const active = pathname === it.to;
            return (
              <li key={it.to} className="shrink-0">
                <AppLink
                  to={it.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                    active ? "border-charcoal bg-charcoal text-on-dark" : "border-line bg-background text-charcoal hover:border-teal",
                  )}
                >
                  {it.label}
                </AppLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop column */}
      <nav aria-label="Section" className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-h)+32px)]">
          <ul className="relative border-l border-line">
            {items.map((it) => {
              const active = pathname === it.to;
              return (
                <li key={it.to} className="relative">
                  {active ? (
                    <motion.span
                      layoutId={`sidenav-bar-${group}`}
                      className="absolute top-0 -left-px h-full w-[3px] rounded-full bg-teal"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <AppLink
                    to={it.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center py-1.5 pl-5 text-[0.98rem] transition-colors",
                      active ? "font-bold text-charcoal" : "text-ink-muted hover:text-teal-dark",
                    )}
                  >
                    {it.label}
                  </AppLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
