import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarGroup, Button, Image } from "@heroui/react";
import { MdStarPurple500 } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";

import GooglePlayLogo from "@/assets/images/google_play.png";
import AppStoreLogo from "@/assets/images/app_store.png";
import PhoneMockup from "@/assets/images/hero_phone_mockup.png";
import AssetsLogos from "@/assets/images/asset_logos.png";

export default function HeroSection() {
  return (
    <React.Fragment>
      <div className="absolute w-[19rem] lg:w-[48.819rem] h-[19rem] lg:h-[32.131rem] shrink-0 rounded-full bg-light-lisah-green blur-[100px] top-[20rem] lg:top-[10rem] lg:right-[2rem]" />
      <section className="relative overflow-hidden min-h-[85vh]">
        <div className="mx-auto max-w-7xl px-4 lg:px-12 py-16 lg:py-0 grid lg:grid-cols-2 gap-12 items-center justify-center">
          <div className="space-y-10 lg:space-y-16 lg:pt-20">
            <div className="space-y-12 lg:space-y-10">
              <div className="space-y-2 text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
                  Your Long-Term Asset Vault.
                </h1>

                <p className="text-md lg:text-base max-w-lg mx-auto lg:mx-0">
                  Invest toward defined future goals. Lock your portfolio until
                  your target date, ensuring your assets mature without
                  interference from market noise or short-term needs.
                </p>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <Button
                  as={Link}
                  className="bg-primary text-black font-semibold px-8 py-5 lg:py-7 shadow-md"
                  radius="full"
                  size="sm"
                  to="/early-access"
                >
                  GET EARLY ACCESS
                </Button>
              </div>
            </div>

            <div className="space-y-2 max-w-3xs mx-auto lg:mx-0">
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
              <div className="flex justify-end lg:justify-start">
                <p className="text-red-500">Coming soon...</p>
          </div>

              {/* Avatar group with stars - moved here for desktop */}
              <div className="flex items-center gap-2 lg:justify-start justify-center mt-4">
                <AvatarGroup size="sm">
                  <Avatar src="https://images.unsplash.com/photo-1741936363623-f3a761eb60b6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fEFmcmljYW4lMjBmYWNlfGVufDB8fDB8fHww" />
                  <Avatar src="https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEFmcmljYW4lMjBmYWNlfGVufDB8fDB8fHww" />
                  <Avatar src="https://images.unsplash.com/photo-1694175454386-8bf459618c0a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEFmcmljYW4lMjBmYWNlfGVufDB8fDB8fHww" />
                  <Avatar src="https://plus.unsplash.com/premium_photo-1723867245681-87035a08a363?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QW1lcmljYW4lMjBmYWNlfGVufDB8fDB8fHww" />
                  <Avatar src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QXNpYW4lMjBmYWNlfGVufDB8fDB8fHww" />
                </AvatarGroup>

                <div>
                  <div className="flex items-center">
                    {...Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <div key={index}>
                          <MdStarPurple500 className="text-yellow-400 text-sm" />
                        </div>
                      ))}
                  </div>
                  <div className="min-w-44">
                    <TypeAnimation
                      repeat={Infinity}
                      sequence={[
                        "Loved by 100+ cool people.",
                        1000,
                        "Rated 5 stars by users.",
                        1000,
                        "Empowering investors daily.",
                        1000,
                        "Join a growing community.",
                        1000,
                      ]}
                      speed={50}
                      style={{
                        display: "inline-block",
                        color: "#4a5565",
                        fontSize: "0.75rem",
                        marginLeft: "0.125rem",
                      }}
                      wrapper="span"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative flex flex-col-reverse md:flex-col items-center gap-0 z-10">
              <Image
                alt="Portfolio App"
                className="w-75 md:w-[23.676rem] drop-shadow-xl"
                radius="none"
                src={PhoneMockup}
              />
            </div>

            <div className="absolute top-20 lg:left-30 flex items-baseline-last justify-end pointer-events-none">
              <img
                alt="assets logos rotating"
                className="w-[420px] lg:w-[600px]"
                src={AssetsLogos}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
