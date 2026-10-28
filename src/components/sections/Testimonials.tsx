import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { ToneSection } from "@/components/ui-custom/ToneSection";
import { Reveal } from "@/components/ui-custom/Reveal";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DURATION = 7000;

function Stars() {
  return (
    <motion.div
      className="flex gap-1.5"
      aria-label="5 out of 5 stars"
      role="img"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="size-6"
          aria-hidden
          variants={{ hidden: { scale: 0.6, opacity: 0.3 }, show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 14 } } }}
        >
          <motion.path
            d="M12 2.5l2.94 6 6.56.92-4.75 4.6 1.12 6.53L12 17.5l-5.87 3.05 1.12-6.53L2.5 9.42l6.56-.92z"
            className="stroke-gold"
            strokeWidth="1.4"
            strokeLinejoin="round"
            variants={{ hidden: { fillOpacity: 0 }, show: { fillOpacity: 1, transition: { duration: 0.4 } } }}
            style={{ fill: "var(--gold)" }}
          />
        </motion.svg>
      ))}
    </motion.div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const dash = useTransform(progress, [0, 1], [100, 0]);
  const elapsed = useRef(0);
  const n = testimonials.length;

  const go = (i: number) => {
    elapsed.current = 0;
    progress.set(0);
    setIndex(((i % n) + n) % n);
  };

  useEffect(() => {
    if (paused || reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      elapsed.current += t - last;
      last = t;
      progress.set(Math.min(1, elapsed.current / DURATION));
      if (elapsed.current >= DURATION) {
        elapsed.current = 0;
        progress.set(0);
        setIndex((i) => (i + 1) % n);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, reduced, n, progress]);

  const t = testimonials[index];

  return (
    <ToneSection tone="sand" grain className="section-pad overflow-hidden" ariaLabel="Patient testimonials">
      <div
        className="container-site"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div role="region" aria-roledescription="carousel" aria-label="What our patients say" className="mx-auto max-w-5xl text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <p className="eyebrow">What our patients say</p>
            <Stars />
          </Reveal>

          <div className="relative mt-10 grid min-h-[22rem] place-items-center sm:min-h-[18rem] md:min-h-[16rem]">
            <Quote aria-hidden className="absolute -top-6 left-1/2 size-28 -translate-x-1/2 text-blush/50" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: reduced ? 0 : 16, filter: reduced ? "none" : "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: reduced ? 0 : -12, filter: reduced ? "none" : "blur(6px)" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${n}`}
              >
                <blockquote className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.25] text-charcoal">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 text-sm font-bold tracking-[0.18em] text-teal-dark uppercase">— {t.author}</figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <p className="sr-only" aria-live="polite">
            Testimonial {index + 1} of {n} from {t.author}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="inline-flex size-12 items-center justify-center rounded-full border border-charcoal/25 text-charcoal transition-colors hover:bg-charcoal hover:text-on-dark"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  className="flex size-11 items-center justify-center"
                >
                  {i === index ? (
                    <svg viewBox="0 0 36 36" className="size-9 -rotate-90" aria-hidden>
                      <circle cx="18" cy="18" r="15" fill="none" className="stroke-charcoal/15" strokeWidth="2.5" />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        className="stroke-teal-dark"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        pathLength={100}
                        strokeDasharray="100"
                        style={{ strokeDashoffset: dash }}
                      />
                      <circle cx="18" cy="18" r="4" className="fill-charcoal" />
                    </svg>
                  ) : (
                    <span className={cn("size-2.5 rounded-full bg-charcoal/30 transition-colors hover:bg-charcoal")} />
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="inline-flex size-12 items-center justify-center rounded-full border border-charcoal/25 text-charcoal transition-colors hover:bg-charcoal hover:text-on-dark"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </ToneSection>
  );
}
