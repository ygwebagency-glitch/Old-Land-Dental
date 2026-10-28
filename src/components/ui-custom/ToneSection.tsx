import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  white: "bg-background",
  sand: "bg-sand",
  blush: "bg-blush",
  grey: "bg-grey-light",
  teal: "bg-teal-soft",
} as const;

/**
 * Section whose background shifts smoothly from white to its tone as it
 * enters the viewport (IntersectionObserver → CSS transition).
 */
export function ToneSection({
  tone = "white",
  grain,
  className,
  children,
  id,
  ariaLabel,
  ariaLabelledby,
}: {
  tone?: keyof typeof tones;
  grain?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { rootMargin: "0px 0px -35% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "transition-colors duration-[1100ms] ease-[var(--ease-premium)]",
        on || tone === "white" ? tones[tone] : "bg-background",
        grain && "grain",
        className,
      )}
    >
      {children}
    </section>
  );
}
