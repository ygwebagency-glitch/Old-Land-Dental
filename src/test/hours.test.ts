import { describe, expect, it } from "vitest";
import { getOpenStatus } from "@/lib/hours";

// Dates in October 2026 are BST (UTC+1); January is GMT (UTC+0).
const london = (iso: string) => new Date(iso);

describe("Open now status (Europe/London)", () => {
  it("is open Monday mid-morning and closes at 1pm", () => {
    expect(getOpenStatus(london("2026-10-26T09:30:00Z")).label).toBe("Open now · closes 1pm"); // 10:30 BST Mon
  });
  it("is closed for lunch between 1pm and 2pm", () => {
    expect(getOpenStatus(london("2026-10-26T12:30:00Z")).label).toBe("Closed for lunch · reopens 2pm");
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
