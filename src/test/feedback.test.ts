import { describe, expect, it } from "vitest";
import { validateFeedback } from "@/components/sections/FeedbackForm";
import { buildFeedbackMailto } from "@/lib/forms";

const valid = {
  title: "",
  firstName: "Jo",
  lastName: "Smith",
  countryCode: "+44",
  phone: "07700 900123",
  email: "jo@example.com",
  comments: "Lovely visit today, thanks.",
  privacy: true,
};

describe("Feedback form rules", () => {
  it("accepts a complete form", () => {
    expect(validateFeedback(valid)).toEqual({});
  });
  it("requires the privacy policy box", () => {
    expect(validateFeedback({ ...valid, privacy: false }).privacy).toBeTruthy();
  });
  it("requires at least 10 characters of comments", () => {
    expect(validateFeedback({ ...valid, comments: "too short" }).comments).toBeTruthy();
  });
  it("rejects an invalid email", () => {
    expect(validateFeedback({ ...valid, email: "jo@" }).email).toBeTruthy();
  });
  it("sends to the practice inbox with subject 'Website feedback'", () => {
    const href = buildFeedbackMailto(valid);
    expect(href.startsWith("mailto:info@oldlanddental.co.uk?subject=Website%20feedback")).toBe(true);
  });
});
