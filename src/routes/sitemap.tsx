import { createFileRoute } from "@tanstack/react-router";
import { InnerPage, crumbsFor } from "@/components/layout/InnerPage";
import { SitemapTree } from "@/components/sections/SitemapTree";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () =>
    seo({
      title: "Site map",
      description: "Every page on the Oldland Dental Practice website, plus patient information leaflets.",
      path: "/sitemap",
      breadcrumbs: crumbsFor.single("Site map"),
    }),
  component: () => (
    <InnerPage hero="heroAbout" title="Site map" crumbs={crumbsFor.single("Site map")} shared={false}>
      <SitemapTree />
    </InnerPage>
  ),
});
