import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import { useRef } from "react";
import { practice } from "@/data/practice";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { SplitText } from "@/components/ui-custom/SplitText";
import { Btn } from "@/components/ui-custom/Btn";
import { OpenNowBadge } from "@/components/ui-custom/OpenNowBadge";
import { EASE } from "@/lib/motion";

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fade = (d: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: EASE },
  });

  return (
    <section
      ref={ref}
      aria-label="Welcome"
      className="relative isolate flex min-h-[640px] w-full items-end overflow-hidden bg-charcoal-deep sm:aspect-[3/4] md:aspect-auto md:h-[100svh] md:max-h-[880px] md:min-h-[680px] md:items-center"
    >
      <motion.div className="absolute inset-0 -z-10" style={reduced ? {} : { y, scale }}>
        <SmartImage imageKey="heroHome" fill priority sizes="100vw" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-gradient max-md:hidden" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-mobile md:hidden" />

      <motion.div className="container-site w-full pt-36 pb-14 md:pt-28 md:pb-0" style={reduced ? {} : { y: contentY, opacity: contentO }}>
        <div className="max-w-[40rem]">
          <motion.p {...fade(0)} className="eyebrow text-on-dark-muted">
            Dentist in Oldland Common, Bristol
          </motion.p>
          <SplitText as="h1" text="Welcome To Oldland Dental" immediate delay={0.15} className="text-h1 mt-5 text-on-dark" />
          <motion.p {...fade(0.55)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-on-dark/85 md:text-xl">
            We have been an established dental practice in Oldland Common, Bristol for over 20 years and pride ourselves on
            offering the very best in patient care in a warm and homely environment.
          </motion.p>
          <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap gap-3">
            <Btn to={practice.links.booking} variant="accent" size="lg" arrow>
              Book Online
            </Btn>
            <Btn to={practice.phone.href} variant="ghostLight" size="lg" icon={<Phone className="size-4" />}>
              Call {practice.phone.display}
            </Btn>
          </motion.div>
          <motion.div {...fade(0.85)} className="glass mt-8 inline-flex max-w-full flex-col gap-2 rounded-[20px] px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-[0.95rem] font-semibold text-on-dark">{practice.newPatientOffer}</p>
            <span className="hidden h-5 w-px bg-on-dark/30 sm:block" aria-hidden />
            <OpenNowBadge tone="glass" className="px-0" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-on-dark/60 pt-2">
          <span className="size-1.5 rounded-full bg-on-dark animate-scroll-dot" />
        </span>
        <span className="text-[0.7rem] font-bold tracking-[0.2em] text-on-dark/70 uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
