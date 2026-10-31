import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { EASE, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number; children: ReactNode };

/** Fade-up on scroll, once, at 15% in view. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: reduced ? 0.01 : 0.75, delay: reduced ? 0 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Parent for staggered children (<RevealItem>) */
export function RevealGroup({
  children,
  stagger = 0.09,
  className,
  as = "div",
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const reduced = useReducedMotion();
  const Comp = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : stagger } } }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion();
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.7, ease: EASE } },
      }}
    >
      {children}
    </Comp>
  );
}

/** Image reveal: clip-path wipe + inner scale 1.15 → 1.
 *  The in-view check runs on an unclipped wrapper (a fully clipped element never intersects). */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full overflow-hidden rounded-[inherit]"
        initial={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
        animate={inView ? (reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }) : {}}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        <motion.div
          className="h-full w-full"
          initial={reduced ? false : { scale: 1.15 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
