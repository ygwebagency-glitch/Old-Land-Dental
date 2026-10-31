import { createFileRoute } from "@tanstack/react-router";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { OfferBanner } from "@/components/sections/OfferBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Btn } from "@/components/ui-custom/Btn";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui-custom/Reveal";
import { SplitText } from "@/components/ui-custom/SplitText";
import { practice, external } from "@/data/practice";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact-us/appointments")({
  head: () =>
    seo({
      title: "Appointments",
      description:
        "Book an appointment online or by calling Oldland Dental Practice. Please give at least 48hrs notice to cancel. Missed appointment policy for NHS and private patients.",
      path: "/contact-us/appointments",
      breadcrumbs: crumbsFor.contact("Appointments"),
    }),
  component: AppointmentsPage,
});

const steps = [
  { n: "1", title: "Book online or call" },
  { n: "2", title: "Cancel with 48hrs notice if needed" },
  { n: "3", title: "Private patients: 50% deposit for treatment/hygiene bookings" },
];

function AppointmentsPage() {
  return (
    <InnerPage hero="heroContact" title="Appointments" crumbs={crumbsFor.contact("Appointments")} group="contact">
      <OfferBanner text={practice.newPatientOfferAlt} />

      <div className="mt-10 max-w-[68ch] space-y-5 text-[1.08rem]">
        <Reveal>
          <p className="text-[1.2rem] leading-relaxed text-charcoal">
            You can book an appointment{" "}
            <a href={practice.links.booking} {...external} className="font-semibold text-teal-dark underline underline-offset-4">
              online here
            </a>{" "}
            or by calling the practice during opening hours. We will do our best to accommodate your choice of date and time.
          </p>
        </Reveal>
        <Reveal className="flex flex-wrap gap-3">
          <Btn to={practice.links.booking} variant="accent" size="lg" arrow>
            Book Online
          </Btn>
          <Btn to={practice.phone.href} variant="ghost" size="lg">
            Call {practice.phone.display}
          </Btn>
        </Reveal>
        <Reveal>
          <p>
            If for any reason you cannot make it to your appointment, please contact the practice to cancel and rearrange. By
            doing so you allow another patient to use that time. We would appreciate it if you could give us at least 48hrs
            notice. Late notice cancellations and failing to attend may incur a charge (please see below).
          </p>
        </Reveal>
      </div>

      <div className="mt-14">
        <SplitText text="How booking works" className="type-h3" />
        <RevealGroup as="ol" className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <RevealItem as="li" key={s.n} className="relative rounded-[24px] bg-sand p-7">
              <span className="font-display text-6xl leading-none text-charcoal/20">{s.n}</span>
              <p className="mt-3 text-lg font-semibold text-charcoal">{s.title}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <div className="mt-14">
        <SplitText text="Missed Appointments" className="type-h2" />
        <div className="mt-6 max-w-[68ch] space-y-4 text-[1.05rem]">
          <Reveal>
            <p>
              A missed dental appointment means lost valuable clinical time to the practice and deprives other patients of the
              opportunity to benefit from this time.
            </p>
          </Reveal>
          <Reveal>
            <p>
              If you know you will not be able to attend an appointment, then please give as much notice as possible so we can
              cancel your appointment and offer your slot to another patient.
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-8">
          <Accordion type="multiple" defaultValue={["nhs"]} className="rounded-[24px] border border-line bg-card px-6">
            <AccordionItem value="nhs" className="border-line">
              <AccordionTrigger className="min-h-16 font-display text-2xl font-normal text-charcoal hover:no-underline">
                For NHS patients
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-[1.02rem] text-ink">
                <p>
                  In accordance with NHS England's policy, we are unable to charge you for not turning up to NHS appointments,
                  however, if you miss any, your dentist can terminate your treatment and you may need to pay again for a new
                  course of treatment.
                </p>
                <p>
                  If you miss two NHS appointments, your dentist may decide not to offer you treatment in the future and has the
                  right to ask you to find another dental practice.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="private" className="border-0">
              <AccordionTrigger className="min-h-16 text-left font-display text-2xl font-normal text-charcoal hover:no-underline">
                <span>
                  For Private Patients <span className="ml-2 rounded-full bg-teal-soft px-2.5 py-1 align-middle font-sans text-xs font-bold text-teal-dark">UPDATED 22/11/2024</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-[1.02rem] text-ink">
                <p>
                  Unfortunately, due to multiple failed to attends and loss of valuable clinical time we have had to make the
                  difficult decision to ask all patients who have to come back for further treatment to pay a deposit when
                  booking that appointment.
                </p>
                <p>
                  This charge will be half of the total cost of your treatment appointment and will start from Monday 2nd
                  December 2024.
                </p>
                <p>
                  This will not apply to patients that have already booked their appointment before Monday 2nd December.
                  However, if you miss or cancel your appointment at short notice (i.e., giving less than 48hrs notice), we will
                  charge you £2 per minute of your missed or cancelled appointment length.
                </p>
                <p>
                  This charge will not fully cover the cost of our lost clinical time, but it will allow us to partially cover
                  our overheads, thus helping to prevent raising our prices unnecessarily.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Reveal>
      </div>
    </InnerPage>
  );
}
