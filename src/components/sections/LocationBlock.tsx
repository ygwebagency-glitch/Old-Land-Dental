import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { practice, external } from "@/data/practice";
import { Reveal } from "@/components/ui-custom/Reveal";
import { Btn } from "@/components/ui-custom/Btn";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { OpenNowBadge } from "@/components/ui-custom/OpenNowBadge";

export function MapFrame({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[24px] bg-sand shadow-soft ${className}`}>
      <iframe
        title="Map showing Oldland Dental Practice, 206 High Street, Oldland Common"
        src={practice.links.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}

export function AddressCard() {
  return (
    <div className="flex h-full flex-col rounded-[24px] bg-charcoal p-8 text-on-dark shadow-lift md:p-10">
      <MapPin className="mb-6 size-8 text-teal" aria-hidden />
      <address className="font-display text-2xl leading-snug not-italic text-on-dark md:text-[1.7rem]">
        {practice.address.lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </address>
      <div className="mt-6">
        <OpenNowBadge tone="dark" />
      </div>
      <ul className="mt-6 space-y-1 text-[0.98rem] font-semibold">
        <li>
          <a href={practice.phone.href} className="inline-flex min-h-11 items-center gap-3 hover:text-teal">
            <Phone className="size-4 text-teal" /> {practice.phone.display}
          </a>
        </li>
        <li>
          <a href={practice.email.href} className="inline-flex min-h-11 items-center gap-3 hover:text-teal">
            <Mail className="size-4 text-teal" /> email us
          </a>
        </li>
        <li>
          <a href={practice.links.maps} {...external} className="inline-flex min-h-11 items-center gap-3 hover:text-teal">
            <Navigation className="size-4 text-teal" /> find us
          </a>
        </li>
      </ul>
    </div>
  );
}

export function LocationBlock() {
  return (
    <section className="section-pad bg-background" aria-labelledby="location-heading">
      <div className="container-site">
        <SectionHeading eyebrow="Between Bristol and Bath" title="Visit the practice" className="mb-12" />
        <span id="location-heading" className="sr-only">
          Visit the practice
        </span>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <AddressCard />
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <MapFrame className="h-[380px] lg:h-full lg:min-h-[460px]" />
            <div className="absolute right-4 bottom-4">
              <Btn to={practice.links.maps} variant="primary" size="md" icon={<Navigation className="size-4" />}>
                Get directions
              </Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
