import BuildYourCryptoPortfolio from "./build_your_crypto_portfolio";
import ExploreSection from "./explore_section";
import FAQ from "./faq";
import HeroSection from "./hero_section";

export default function HomePage() {
  return (
    <div className="space-y-20 lg:space-y-28 xl:space-y-36">
      <HeroSection />
      <div className="space-y-20 lg:space-y-44">
        <BuildYourCryptoPortfolio />
        <ExploreSection />
      </div>
      <FAQ />
    </div>
  );
}
