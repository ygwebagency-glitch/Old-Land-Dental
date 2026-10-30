import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { practice, external } from "@/data/practice";
import { countryCodes, submitFeedback, type FeedbackPayload } from "@/lib/forms";
import { Btn } from "@/components/ui-custom/Btn";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof FeedbackPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateFeedback(v: FeedbackPayload): Errors {
  const e: Errors = {};
  if (!v.firstName.trim()) e.firstName = "Please enter your first name.";
  if (!v.lastName.trim()) e.lastName = "Please enter your last name.";
  if (!v.phone.trim()) e.phone = "Please enter your telephone number.";
  else if (!/^[\d\s()+-]{6,20}$/.test(v.phone.trim())) e.phone = "Please enter a valid telephone number.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.comments.trim().length < 10) e.comments = "Please enter at least 10 characters.";
  if (!v.privacy) e.privacy = "Please confirm you have read and agree with our Privacy Policy.";
  return e;
}

const empty: FeedbackPayload = {
  title: "",
  firstName: "",
  lastName: "",
  countryCode: "+44",
  phone: "",
  email: "",
  comments: "",
  privacy: false,
};

function Field({
  id,
  label,
  required,
  error,
  helper,
  children,
  filled,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
  children: ReactNode;
  filled: boolean;
}) {
  return (
    <div>
      <div className="group relative">
        {children}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 origin-left text-ink-muted transition-all duration-300 ease-[var(--ease-premium)]",
            filled
              ? "top-2 text-xs font-bold tracking-wide text-teal-dark"
              : "top-4 text-base group-focus-within:top-2 group-focus-within:text-xs group-focus-within:font-bold group-focus-within:text-teal-dark",
          )}
        >
          {label}
          {required ? <span aria-hidden className="text-danger"> *</span> : null}
        </label>
      </div>
      {helper && !error ? (
        <p id={`${id}-help`} className="mt-1.5 pl-1 text-sm text-ink-muted">
          {helper}
        </p>
      ) : null}
      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${id}-err`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 pl-1 text-sm font-semibold text-danger"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (err?: string) =>
  cn(
    "peer h-14 w-full rounded-[16px] border bg-card px-4 pt-5 text-base text-charcoal outline-none transition-[border-color,box-shadow] duration-300 focus:border-teal-dark focus:ring-4 focus:ring-teal/15",
    err ? "border-danger" : "border-input",
  );

export function FeedbackForm() {
  const uid = useId();
  const [v, setV] = useState<FeedbackPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [honey, setHoney] = useState("");

  const set = <K extends keyof FeedbackPayload>(k: K, val: FeedbackPayload[K]) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (touched) setErrors(validateFeedback(next));
  };
  const id = (k: string) => `${uid}-${k}`;
  const desc = (k: keyof FeedbackPayload, helper?: boolean) =>
    errors[k] ? `${id(k)}-err` : helper ? `${id(k)}-help` : undefined;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validateFeedback(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(id(first))?.focus();
      return;
    }
    if (honey) return; // bot
    setStatus("sending");
    await submitFeedback(v);
    setStatus("done");
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="rounded-[28px] bg-teal-soft p-8 text-center md:p-12"
        role="status"
      >
        <span className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-teal-dark text-on-dark">
          <svg viewBox="0 0 24 24" className="size-10" aria-hidden>
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            />
          </svg>
        </span>
        <p className="font-display text-3xl text-charcoal">
          Thank you — your feedback has been prepared in your email app.
        </p>
        <p className="mt-3 text-ink">
          You can also call us on{" "}
          <a href={practice.phone.href} className="font-semibold text-teal-dark underline">
            {practice.phone.display}
          </a>
          .
        </p>
        <div className="mt-8 flex justify-center">
          <Btn
            variant="ghost"
            onClick={() => {
              setV(empty);
              setErrors({});
              setTouched(false);
              setStatus("idle");
            }}
          >
            Send another
          </Btn>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Feedback form">
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
        </label>
      </div>

      <Field id={id("title")} label="Title" helper="e.g. Mr / Mrs / Miss / Ms / Mx — optional" filled={!!v.title}>
        <input
          id={id("title")}
          value={v.title}
          onChange={(e) => set("title", e.target.value)}
          aria-describedby={desc("title", true)}
          autoComplete="honorific-prefix"
          className={inputCls()}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("firstName")} label="First name" required error={errors.firstName} filled={!!v.firstName}>
          <input
            id={id("firstName")}
            value={v.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            aria-required
            aria-invalid={!!errors.firstName}
            aria-describedby={desc("firstName")}
            autoComplete="given-name"
            className={inputCls(errors.firstName)}
          />
        </Field>
        <Field id={id("lastName")} label="Last name" required error={errors.lastName} filled={!!v.lastName}>
          <input
            id={id("lastName")}
            value={v.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            aria-required
            aria-invalid={!!errors.lastName}
            aria-describedby={desc("lastName")}
            autoComplete="family-name"
            className={inputCls(errors.lastName)}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,13rem)_1fr]">
        <div className="relative">
          <label htmlFor={id("cc")} className="pointer-events-none absolute top-2 left-4 text-xs font-bold tracking-wide text-teal-dark">
            Country code
          </label>
          <select
            id={id("cc")}
            value={v.countryCode}
            onChange={(e) => set("countryCode", e.target.value)}
            className="h-14 w-full appearance-none rounded-[16px] border border-input bg-card px-4 pt-5 text-base text-charcoal outline-none focus:border-teal-dark focus:ring-4 focus:ring-teal/15"
          >
            {countryCodes.map((c) => (
              <option key={c.code + c.label} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <Field id={id("phone")} label="Telephone" required error={errors.phone} filled={!!v.phone}>
          <input
            id={id("phone")}
            type="tel"
            inputMode="tel"
            value={v.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-required
            aria-invalid={!!errors.phone}
            aria-describedby={desc("phone")}
            autoComplete="tel-national"
            className={inputCls(errors.phone)}
          />
        </Field>
      </div>

      <Field id={id("email")} label="Email" required error={errors.email} filled={!!v.email}>
        <input
          id={id("email")}
          type="email"
          value={v.email}
          onChange={(e) => set("email", e.target.value)}
          aria-required
          aria-invalid={!!errors.email}
          aria-describedby={desc("email")}
          autoComplete="email"
          className={inputCls(errors.email)}
        />
      </Field>

      <Field id={id("comments")} label="Comments" required error={errors.comments} filled={!!v.comments}>
        <textarea
          id={id("comments")}
          rows={6}
          value={v.comments}
          onChange={(e) => set("comments", e.target.value)}
          aria-required
          aria-invalid={!!errors.comments}
          aria-describedby={desc("comments")}
          className={cn(inputCls(errors.comments), "h-auto min-h-40 resize-y pt-7")}
        />
      </Field>

      <div>
        <label htmlFor={id("privacy")} className="flex cursor-pointer items-start gap-3">
          <span className="relative mt-0.5 flex size-6 shrink-0">
            <input
              id={id("privacy")}
              type="checkbox"
              checked={v.privacy}
              onChange={(e) => set("privacy", e.target.checked)}
              aria-required
              aria-invalid={!!errors.privacy}
              aria-describedby={desc("privacy")}
              className="peer size-6 cursor-pointer appearance-none rounded-md border-2 border-charcoal/40 bg-card transition-colors checked:border-teal-dark checked:bg-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-dark"
            />
            <Check
              aria-hidden
              className="pointer-events-none absolute inset-0 m-auto size-4 scale-50 text-on-dark opacity-0 transition-all duration-300 peer-checked:scale-100 peer-checked:opacity-100"
            />
          </span>
          <span className="text-[0.98rem] text-ink">
            Please check the box to say that have read and agree with our{" "}
            <a href={practice.links.privacyPdf} {...external} className="font-semibold text-teal-dark underline">
              Privacy Policy
            </a>
            <span aria-hidden className="text-danger"> *</span>
          </span>
        </label>
        {errors.privacy ? (
          <p id={`${id("privacy")}-err`} role="alert" className="mt-1.5 pl-9 text-sm font-semibold text-danger">
            {errors.privacy}
          </p>
        ) : null}
      </div>

      <p className="text-sm text-ink-muted">
        <span className="text-danger">*</span> Required fields
      </p>

      <Btn type="submit" variant="primary" size="lg" disabled={status === "sending"} arrow={status !== "sending"} icon={status === "sending" ? <Loader2 className="size-4 animate-spin" /> : undefined}>
        {status === "sending" ? "Preparing…" : "Send feedback"}
      </Btn>
    </form>
  );
}
