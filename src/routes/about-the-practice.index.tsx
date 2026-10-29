import { createFileRoute } from "@tanstack/react-router";
import { Accessibility, Building2, Car, ShieldCheck, Stethoscope } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { Prose } from "@/components/sections/CtaBand";
import { AppLink } from "@/components/ui-custom/AppLink";
import { Btn } from "@/components/ui-custom/Btn";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { practice } from "@/data/practice";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about-the-practice/")({
  head: () =>
    seo({
      title: "About The Practice",
      description:
        "Oldland Dental Practice was established in 2003 to provide quality and affordable dental care in a friendly, relaxed environment in Oldland Common, Bristol.",
      path: "/about-the-practice",
      breadcrumbs: crumbsFor.about(),
    }),
  component: AboutPage,
});

const glance = [
  { icon: Building2, label: "Established 2003" },
  { icon: Stethoscope, label: "NHS & Private" },
  { icon: Accessibility, label: "Wheelchair accessible" },
  { icon: Car, label: "Parking at rear" },
  { icon: ShieldCheck, label: "CQC registered" },
];

function AboutPage() {
  const paragraphs = [
    "Oldland Dental Practice was established in 2003 to provide quality and affordable dental care in a friendly, relaxed environment. We are proud to be a small, independent dental practice not part of a large chain.",
    "It is situated in the heart of the village, Oldland Common, in a beautiful detached, Victorian building.",
    "We provide a mixture of both NHS and private dentistry.",
    "Our practice is known for being friendly, helpful and understanding.",
    "Since 2006, the practice helps and supports Foundation Dentists adapt and work in general practice.",
    "You can usually see the same dentist most of the time however sometimes this is not possible, so please be understanding and work with us.",
    "We are always trying to upgrade our facilities and recently extended the practice to incorporate a new disabled toilet.",
    "The practice is easily accessible to wheelchair users. There are two spacious ground floor surgeries and disabled toilet facilities.",
    <>
      What you think matters! Please{" "}
      <AppLink to="/contact-us" className="font-semibold text-teal-dark underline decoration-teal/40 underline-offset-4 hover:decoration-teal-dark">
        tell us
      </AppLink>{" "}
      what we are doing right or wrong. We are continually striving to improve the service we provide.
    </>,
    "The practice is fully registered with the Care Quality Commissioner.",
    "There is on site parking to rear of the practice",
  ];
  return (
    <InnerPage hero="heroAbout" title="About The Practice" crumbs={crumbsFor.about()} group="about">
      <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <Prose paragraphs={paragraphs} />
          <Reveal className="mt-12 flex flex-wrap gap-3">
            <Btn to={practice.links.booking} variant="accent" size="lg" arrow>
              Book Online
            </Btn>
            <Btn to="/about-the-practice/our-team" variant="ghost" size="lg" arrow>
              Meet the team
            </Btn>
          </Reveal>
        </div>
        <aside aria-label="At a glance">
          <div className="sticky top-[calc(var(--header-h)+32px)] rounded-[24px] bg-sand p-7">
            <p className="eyebrow mb-5">At a glance</p>
            <RevealGroup as="ul" className="space-y-4">
              {glance.map(({ icon: Icon, label }) => (
                <RevealItem as="li" key={label} className="flex items-center gap-3 text-charcoal">
                  <span className="flex size-10 items-center justify-center rounded-full bg-card text-teal-dark shadow-soft">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-semibold">{label}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </aside>
      </div>
    </InnerPage>
  );
}
