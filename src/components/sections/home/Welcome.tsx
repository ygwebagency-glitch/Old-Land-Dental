import { HouseMarkDraw, DrawLine } from "@/components/ui-custom/LogoMark";
import { CountUp } from "@/components/ui-custom/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { SplitText } from "@/components/ui-custom/SplitText";
import { dentists } from "@/data/team";
import { practice } from "@/data/practice";

const paragraphs = [
  "We have been an established dental practice in Oldland Common, Bristol for over 20 years and pride ourselves on offering the very best in patient care in a warm and homely environment.",
  "Our professional team is committed to providing excellent quality dental care and treatment to you and your family.",
  "We hope you enjoy browsing our website.",
];

export function Welcome() {
  return (
    <section className="section-pad bg-background" aria-labelledby="welcome-heading">
      <div className="container-site grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
        <div>
          <HouseMarkDraw className="mb-8 h-20 w-24 text-charcoal" />
          <SplitText id="welcome-heading" text="Welcome To Oldland Dental:" className="type-h2" />
          <div className="mt-8 max-w-[60ch] space-y-5 text-lg text-ink">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "text-xl leading-relaxed text-charcoal" : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <RevealGroup className="grid grid-cols-2 content-center gap-x-8 gap-y-12 self-center">
          {[
            { value: <CountUp value={practice.established} from={1990} />, label: "Established" },
            { value: <CountUp value={20} suffix="+" />, label: "Years in Oldland Common" },
            { value: <CountUp value={dentists.length} />, label: "Dentists" },
            { value: <span>NHS + Private</span>, label: "Care options", small: true },
          ].map((f, i) => (
            <RevealItem key={i}>
              <DrawLine className="mb-5 text-charcoal/25" />
              <p className={f.small ? "font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-charcoal" : "font-display text-[clamp(3rem,6vw,4.75rem)] leading-none text-charcoal"}>
                {f.value}
              </p>
              <p className="mt-3 text-sm font-bold tracking-[0.14em] text-teal-dark uppercase">{f.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
