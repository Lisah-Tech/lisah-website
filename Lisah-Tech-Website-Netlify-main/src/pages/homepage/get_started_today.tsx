import { Button } from "@heroui/button";
import { FaApple, FaGooglePlay } from "react-icons/fa6";

import FeatureList from "./feature_list";

import DownloadAppImage from "@/assets/images/download_app.png";
import PersonIcon from "@/assets/images/person_icon.png";
import MoneyIcon from "@/assets/images/money.png";
import iPhoneMockup from "@/assets/images/iPhone_mock_up.png";
// import AndroidMockup from "@/assets/images/android_phone_mockup.png";

const stores = [
  {
    title: "Download for iOS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nulla integer in pellentesque tortor semper elementum. Felis.",
    buttonTitle: "App Store",
    Icon: FaApple,
    mockup: iPhoneMockup,
  },
  {
    title: "Download for Android",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nulla integer in pellentesque tortor semper elementum. Felis.",
    buttonTitle: "Play Store",
    Icon: FaGooglePlay,
    mockup: iPhoneMockup,
  },
];

export default function GetStartedToday() {
  return (
    <div className="mx-auto max-w-7xl px-4 space-y-12">
      <div className="space-y-6 lg:px-6">
        <div className="space-y-4">
          <h3 className="text-3xl lg:text-4xl font-bold">Get started today</h3>
          <p className="text-lg max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
            nulla suspendisse tortor aene.
          </p>
        </div>

        <ul className="space-y-4">
          <FeatureList icon={DownloadAppImage} text="Download app" />
          <FeatureList icon={PersonIcon} text="Create a free account" />
          <FeatureList icon={MoneyIcon} text="Start committing" />
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        {stores.map((store) => (
          <div
            key={store.title}
            className="rounded-3xl bg-feature-brown p-12 pb-0 text-white space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold">{store.title}</h2>
              <p className="text-lg">{store.description}</p>
              <Button
                className="bg-dark-blue uppercase py-6 px-5 text-white text-xs"
                radius="full"
                startContent={<store.Icon className="text-xl" />}
              >
                {store.buttonTitle}
              </Button>
            </div>

            <div className="flex justify-center">
              <img
                alt={store.title}
                className="w-56 md:w-80 lg:w-96 max-h-80 lg:max-h-96 object-cover object-top drop-shadow-xl"
                src={store.mockup}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
