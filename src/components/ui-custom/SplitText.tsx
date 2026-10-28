import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  /** animate on mount instead of on view (hero headings) */
  immediate?: boolean;
  id?: string;
};

/** Headline whose words mask-slide up from below, staggered 40ms. */
export function SplitText({ text, as = "h2", className, delay = 0, immediate, id }: Props) {
  const reduced = useReducedMotion();
  const Tag = as;
  const words = text.split(" ");
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } };
  return (
    <Tag className={cn(className)} aria-label={text} id={id}>
      <motion.span
        aria-hidden
        className="block"
        initial="hidden"
        {...trigger}
        variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.04, delayChildren: delay } } }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: reduced ? { opacity: 0 } : { y: "110%" },
                show: { y: "0%", opacity: 1, transition: { duration: reduced ? 0.01 : 0.85, ease: EASE } },
              }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
