import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** Live open/closed status in Europe/London; rendered after mount to avoid SSR mismatch. */
export function OpenNowBadge({ tone = "light", className }: { tone?: "light" | "dark" | "glass"; className?: string }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const open = status?.state === "open";
  const dot = open ? "bg-teal" : status?.state === "lunch" ? "bg-gold" : "bg-danger";
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex min-h-7 items-center gap-2 rounded-full px-3 py-1 text-[0.8rem] font-semibold",
        tone === "light" && "bg-teal-soft text-charcoal-deep",
        tone === "dark" && "bg-on-dark/10 text-on-dark",
        tone === "glass" && "text-on-dark",
        className,
      )}
    >
      <span className="relative flex size-2.5" aria-hidden>
        {status ? (
          <>
            {open ? <span className={cn("absolute inset-0 rounded-full animate-pulse-ring", dot)} /> : null}
            <span className={cn("relative size-2.5 rounded-full", dot)} />
          </>
        ) : (
          <span className="relative size-2.5 rounded-full bg-ink-muted/40" />
        )}
      </span>
      <span>{status ? status.label : "Opening hours"}</span>
    </span>
  );
}
