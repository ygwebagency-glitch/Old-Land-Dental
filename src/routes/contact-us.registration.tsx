import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { OfferBanner } from "@/components/sections/OfferBanner";
import { Btn } from "@/components/ui-custom/Btn";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { practice } from "@/data/practice";
import { newPatientIncludes } from "@/data/prices";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact-us/registration")({
  head: () =>
    seo({
      title: "Registration",
      description:
        "Register as a new patient at Oldland Dental Practice, Bristol — now only £70 including x-rays. Sign up online and choose a time that suits you.",
      path: "/contact-us/registration",
      breadcrumbs: crumbsFor.contact("Registration"),
    }),
  component: RegistrationPage,
});

function RegistrationPage() {
  return (
    <InnerPage hero="heroContact" title="Registration" crumbs={crumbsFor.contact("Registration")} group="contact">
      <OfferBanner text={practice.newPatientOfferAlt} />
      <div className="mt-10 max-w-[68ch] space-y-5 text-[1.08rem]">
        <Reveal>
          <p className="text-[1.25rem] leading-relaxed text-charcoal">
            We're excited to welcome you as a new patient with Oldland dental practice.
          </p>
        </Reveal>
        <Reveal>
          <p>
            We've made booking your first appointment easier. Simply click on the button below to enter your details and choose a
            time that suits you and a member of our team will be in contact within 48 hours to take a deposit to secure your
            appointment
          </p>
        </Reveal>
        <Reveal className="py-3">
          <Btn to={practice.links.booking} variant="accent" size="xl" arrow>
            SIGN UP HERE
          </Btn>
        </Reveal>
        <Reveal>
          <p>
            From your very first visit, we're committed to making your experience comfortable, stress-free, and tailored to your
            dental needs.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-14 rounded-[28px] bg-sand p-8 md:p-10">
        <h2 className="type-h3">What your £70 new-patient consultation includes</h2>
        <RevealGroup as="ul" className="mt-6 grid gap-3 sm:grid-cols-2">
          {newPatientIncludes.map((i) => (
            <RevealItem as="li" key={i} className="flex items-start gap-3 rounded-[18px] bg-card p-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-dark text-on-dark">
                <Check className="size-4" aria-hidden />
              </span>
              <span className="font-semibold text-charcoal">{i}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>
    </InnerPage>
  );
}
