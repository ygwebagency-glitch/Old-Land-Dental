import type { SVGProps } from "react";

export function RedCross(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M8.5 2h7v6.5H22v7h-6.5V22h-7v-6.5H2v-7h6.5z" className="fill-danger" />
    </svg>
  );
}

export function PdfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.6" />
      <text x="12" y="17.5" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor" fontFamily="sans-serif">
        PDF
      </text>
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** House with a medical cross — "Independent" feature icon */
export function HouseCrossIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M6 22 24 7l18 15" />
      <path d="M10 19v22h28V19" />
      <path d="M21 22h6v5h5v6h-5v5h-6v-5h-5v-6h5z" />
    </svg>
  );
}

export function SyringeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="m33 6 9 9M37.5 10.5 31 17" />
      <path d="M31 17 15 33l-4-4 16-16z" />
      <path d="m15 33-6 6M11 29l8 8M20 20l3 3M24 16l3 3" />
    </svg>
  );
}

export function SmilePlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden {...props}>
      <circle cx="22" cy="26" r="16" />
      <path d="M15 30c2 3 4.5 4.5 7 4.5s5-1.5 7-4.5" />
      <path d="M16.5 21.5h.01M27.5 21.5h.01" strokeWidth="3" />
      <path d="M40 4v10M35 9h10" />
    </svg>
  );
}

export function ToothIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.6.9 8 3 8 1.8 0 1.6-5 4.5-5s2.7 5 4.5 5c2.1 0 2.4-5.4 3-8 .5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z" />
    </svg>
  );
}
