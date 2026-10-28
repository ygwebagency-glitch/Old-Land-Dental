import { practice } from "@/data/practice";
import { ToothIcon } from "./icons";

/** Infinite slow trust strip; pauses on hover. */
export function Marquee({ items = practice.trustStrip }: { items?: readonly string[] }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 px-6 whitespace-nowrap">
          <ToothIcon className="size-5 text-teal" />
          <span className="font-display text-2xl text-charcoal md:text-3xl">{t}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Why patients choose us" className="group overflow-hidden border-y border-line bg-on-dark py-6">
      <div className="group-hover-pause flex w-max animate-marquee">
        {row()}
        {row(true)}
      </div>
    </section>
  );
}
