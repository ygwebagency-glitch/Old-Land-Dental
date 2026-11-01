import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { scrollToElement } from "@/lib/smooth-scroll";

/**
 * Scroll-spy for in-page section tabs that sit in a sticky bar.
 *
 * An IntersectionObserver watches every section against an "activation line"
 * just below the sticky bar. The active tab is the first section (in page order)
 * still crossing or below that line, so it is correct for manual scrolling.
 * Clicking a tab activates it immediately and holds it while the smooth scroll runs,
 * so the highlight never lags behind on the previously selected tab.
 */
export function useSectionSpy(ids: readonly string[], barRef: RefObject<HTMLElement | null>, rebuildKey: unknown = null) {
  const [active, setActive] = useState(ids[0] ?? "");
  const idsRef = useRef(ids);
  idsRef.current = ids;
  const idsKey = ids.join("|");
  const visible = useRef(new Set<string>());
  const pinned = useRef<string | null>(null);
  const pinToken = useRef(0);

  /** Distance from the viewport top to just below the (stuck) sticky bar. */
  const barOffset = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return 96;
    const top = parseFloat(getComputedStyle(bar).top) || 0;
    return top + bar.offsetHeight + 16;
  }, [barRef]);

  const pick = useCallback(() => {
    if (pinned.current) return;
    const list = idsRef.current;
    const first = list.find((id) => visible.current.has(id));
    (window as any).__spy = { vis: [...visible.current], first };
    if (first) {
      setActive(first);
      return;
    }
    // Nothing on or below the line: we are either above all sections or past the last one.
    const present = list.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const last = present[present.length - 1];
    if (last && last.getBoundingClientRect().bottom < barOffset()) setActive(last.id);
    else if (present[0]) setActive(present[0].id);
  }, [barOffset]);

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const build = () => {
      io?.disconnect();
      visible.current.clear();
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visible.current.add(e.target.id);
            else visible.current.delete(e.target.id);
          }
          pick();
        },
        { rootMargin: `-${Math.round(barOffset() + 8)}px 0px 0px 0px`, threshold: 0 },
      );
      for (const id of idsRef.current) {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      }
    };
    build();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };
    // A manual wheel/touch scroll cancels the click pin straight away.
    const release = () => {
      if (!pinned.current) return;
      pinned.current = null;
      pick();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    return () => {
      io?.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
    };
  }, [idsKey, rebuildKey, barOffset, pick]);

  // Keep the active tab visible inside a horizontally scrolling tab row.
  useEffect(() => {
    const chip = barRef.current?.querySelector<HTMLElement>(`[data-spy-id="${active}"]`);
    const row = chip?.closest("ul");
    if (!chip || !row || row.scrollWidth <= row.clientWidth) return;
    const c = chip.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    const left = row.scrollLeft + (c.left - r.left) - (r.width - c.width) / 2;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  }, [active, barRef]);

  const go = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const token = ++pinToken.current;
      pinned.current = id;
      setActive(id);
      void scrollToElement(el, barOffset()).then(() => {
        // The clicked section now sits on the activation line; later scrolling refines from here.
        if (pinToken.current === token) pinned.current = null;
      });
    },
    [barOffset],
  );

  /** Props for each tab link: immediate activation + accessible current marker. */
  const linkProps = useCallback(
    (id: string) => ({
      href: `#${id}`,
      "data-spy-id": id,
      "aria-current": active === id ? ("location" as const) : undefined,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation(); // keep Lenis' own anchor handler (fixed offset) out of it
        go(id);
      },
    }),
    [active, go],
  );

  return { active, go, linkProps };
}
