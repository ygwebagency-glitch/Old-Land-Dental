import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImageKey } from "@/config/images";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/utils";

/** Draggable before/after comparison. Arrow keys move the handle. */
export function BeforeAfter({
  before,
  after,
  label,
  className,
}: {
  before: ImageKey;
  after: ImageKey;
  label: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <figure className={cn("w-full", className)}>
      <div
        ref={box}
        className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-[24px] bg-sand shadow-soft select-none"
        onPointerDown={(e) => {
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
