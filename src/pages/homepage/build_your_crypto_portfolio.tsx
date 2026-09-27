import AppHomeMockup from "@/assets/images/app_home_mockup.png";
import LisahBgLogo from "@/assets/images/Lisah_logo_green_3.png";

type Feature = {
  title: string;
  description: string;
  bg: string;
  isTitleBlack?: boolean;
};

const LEFT_FEATURES: Feature[] = [
  {
    title: "Global Asset Access",
    description:
      "Trade, Save & Invest in US stocks, ETFs, crypto, commodities on-chain at lowest fees. Enjoy dividends & earn yields while you hold.",
    bg: "bg-light-green",
    isTitleBlack: true,
  },
  {
    title: "Smart Portfolios",
    description:
      "Follow and copy curated or thematic portfolios, or create & share your own custom portfolio.",
    bg: "bg-feature-grey",
  },
];

const RIGHT_FEATURES: Feature[] = [
  {
    title: "Ease of Transaction",
    description:
      "Deposit and withdraw to your local currency or stablecoin with ease, without needing P2P.",
    bg: "bg-mint",
    isTitleBlack: true,
  },
  {
    title: "Micro-Invest with Ease",
    description:
      "Best place to invest with as little as ₦2,000. No typical $1 fee minimums. We're the best for Dollar Cost Averaging.",
    bg: "bg-feature-grey",
  },
];

export default function BuildYourCryptoPortfolio() {
  return (
    <section
      className="relative isolate mx-auto max-w-7xl px-4 lg:px-12 space-y-12 lg:space-y-16"
      id="features"
    >
      {/* Decorations are anchored to this section, not the page, so they stay
          behind the heading no matter what sits above it. */}
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -top-16 left-0 w-full max-w-[28rem] lg:w-[48rem] lg:max-w-none select-none [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]"
        src={LisahBgLogo}
      />
      <div className="pointer-events-none absolute -z-10 w-[10rem] lg:w-[40rem] h-[10rem] lg:h-[25rem] rounded-full bg-light-lisah-green blur-[60px] top-[20rem] right-0 lg:right-[4rem]" />

      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
          Build your asset portfolio
        </h2>
        <p className="max-w-md mx-auto text-gray-700 lg:text-lg">
          Build a lasting, impulse-proof portfolio aligned with your furthest
          goals
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.45fr_1fr]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {LEFT_FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <div className="flex flex-col overflow-hidden rounded-[2rem] bg-secondary px-6 pt-10 lg:px-8 lg:pt-12 text-white shadow-xl">
          <div className="space-y-3 max-w-md">
            <h3 className="text-lg lg:text-xl font-bold uppercase tracking-wide">
              Asset Backed Savings
            </h3>
            <p className="text-sm lg:text-base leading-relaxed text-white/85">
              Set-up traditional savings, but with diversified asset classes;
              stocks, ETFs, crypto, or commodities like Gold, Silver, etc.
            </p>
          </div>

          <div className="mt-auto flex justify-center pt-10">
            <img
              alt="Lisah app home screen"
              className="w-72 md:w-80 lg:w-[25rem] object-contain object-bottom drop-shadow-xl"
              src={AppHomeMockup}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {RIGHT_FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, bg, isTitleBlack }: Feature) {
  return (
    <div
      className={`${bg} flex min-h-[15rem] lg:min-h-[18.5rem] flex-col justify-end rounded-[2rem] p-6 lg:p-7 shadow-sm`}
    >
      <div className="space-y-2">
        <h3
          className={`text-base lg:text-lg font-bold uppercase tracking-wide ${isTitleBlack ? "text-black" : "text-white"}`}
        >
          {title}
        </h3>
        <p className="text-sm lg:text-[0.95rem] leading-relaxed text-black">
          {description}
        </p>
      </div>
    </div>
  );
}
