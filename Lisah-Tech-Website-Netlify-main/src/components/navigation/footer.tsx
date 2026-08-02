import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Image } from "@heroui/react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

import { siteConfig } from "@/config/site";
import LogoGreen from "@/assets/images/Lisah_logo_green.png";
import LisahBgLogo from "@/assets/images/Lisah_logo_green_1.png";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const emailRef = useRef<HTMLAnchorElement>(null);
  const hasHighlighted = useRef(false);

  useEffect(() => {
    // Check if we're navigating to the contact section
    const checkHash = () => {
      if (window.location.hash === "#contact-us" && !hasHighlighted.current) {
        setTimeout(() => {
          if (emailRef.current) {
            emailRef.current.classList.add("highlight");
            hasHighlighted.current = true;
            // Remove highlight class after animation completes
            setTimeout(() => {
              if (emailRef.current) {
                emailRef.current.classList.remove("highlight");
              }
            }, 3000);
          }
        }, 300);
      }
    };

    // Check on mount and hash change
    checkHash();
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  return (
    <footer className="relative w-full pt-16 xl:pt-24 pb-10 overflow-hidden">
      {/* Background Watermark Logo */}
      <div className="absolute bottom-0 left-0 right-0 -z-10 flex items-end justify-center opacity-10 pointer-events-none">
        <img
          alt="bg logo"
          className="object-contain max-w-full h-auto"
          src={LisahBgLogo}
        />
      </div>

      {/* Top Section */}
      <div className="relative max-w-7xl mx-auto px-4 lg:px-12 flex justify-between gap-10">
        {/* Company Links */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Company:</h3>
          <ul className="space-y-2 text-lg lg:text-lg">
            <li>
              <Link
                to="/careers"
                className="cursor-pointer hover:underline"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/company-pricing"
                className="cursor-pointer hover:underline"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="cursor-pointer hover:underline"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal + Social */}
        <div id="contact-us" className="space-y-3 scroll-mt-20">
          <h3 className="font-semibold text-lg">Legal:</h3>
          <ul className="space-y-2 text-base lg:text-lg">
            <li>
              <Link
                to="/privacy-policy"
                className="cursor-pointer hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-use"
                className="cursor-pointer hover:underline"
              >
                Terms of Use
              </Link>
            </li>
          </ul>

          {/* Support Email */}
          <div className="mt-0">
            <a
              ref={emailRef}
              id="support-email"
              className="text-base lg:text-lg hover:underline transition-all duration-300"
              href="mailto:support@uselisah.com"
            >
              support@uselisah.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-start gap-3 mt-2">
            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-green-200 rounded-full cursor-pointer hover:bg-green-300 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-green-900" />
            </a>
            <a
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-green-200 rounded-full cursor-pointer hover:bg-green-300 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookSquare className="text-green-900" />
            </a>
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-green-200 rounded-full cursor-pointer hover:bg-green-300 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="text-green-900" />
            </a>
            <a
              href={siteConfig.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-green-200 rounded-full cursor-pointer hover:bg-green-300 transition-colors"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="text-green-900" />
            </a>
          </div>
        </div>
      </div>

      {/* Middle Text Block */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-12 mt-10 lg:mt-20 flex flex-col md:flex-row items-start gap-6">
        <div className="hidden md:flex min-w-[60px] h-[60px] bg-green-700 rounded-sm items-center justify-center">
          <Image
            alt="logo green"
            className="w-8 h-8 md:w-12 md:h-12 lg:w-24 lg:h-20"
            radius="none"
            src={LogoGreen}
          />
        </div>

        <div className="space-y-1">
          <p className="text-center text-lg lg:text-xl leading-relaxed text-black/80 max-w-2xl">
            Lisah works directly with regulated, licensed financial partners
            to execute every trade, maintaining strict security and compliance
            standards.
          </p>

          {/* Disclaimer */}
          <p className="px-6 md:px-12 text-center text-sm text-gray-400">
            Third-party logos and trademarks belong to their respective
            owners. Used for informational purposes only.
          </p>
        </div>
      </div>

      {/* Bottom Copy */}
      <p className="relative text-center mt-10 text-sm text-black/80">
        © {currentYear} Lisah, Inc. All Rights Reserved.
      </p>
    </footer>
  );
}
