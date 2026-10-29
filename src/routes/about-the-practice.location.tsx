import { createFileRoute } from "@tanstack/react-router";
import { Info, Navigation, Phone } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { AddressCard, MapFrame } from "@/components/sections/LocationBlock";
import { Btn } from "@/components/ui-custom/Btn";
import { Reveal } from "@/components/ui-custom/Reveal";
import { practice } from "@/data/practice";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about-the-practice/location")({
  head: () =>
    seo({
      title: "Location",
      description:
        "Oldland Dental Practice is on the main high street in Oldland Common, conveniently situated between Bristol and Bath. Access and parking via The Clamp.",
      path: "/about-the-practice/location",
      breadcrumbs: crumbsFor.about("Location"),
    }),
  component: LocationPage,
});

function LocationPage() {
  return (
    <InnerPage hero="heroAbout" title="Location" crumbs={crumbsFor.about("Location")} group="about">
      <div className="max-w-[68ch] space-y-6 text-[1.08rem]">
        <Reveal>
          <p className="text-[1.2rem] leading-relaxed text-charcoal">
            Oldland Dental Practice can be found on the main high street in the village of Oldland Common, five doors away from
            the doctor's surgery.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div role="note" className="flex gap-4 rounded-[24px] border-l-4 border-teal-dark bg-teal-soft p-6 md:p-7">
            <Info className="mt-0.5 size-6 shrink-0 text-teal-dark" aria-hidden />
            <p className="font-semibold text-charcoal-deep">
              You can access the practice via the rear of the building (The Clamp) where parking is also available. There is no
              access to patients via the front.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.14}>
          <p>We are conveniently situated between Bristol and Bath.</p>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <AddressCard />
        </Reveal>
        <Reveal delay={0.1}>
          <MapFrame className="h-[420px] xl:h-full xl:min-h-[480px]" />
        </Reveal>
      </div>
      <Reveal className="mt-8 flex flex-wrap gap-3">
        <Btn to={practice.links.maps} variant="primary" size="lg" icon={<Navigation className="size-4" />}>
          Get directions
        </Btn>
        <Btn to={practice.phone.href} variant="ghost" size="lg" icon={<Phone className="size-4" />}>
          Call us
        </Btn>
      </Reveal>
    </InnerPage>
  );
}
