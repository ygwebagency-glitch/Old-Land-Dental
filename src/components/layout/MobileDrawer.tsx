import { useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Search, X } from "lucide-react";
import { useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mainNav } from "@/data/nav";
import { practice, external } from "@/data/practice";
import { AppLink } from "@/components/ui-custom/AppLink";
import { Logo } from "@/components/ui-custom/LogoMark";
import { OpenNowBadge } from "@/components/ui-custom/OpenNowBadge";
import { TodayHoursBadge } from "@/components/ui-custom/TodayHoursBadge";
import { InstagramIcon, PdfIcon } from "@/components/ui-custom/icons";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSiteUI } from "./site-ui";

export function MobileDrawer() {
  const { drawerOpen, setDrawerOpen, setSearchOpen } = useSiteUI();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setDrawerOpen(false), [pathname, setDrawerOpen]);

  const item = (i: number) => ({
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.08 + i * 0.05, ease: EASE },
  });
  const rowCls = "flex min-h-12 items-center rounded-xl px-3 text-lg font-display text-charcoal";

  return (
    <DialogPrimitive.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-charcoal-deep/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-lift data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-500 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
          aria-describedby={undefined}
        >
          <div className="flex h-[76px] items-center justify-between border-b border-line px-5">
            <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
            <Logo className="h-8" />
            <DialogPrimitive.Close
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-charcoal"
            >
              <X className="size-5" />
            </DialogPrimitive.Close>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4" data-lenis-prevent>
            <nav aria-label="Mobile">
              <Accordion type="single" collapsible>
                {mainNav.map((n, i) => (
                  <motion.div key={n.label} {...item(i)}>
                    {n.children ? (
                      <AccordionItem value={n.label} className="border-line">
                        <AccordionTrigger className="min-h-12 px-3 font-display text-lg font-normal text-charcoal hover:no-underline">
                          {n.label}
                        </AccordionTrigger>
                        <AccordionContent className="pb-3">
                          <ul className="ml-3 border-l border-line pl-2">
                            {n.to ? (
                              <li>
                                <AppLink to={n.to} className="flex min-h-11 items-center rounded-lg px-3 text-[0.98rem] font-semibold text-teal-dark">
                                  {n.label}
                                </AppLink>
                              </li>
                            ) : null}
                            {n.children.map((c) => (
                              <li key={c.to}>
                                <AppLink
                                  to={c.to}
                                  className={cn(
                                    "flex min-h-11 items-center gap-2 rounded-lg px-3 text-[0.98rem] text-ink",
                                    pathname === c.to && "bg-teal-soft font-bold",
                                  )}
                                >
                                  {c.pdf ? <PdfIcon className="size-4 shrink-0 text-teal-dark" /> : null}
                                  {c.label}
                                </AppLink>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <div className="border-b border-line">
                        <AppLink to={n.to!} className={cn(rowCls, pathname === n.to && "text-teal-dark")}>
                          {n.label}
                        </AppLink>
                      </div>
                    )}
                  </motion.div>
                ))}
                <motion.div {...item(mainNav.length)} className="border-b border-line">
                  <AppLink to="/invisalign" className={rowCls}>
                    Invisalign
                  </AppLink>
                </motion.div>
              </Accordion>
            </nav>

            <motion.div {...item(mainNav.length + 1)} className="mt-6 grid grid-cols-2 gap-3 px-2">
              <a href={practice.phone.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-charcoal font-bold text-on-dark">
                <Phone className="size-4" /> Call
              </a>
              <a href={practice.links.booking} {...external} className="inline-flex min-h-12 items-center justify-center rounded-full bg-teal-dark font-bold text-on-dark">
                Book Online
              </a>
            </motion.div>

            <motion.div {...item(mainNav.length + 2)} className="mt-6 space-y-4 rounded-[22px] bg-sand p-5">
              <address className="text-[0.95rem] not-italic leading-relaxed text-ink">
                {practice.address.lines.join(", ")}
              </address>
              <div className="flex flex-col items-start gap-2">
                <TodayHoursBadge />
                <OpenNowBadge />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
                <a href={practice.links.instagram} {...external} className="flex min-h-11 items-center gap-2 text-charcoal">
                  <InstagramIcon className="size-4" /> Instagram
                </a>
                <a href={practice.email.href} className="flex min-h-11 items-center gap-2 text-charcoal">
                  <Mail className="size-4" /> Email us
                </a>
                <a href={practice.links.maps} {...external} className="flex min-h-11 items-center gap-2 text-charcoal">
                  <MapPin className="size-4" /> Find us
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex min-h-11 items-center gap-2 text-charcoal"
                >
                  <Search className="size-4" /> Search
                </button>
              </div>
            </motion.div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
