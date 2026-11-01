import { describe, expect, it } from "vitest";
import { getOpenStatus, getTodayHours } from "@/lib/hours";

// Late October 2026 onwards and January are GMT (UTC+0); July is BST (UTC+1).
const london = (iso: string) => new Date(iso);

describe("Open now status (Europe/London)", () => {
  it("is open Monday mid-morning and closes at 1pm", () => {
    expect(getOpenStatus(london("2026-10-26T09:30:00Z")).label).toBe("Open now · closes 1pm"); // 9:30 GMT Mon
  });
  it("is closed for lunch between 1pm and 2pm", () => {
    expect(getOpenStatus(london("2026-10-26T13:30:00Z")).label).toBe("Closed for lunch · reopens 2pm");
  });
  it("uses British Summer Time in July (12:30 UTC is 1:30pm lunch)", () => {
    expect(getOpenStatus(london("2026-07-06T12:30:00Z")).label).toBe("Closed for lunch · reopens 2pm");
  });
  it("closes at 6.30pm on Thursday", () => {
    expect(getOpenStatus(london("2026-10-29T16:00:00Z")).label).toBe("Open now · closes 6.30pm");
  });
  it("closes at 4pm on Friday", () => {
    expect(getOpenStatus(london("2026-10-30T14:30:00Z")).label).toBe("Open now · closes 4pm");
  });
  it("is closed on Saturday and opens Monday 9am", () => {
    expect(getOpenStatus(london("2026-10-31T11:00:00Z")).label).toBe("Closed · opens Monday 9am");
  });
  it("on Wednesday evening after 5pm opens tomorrow 9am", () => {
    expect(getOpenStatus(london("2027-01-13T17:30:00Z")).label).toBe("Closed · opens tomorrow 9am");
  });
  it("before 9am on a weekday opens today", () => {
    expect(getOpenStatus(london("2027-01-12T08:00:00Z")).label).toBe("Closed · opens today 9am");
  });
});

describe("Today's hours in the announcement bar (Europe/London)", () => {
  // Week of Mon 26 Oct – Sun 1 Nov 2026 (GMT), midday each day.
  const cases: [string, string][] = [
    ["2026-10-26T12:00:00Z", "Monday · 9am – 1pm & 2pm – 6pm"],
    ["2026-10-27T12:00:00Z", "Tuesday · 9am – 1pm & 2pm – 6pm"],
    ["2026-10-28T12:00:00Z", "Wednesday · 9am – 1pm & 2pm – 5pm"],
    ["2026-10-29T12:00:00Z", "Thursday · 9am – 1pm & 2pm – 6.30pm"],
    ["2026-10-30T12:00:00Z", "Friday · 9am – 1pm & 2pm – 4pm"],
    ["2026-10-31T12:00:00Z", "Saturday · Closed Today"],
    ["2026-11-01T12:00:00Z", "Sunday · Closed Today"],
  ];
  it.each(cases)("at %s shows %s", (iso, label) => {
    expect(getTodayHours(new Date(iso)).label).toBe(label);
  });
  it("marks Saturday and Sunday as closed", () => {
    expect(getTodayHours(new Date("2026-10-31T12:00:00Z")).closed).toBe(true);
    expect(getTodayHours(new Date("2026-11-01T12:00:00Z")).closed).toBe(true);
    expect(getTodayHours(new Date("2026-10-30T12:00:00Z")).closed).toBe(false);
  });
  it("switches from Saturday to Sunday at London midnight, not the visitor's", () => {
    // 23:30 Sat in London is already Sunday 04:30 in Karachi — still Saturday for the practice.
    expect(getTodayHours(new Date("2026-10-31T23:30:00Z")).day).toBe("Saturday");
    expect(getTodayHours(new Date("2026-11-01T00:10:00Z")).day).toBe("Sunday");
  });
  it("switches from Sunday to Monday hours at London midnight", () => {
    expect(getTodayHours(new Date("2026-11-01T23:59:00Z")).day).toBe("Sunday");
    expect(getTodayHours(new Date("2026-11-02T00:01:00Z")).label).toBe("Monday · 9am – 1pm & 2pm – 6pm");
  });
  it("uses British Summer Time (23:30 UTC Sunday is already Monday in London)", () => {
    expect(getTodayHours(new Date("2026-07-05T23:30:00Z")).day).toBe("Monday");
  });
});
