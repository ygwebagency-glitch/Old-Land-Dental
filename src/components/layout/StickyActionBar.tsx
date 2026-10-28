import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { practice, external } from "@/data/practice";
import { useScrollState } from "@/hooks/use-scroll-y";
import { cn } from "@/lib/utils";
import { useSiteUI } from "./site-ui";

export function StickyActionBar() {
  const { y } = useScrollState();
  const { drawerOpen } = useSiteUI();
  const show = y > 200 && !drawerOpen;
  const cls = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-bold";
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 pb-safe backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-premium)] md:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!show}
    >
      <div className="flex divide-x divide-line">
        <a href={practice.phone.href} className={cn(cls, "text-charcoal")} tabIndex={show ? 0 : -1}>
          <Phone className="size-5" /> Call
        </a>
        <a href={practice.links.booking} {...external} className={cn(cls, "bg-teal-dark text-on-dark")} tabIndex={show ? 0 : -1}>
          <CalendarCheck className="size-5" /> Book
        </a>
        <a href={practice.links.maps} {...external} className={cn(cls, "text-charcoal")} tabIndex={show ? 0 : -1}>
          <MapPin className="size-5" /> Directions
        </a>
      </div>
    </div>
  );
}
