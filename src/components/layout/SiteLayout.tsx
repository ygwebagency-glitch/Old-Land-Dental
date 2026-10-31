import { useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { EASE } from "@/lib/motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileDrawer } from "./MobileDrawer";
import { SearchOverlay } from "./SearchOverlay";
import { StickyActionBar } from "./StickyActionBar";
import { CustomCursor, EmergencyPill, ScrollProgress, SmoothScroll } from "./SiteEffects";
import { SiteUIProvider } from "./site-ui";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Animate route changes only after hydration (SSR markup renders fully visible).
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <SiteUIProvider>
      <a
        href="#content"
        className="fixed top-3 left-3 z-[90] -translate-y-24 rounded-full bg-charcoal px-5 py-3 font-semibold text-on-dark transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <MobileDrawer />
      <SearchOverlay />
      <motion.main
        id="content"
        key={pathname}
        tabIndex={-1}
        className="outline-none"
        initial={hydrated ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {children}
      </motion.main>
      <Footer />
      <StickyActionBar />
      <EmergencyPill />
      <CustomCursor />
      <SmoothScroll />
    </SiteUIProvider>
  );
}
