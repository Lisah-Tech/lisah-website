import React from "react";
import { Avatar, AvatarGroup, Image } from "@heroui/react";
import { MdStarPurple500, MdVerifiedUser } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";

import AssetOrbit from "./asset_orbit";

import GooglePlayLogo from "@/assets/images/google_play.png";
// App Store badge is hidden until the iOS app is live.
// import AppStoreLogo from "@/assets/images/app_store.png";

export default function HeroSection() {
  return (
    <React.Fragment>
      <section className="relative isolate">
        {/* Soft circular glow at the top right. Its layer starts under the
            (translucent) navbar and clips its own sides, so the circle fades
            out on every edge without causing horizontal scroll. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-[4.5rem] -z-10 h-[50rem] overflow-hidden"
        >
          <div className="absolute left-[85%] top-[-4rem] size-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,236,168,0.6),rgba(214,236,168,0.28)_55%,transparent)] lg:left-[78%] lg:top-[-5rem] lg:size-[44rem]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 lg:px-12 pt-16 lg:pt-0 grid lg:grid-cols-2 gap-12 items-center justify-center">
          <div className="space-y-10 lg:space-y-16 lg:pt-20">
            <div className="space-y-12 lg:space-y-10">
              <div className="space-y-5 text-center lg:text-left">
                <h1 className="whitespace-nowrap text-[clamp(1.5rem,8vw,2.25rem)] sm:text-5xl lg:text-[2.375rem] xl:text-[3rem] font-bold leading-tight tracking-tight text-gray-900">
                  Wealth Without Borders
                </h1>

                <p className="text-base lg:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                  Trade, Save and Invest in US stocks, ETFs, and crypto 24/7, at
                  the lowest fees.
                </p>
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
                {/* <Image
                  alt="App Store"
                  className="h-10"
                  radius="none"
                  src={AppStoreLogo}
                /> */}
              </div>
              <div className="flex justify-center lg:justify-start">
                <p className="text-sm text-red-500">*Coming soon...</p>
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

            <p className="flex items-center justify-center lg:justify-start gap-2.5 text-sm text-gray-600">
              <MdVerifiedUser className="shrink-0 text-lg text-lisah-green" />
              {/* A fixed measure keeps the icon + text a compact, centerable
                  group instead of a full-width block. */}
              <span className="max-w-[17.5rem]">
                Crypto assets safely held by our SEC provisionally regulated
                custody partner.
              </span>
            </p>
          </div>

          <AssetOrbit />
        </div>
      </section>
    </React.Fragment>
  );
}
