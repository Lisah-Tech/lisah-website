import React from "react";

import SendAndReceiveIcon from "@/assets/images/send_and_receive.svg.png";
import SecureWalletIcon from "@/assets/images/secure_wallet.png";
import TradingChartsIcon from "@/assets/images/trading_charts.png";
import RealTimeTradingIcon from "@/assets/images/real_time_trading.png";
import iPhoneMockup from "@/assets/images/lisah_app_portfolio_overview.png";
import LisahBgLogo from "@/assets/images/Lisah_logo_green_3.png";

export default function BuildYourCryptoPortfolio() {
  return (
    <React.Fragment>
      <div id="features" className="mx-auto max-w-7xl px-4 lg:px-12 space-y-12 lg:space-y-16">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h3 className="text-3xl lg:text-4xl font-bold">
            Build your assets portfolio
          </h3>
          <p className="max-w-md mx-auto">
            Build a lasting, impulse-proof portfolio aligned with your furthest
            goals
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <div className="flex flex-col md:flex-row lg:flex-col gap-6">
            <FeatureCard
              isTitleBlack
              bg="bg-light-green"
              description="Invest in high-conviction US stocks, indices and crypto for legacy building."
              icon={SendAndReceiveIcon}
              title="GLOBAL ASSET ACCESS"
            />
            <FeatureCard
              bg="bg-feature-grey"
              description="Create portfolios for life milestones with custom commitment dates for discipline."
              icon={SecureWalletIcon}
              title="Event-Based PORTFOLIOS"
            />
          </div>

          <div className="flex justify-center">
            <div className="rounded-3xl bg-secondary px-8 pt-11 max-w-sm md:max-w-md lg:max-w-sm w-full lg:w-[29.813rem] xl:max-w-2xl text-white text-left shadow-xl">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">IOS & ANDROID APP</h3>
                <p className="text-base opacity-80">
                  Enforce long-term wealth goals by locking assets against
                  market temptation.
                </p>
              </div>

              <div className="flex justify-center">
                <img
                  alt="App Mockup"
                  className="w-56 md:w-80 lg:max-h-96 xl:max-h-[70rem] object-contain drop-shadow-xl"
                  src={iPhoneMockup}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-col gap-6">
            <FeatureCard
              isTitleBlack
              bg="bg-light-green"
              description="Irrevocably lock stocks and crypto to protect them from short-term impulse selling."
              icon={TradingChartsIcon}
              title="Time-Locked Asset Vault"
            />
            <FeatureCard
              bg="bg-feature-green"
              description="Download and share live, watermarked proof of your long-term asset growth; inspire others."
              icon={RealTimeTradingIcon}
              title="Verifiable Growth Snapshots"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-[65rem] lg:top-[50rem] -z-10">
        <img alt="bg logo" src={LisahBgLogo} />
      </div>
      <div className="absolute w-[10rem] lg:w-[40.819rem] h-[10rem] lg:h-[25.131rem] shrink-0 rounded-full bg-light-lisah-green blur-[50px] top-[30rem] lg:top-[40rem] lg:right-[4rem]" />
    </React.Fragment>
  );
}

type FeatureProps = {
  title: string;
  description: string;
  icon: string;
  bg: string;
  isTitleBlack?: boolean;
};

function FeatureCard({ title, description, bg, isTitleBlack }: FeatureProps) {
  return (
    <div
      className={`${bg} h-64 xl:h-72 md:w-80 lg:w-72 xl:w-80 px-6 py-12 rounded-3xl shadow-sm space-y-4 flex flex-col justify-end`}
    >
      {/* <div className="w-12 h-12 bg-dark-blue rounded-xl flex items-center justify-center">
        <img alt="feature-icon" className="w-6 h-6" src={icon} />
      </div> */}
      <div className="space-y-2">
        <h4
          className={`font-bold text-lg uppercase ${isTitleBlack ? "text-black" : "text-white"}`}
        >
          {title}
        </h4>
        <p className="text-md text-black">{description}</p>
      </div>
    </div>
  );
}
