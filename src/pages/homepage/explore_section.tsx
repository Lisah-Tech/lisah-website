import { Image } from "@heroui/react";

import PhoneMockup from "@/assets/images/hero_phone_mockup.png";
import GooglePlayLogo from "@/assets/images/google_play.png";
import AppStoreLogo from "@/assets/images/app_store.png";

export default function ExploreSection() {
  return (
    <div className="bg-primary relative flex px-6 py-14 lg:px-12 xl:px-32 lg:py-36 text-black">
      <div className="space-y-6 lg:max-w-[30.813rem] xl:max-w-lg pb-70 md:pb-0 flex flex-col items-center lg:items-start">
        <h3 className="text-3xl lg:text-4xl font-bold text-center lg:text-left">
          Explore endless possibilities with Lisah
        </h3>
        <div className="flex items-center justify-center lg:justify-start gap-4">
          <Image
            alt="Google Play"
            className="h-10"
            radius="none"
            src={GooglePlayLogo}
          />
          <Image
            alt="App Store"
            className="h-10"
            radius="none"
            src={AppStoreLogo}
          />
        </div>
      </div>

      <div className="absolute right-10 lg:right-0 xl:right-24 bottom-0">
        <Image
          alt="grouped phone mockup"
          className="w-80 lg:w-[31rem] xl:w-[34rem]"
          src={PhoneMockup}
        />
      </div>
    </div>
  );
}
