import PhoneMockup from "@/assets/images/phones_mockup.png";
import GooglePlayLogo from "@/assets/images/google_play.png";
// App Store badge is hidden until the iOS app is live.
// import AppStoreLogo from "@/assets/images/app_store.png";

export default function ExploreSection() {
  return (
    <section className="bg-mint overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-14 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-20">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <h2 className="text-3xl lg:text-[2.75rem] font-bold uppercase leading-tight tracking-tight text-dark-blue">
            Explore endless possibilities with Lisah
          </h2>
          <p className="max-w-lg text-base lg:text-lg leading-relaxed text-gray-900">
            Set-up <strong>smart custom portfolios</strong>, allowing you to
            auto invest and rebalance your favourite assets. Follow and copy
            curated or thematic portfolios, or create your own.
          </p>
          <div className="flex items-center gap-4">
            <img alt="Google Play" className="h-12" src={GooglePlayLogo} />
            {/* <img alt="App Store" className="h-12" src={AppStoreLogo} /> */}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            alt="Lisah app screens"
            className="w-full max-w-sm md:max-w-md lg:max-w-[34rem] drop-shadow-2xl"
            src={PhoneMockup}
          />
        </div>
      </div>
    </section>
  );
}
