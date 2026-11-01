import { Mail, MapPin, Phone, Search } from "lucide-react";
import { practice, external } from "@/data/practice";
import { InstagramIcon } from "@/components/ui-custom/icons";
import { TodayHoursBadge } from "@/components/ui-custom/TodayHoursBadge";
import { useSiteUI } from "./site-ui";
import { cn } from "@/lib/utils";

const linkCls =
  "inline-flex min-h-9 items-center gap-1.5 rounded-full px-2 text-[0.82rem] font-semibold transition-colors duration-300";

export function UtilityBar({ light }: { light: boolean }) {
  const { setSearchOpen } = useSiteUI();
  const tone = light ? "text-on-dark/90 hover:text-on-dark" : "text-charcoal hover:text-teal-dark";
  return (
    <div className={cn("hidden h-10 border-b lg:block", light ? "border-on-dark/15" : "border-line")}>
      <div className="container-site flex h-full items-center justify-between">
        <a href={practice.links.instagram} {...external} className={cn(linkCls, tone)}>
          <InstagramIcon className="size-4" /> Instagram
        </a>
        <div className="flex items-center gap-1">
          <TodayHoursBadge tone={light ? "glass" : "light"} className="mr-2" />
          <a href={practice.email.href} className={cn(linkCls, tone)}>
            <Mail className="size-4" /> Email us
          </a>
          <a href={practice.links.maps} {...external} className={cn(linkCls, tone)}>
            <MapPin className="size-4" /> Find us
          </a>
          <a href={practice.phone.href} className={cn(linkCls, tone)}>
            <Phone className="size-4" /> {practice.phone.display}
          </a>
          <button type="button" onClick={() => setSearchOpen(true)} className={cn(linkCls, tone)}>
            <Search className="size-4" /> Search
            <kbd className={cn("ml-1 hidden rounded border px-1 text-[0.65rem] xl:inline", light ? "border-on-dark/30" : "border-line")}>⌘K</kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
