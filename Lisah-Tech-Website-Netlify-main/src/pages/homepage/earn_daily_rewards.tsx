import { Image } from "@heroui/react";

import FeatureList from "./feature_list";

import PhoneMockup from "@/assets/images/hero_phone_mockup.png";
import LowestFeeImage from "@/assets/images/lowest_fees.png";
import FastAndSecureImage from "@/assets/images/fast_and_secure.png";
import PadlockImage from "@/assets/images/padlock.png";

export default function EarnDailyRewards() {
  return (
    <div className="mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-16 items-center justify-center">
      <Image
        alt="Portfolio App"
        className="w-80 md:w-[26.676rem] drop-shadow-xl"
        radius="none"
        src={PhoneMockup}
      />

      <div className="lg:max-w-[29.688rem] space-y-5">
        <div className="space-y-3">
          <h3 className="text-3xl lg:text-4xl font-bold">
            Earn daily rewards on your idle tokens
          </h3>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
            nulla suspendisse tortor aene.
          </p>
        </div>

        <ul className="space-y-4 lg:px-4">
          <FeatureList icon={LowestFeeImage} text="Lowest fees in market" />
          <FeatureList
            icon={FastAndSecureImage}
            text="Fast and secure transactions"
          />
          <FeatureList icon={PadlockImage} text="256-bit secure encryption" />
        </ul>
      </div>
    </div>
  );
}
