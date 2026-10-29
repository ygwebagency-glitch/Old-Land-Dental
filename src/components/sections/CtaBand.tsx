import { Phone } from "lucide-react";
import { practice } from "@/data/practice";
import { Btn } from "@/components/ui-custom/Btn";
import { Reveal } from "@/components/ui-custom/Reveal";
import { cn } from "@/lib/utils";

/** Rounded call-to-action band: Book Online + Call. */
export function CtaBand({ title = "Ready to book your visit?", className }: { title?: string; className?: string }) {
  return (
    <Reveal className={cn("mt-14 overflow-hidden rounded-[28px] bg-brand-gradient p-8 md:p-12", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-charcoal">{title}</p>
        <div className="flex flex-wrap gap-3">
          <Btn to={practice.links.booking} variant="accent" size="lg" arrow>
            Book Online
          </Btn>
          <Btn to={practice.phone.href} variant="ghost" size="lg" icon={<Phone className="size-4" />}>
            Call {practice.phone.display}
          </Btn>
        </div>
      </div>
    </Reveal>
  );
}

/** Verbatim body paragraphs with staggered reveal */
export function Prose({ paragraphs, className }: { paragraphs: React.ReactNode[]; className?: string }) {
  return (
    <div className={cn("prose-body text-[1.08rem] text-ink", className)}>
      {paragraphs.map((p, i) => (
        <Reveal key={i} delay={Math.min(i, 6) * 0.06}>
          <p className={i === 0 ? "text-[1.2rem] leading-relaxed text-charcoal" : undefined}>{p}</p>
        </Reveal>
      ))}
    </div>
  );
}
