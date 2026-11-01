import { createFileRoute } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { useSectionSpy } from "@/hooks/use-section-spy";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { SmartImage } from "@/components/ui-custom/SmartImage";
import { SplitText } from "@/components/ui-custom/SplitText";
import { TiltCard } from "@/components/ui-custom/TiltCard";
import { administration, dentists, hygienist, nurses, type Clinician } from "@/data/team";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about-the-practice/our-team")({
  head: () =>
    seo({
      title: "Our Team",
      description:
        "Meet the dentists, hygienist, dental nurses and reception team at Oldland Dental Practice, Oldland Common, Bristol.",
      path: "/about-the-practice/our-team",
      breadcrumbs: crumbsFor.about("Our Team"),
    }),
  component: TeamPage,
});

const sections = [
  { id: "t1", label: "Dentists" },
  { id: "t2", label: "Hygienist" },
  { id: "t3", label: "Dental Nurses" },
  { id: "t4", label: "Administration" },
];
const sectionIds = sections.map((s) => s.id);

function BioDialog({ person, onClose }: { person: Clinician | null; onClose: () => void }) {
  return (
    <DialogPrimitive.Root open={!!person} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-charcoal-deep/55 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[28px] bg-background shadow-lift data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=open]:duration-500 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[min(560px,92vw)] md:rounded-t-none md:rounded-l-[28px] md:data-[state=open]:slide-in-from-right md:data-[state=closed]:slide-out-to-right"
        >
          {person ? (
            <div className="overflow-y-auto overscroll-contain" data-lenis-prevent>
              <div className="relative">
                <SmartImage imageKey={person.image} aspect="4/3" focal="50% 25%" />
                <DialogPrimitive.Close
                  aria-label="Close biography"
                  className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-background/90 text-charcoal shadow-soft"
                >
                  <X className="size-5" />
                </DialogPrimitive.Close>
              </div>
              <div className="p-7 md:p-10">
                <p className="eyebrow">{person.role}</p>
                <DialogPrimitive.Title className="type-h2 mt-2">{person.name}</DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
                  {person.qualifications ? <span className="rounded-full bg-sand px-3 py-1 text-charcoal">{person.qualifications}</span> : null}
                  {person.gdc ? <span className="rounded-full bg-teal-soft px-3 py-1 text-charcoal">GDC No. {person.gdc}</span> : null}
                </DialogPrimitive.Description>
                <div className="mt-6 space-y-4 text-[1.02rem] text-ink">
                  {person.bio.map((b, i) => (
                    <p key={i}>{b}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function PersonCard({ p, onOpen }: { p: Clinician; onOpen: () => void }) {
  return (
    <TiltCard className="rounded-[24px] bg-card shadow-soft">
      <article id={p.id} className="flex h-full scroll-mt-40 flex-col overflow-hidden rounded-[24px]">
        <div className="overflow-hidden">
          <SmartImage imageKey={p.image} aspect="4/5" imgClassName="transition-transform duration-700 group-hover/tilt:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl text-charcoal">{p.name}</h3>
          <p className="mt-1 text-sm text-ink-muted">{p.role}</p>
          <button
            type="button"
            onClick={onOpen}
            className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border-[1.5px] border-charcoal px-5 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-on-dark"
            aria-haspopup="dialog"
          >
            Biography <ArrowUpRight className="size-4" />
          </button>
        </div>
      </article>
    </TiltCard>
  );
}

function TeamPage() {
  const [open, setOpen] = useState<Clinician | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { active, linkProps } = useSectionSpy(sectionIds, navRef);

  return (
    <InnerPage hero="heroAbout" title="Our Team" crumbs={crumbsFor.about("Our Team")} group="about">
      <Reveal>
        <p className="max-w-[62ch] text-[1.2rem] leading-relaxed text-charcoal">
          Everyone at our practice is committed to providing you with the very best in dental healthcare. Our team bring a
          wealth of experience to the practice and have individually obtained high standards of professional qualification.
        </p>
      </Reveal>

      <nav ref={navRef} aria-label="Team sections" className="sticky top-[calc(var(--header-h)+12px)] z-20 -mx-2 mt-10 mb-12">
        <ul className="no-scrollbar flex gap-2 overflow-x-auto rounded-full border border-line bg-background/90 p-1.5 shadow-soft backdrop-blur-md">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                {...linkProps(s.id)}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                  active === s.id ? "bg-charcoal text-on-dark" : "text-charcoal hover:bg-teal-soft",
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="t1" className="scroll-mt-40" aria-labelledby="t1-h">
        <SplitText id="t1-h" text="Dentists" className="type-h2 mb-8" />
        <RevealGroup className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {dentists.map((d) => (
            <RevealItem key={d.id}>
              <PersonCard p={d} onOpen={() => setOpen(d)} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="t2" className="mt-20 scroll-mt-40" aria-labelledby="t2-h">
        <SplitText id="t2-h" text="Hygienist" className="type-h2 mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <Reveal>
            <PersonCard p={hygienist} onOpen={() => setOpen(hygienist)} />
          </Reveal>
        </div>
      </section>

      <section id="t3" className="mt-20 scroll-mt-40" aria-labelledby="t3-h">
        <SplitText id="t3-h" text="Dental Nurses" className="type-h2 mb-8" />
        <Reveal className="overflow-hidden rounded-[24px] shadow-soft">
          <SmartImage imageKey="team.nurses" aspect="4/3" className="md:hidden" />
          <SmartImage imageKey="team.nurses" aspect="16/9" className="hidden md:block" />
        </Reveal>
        <RevealGroup as="ul" className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {nurses.map((n) => (
            <RevealItem as="li" key={n.gdc} className="rounded-[20px] border border-line bg-card p-5">
              <p className="font-display text-xl text-charcoal">{n.name}</p>
              <p className="mt-1 text-sm text-ink-muted">Dental Nurse · GDC No. {n.gdc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="t4" className="mt-20 scroll-mt-40" aria-labelledby="t4-h">
        <SplitText id="t4-h" text="Administration" className="type-h2 mb-8" />
        <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2">
          {administration.map((n) => (
            <RevealItem as="li" key={n} className="rounded-[20px] bg-sand p-5">
              <p className="font-display text-xl text-charcoal">{n}</p>
              <p className="mt-1 text-sm text-ink-muted">Receptionist</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <CtaBand />
      <BioDialog person={open} onClose={() => setOpen(null)} />
    </InnerPage>
  );
}
