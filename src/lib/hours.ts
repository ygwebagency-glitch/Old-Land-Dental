import { hours, TIMEZONE, type DayHours } from "@/data/hours";

export type OpenStatus =
  | { state: "open"; label: string; closesAt: string }
  | { state: "lunch"; label: string; reopensAt: string }
  | { state: "closed"; label: string; opensDay: string; opensAt: string };

const toMinutes = (t: string) => {
  const [h = 0, m = 0] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "18:30" -> "6.30pm", "13:00" -> "1pm", "09:00" -> "9am" (matches site style) */
export function formatTime(t: string): string {
  const [h = 0, m = 0] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${suffix}` : `${h12}.${String(m).padStart(2, "0")}${suffix}`;
}

/** Day index (0 = Sun) and minutes since midnight in Europe/London. */
export function londonNow(date: Date = new Date()): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    dayIndex: map[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export const dayByIndex = (i: number): DayHours => hours.find((d) => d.index === i)!;

export function getOpenStatus(date: Date = new Date()): OpenStatus {
  const { dayIndex, minutes } = londonNow(date);
  const today = dayByIndex(dayIndex);

  for (let i = 0; i < today.sessions.length; i++) {
    const s = today.sessions[i]!;
    const open = toMinutes(s.open);
    const close = toMinutes(s.close);
    if (minutes >= open && minutes < close) {
      return { state: "open", closesAt: formatTime(s.close), label: `Open now · closes ${formatTime(s.close)}` };
    }
    const next = today.sessions[i + 1];
    if (next && minutes >= close && minutes < toMinutes(next.open)) {
      return { state: "lunch", reopensAt: formatTime(next.open), label: `Closed for lunch · reopens ${formatTime(next.open)}` };
    }
  }

  // Before first session today
  if (today.sessions.length && minutes < toMinutes(today.sessions[0]!.open)) {
    const at = formatTime(today.sessions[0]!.open);
    return { state: "closed", opensDay: "today", opensAt: at, label: `Closed · opens today ${at}` };
  }

  // Find next open day
  for (let offset = 1; offset <= 7; offset++) {
    const d = dayByIndex((dayIndex + offset) % 7);
    if (d.sessions.length) {
      const at = formatTime(d.sessions[0]!.open);
      const dayName = offset === 1 ? "tomorrow" : d.day;
      return { state: "closed", opensDay: dayName, opensAt: at, label: `Closed · opens ${dayName} ${at}` };
    }
  }
  return { state: "closed", opensDay: "", opensAt: "", label: "Closed" };
}
