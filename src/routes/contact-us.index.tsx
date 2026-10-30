import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { HoursTable } from "@/components/layout/HoursTable";
import { FeedbackForm } from "@/components/sections/FeedbackForm";
import { MapFrame } from "@/components/sections/LocationBlock";
import { OpenNowBadge } from "@/components/ui-custom/OpenNowBadge";
import { Reveal } from "@/components/ui-custom/Reveal";
import { practice, external } from "@/data/practice";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact-us/")({
  head: () =>
    seo({
      title: "Contact Us",
      description:
        "We value your feedback. Call Oldland Dental Practice on 0117 9324455 or use our online feedback form. 206 High Street, Oldland Common, Bristol.",
      path: "/contact-us",
      breadcrumbs: crumbsFor.contact(),
    }),
  component: ContactPage,
});

function ContactCard() {
  const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition-colors";
  return (
    <div className="rounded-[26px] border border-line bg-card p-7 shadow-soft md:p-8">
      <p className="eyebrow">Get in touch</p>
      <address className="mt-4 font-display text-2xl leading-snug not-italic text-charcoal">
        {practice.address.lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </address>
      <ul className="mt-5 space-y-1 font-semibold">
        <li>
          <a href={practice.phone.href} className="inline-flex min-h-11 items-center gap-3 text-charcoal hover:text-teal-dark">
            <Phone className="size-4 text-teal-dark" /> {practice.phone.display}
          </a>
        </li>
        <li>
          <a href={practice.email.href} className="inline-flex min-h-11 items-center gap-3 break-all text-charcoal hover:text-teal-dark">
            <Mail className="size-4 shrink-0 text-teal-dark" /> {practice.email.display}
          </a>
        </li>
      </ul>
      <div className="mt-6 border-t border-line pt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="font-display text-xl text-charcoal">Opening hours</span>
          <OpenNowBadge />
        </div>
        <HoursTable compact />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <a href={practice.phone.href} className={`${btn} bg-charcoal text-on-dark hover:bg-charcoal-deep`}>
          <Phone className="size-4" /> Call
        </a>
        <a href={practice.email.href} className={`${btn} border-[1.5px] border-charcoal text-charcoal hover:bg-charcoal hover:text-on-dark`}>
          <Mail className="size-4" /> Email
        </a>
        <a href={practice.links.maps} {...external} className={`${btn} border-[1.5px] border-charcoal text-charcoal hover:bg-charcoal hover:text-on-dark`}>
          <MapPin className="size-4" /> Directions
        </a>
        <a href={practice.links.booking} {...external} className={`${btn} bg-teal-dark text-on-dark hover:bg-charcoal`}>
          <CalendarCheck className="size-4" /> Book Online
        </a>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <InnerPage hero="heroContact" title="We Value Your Feedback" crumbs={crumbsFor.contact()} group="contact">
      <Reveal>
        <p className="max-w-[60ch] text-[1.2rem] leading-relaxed text-charcoal">
          We are always keen to hear your views so please feel free to call us or use our online feedback form.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-10 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Reveal>
          <FeedbackForm />
        </Reveal>
        <aside aria-label="Contact details">
          <div className="xl:sticky xl:top-[calc(var(--header-h)+32px)]">
            <ContactCard />
          </div>
        </aside>
      </div>
      <Reveal className="mt-14">
        <MapFrame className="h-[380px] md:h-[440px]" />
      </Reveal>
    </InnerPage>
  );
}
