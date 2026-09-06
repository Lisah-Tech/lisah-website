import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Divider, Image } from "@heroui/react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import Logo from "@/assets/images/logo.png";
import GooglePlayLogo from "@/assets/images/google_play.png";
import AppStoreLogo from "@/assets/images/app_store.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("#");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Hide "GET EARLY ACCESS" button on early access pages
  const shouldHideEarlyAccessButton =
    location.pathname === "/early-access" ||
    location.pathname === "/early-access/success";

  useEffect(() => {
    const handleScroll = () => {
      // If we're at the very top of the page, set active section to home
      if (window.scrollY === 0) {
        setActiveSection("#");
      }
    };

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    // Observe all sections except home (handled separately)
    siteConfig.navItems.forEach((item) => {
      if (item.href.startsWith("#") && item.href !== "#") {
        const sectionId = item.href.substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
          observerRef.current?.observe(section);
        }
      }
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    // Close the mobile menu immediately
    setIsMenuOpen(false);

    // If href is a regular route path (not a hash), navigate to it
    if (!href.startsWith("#")) {
      navigate(href);
      return;
    }

    // Check if we're on the home page
    const isOnHomePage = window.location.pathname === "/";

    // If not on home page and clicking a hash link, navigate to home first
    if (!isOnHomePage && href.startsWith("#")) {
      window.location.href = `/${href}`;
      return;
    }

    setActiveSection(href);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const sectionId = href.substring(1);
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <HeroUINavbar
      className="py-1 md:px-4 xl:px-24"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 min-w-20">
          <RouterLink
            className="flex justify-start items-center gap-1"
            to="/"
          >
            <Image
              alt="Logo"
              className="w-20 lg:w-24 object-contain"
              radius="none"
              src={Logo}
              width={"100%"}
            />
          </RouterLink>
        </NavbarBrand>

        <Divider
          className="bg-primary h-10 hidden lg:flex"
          orientation="vertical"
        />

        <div className="hidden lg:flex items-center">
          {siteConfig.navItems.map((item) => {
            const isActive = item.href.startsWith("#")
              ? location.pathname === "/" && activeSection === item.href
              : location.pathname.startsWith(item.href);

            return (
              <React.Fragment key={item.href}>
                <NavbarItem>
                  <button
                    className={`font-normal text-xs uppercase hover:text-primary rounded-full px-3 py-3 transition-colors ${
                      isActive ? "text-primary" : "text-black"
                    }`}
                    onClick={() => handleNavClick(item.href)}
                    type="button"
                  >
                    {item.label}
                  </button>
                </NavbarItem>
              </React.Fragment>
            );
          })}
        </div>
      </NavbarContent>

      <NavbarContent justify="end">
        {!shouldHideEarlyAccessButton && (
          <Button
            as={RouterLink}
            className="bg-primary text-black font-semibold px-8 py-7 shadow-md hidden lg:flex"
            radius="full"
            size="sm"
            to="/early-access"
          >
            GET EARLY ACCESS
          </Button>
        )}
        <NavbarMenuToggle className="sm:hidden basis-1" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mt-6 space-y-12">
          <div className="flex flex-col items-center gap-3">
            {siteConfig.navMenuItems.map((item) => {
              const isActive = item.href.startsWith("#")
                ? location.pathname === "/" && activeSection === item.href
                : location.pathname.startsWith(item.href);

              return (
                <NavbarMenuItem key={item.href}>
                  <button
                    className={`w-full text-2xl text-center font-semibold hover:bg-black-900 hover:text-white rounded-md px-8 transition-colors flex gap-2 items-center ${
                      isActive ? "bg-black-900 text-primary" : ""
                    }`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </button>
                </NavbarMenuItem>
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-center lg:justify-start gap-4">
            <Image
              alt="Google Play"
              className="h-14 w-44"
              radius="none"
              src={GooglePlayLogo}
            />
            <Image
              alt="App Store"
              className="h-14 w-44"
              radius="none"
              src={AppStoreLogo}
            />
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-green-200 rounded-full cursor-pointer hover:bg-green-300 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-green-900" />
            </a>
            <a
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-green-200 rounded-full cursor-pointer hover:bg-green-300 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookSquare className="text-green-900" />
            </a>
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-green-200 rounded-full cursor-pointer hover:bg-green-300 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="text-green-900" />
            </a>
            <a
              href={siteConfig.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-green-200 rounded-full cursor-pointer hover:bg-green-300 transition-colors"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="text-green-900" />
            </a>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
}
