import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { practice } from "@/data/practice";
import { Logo } from "@/components/ui-custom/LogoMark";
import { AppLink } from "@/components/ui-custom/AppLink";
import { useScrollState } from "@/hooks/use-scroll-y";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./DesktopNav";
import { UtilityBar } from "./UtilityBar";
import { useSiteUI } from "./site-ui";

export function Header() {
  const { y, dir } = useScrollState();
  const { menuOpen, drawerOpen, setDrawerOpen } = useSiteUI();
  const scrolled = y > 40;
  const hidden = scrolled && y > 240 && dir === "down" && !menuOpen && !drawerOpen;
  const light = !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-premium)]",
        scrolled ? "bg-background/92 shadow-soft backdrop-blur-xl" : menuOpen ? "bg-background" : "bg-transparent",
        hidden ? "-translate-y-full" : scrolled ? "lg:-translate-y-10" : "translate-y-0",
      )}
    >
      <UtilityBar light={light} />
      <div
        className={cn(
          "container-site flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-premium)]",
          scrolled ? "h-[68px]" : "h-[76px] lg:h-[88px]",
        )}
      >
        <Link to="/" aria-label="Oldland Dental — home" className="flex shrink-0 items-center">
          <Logo light={light} className={cn(scrolled && "lg:h-9")} />
        </Link>

        <div className="flex items-center gap-3">
          <DesktopNav light={light} />
          <div className="hidden items-center gap-2 xl:flex">
            <AppLink
              to="/invisalign"
              className={cn(
                "inline-flex min-h-11 items-center rounded-full px-5 text-[0.9rem] font-bold transition-colors duration-300",
                light ? "bg-on-dark text-charcoal-deep hover:bg-teal-soft" : "bg-charcoal text-on-dark hover:bg-charcoal-deep",
              )}
            >
              Invisalign
            </AppLink>
            <AppLink
              to={practice.links.booking}
              className="inline-flex min-h-11 items-center rounded-full bg-teal-dark px-5 text-[0.9rem] font-bold text-on-dark shadow-soft transition-colors duration-300 hover:bg-charcoal"
            >
              Book Online
            </AppLink>
          </div>
          <AppLink
            to={practice.links.booking}
            className="hidden min-h-11 items-center rounded-full bg-teal-dark px-4 text-sm font-bold text-on-dark sm:inline-flex xl:hidden"
          >
            Book Online
          </AppLink>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full border transition-colors xl:hidden",
              light ? "border-on-dark/40 text-on-dark" : "border-line text-charcoal",
            )}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
