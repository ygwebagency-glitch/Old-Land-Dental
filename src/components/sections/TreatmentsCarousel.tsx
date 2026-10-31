import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { treatments } from "@/data/treatments";
import { AppLink } from "@/components/ui-custom/AppLink";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const GAP = 24;

function perView(w: number) {
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1.15;
}

export function TreatmentsCarousel({ title = "Dental Treatments" }: { title?: string }) {
  const reduced = useReducedMotion();
  const viewport = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [dims, setDims] = useState({ w: 0, pv: 3 });
  const moved = useRef(false);
  const n = treatments.length;

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDims({ w: el.clientWidth, pv: perView(window.innerWidth) }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardW = dims.w ? (dims.w - GAP * (Math.ceil(dims.pv) - 1)) / dims.pv : 0;
  const step = cardW + GAP;
  const maxIndex = Math.max(0, Math.ceil(n - dims.pv));
  const maxX = dims.w ? -(n * step - GAP - dims.w) : 0;

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(maxIndex, i));
      setIndex(clamped);
      const target = Math.max(maxX, -clamped * step);
      animate(x, target, { duration: reduced ? 0 : 0.7, ease: EASE });
    },
    [maxIndex, maxX, step, x, reduced],
  );

  useEffect(() => {
    goTo(Math.min(index, maxIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dims.w, dims.pv]);

  return (
    <section className="section-pad overflow-hidden bg-background" aria-labelledby="tx-carousel-title">
      <div className="container-site">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="NHS & private" title={title} />
          <span id="tx-carousel-title" className="sr-only">
            {title}
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous treatments"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="inline-flex size-12 items-center justify-center rounded-full border border-charcoal/25 text-charcoal transition-colors hover:bg-charcoal hover:text-on-dark disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-charcoal"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next treatments"
              onClick={() => goTo(index + 1)}
              disabled={index >= maxIndex}
              className="inline-flex size-12 items-center justify-center rounded-full border border-charcoal/25 text-charcoal transition-colors hover:bg-charcoal hover:text-on-dark disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-charcoal"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div ref={viewport} role="region" aria-roledescription="carousel" aria-label={title} className="relative">
          <motion.ul
            className="flex cursor-grab active:cursor-grabbing"
            style={{ x, gap: GAP }}
            drag={dims.w ? "x" : false}
            dragConstraints={{ left: maxX, right: 0 }}
            dragElastic={0.08}
            onDragStart={() => (moved.current = true)}
            onDragEnd={(_, info) => {
              const projected = x.get() + info.velocity.x * 0.2;
              goTo(Math.round(-projected / step));
              window.setTimeout(() => (moved.current = false), 50);
            }}
            onClickCapture={(e) => {
              if (moved.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {treatments.map((t, i) => (
              <li
                key={t.slug}
                className="shrink-0"
                style={{ width: cardW || undefined, flexBasis: cardW ? undefined : "calc((100% - 48px) / 3)" }}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}: ${t.title}`}
              >
                <AppLink
                  to={`/dental-treatments/${t.slug}`}
                  draggable={false}
                  onFocus={() => {
                    if (i < index || i >= index + Math.floor(dims.pv)) goTo(i);
                  }}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-card shadow-soft transition-[transform,box-shadow] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <SmartImage
                    imageKey={t.image}
                    aspect="4/3"
                    imgClassName="transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.06]"
                  />
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="type-h3">{t.title}</h3>
                    <p className="mt-3 line-clamp-4 flex-1 text-[0.98rem] text-ink-muted">{t.short}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-bold text-teal-dark">
                      Find out more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </AppLink>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-8 flex justify-center gap-1" role="group" aria-label="Choose slide">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="flex size-11 items-center justify-center"
            >
              <span className={cn("h-2 rounded-full transition-all duration-500", i === index ? "w-8 bg-charcoal" : "w-2 bg-charcoal/25")} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
