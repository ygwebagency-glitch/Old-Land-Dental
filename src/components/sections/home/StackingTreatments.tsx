import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { treatments, aestheticCard } from "@/data/treatments";
import type { ImageKey } from "@/config/images";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { Btn } from "@/components/ui-custom/Btn";
import { cn } from "@/lib/utils";

type Card = { title: string; text: string; image: ImageKey; to: string };

const cards: Card[] = [
  ...treatments.map((t) => ({ title: t.title, text: t.short, image: t.image, to: `/dental-treatments/${t.slug}` })),
  { title: aestheticCard.title, text: aestheticCard.short, image: aestheticCard.image, to: "/facial-aesthetics" },
];

const tones = ["bg-card", "bg-sand", "bg-teal-soft", "bg-card", "bg-sand", "bg-teal-soft", "bg-card", "bg-sand"];

function StackCard({ card, i, n, progress, reduced }: { card: Card; i: number; n: number; progress: MotionValue<number>; reduced: boolean }) {
  const start = i / n;
  const end = (i + 1) / n;
  const last = i === n - 1;
  const scale = useTransform(progress, [start, end], [1, last ? 1 : 0.94]);
  const dim = useTransform(progress, [start, end], [0, last ? 0 : 0.12]);

  return (
    <li
      className={cn(!reduced && "sticky top-[calc(var(--header-h)+16px+var(--i)*10px)] md:top-[calc(var(--header-h)+24px+var(--i)*16px)]")}
      style={{ ["--i" as string]: i }}
    >
      <motion.article
        style={reduced ? {} : { scale, transformOrigin: "50% 0%" }}
        className={cn(
          "relative grid overflow-hidden rounded-[28px] border border-line shadow-lift will-change-transform md:h-[min(600px,calc(100svh-var(--header-h)-120px))] md:grid-cols-[1.1fr_1fr]",
          tones[i % tones.length],
        )}
      >
        <div className="order-2 flex flex-col justify-between gap-8 p-7 sm:p-10 md:order-1 md:p-14">
          <div>
            <span className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-none text-charcoal/15">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-h2 mt-2">{card.title}</h3>
            <p className="mt-5 max-w-[52ch] text-[1.02rem] text-ink-muted md:text-lg">{card.text}</p>
          </div>
          <div>
            <Btn to={card.to} variant="primary" size="md" arrow>
              Find out more
            </Btn>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/3] md:order-2 md:aspect-auto md:h-full">
          <SmartImage imageKey={card.image} fill sizes="(min-width: 768px) 45vw, 100vw" />
        </div>
        {!reduced ? <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-charcoal-deep" style={{ opacity: dim }} /> : null}
      </motion.article>
    </li>
  );
}

export function StackingTreatments() {
  const ref = useRef<HTMLUListElement>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="section-pad bg-background" aria-labelledby="our-treatments">
      <div className="container-site">
        <SectionHeading
          eyebrow="What we offer"
          title="Our Treatments"
          intro="NHS and private treatment are both available."
          className="mb-14"
        />
        <span id="our-treatments" className="sr-only">
          Our Treatments
        </span>
        <ul ref={ref} className="flex flex-col gap-8 md:gap-12">
          {cards.map((c, i) => (
            <StackCard key={c.title} card={c} i={i} n={cards.length} progress={scrollYProgress} reduced={reduced} />
          ))}
        </ul>
      </div>
    </section>
  );
}
