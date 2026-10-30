import { createFileRoute } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useRef, useState } from "react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { CtaBand } from "@/components/sections/CtaBand";
import { BeforeAfter } from "@/components/ui-custom/BeforeAfter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { SplitText } from "@/components/ui-custom/SplitText";
import { getImage, type ImageKey } from "@/config/images";
import { EASE } from "@/lib/motion";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/our-smile-gallery")({
  head: () =>
    seo({
      title: "Our Smile Gallery",
      description: "See how Oldland Dental Practice can transform your smile — gallery and before & after cosmetic results.",
      path: "/our-smile-gallery",
      breadcrumbs: crumbsFor.single("Our Smile Gallery"),
    }),
  component: GalleryPage,
});

const gallery: { key: ImageKey; aspect: string }[] = [
  { key: "gallery.0", aspect: "4/5" },
  { key: "gallery.1", aspect: "4/3" },
  { key: "gallery.2", aspect: "1/1" },
];

function Lightbox({ index, setIndex }: { index: number | null; setIndex: (i: number | null) => void }) {
  const touchX = useRef<number | null>(null);
  const n = gallery.length;
  const go = (d: number) => index !== null && setIndex((index + d + n) % n);
  const img = index !== null ? getImage(gallery[index].key) : null;
  return (
    <DialogPrimitive.Root open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-charcoal-deep/92 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 md:p-10"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <DialogPrimitive.Title className="sr-only">Smile gallery image viewer</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Use the left and right arrow keys to move between images.</DialogPrimitive.Description>
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute top-4 right-4 inline-flex size-12 items-center justify-center rounded-full bg-on-dark/10 text-on-dark hover:bg-on-dark/20"
          >
            <X className="size-6" />
          </DialogPrimitive.Close>
          <AnimatePresence mode="wait">
            {img ? (
              <motion.figure
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="w-full max-w-4xl"
              >
                <SmartImage src={img.src} alt={img.alt} aspect="4/3" className="rounded-[20px]" focal={img.focal} />
                <figcaption className="mt-4 text-center text-on-dark-muted">
                  {img.alt} · {index! + 1} / {n}
                </figcaption>
              </motion.figure>
            ) : null}
          </AnimatePresence>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="inline-flex size-12 items-center justify-center rounded-full bg-on-dark text-charcoal">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="inline-flex size-12 items-center justify-center rounded-full bg-on-dark text-charcoal">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function GalleryPage() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <InnerPage hero="heroTreatments" title="Our Smile Gallery" crumbs={crumbsFor.single("Our Smile Gallery")}>
      <RevealGroup className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
        {gallery.map((g, i) => (
          <RevealItem key={g.key}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open image: ${getImage(g.key).alt}`}
              className="group relative block w-full overflow-hidden rounded-[24px] shadow-soft"
            >
              <SmartImage imageKey={g.key} aspect={g.aspect} imgClassName="transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute right-4 bottom-4 flex size-11 items-center justify-center rounded-full bg-background/90 text-charcoal opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-4" />
              </span>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-14">
        <SplitText text="Before & after" className="text-h2" />
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Reveal>
            <BeforeAfter before="ba.1.before" after="ba.1.after" label="Cosmetic result 1" />
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfter before="ba.2.before" after="ba.2.after" label="Cosmetic result 2" />
          </Reveal>
        </div>
      </div>
      <CtaBand />
      <Lightbox index={index} setIndex={setIndex} />
    </InnerPage>
  );
}
