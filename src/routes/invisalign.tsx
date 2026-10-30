import { createFileRoute } from "@tanstack/react-router";
import { Eye, Move, Smartphone, Sparkles, Utensils } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { Prose } from "@/components/sections/CtaBand";
import { AppLink } from "@/components/ui-custom/AppLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { SplitText } from "@/components/ui-custom/SplitText";
import { TiltCard } from "@/components/ui-custom/TiltCard";
import { practice } from "@/data/practice";
import { invisalignGo } from "@/data/prices";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/invisalign")({
  head: () =>
    seo({
      title: "Invisalign & Aligners",
      description:
        "Clear aligners such as Invisalign straighten teeth discreetly with removable, nearly invisible braces. Invisalign Go available at Oldland Dental Practice, Bristol.",
      path: "/invisalign",
      breadcrumbs: crumbsFor.single("Invisalign"),
    }),
  component: InvisalignPage,
});

const benefits = [
  { label: "Nearly-invisible appliances", Icon: Eye },
  { label: "No dietary restrictions", Icon: Utensils },
  { label: "No obstructions to flossing or brushing", Icon: Sparkles },
  { label: "Controlled single-tooth movement", Icon: Move },
  { label: "Remote monitoring options", Icon: Smartphone },
];

function InvisalignPage() {
  return (
    <InnerPage hero="heroInvisalign" title="Invisalign & Aligners" crumbs={crumbsFor.single("Invisalign")}>
      <div className="grid gap-14 xl:grid-cols-[minmax(0,1fr)_400px]">
        <div>
          <Prose
            paragraphs={[
              "Aligners are removable, nearly invisible, clear braces that attach to your teeth that can, over time, straighten your teeth. Since they're clear, they're nearly invisible which means it's not obvious that you're straightening your teeth.",
              "Examples of clear aligners include Invisalign, which uses a series of virtually invisible, custom-made aligners that gradually straighten your teeth without using any metal wires or brackets.",
              "Aligner treatment allows you to transform your smile discreetly and comfortably with virtually-invisible, removable braces.",
              "Your aligners can discreetly correct several different orthodontic issues to give you a balanced, even smile in as little as a few months.",
              "The aligners look like clear, flexible retainers and are removable, so you can take them out when eating or brushing your teeth.",
            ]}
          />

          <div className="mt-14">
            <SplitText text="Why clear aligners?" className="text-h2" />
            <Reveal>
              <p className="mt-4 max-w-[68ch] text-[1.05rem]">
                To correct an unbalanced smile, a growing number of patients and dentists prefer clear aligners to traditional
                wires and brackets, due to advantages such as:
              </p>
            </Reveal>
            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map(({ label, Icon }) => (
                <RevealItem key={label}>
                  <TiltCard className="rounded-[22px] bg-teal-soft">
                    <div className="flex h-full flex-col gap-4 p-6">
                      <span className="flex size-12 items-center justify-center rounded-full bg-card text-teal-dark transition-transform group-hover/tilt:animate-float">
                        <Icon className="size-5" />
                      </span>
                      <p className="font-semibold text-charcoal-deep">{label}</p>
                    </div>
                  </TiltCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="mt-12">
            <p className="max-w-[68ch] text-[1.08rem]">
              If you're considering braces to straighten your teeth, Invisalign is a discreet option. If you would like to book a
              consultation or have any questions you can give our friendly team a call on{" "}
              <a href={practice.phone.href} className="font-semibold text-teal-dark underline underline-offset-4">
                {practice.phone.display}
              </a>
              . We will endeavour to answer your questions wherever possible.
            </p>
          </Reveal>
          <Reveal className="mt-6">
            <AppLink to="/about-the-practice/our-team#lucy-beard" className="inline-flex min-h-11 items-center font-bold text-teal-dark hover:text-charcoal">
              Meet Lucy →
            </AppLink>
          </Reveal>
        </div>

        <aside aria-label="Invisalign Go prices">
          <Reveal className="rounded-[28px] bg-charcoal p-7 text-on-dark shadow-lift xl:sticky xl:top-[calc(var(--header-h)+32px)] md:p-8">
            <p className="eyebrow text-teal">Pricing</p>
            <p className="mt-2 font-display text-3xl text-on-dark">Invisalign Go</p>
            <p className="mt-2 text-sm text-on-dark-muted italic">{invisalignGo.note}</p>
            <ul className="mt-6 divide-y divide-on-dark/10">
              {invisalignGo.groups[0]!.rows.map((r) => (
                <li key={r.name} className="py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[0.95rem] font-semibold">{r.name}</span>
                    <span className="font-display text-xl whitespace-nowrap text-on-dark">{r.price}</span>
                  </div>
                  {r.note ? <p className="mt-1 text-sm text-on-dark-muted">{r.note}</p> : null}
                </li>
              ))}
            </ul>
            <AppLink
              to="/about-the-practice/prices#invisalign-go"
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-on-dark px-5 text-sm font-bold text-charcoal-deep hover:bg-teal-soft"
            >
              View on prices page →
            </AppLink>
          </Reveal>
        </aside>
      </div>
    </InnerPage>
  );
}
