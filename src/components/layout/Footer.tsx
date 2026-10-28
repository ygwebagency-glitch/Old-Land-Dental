import { Mail, MapPin, Phone } from "lucide-react";
import { practice, external } from "@/data/practice";
import { Btn } from "@/components/ui-custom/Btn";
import { AppLink } from "@/components/ui-custom/AppLink";
import { OpenNowBadge } from "@/components/ui-custom/OpenNowBadge";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { InstagramIcon } from "@/components/ui-custom/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { Logo } from "@/components/ui-custom/LogoMark";
import { HoursTable } from "./HoursTable";

const instaKeys = ["instagram.0", "instagram.1", "instagram.2", "instagram.3"] as const;

export function Footer() {
  return (
    <footer className="bg-charcoal text-on-dark" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      {/* CTA row */}
      <div className="container-site border-b border-on-dark/10 py-14 md:py-20">
        <Reveal className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Logo light className="mb-6 h-8 lg:h-10" />
            <p className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-on-dark">
              <a href={practice.phone.href} className="transition-colors hover:text-teal">
                Call {practice.phone.display}
              </a>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to={practice.links.booking} variant="accent" size="lg" arrow>
                Book Online
              </Btn>
              <Btn to={practice.phone.href} variant="ghostLight" size="lg" icon={<Phone className="size-4" />}>
                Call us
              </Btn>
            </div>
          </div>
          <div className="rounded-[24px] border border-on-dark/10 bg-on-dark/5 p-6 md:p-8">
            <address className="text-lg not-italic leading-relaxed text-on-dark/90">
              {practice.address.street}, {practice.address.locality},<br />
              {practice.address.city}, {practice.address.postcode}
            </address>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-semibold">
              <a href={practice.email.href} className="inline-flex min-h-11 items-center gap-2 text-teal hover:text-on-dark">
                <Mail className="size-4" /> Email us
              </a>
              <a href={practice.links.maps} {...external} className="inline-flex min-h-11 items-center gap-2 text-teal hover:text-on-dark">
                <MapPin className="size-4" /> Find us
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Columns */}
      <RevealGroup className="container-site grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1.3fr_0.8fr_1fr] lg:gap-10">
        <RevealItem>
          <h3 className="mb-4 font-display text-2xl text-on-dark">Opening Hours</h3>
          <HoursTable tone="dark" compact />
          <OpenNowBadge tone="dark" className="mt-4" />
        </RevealItem>
        <RevealItem>
          <h3 className="mb-4 font-display text-2xl text-on-dark">In An Emergency</h3>
          <p className="text-[0.95rem] leading-relaxed text-on-dark-muted">{practice.emergencyFooterText}</p>
          <AppLink to="/emergencies" className="mt-4 inline-flex min-h-11 items-center font-semibold text-teal hover:text-on-dark">
            Emergency information →
          </AppLink>
        </RevealItem>
        <RevealItem>
          <h3 className="mb-4 font-display text-2xl text-on-dark">Privacy Information</h3>
          <a href={practice.links.privacyPdf} {...external} className="inline-flex min-h-11 items-center font-semibold text-teal hover:text-on-dark">
            Privacy Policy
          </a>
        </RevealItem>
        <RevealItem>
          <h3 className="mb-4 font-display text-2xl text-on-dark">Find Us On Instagram</h3>
          <ul className="grid max-w-[18rem] grid-cols-2 gap-2.5">
            {instaKeys.map((k) => (
              <li key={k}>
                <a
                  href={practice.links.instagram}
                  {...external}
                  aria-label={`Oldland Dental on Instagram`}
                  className="group block overflow-hidden rounded-[14px]"
                >
                  <SmartImage imageKey={k} aspect="1/1" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                </a>
              </li>
            ))}
          </ul>
          <Btn to={practice.links.instagram} variant="ghostLight" size="sm" className="mt-4" icon={<InstagramIcon className="size-4" />}>
            Follow {practice.links.instagramHandle}
          </Btn>
        </RevealItem>
      </RevealGroup>

      <div className="border-t border-on-dark/10 pb-20 md:pb-0">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>© {practice.name} 2026</p>
          <div className="flex flex-wrap gap-x-6">
            <a href={practice.links.privacyPdf} {...external} className="inline-flex min-h-11 items-center hover:text-on-dark">
              Privacy policy
            </a>
            <AppLink to="/sitemap" className="inline-flex min-h-11 items-center hover:text-on-dark">
              Site map
            </AppLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
