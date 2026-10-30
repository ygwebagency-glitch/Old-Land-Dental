import { createFileRoute } from "@tanstack/react-router";
import { Phone, PhoneCall } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { HoursTable } from "@/components/layout/HoursTable";
import { AppLink } from "@/components/ui-custom/AppLink";
import { OpenNowBadge } from "@/components/ui-custom/OpenNowBadge";
import { RedCross } from "@/components/ui-custom/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { SplitText } from "@/components/ui-custom/SplitText";
import { practice } from "@/data/practice";
import { emergencyPrices } from "@/data/prices";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/emergencies")({
  head: () =>
    seo({
      title: "In An Emergency",
      description:
        "Dental emergency? Registered patients call Oldland Dental Practice on 0117 9324455. Out of hours NHS patients including children call 111.",
      path: "/emergencies",
      breadcrumbs: crumbsFor.single("Emergencies"),
    }),
  component: EmergenciesPage,
});

function EmergenciesPage() {
  return (
    <InnerPage hero="heroEmergency" title="In An Emergency" crumbs={crumbsFor.single("Emergencies")}>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <RedCross className="size-8" />
        <OpenNowBadge />
      </div>

      <RevealGroup className="grid gap-5 md:grid-cols-2">
        <RevealItem>
          <a
            href={practice.phone.href}
            className="group flex h-full flex-col justify-between gap-8 rounded-[28px] bg-charcoal p-8 text-on-dark shadow-lift transition-transform duration-500 hover:-translate-y-1 md:p-10"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-14 items-center justify-center rounded-full bg-on-dark">
                <RedCross className="size-7" />
              </span>
              <span className="text-sm font-bold tracking-[0.16em] text-on-dark-muted uppercase">Call the practice</span>
            </span>
            <span>
              <span className="block font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-on-dark">{practice.phone.display}</span>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-teal">
                <Phone className="size-4" /> Tap to call
              </span>
            </span>
          </a>
        </RevealItem>
        <RevealItem>
          <a
            href={practice.outOfHours.href}
            className="group flex h-full flex-col justify-between gap-8 rounded-[28px] border-2 border-danger/40 bg-card p-8 shadow-soft transition-transform duration-500 hover:-translate-y-1 md:p-10"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-14 items-center justify-center rounded-full bg-sand">
                <PhoneCall className="size-6 text-danger" />
              </span>
              <span className="text-sm font-bold tracking-[0.16em] text-ink-muted uppercase">Out of hours (NHS patients incl. children)</span>
            </span>
            <span>
              <span className="block font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-charcoal">call 111</span>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-teal-dark">
                <Phone className="size-4" /> Tap to call
              </span>
            </span>
          </a>
        </RevealItem>
      </RevealGroup>

      <div className="mt-12 grid gap-12 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="max-w-[68ch] space-y-5 text-[1.08rem]">
          <Reveal>
            <p className="text-[1.2rem] leading-relaxed text-charcoal">
              Registered patients of the practice may access an emergency appointment by phoning the practice. Your problem will
              be triaged and if necessary an emergency appointment offered. It is advisable to call the practice as soon as the
              practice opens.
            </p>
          </Reveal>
          <Reveal>
            <p className="font-display text-2xl text-teal-dark">We always aim to see emergencies the same day.</p>
          </Reveal>
          <Reveal>
            <h2 className="pt-4 text-xl font-semibold text-charcoal underline decoration-teal decoration-2 underline-offset-[6px] [font-family:var(--font-sans)]">
              For Out-of-hours Emergency treatment and advice i.e when the practice is closed on an evening and over weekends and
              bank holidays:
            </h2>
          </Reveal>
          <Reveal>
            <p className="rounded-[20px] bg-teal-soft p-5 font-semibold text-charcoal-deep">
              For NHS patients including children :{" "}
              <a href={practice.outOfHours.href} className="underline">
                call 111
              </a>
            </p>
          </Reveal>
          <Reveal>
            <p className="rounded-[20px] bg-sand p-5 text-charcoal-deep">
              For Practice Plan and Private patients. The practice is part of the Keynsham and District Emergency Rota Team of
              dentists. Please telephone the practice on{" "}
              <a href={practice.phone.href} className="font-semibold underline">
                {practice.phone.display}
              </a>{" "}
              and details of the on-call dentist will be available on the answer machine.
            </p>
          </Reveal>

          <div className="pt-8">
            <SplitText text="NHS Urgent Dental Care" className="text-h2" />
            <div className="mt-5 space-y-4">
              {[
                "If you're experiencing dental pain or have an urgent dental problem, we offer NHS unscheduled care appointments to help relieve your symptoms. These are available for new and existing patients who need urgent help when they are in pain or their oral health needs prompt treatment to prevent significant deterioration.",
                "These appointments are for emergency treatment only and are intended to get you out of pain or manage your immediate dental issue.",
                "Please note that attending an NHS unscheduled, urgent care appointment does not register you as a patient at our practice. It is a one-off appointment and does not include ongoing routine dental care.",
                "If you think you need unscheduled care, please speak to a member of our team and we will advise you on the next steps.",
              ].map((p, i) => (
                <Reveal key={i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5" aria-label="Hours and emergency fees">
          <Reveal className="rounded-[24px] border border-line bg-card p-5 shadow-soft">
            <p className="mb-3 px-3 font-display text-2xl text-charcoal">Surgery hours</p>
            <HoursTable compact />
          </Reveal>
          {emergencyPrices.groups[0].rows.map((r) => (
            <Reveal key={r.name} className="rounded-[22px] bg-sand p-5">
              <p className="text-sm text-ink-muted">{r.name}</p>
              <p className="mt-1 font-display text-2xl text-charcoal">{r.price}</p>
            </Reveal>
          ))}
          <AppLink to="/about-the-practice/prices#emergency" className="inline-flex min-h-11 items-center px-1 font-bold text-teal-dark">
            See all prices →
          </AppLink>
        </aside>
      </div>
    </InnerPage>
  );
}
