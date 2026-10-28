import { useEffect, useRef, useState } from "react";

/** Current scroll position and direction, rAF-throttled. */
export function useScrollState() {
  const [state, setState] = useState({ y: 0, dir: "up" as "up" | "down" });
  const last = useRef(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last.current;
        if (Math.abs(delta) < 4 && y > 0) return;
        setState({ y, dir: delta > 0 ? "down" : "up" });
        last.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return state;
}
