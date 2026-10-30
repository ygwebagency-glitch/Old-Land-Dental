import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { mainNav, type NavItem } from "@/data/nav";
import { treatments } from "@/data/treatments";
import { AppLink } from "@/components/ui-custom/AppLink";
import { PdfIcon } from "@/components/ui-custom/icons";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSiteUI } from "./site-ui";

const isActive = (pathname: string, to?: string) =>
  !!to && (to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/"));

export function DesktopNav({ light }: { light: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState<string | null>(null);
  const { setMenuOpen } = useSiteUI();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => setMenuOpen(open !== null), [open, setMenuOpen]);
  useEffect(() => setOpen(null), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <nav ref={navRef} aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        {mainNav.map((item) => (
          <li key={item.label} className="relative">
            {item.children ? (
              <Dropdown
                item={item}
                light={light}
                active={isActive(pathname, item.to)}
                open={open === item.label}
                setOpen={(v) => setOpen(v ? item.label : null)}
                pathname={pathname}
              />
            ) : (
              <AppLink to={item.to!} className={navLinkCls(light, isActive(pathname, item.to))}>
                <NavLabel text={item.label} active={isActive(pathname, item.to)} />
              </AppLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

const navLinkCls = (light: boolean, active: boolean) =>
  cn(
    "group/nav relative inline-flex min-h-11 items-center px-2.5 text-[0.92rem] font-semibold transition-colors duration-300",
    light ? "text-on-dark/90 hover:text-on-dark" : "text-charcoal hover:text-teal-dark",
    active && (light ? "text-on-dark" : "text-teal-dark"),
  );

function NavLabel({ text, active }: { text: string; active: boolean }) {
  return (
    <span className="relative">
      {text}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-teal transition-transform duration-500 ease-[var(--ease-premium)]",
          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
        )}
      />
    </span>
  );
}

function Dropdown({
  item,
  light,
  active,
  open,
  setOpen,
  pathname,
}: {
  item: NavItem;
  light: boolean;
  active: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  pathname: string;
}) {
  const id = useId();
  const timer = useRef<number | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const schedule = (v: boolean) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(v), 120);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const focusItem = useCallback((index: number | "first" | "last") => {
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? []);
    if (!links.length) return;
    const i = index === "first" ? 0 : index === "last" ? links.length - 1 : (index + links.length) % links.length;
    links[i]?.focus();
  }, []);

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => requestAnimationFrame(() => focusItem("first")));
    } else if (e.key === "Escape") setOpen(false);
  };

  const onPanelKey = (e: React.KeyboardEvent) => {
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? []);
    const current = links.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(current + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem("first");
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem("last");
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Tab" && !panelRef.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  const chevron = (
    <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
  );

  return (
    <div
      onPointerEnter={(e) => e.pointerType === "mouse" && schedule(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && schedule(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      {item.to ? (
        <span className="flex items-center">
          <AppLink to={item.to} activeExact={false} className={cn(navLinkCls(light, active), "pr-0.5")}>
            <NavLabel text={item.label} active={active} />
          </AppLink>
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-haspopup="true"
            aria-controls={id}
            aria-label={`${item.label} menu`}
            onClick={() => setOpen(!open)}
            onKeyDown={onTriggerKey}
            className={cn(navLinkCls(light, false), "min-w-7 justify-center px-1")}
          >
            {chevron}
          </button>
        </span>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={id}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(!open);
              requestAnimationFrame(() => requestAnimationFrame(() => focusItem("first")));
            } else onTriggerKey(e);
          }}
          className={cn(navLinkCls(light, false), "gap-1")}
        >
          <NavLabel text={item.label} active={false} />
          {chevron}
        </button>
      )}

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id={id}
            onKeyDown={onPanelKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: EASE }}
            className={cn(
              "absolute top-full z-50 pt-3",
              item.mega ? "left-1/2 -translate-x-1/2" : item.label === "Patient Information" ? "right-0" : "left-0",
            )}
          >
            {item.mega ? (
              <MegaPanel pathname={pathname} />
            ) : (
              <ul
                className={cn(
                  "rounded-[22px] border border-line bg-popover p-2 shadow-lift",
                  item.label === "Patient Information" ? "w-[22rem]" : "w-64",
                )}
              >
                {item.children!.map((c) => (
                  <li key={c.to}>
                    <AppLink
                      to={c.to}
                      data-menu-item
                      className={cn(
                        "flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2 text-[0.92rem] text-charcoal transition-colors hover:bg-teal-soft hover:text-charcoal-deep focus-visible:bg-teal-soft",
                        pathname === c.to && "bg-teal-soft font-bold",
                      )}
                    >
                      {c.pdf ? <PdfIcon className="size-5 shrink-0 text-teal-dark" /> : null}
                      <span className="flex flex-col">
                        <span>{c.label}</span>
                        {c.description ? <span className="text-xs text-ink-muted">{c.description}</span> : null}
                      </span>
                    </AppLink>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MegaPanel({ pathname }: { pathname: string }) {
  const [hover, setHover] = useState(0);
  const t = treatments[hover]!;
  return (
    <div className="grid w-[44rem] grid-cols-[1fr_1.05fr] gap-3 rounded-[26px] border border-line bg-popover p-3 shadow-lift">
      <ul className="py-1">
        {treatments.map((tr, i) => {
          const to = `/dental-treatments/${tr.slug}`;
          return (
            <li key={tr.slug}>
              <AppLink
                to={to}
                data-menu-item
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                className={cn(
                  "group/m flex min-h-11 items-center justify-between rounded-xl px-4 py-2 text-[0.95rem] text-charcoal transition-colors hover:bg-teal-soft focus-visible:bg-teal-soft",
                  (hover === i || pathname === to) && "bg-teal-soft",
                  pathname === to && "font-bold",
                )}
              >
                {tr.title}
                <span aria-hidden className={cn("text-teal-dark transition-transform", hover === i ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0")}>
                  →
                </span>
              </AppLink>
            </li>
          );
        })}
      </ul>
      <div className="relative overflow-hidden rounded-[20px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={t.slug}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <SmartImage imageKey={t.image} fill />
            <div className="absolute inset-0 bg-banner-gradient" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-2xl text-on-dark">{t.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-on-dark-muted">{t.short}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
