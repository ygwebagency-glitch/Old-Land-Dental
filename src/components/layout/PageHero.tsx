import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import type { ImageKey } from "@/config/images";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { SplitText } from "@/components/ui-custom/SplitText";
import { EASE } from "@/lib/motion";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Inner-page banner: 21:9 desktop / 4:3 mobile, dark overlay, parallax image, split H1. */
export function PageHero({
  image,
  title,
  crumbs,
  eyebrow,
  children,
}: {
  image?: ImageKey;
  title: string;
  crumbs: Crumb[];
  eyebrow?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentO = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex aspect-[4/3] max-h-[560px] min-h-[380px] w-full items-end overflow-hidden bg-charcoal-deep md:aspect-[21/9] md:min-h-[440px]"
    >
      <motion.div className="absolute inset-0 -z-10" style={reduced ? undefined : { y, scale }}>
        {image ? <SmartImage imageKey={image} fill priority sizes="100vw" /> : <div className="absolute inset-0 bg-brand-gradient" />}
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-banner-gradient" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-gradient opacity-70" />
      <motion.div className="container-site w-full pt-32 pb-10 md:pb-14" style={reduced ? undefined : { y: contentY, opacity: contentO }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <Breadcrumbs crumbs={crumbs} light />
        </motion.div>
        {eyebrow ? <p className="eyebrow mt-5 text-on-dark-muted">{eyebrow}</p> : null}
        <SplitText as="h1" text={title} immediate delay={0.1} className="text-h1 mt-4 max-w-4xl text-on-dark" />
        {children}
      </motion.div>
    </section>
  );
}
