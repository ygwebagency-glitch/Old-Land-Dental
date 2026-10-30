import { Link } from "@tanstack/react-router";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** Internal path ("/about-the-practice#x") or absolute/tel/mailto URL */
  to: string;
  children: ReactNode;
  activeExact?: boolean;
};

export const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to);

/**
 * One link primitive for the whole site: internal paths use the client
 * router; http(s) links open in a new tab with noopener; tel/mailto are plain.
 */
export const AppLink = forwardRef<HTMLAnchorElement, Props>(function AppLink(
  { to, children, activeExact = true, ...rest },
  ref,
) {
  if (isExternal(to)) {
    const web = /^https?:/.test(to);
    return (
      <a ref={ref} href={to} {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  const [path, hash] = to.split("#");
  return (
    <Link
      ref={ref}
      // Data-driven internal paths; every target has a route file.
      to={path as "/"}
      {...(hash ? { hash } : {})}
      activeOptions={{ exact: activeExact, includeHash: false }}
      {...rest}
    >
      {children}
    </Link>
  );
});
