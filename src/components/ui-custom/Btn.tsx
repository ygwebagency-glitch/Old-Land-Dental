import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { forwardRef, useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { AppLink } from "./AppLink";
import { RedCross } from "./icons";

export const btnVariants = cva(
  "group/btn relative inline-flex min-h-11 select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-sans font-semibold tracking-wide transition-[background-color,color,box-shadow,border-color,transform] duration-300 ease-[var(--ease-premium)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-dark active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-charcoal text-on-dark shadow-soft hover:bg-charcoal-deep hover:shadow-lift",
        accent: "bg-teal-dark text-on-dark shadow-soft hover:bg-charcoal hover:shadow-lift",
        ghost:
          "border-[1.5px] border-charcoal text-charcoal before:absolute before:inset-0 before:-z-0 before:origin-left before:scale-x-0 before:bg-charcoal before:transition-transform before:duration-500 before:ease-[var(--ease-premium)] hover:text-on-dark hover:before:scale-x-100",
        ghostLight:
          "border-[1.5px] border-on-dark/80 text-on-dark before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-on-dark before:transition-transform before:duration-500 before:ease-[var(--ease-premium)] hover:text-charcoal-deep hover:before:scale-x-100",
        light: "bg-on-dark text-charcoal-deep shadow-soft hover:bg-teal-soft",
        emergency: "bg-charcoal text-on-dark shadow-soft hover:bg-charcoal-deep",
        link: "min-h-0 rounded-none px-0 py-1 text-teal-dark hover:text-charcoal",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Common = VariantProps<typeof btnVariants> & {
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  icon?: ReactNode;
  magnetic?: boolean;
};
type AsLink = Common & { to: string; onClick?: never; type?: never; disabled?: never; "aria-label"?: string };
type AsButton = Common & {
  to?: undefined;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
};
export type BtnProps = AsLink | AsButton;

/** Pill button with sliding arrow, wipe fills and a subtle magnetic pull on desktop. */
export const Btn = forwardRef<HTMLElement, BtnProps>(function Btn(props, _ref) {
  const { variant = "primary", size, children, className, arrow, icon, magnetic = true } = props;
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const enableMagnet = magnetic && !reduced && variant !== "link";

  const onMove = (e: React.PointerEvent) => {
    if (!enableMagnet || e.pointerType !== "mouse" || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <>
      {variant === "emergency" && !icon ? <RedCross className="relative size-5" /> : null}
      {icon ? <span className="relative flex">{icon}</span> : null}
      <span
        className={cn(
          "relative",
          variant === "link" &&
            "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-premium)] group-hover/btn:bg-[length:100%_1.5px]",
        )}
      >
        {children}
      </span>
      {arrow ? (
        <ArrowRight
          aria-hidden
          className="relative size-[1.1em] transition-transform duration-300 ease-[var(--ease-premium)] group-hover/btn:translate-x-1"
        />
      ) : null}
    </>
  );

  const cls = cn(btnVariants({ variant, size }), className);

  return (
    <motion.span
      ref={wrap}
      className="inline-flex"
      style={enableMagnet ? { x, y } : {}}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {props.to !== undefined ? (
        <AppLink to={props.to} className={cls} aria-label={props["aria-label"]}>
          {content}
        </AppLink>
      ) : (
        <button
          type={props.type ?? "button"}
          onClick={props.onClick}
          disabled={props.disabled}
          className={cls}
          aria-label={props["aria-label"]}
        >
          {content}
        </button>
      )}
    </motion.span>
  );
});
