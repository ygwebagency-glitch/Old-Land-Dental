import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
  className,
  light,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Reveal>
          <p className={cn("eyebrow mb-4", light && "text-on-dark-muted")}>{eyebrow}</p>
        </Reveal>
      ) : null}
      <SplitText text={title} as={as} className={cn(as === "h2" ? "text-h2" : "text-h3", light && "text-on-dark")} />
      {intro ? (
        <Reveal delay={0.15}>
          <div className={cn("mt-5 text-lg text-ink-muted", align === "center" && "mx-auto", light && "text-on-dark-muted")}>{intro}</div>
        </Reveal>
      ) : null}
    </div>
  );
}
