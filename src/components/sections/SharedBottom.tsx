import { Testimonials } from "./Testimonials";
import { TreatmentsCarousel } from "./TreatmentsCarousel";
import { FeatureCards } from "./FeatureCards";
import { LocationBlock } from "./LocationBlock";

/** Bottom sections shown on every inner page, in the original site's order. */
export function SharedBottom() {
  return (
    <>
      <Testimonials />
      <TreatmentsCarousel />
      <FeatureCards />
      <LocationBlock />
    </>
  );
}
