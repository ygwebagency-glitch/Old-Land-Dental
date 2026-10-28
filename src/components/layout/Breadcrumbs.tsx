import { ChevronRight } from "lucide-react";
import { AppLink } from "@/components/ui-custom/AppLink";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path?: string };

export function Breadcrumbs({ crumbs, light }: { crumbs: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm font-semibold", light ? "text-on-dark-muted" : "text-ink-muted")}>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.name + i} className="flex items-center gap-1.5">
              {last || !c.path ? (
                <span aria-current={last ? "page" : undefined} className={cn(last && (light ? "text-on-dark" : "text-charcoal"))}>
                  {c.name}
                </span>
              ) : (
                <AppLink to={c.path} className={cn("inline-flex min-h-8 items-center transition-colors", light ? "hover:text-on-dark" : "hover:text-teal-dark")}>
                  {c.name}
                </AppLink>
              )}
              {!last ? <ChevronRight aria-hidden className="size-3.5 opacity-60" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
