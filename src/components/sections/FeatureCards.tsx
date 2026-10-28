import { HouseCrossIcon, SmilePlusIcon, SyringeIcon } from "@/components/ui-custom/icons";
import { TiltCard } from "@/components/ui-custom/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { Btn } from "@/components/ui-custom/Btn";
import { ToneSection } from "@/components/ui-custom/ToneSection";

const features = [
  {
    title: "Independent",
    text: "We are proud to be a small, independent dental practice not part of a large chain.",
    to: "/about-the-practice",
    Icon: HouseCrossIcon,
  },
  {
    title: "Improve Your Skin",
    text: "Non surgical solutions for those who seek to improve and maintain the appearance of their skin",
    to: "/facial-aesthetics",
    Icon: SyringeIcon,
  },
  {
    title: "Improve Your Smile",
    text: "We provide excellent dental care with both NHS and private treatment options available.",
    to: "/dental-treatments",
    Icon: SmilePlusIcon,
  },
];

export function FeatureCards() {
  return (
    <ToneSection tone="grey" className="section-pad" ariaLabel="Why choose Oldland Dental">
      <RevealGroup className="container-site grid gap-6 md:grid-cols-3">
        {features.map(({ title, text, to, Icon }) => (
          <RevealItem key={title}>
            <TiltCard className="rounded-[24px] bg-card shadow-soft">
              <article className="flex h-full flex-col items-start p-8 md:p-10">
                <span className="mb-8 flex size-20 items-center justify-center rounded-full bg-teal-soft text-charcoal transition-transform duration-500 group-hover/tilt:-translate-y-1.5 group-hover/tilt:animate-float">
                  <Icon className="size-11" />
                </span>
                <h3 className="text-h3">{title}</h3>
                <p className="mt-3 mb-8 flex-1 text-ink-muted">{text}</p>
                <Btn to={to} variant="ghost" size="sm" arrow>
                  Discover More
                </Btn>
              </article>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </ToneSection>
  );
}
