/**
 * Single entry point for programmatic scrolling. When Lenis smooth scrolling is
 * running it must drive the scroll (a native smooth scroll would fight it);
 * otherwise we fall back to window.scrollTo.
 */
type LenisLike = {
  scrollTo: (target: HTMLElement | number, options?: { offset?: number; onComplete?: () => void }) => void;
};

let lenis: LenisLike | null = null;

export function registerLenis(instance: LenisLike | null) {
  lenis = instance;
}

/** Smooth-scrolls so the element's top sits `topOffset` px below the viewport top. Resolves when settled. */
export function scrollToElement(el: HTMLElement, topOffset: number): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    let timer = 0;
    const finish = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      window.removeEventListener("scrollend", finish);
      resolve();
    };
    // Fallback in case the scroll is interrupted or never needed to move.
    timer = window.setTimeout(finish, 1600);

    if (lenis) {
      lenis.scrollTo(el, { offset: -topOffset, onComplete: finish });
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - topOffset);
    window.addEventListener("scrollend", finish);
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  });
}
