import BrandsSection from "./brands_section";
import BuildYourCryptoPortfolio from "./build_your_crypto_portfolio";
import ExploreSection from "./explore_section";
import FAQ from "./faq";
import HeroSection from "./hero_section";
import ResourcesSection from "./resources_section";

export default function HomePage() {
  return (
    <div className="space-y-20 lg:space-y-28 xl:space-y-36">
      {/* The brands strip sits tight between the hero and the first section,
          with the same, smaller gap on both sides. */}
      <div className="space-y-12 lg:space-y-16">
        <HeroSection />
        <BrandsSection />
        <div className="space-y-20 lg:space-y-44">
          <BuildYourCryptoPortfolio />
          <ResourcesSection />
          <ExploreSection />
        </div>
      </div>
      <FAQ />
    </div>
  );
}
