import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { Btn } from "@/components/ui-custom/Btn";
import { ImageReveal, Reveal } from "@/components/ui-custom/Reveal";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { practice } from "@/data/practice";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/facial-aesthetics")({
  head: () =>
    seo({
      title: "Facial Aesthetics",
      description:
        "Non surgical solutions to improve and maintain the appearance of your skin, including treatments for lines and wrinkles, at Oldland Dental Practice.",
      path: "/facial-aesthetics",
      breadcrumbs: crumbsFor.single("Facial Aesthetics"),
    }),
  component: FacialPage,
});

// TODO(client): provide full Facial Aesthetics content.
function FacialPage() {
  return (
    <InnerPage hero="heroTreatments" title="Facial Aesthetics" crumbs={crumbsFor.single("Facial Aesthetics")}>
      <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="text-[1.3rem] leading-relaxed text-charcoal">
              Oldland Dental Practice now provides comprehensive, non surgical solutions for those who seek to improve and
              maintain the appearance of their skin. We now offer treatments for lines and wrinkles.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-ink-muted">Please contact the practice for more information.</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-3">
            <Btn to={practice.phone.href} variant="primary" size="lg" icon={<Phone className="size-4" />}>
              Call {practice.phone.display}
            </Btn>
            <Btn to="/contact-us" variant="ghost" size="lg" arrow>
              Contact us
            </Btn>
          </Reveal>
        </div>
        <ImageReveal className="rounded-[28px] shadow-lift">
          <SmartImage imageKey="tx.aesthetic" aspect="4/5" />
        </ImageReveal>
      </div>
    </InnerPage>
  );
}
