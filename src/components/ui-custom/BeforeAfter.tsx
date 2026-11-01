import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useReducedMotion, type AnimationPlaybackControls } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImageKey } from "@/config/images";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/utils";

const START = 50;
/** Intro sweep: a little left, a little right, back to centre. */
const INTRO = [START, START - 9, START + 9, START];

/**
 * Draggable before/after comparison. Arrow keys move the handle.
 * Plays a one-off gentle intro sweep the first time it scrolls into view (skipped for
 * reduced motion, cancelled the moment the visitor touches the slider).
 */
export function BeforeAfter({
  before,
  after,
  label,
  className,
  introDelay = 0,
}: {
  before: ImageKey;
  after: ImageKey;
  label: string;
  className?: string;
  /** Extra delay (seconds) so side-by-side sliders sweep one after another. */
  introDelay?: number;
}) {
  const [pos, setPos] = useState(START);
  const figureRef = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const intro = useRef<AnimationPlaybackControls | null>(null);
  const reduced = useReducedMotion();

  const takeOver = useCallback(() => {
    touched.current = true;
    intro.current?.stop();
    intro.current = null;
  }, []);

  useEffect(() => {
    const el = figureRef.current;
    if (reduced || !el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          if (touched.current) return;
          intro.current = animate(START, INTRO, {
            duration: 2.8,
            times: [0, 0.3, 0.72, 1],
            ease: ["easeInOut", "easeInOut", "easeInOut"],
            onUpdate: (v) => setPos(v),
            onComplete: () => {
              intro.current = null;
              setPos(START);
            },
          });
        }, 500 + introDelay * 1000);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      intro.current?.stop();
    };
  }, [reduced, introDelay]);

  const setFromX = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <figure ref={figureRef} className={cn("w-full", className)}>
      <div
        ref={box}
        className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-[24px] bg-sand shadow-soft select-none"
        onPointerDown={(e) => {
          takeOver();
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <SmartImage imageKey={after} fill />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <SmartImage imageKey={before} fill />
        </div>
        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-charcoal-deep/70 px-3 py-1 text-xs font-bold tracking-widest text-on-dark uppercase">
          Before
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-teal-dark/90 px-3 py-1 text-xs font-bold tracking-widest text-on-dark uppercase">
          After
        </span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-on-dark shadow-soft" style={{ left: `${pos}%` }} />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${label}: drag to compare before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before image shown`}
          onFocus={takeOver}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              setPos((p) => Math.max(0, p - 5));
            } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              setPos((p) => Math.min(100, p + 5));
            } else if (e.key === "Home") setPos(0);
            else if (e.key === "End") setPos(100);
          }}
          className="absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-on-dark text-charcoal shadow-lift"
          style={{ left: `${pos}%` }}
        >
          <ChevronLeft className="size-4" />
          <ChevronRight className="size-4" />
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted">{label}</figcaption>
    </figure>
  );
}
