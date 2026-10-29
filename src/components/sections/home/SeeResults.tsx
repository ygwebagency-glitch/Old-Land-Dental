import { SmartImage } from "@/components/ui-custom/SmartImage";
import { ImageReveal, Reveal } from "@/components/ui-custom/Reveal";
import { SplitText } from "@/components/ui-custom/SplitText";
import { Btn } from "@/components/ui-custom/Btn";
import { ToneSection } from "@/components/ui-custom/ToneSection";

export function SeeResults() {
  return (
    <ToneSection tone="blush" className="section-pad overflow-hidden" ariaLabelledby="results-heading">
      <div className="container-site grid items-center gap-12 md:grid-cols-2 lg:gap-24">
        <ImageReveal className="rounded-[28px] shadow-lift">
          <SmartImage imageKey="seeResults" aspect="4/5" />
        </ImageReveal>
        <div>
          <Reveal>
            <p className="eyebrow text-charcoal">Smile gallery</p>
          </Reveal>
          <SplitText id="results-heading" text="See Our Results" className="text-h2 mt-4" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-charcoal-deep">
              Oldland Dental Practice now provides comprehensive, non surgical solutions for those who seek to improve and
              maintain the appearance of their skin. Take a look at our gallery of work to see how we can transform your smile
              and improve your confidence in everyday life.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-9">
            <Btn to="/our-smile-gallery" variant="primary" size="lg" arrow>
              See our smile gallery
            </Btn>
          </Reveal>
        </div>
      </div>
    </ToneSection>
  );
}
