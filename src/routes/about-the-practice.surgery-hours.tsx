import { createFileRoute } from "@tanstack/react-router";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { HoursTable } from "@/components/layout/HoursTable";
import { AppLink } from "@/components/ui-custom/AppLink";
import { OpenNowBadge } from "@/components/ui-custom/OpenNowBadge";
import { Reveal } from "@/components/ui-custom/Reveal";
import { SplitText } from "@/components/ui-custom/SplitText";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about-the-practice/surgery-hours")({
  head: () =>
    seo({
      title: "Surgery Hours",
      description: "Normal opening hours for Oldland Dental Practice, Oldland Common, Bristol. Monday to Friday, closed weekends.",
      path: "/about-the-practice/surgery-hours",
      breadcrumbs: crumbsFor.about("Surgery Hours"),
    }),
  component: HoursPage,
});

function HoursPage() {
  return (
    <InnerPage hero="heroAbout" title="Surgery Hours" crumbs={crumbsFor.about("Surgery Hours")} group="about">
      <SplitText text="Normal Opening Hours" className="text-h2" />
      <Reveal>
        <p className="mt-4 text-lg text-ink">Our normal surgery hours are listed below.</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-10 max-w-3xl overflow-hidden rounded-[24px] border border-line bg-card p-3 shadow-soft md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3 px-3 pt-2">
          <span className="font-display text-2xl text-charcoal">This week</span>
          <OpenNowBadge />
        </div>
        <HoursTable showLunch />
      </Reveal>
      <Reveal className="mt-10">
        <p className="text-lg">
          See our{" "}
          <AppLink to="/emergencies" className="font-semibold text-teal-dark underline underline-offset-4">
            "In An Emergency"
          </AppLink>{" "}
          section for what to do in an emergency.
        </p>
      </Reveal>
    </InnerPage>
  );
}
