import { useEffect, useState } from "react";
import { getOpenStatus, getTodayHours, type OpenStatus, type TodayHours } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * Today's opening hours (Europe/London day), with a live status dot.
 * Rendered after mount to avoid SSR mismatch; re-checks every 30s and when the tab
 * becomes visible again, so it switches to the next day's hours at midnight.
 */
export function TodayHoursBadge({ tone = "light", className }: { tone?: "light" | "glass"; className?: string }) {
  const [state, setState] = useState<{ today: TodayHours; status: OpenStatus } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setState({ today: getTodayHours(now), status: getOpenStatus(now) });
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    const onVisible = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const s = state?.status.state;
  const dot = s === "open" ? "bg-teal" : s === "lunch" ? "bg-gold" : "bg-danger";
  return (
    <span
      role="status"
      aria-live="polite"
      title={state?.status.label}
      className={cn(
        "inline-flex min-h-7 items-center gap-2 rounded-full px-3 py-1 text-[0.8rem] font-semibold whitespace-nowrap",
        tone === "light" && "bg-teal-soft text-charcoal-deep",
        tone === "glass" && "text-on-dark",
        className,
      )}
    >
      <span className="relative flex size-2.5" aria-hidden>
        {state ? (
          <>
            {s === "open" ? <span className={cn("absolute inset-0 rounded-full animate-pulse-ring", dot)} /> : null}
            <span className={cn("relative size-2.5 rounded-full", dot)} />
          </>
        ) : (
          <span className="relative size-2.5 rounded-full bg-ink-muted/40" />
        )}
      </span>
      {state ? (
        <span>
          <span className="sr-only">Today's opening hours: </span>
          {state.today.label}
          <span className="sr-only"> ({state.status.label})</span>
        </span>
      ) : (
        <span>Opening hours</span>
      )}
    </span>
  );
}
