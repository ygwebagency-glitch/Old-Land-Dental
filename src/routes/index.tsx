import { createFileRoute } from "@tanstack/react-router";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { Welcome } from "@/components/sections/home/Welcome";
import { StackingTreatments } from "@/components/sections/home/StackingTreatments";
import { SeeResults } from "@/components/sections/home/SeeResults";
import { Marquee } from "@/components/ui-custom/Marquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { TreatmentsCarousel } from "@/components/sections/TreatmentsCarousel";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { LocationBlock } from "@/components/sections/LocationBlock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Oldland Dental Practice In Bristol | Bristol Dentist",
      rawTitle: true,
      description:
        "Welcome to Oldland Dental Practice In Bristol. We have been established as a Bristol Dentist for a number of years now and have highly trained staff.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  return (
    <>
      <HomeHero />
      <Marquee />
      <Welcome />
      <StackingTreatments />
      <SeeResults />
      <Testimonials />
      <TreatmentsCarousel />
      <FeatureCards />
      <LocationBlock />
    </>
  );
}
