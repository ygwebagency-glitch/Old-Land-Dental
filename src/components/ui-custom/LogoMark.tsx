import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { images } from "@/config/images";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

/** Static house mark (fallback art) */
export function HouseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 52" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={className}>
      <path d="M4 16h56L54 6H10z M12 6V2h4v4 M48 6V2h4v4" strokeLinejoin="round" />
      <path d="M8 16v34h48V16" />
      <rect x="14" y="21" width="9" height="9" />
      <path d="M27.5 30v-5a4.5 4.5 0 0 1 9 0v5z" />
      <rect x="41" y="21" width="9" height="9" />
      <rect x="14" y="36" width="9" height="9" />
      <path d="M27.5 50V41a4.5 4.5 0 0 1 9 0v9" />
      <rect x="41" y="36" width="9" height="9" />
    </svg>
  );
}

const paths = [
  "M4 16h56L54 6H10z",
  "M12 6V2h4v4 M48 6V2h4v4",
  "M8 16v34h48V16",
  "M14 21h9v9h-9z",
  "M27.5 30v-5a4.5 4.5 0 0 1 9 0v5z",
  "M41 21h9v9h-9z",
  "M14 36h9v9h-9z",
  "M27.5 50V41a4.5 4.5 0 0 1 9 0v9",
  "M41 36h9v9h-9z",
  "M0 51h64",
];

/** The house mark drawing itself on view (stroke line-draw) */
export function HouseMarkDraw({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="-2 -2 68 56" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className={className}>
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, delay: i * 0.12, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/** Divider line that draws across on view */
export function DrawLine({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 200 2" preserveAspectRatio="none" aria-hidden className={cn("h-px w-full", className)}>
      <motion.path
        d="M0 1H200"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </svg>
  );
}

/** Wordmark logo image with text fallback */
export function Logo({ light, className }: { light?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className={cn("font-display text-[1.9rem] leading-none", light ? "text-on-dark" : "text-charcoal", className)}>
        Oldland Dental
      </span>
    );
  }
  return (
    <img
      src={images.logo.src}
      alt="Oldland Dental"
      width={images.logo.width}
      height={images.logo.height}
      onError={() => setFailed(true)}
      className={cn("h-7 w-auto transition-[filter,height] duration-500 sm:h-8", light && "brightness-0 invert", className)}
    />
  );
}
