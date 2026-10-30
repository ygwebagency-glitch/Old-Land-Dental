import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui-custom/Reveal";

export function OfferBanner({ text }: { text: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 rounded-[22px] bg-charcoal p-5 text-on-dark shadow-soft md:p-6">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-dark">
          <Sparkles className="size-5" aria-hidden />
        </span>
        <p className="font-display text-xl leading-snug text-on-dark md:text-2xl">{text}</p>
      </div>
    </Reveal>
  );
}
