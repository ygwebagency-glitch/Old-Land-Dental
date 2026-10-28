import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 3D tilt (≤6°) following the cursor on fine pointers only. */
export function TiltCard({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 16 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 16 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={cn(
          "group/tilt h-full transition-shadow duration-500 ease-[var(--ease-premium)] hover:shadow-lift",
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
