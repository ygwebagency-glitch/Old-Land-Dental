import { useEffect, useState } from "react";
import { hours } from "@/data/hours";
import { londonNow } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** Opening-hours rows with today highlighted (computed after mount, Europe/London). */
export function HoursTable({ tone = "light", compact, showLunch }: { tone?: "light" | "dark"; compact?: boolean; showLunch?: boolean }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(londonNow().dayIndex), []);
  const dark = tone === "dark";
  return (
    <table className={cn("w-full text-left", compact ? "text-[0.92rem]" : "text-base")}>
      <caption className="sr-only">Opening hours</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Morning</th>
          {showLunch ? <th scope="col">Lunch</th> : null}
          <th scope="col">Afternoon</th>
        </tr>
      </thead>
      <tbody>
        {hours.map((d) => {
          const isToday = d.index === today;
          const closed = !d.sessions.length;
          return (
            <tr
              key={d.day}
              className={cn(
                "border-b transition-colors",
                dark ? "border-on-dark/10" : "border-line",
                isToday && (dark ? "bg-on-dark/10" : "bg-teal-soft"),
              )}
            >
              <th scope="row" className={cn("py-2.5 pr-3 pl-3 font-semibold", dark ? "text-on-dark" : "text-charcoal")}>
                {compact ? d.short : d.day}
                {isToday ? (
                  <span className={cn("ml-2 rounded-full px-2 py-0.5 text-[0.68rem] font-bold tracking-wider uppercase", dark ? "bg-teal text-charcoal-deep" : "bg-teal-dark text-on-dark")}>
                    Today
                  </span>
                ) : null}
              </th>
              {closed ? (
                <td colSpan={showLunch ? 3 : 2} className={cn("py-2.5 pr-3", dark ? "text-on-dark-muted" : "text-ink-muted")}>
                  Closed
                </td>
              ) : (
                <>
                  <td className={cn("py-2.5 pr-3 whitespace-nowrap", dark ? "text-on-dark/85" : "text-ink")}>{d.morning}</td>
                  {showLunch ? (
                    <td className="hidden py-2.5 pr-3 text-sm whitespace-nowrap text-ink-muted sm:table-cell">1–2pm Closed for lunch</td>
                  ) : null}
                  <td className={cn("py-2.5 pr-3 whitespace-nowrap", dark ? "text-on-dark/85" : "text-ink")}>{d.afternoon}</td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
