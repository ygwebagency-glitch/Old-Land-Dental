import { useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AppLink } from "@/components/ui-custom/AppLink";
import { RedCross } from "@/components/ui-custom/icons";
import { useScrollState } from "@/hooks/use-scroll-y";
import { cn } from "@/lib/utils";

/** 3px teal reading-progress bar at the very top. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[45] h-[3px] origin-left bg-teal" style={{ scaleX }} />;
}

/** Lenis smooth scrolling — disabled on touch devices and reduced motion. */
export function SmoothScroll() {
  const reduced = useReducedMotion();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lenisRef = useRef<{ resize: () => void; destroy: () => void } | null>(null);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -96 } });
      lenisRef.current = lenis;
      const loop = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    lenisRef.current?.resize();
  }, [pathname]);

  return null;
}

/** Small teal dot cursor that grows over interactive elements (fine pointers only). */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.3 });
  const y = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.3 });
  const [hot, setHot] = useState(false);
  const [hiddenOnInput, setHiddenOnInput] = useState(false);

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHot(!!el.closest("a, button, [role=slider], [role=tab], summary, label"));
      setHiddenOnInput(!!el.closest("input, textarea, select, [contenteditable]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="cursor-dot pointer-events-none fixed top-0 left-0 z-[80] -mt-1.5 -ml-1.5 size-3 rounded-full bg-teal mix-blend-multiply"
      style={{ x, y }}
      animate={{ scale: hiddenOnInput ? 0 : hot ? 3.2 : 1, opacity: hot ? 0.35 : 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    />
  );
}

/** Desktop floating emergency pill (after 600px scroll). */
export function EmergencyPill() {
  const { y } = useScrollState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const show = y > 600 && pathname !== "/emergencies";
  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-30 hidden transition-[transform,opacity] duration-500 ease-[var(--ease-premium)] md:block",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <AppLink
        to="/emergencies"
        tabIndex={show ? 0 : -1}
        className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-charcoal py-2 pr-5 pl-2.5 text-sm font-bold text-on-dark shadow-lift transition-colors hover:bg-charcoal-deep"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-on-dark">
          <RedCross className="size-4" />
        </span>
        Dental emergency?
      </AppLink>
    </div>
  );
}
