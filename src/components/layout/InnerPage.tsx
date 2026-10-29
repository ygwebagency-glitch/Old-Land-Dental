import type { ReactNode } from "react";
import type { ImageKey } from "@/config/images";
import type { SideNavGroup } from "@/data/nav";
import { SharedBottom } from "@/components/sections/SharedBottom";
import { PageHero } from "./PageHero";
import { SideNav } from "./SideNav";
import type { Crumb } from "./Breadcrumbs";

/**
 * Template for every inner page: hero banner with breadcrumbs, optional
 * section side-nav, content, then the shared bottom sections.
 */
export function InnerPage({
  hero,
  title,
  crumbs,
  group,
  children,
  after,
  shared = true,
}: {
  hero?: ImageKey;
  title: string;
  crumbs: Crumb[];
  group?: SideNavGroup;
  children: ReactNode;
  /** Full-width content rendered after the main column (before shared sections) */
  after?: ReactNode;
  shared?: boolean;
}) {
  return (
    <>
      <PageHero image={hero} title={title} crumbs={crumbs} />
      <div className="container-site py-14 md:py-20">
        {group ? (
          <div className="grid gap-x-16 lg:grid-cols-[240px_minmax(0,1fr)]">
            <SideNav group={group} />
            <div className="min-w-0">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
      {after}
      {shared ? <SharedBottom /> : null}
    </>
  );
}

export const crumbsFor = {
  about: (name?: string) => [
    { name: "Home", path: "/" },
    { name: "About The Practice", path: "/about-the-practice" },
    ...(name ? [{ name }] : []),
  ],
  treatments: (name?: string) => [
    { name: "Home", path: "/" },
    { name: "Dental Treatments", path: "/dental-treatments" },
    ...(name ? [{ name }] : []),
  ],
  contact: (name?: string) => [
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/contact-us" },
    ...(name ? [{ name }] : []),
  ],
  single: (name: string) => [{ name: "Home", path: "/" }, { name }],
};
