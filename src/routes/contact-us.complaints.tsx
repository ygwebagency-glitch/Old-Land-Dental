import { createFileRoute } from "@tanstack/react-router";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { Prose } from "@/components/sections/CtaBand";
import { PdfIcon } from "@/components/ui-custom/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { SplitText } from "@/components/ui-custom/SplitText";
import { practice, external } from "@/data/practice";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact-us/complaints")({
  head: () =>
    seo({
      title: "Complaints",
      description:
        "Oldland Dental Practice takes complaints very seriously. Read our complaints procedure and find out how to contact us.",
      path: "/contact-us/complaints",
      breadcrumbs: crumbsFor.contact("Complaints"),
    }),
  component: ComplaintsPage,
});

function ComplaintsPage() {
  return (
    <InnerPage hero="heroContact" title="Complaints" crumbs={crumbsFor.contact("Complaints")} group="contact">
      <Prose
        paragraphs={[
          "Oldland Dental Practice takes complaints very seriously and tries to ensure that all our patients are pleased with their experience of our service. When patients complain, they are dealt with courteously and promptly so that the matter is resolved as quickly as possible. Our aim is to react to complaints in the way in which we would want our complaint about a service to be handled. We learn from every mistake that we make and we respond to customers' concerns in a caring and sensitive way.",
          "If you have a complaint or concern about the service you have received from the dentists or any of the staff working in this practice, please let us know. We operate a practice complaints procedure. Our complaint system adheres to national criteria. Please see our ' Policy for Handling Patient Complaints'. If you would like to make a complaint about any aspect of your experience at the practice, please contact the practice by either speaking to one of our members of staff direct or by letter or email.",
        ]}
      />

      <div className="mt-12">
        <SplitText text="Complaining on behalf of someone else" className="type-h3" />
        <Reveal>
          <p className="mt-4 max-w-[68ch] text-[1.05rem]">
            Please note that we keep strictly to the rules of confidentiality. If you are complaining on behalf of someone else,
            we have to know that you have the permission to do so. A note signed by the person concerned will be needed, unless
            that are incapable of providing this because of physical or mental illness or are a child under 16 years.
          </p>
        </Reveal>
      </div>

      <div className="mt-12">
        <SplitText text="Complaints Procedure/Policy" className="type-h3" />
        <Reveal className="mt-5">
          <a
            href={practice.links.complaintsPdf}
            {...external}
            className="group flex items-center gap-5 rounded-[24px] border border-line bg-card p-6 shadow-soft transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="flex size-16 shrink-0 items-center justify-center rounded-[18px] bg-teal-soft text-teal-dark">
              <PdfIcon className="size-8" />
            </span>
            <span className="flex-1 text-[1.05rem] text-charcoal">Please click here to view/download our latest complaints procedure/policy.</span>
            <Download className="size-5 text-teal-dark transition-transform group-hover:translate-y-0.5" aria-hidden />
          </a>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
        <RevealItem>
          <a href={practice.phone.href} className="flex h-full flex-col gap-3 rounded-[22px] bg-sand p-6 hover:bg-teal-soft">
            <Phone className="size-6 text-teal-dark" aria-hidden />
            <span className="text-sm font-bold tracking-widest text-ink-muted uppercase">Phone</span>
            <span className="font-display text-2xl text-charcoal">{practice.phone.display}</span>
          </a>
        </RevealItem>
        <RevealItem>
          <a href={practice.email.href} className="flex h-full flex-col gap-3 rounded-[22px] bg-sand p-6 hover:bg-teal-soft">
            <Mail className="size-6 text-teal-dark" aria-hidden />
            <span className="text-sm font-bold tracking-widest text-ink-muted uppercase">Email</span>
            <span className="font-display text-xl break-all text-charcoal">{practice.email.display}</span>
          </a>
        </RevealItem>
        <RevealItem>
          <div className="flex h-full flex-col gap-3 rounded-[22px] bg-sand p-6">
            <MapPin className="size-6 text-teal-dark" aria-hidden />
            <span className="text-sm font-bold tracking-widest text-ink-muted uppercase">Letters</span>
            <address className="not-italic text-charcoal">{practice.address.lines.join(", ")}</address>
          </div>
        </RevealItem>
      </RevealGroup>
    </InnerPage>
  );
}
