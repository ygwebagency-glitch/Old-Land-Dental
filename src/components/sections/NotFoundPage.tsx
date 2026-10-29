import { PageHero } from "@/components/layout/PageHero";
import { Btn } from "@/components/ui-custom/Btn";
import { Reveal } from "@/components/ui-custom/Reveal";
import { SearchForm } from "./SearchForm";
import { SitemapTree } from "./SitemapTree";

export function NotFoundPage() {
  return (
    <>
      <PageHero image="heroAbout" title="Page not found" crumbs={[{ name: "Home", path: "/" }, { name: "Page not found" }]} />
      <div className="container-site py-16 md:py-24">
        <Reveal>
          <p className="max-w-[60ch] text-xl text-charcoal">
            We're sorry the page you were looking for wasn't found or has moved, search our website:
          </p>
        </Reveal>
        <div className="mt-8">
          <SearchForm />
        </div>
        <div className="mt-8">
          <Btn to="/" variant="primary" arrow>
            Back to Home
          </Btn>
        </div>
        <div className="mt-16">
          <SitemapTree />
        </div>
      </div>
    </>
  );
}
