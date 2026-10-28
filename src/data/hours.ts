// Opening hours in Europe/London local time. Times are 24h "HH:MM".
export type DaySession = { open: string; close: string };
export type DayHours = {
  day: string;
  short: string;
  /** 0 = Sunday … 6 = Saturday */
  index: number;
  sessions: DaySession[];
  morning: string;
  afternoon: string;
};

export const TIMEZONE = "Europe/London";

export const hours: DayHours[] = [
  { day: "Monday", short: "Mon", index: 1, morning: "9am – 1pm", afternoon: "2pm – 6pm", sessions: [{ open: "09:00", close: "13:00" }, { open: "14:00", close: "18:00" }] },
  { day: "Tuesday", short: "Tue", index: 2, morning: "9am – 1pm", afternoon: "2pm – 6pm", sessions: [{ open: "09:00", close: "13:00" }, { open: "14:00", close: "18:00" }] },
  { day: "Wednesday", short: "Wed", index: 3, morning: "9am – 1pm", afternoon: "2pm – 5pm", sessions: [{ open: "09:00", close: "13:00" }, { open: "14:00", close: "17:00" }] },
  { day: "Thursday", short: "Thu", index: 4, morning: "9am – 1pm", afternoon: "2pm – 6.30pm", sessions: [{ open: "09:00", close: "13:00" }, { open: "14:00", close: "18:30" }] },
  { day: "Friday", short: "Fri", index: 5, morning: "9am – 1pm", afternoon: "2pm – 4pm", sessions: [{ open: "09:00", close: "13:00" }, { open: "14:00", close: "16:00" }] },
  { day: "Saturday", short: "Sat", index: 6, morning: "Closed", afternoon: "", sessions: [] },
  { day: "Sunday", short: "Sun", index: 0, morning: "Closed", afternoon: "", sessions: [] },
];
