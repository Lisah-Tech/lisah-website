import React, { RefObject, useEffect, useRef, useState } from "react";
import { Avatar, AvatarGroup, Image } from "@heroui/react";
import { MdStarPurple500, MdVerifiedUser } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import { AnimatePresence, motion } from "framer-motion";

import GooglePlayLogo from "@/assets/images/google_play.png";
// App Store badge is hidden until the iOS app is live.
// import AppStoreLogo from "@/assets/images/app_store.png";
import PhoneMockup from "@/assets/images/hero_phone_mockup.png";
import AssetsLogos from "@/assets/images/asset_logos.png";

const HERO_WORDS = ["Trade", "Invest", "Earn", "Save"];
const WORD_HOLD_MS = 1400;
// Share of the heading that must be visible before a run starts.
const START_RATIO = 0.6;

/**
 * Steps through `count` words once each time `ref` scrolls into view and
 * stops on the last one. Leaving the viewport entirely resets the sequence,
 * so scrolling away and back replays it from the first word.
 */
function useWordCycleOnView(ref: RefObject<Element>, count: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let timer: number | undefined;
    let hasRun = false;

    const stop = () => window.clearInterval(timer);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stop();
          hasRun = false;
          setIndex(0);

          return;
        }

        if (hasRun || entry.intersectionRatio < START_RATIO) return;
        hasRun = true;

        if (reduceMotion) {
          setIndex(count - 1);

          return;
        }

        let current = 0;

        setIndex(current);
        timer = window.setInterval(() => {
          current += 1;
          setIndex(current);
          if (current >= count - 1) stop();
        }, WORD_HOLD_MS);
      },
      { threshold: [0, START_RATIO] },
    );

    observer.observe(node);

    return () => {
      stop();
      observer.disconnect();
    };
  }, [ref, count]);

  return index;
}

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wordIndex = useWordCycleOnView(headingRef, HERO_WORDS.length);
  const word = HERO_WORDS[wordIndex];

  return (
    <React.Fragment>
      <div className="absolute w-[19rem] lg:w-[48.819rem] h-[19rem] lg:h-[32.131rem] shrink-0 rounded-full bg-light-lisah-green blur-[100px] top-[20rem] lg:top-[10rem] lg:right-[2rem]" />
      <section className="relative overflow-hidden min-h-[85vh]">
        <div className="mx-auto max-w-7xl px-4 lg:px-12 py-16 lg:py-0 grid lg:grid-cols-2 gap-12 items-center justify-center">
          <div className="space-y-10 lg:space-y-16 lg:pt-20">
            <div className="space-y-12 lg:space-y-10">
              <div className="space-y-5 text-center lg:text-left">
                <h1
                  ref={headingRef}
                  className="text-[2.75rem] sm:text-6xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight text-gray-900"
                >
                  <span className="sr-only">
                    Trade, Invest, Earn and Save Without Borders
                  </span>
                  <span aria-hidden="true" className="block">
                    <span className="relative inline-block text-lisah-green">
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                          key={word}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          className="inline-block"
                          exit={{
                            opacity: 0,
                            y: "-0.4em",
                            filter: "blur(6px)",
                          }}
                          initial={{
                            opacity: 0,
                            y: "0.4em",
                            filter: "blur(6px)",
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {word}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="block">Without Borders</span>
                  </span>
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

            <p className="flex items-start gap-2 w-fit max-w-sm mx-auto lg:mx-0 rounded-2xl border border-lisah-green/15 bg-white/70 px-4 py-3 text-sm text-gray-600 backdrop-blur-sm">
              <MdVerifiedUser className="shrink-0 mt-0.5 text-base text-lisah-green" />
              Crypto assets safely held by our SEC provisionally regulated
              custody partner.
            </p>
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
