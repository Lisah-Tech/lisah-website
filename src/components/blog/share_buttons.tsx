import { useState } from "react";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa6";
import { FiCheck, FiLink } from "react-icons/fi";

interface ShareButtonsProps {
  title: string;
  url: string;
  /** Stacks vertically for the sticky desktop rail. */
  vertical?: boolean;
}

export default function ShareButtons({
  title,
  url,
  vertical = false,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Share on X",
      icon: <FaXTwitter />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "Share on LinkedIn",
      icon: <FaLinkedinIn />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      icon: <FaFacebookF />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Share on WhatsApp",
      icon: <FaWhatsapp />,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const button =
    "flex h-10 w-10 items-center justify-center rounded-full bg-primary-bg text-lisah-green transition-colors hover:bg-primary hover:text-black";

  return (
    <div
      className={`flex items-center gap-2 ${vertical ? "flex-col" : "flex-wrap"}`}
    >
      {links.map((link) => (
        <a
          key={link.label}
          aria-label={link.label}
          className={button}
          href={link.href}
          rel="noopener noreferrer"
          target="_blank"
          title={link.label}
        >
          {link.icon}
        </a>
      ))}

      <button
        aria-label={copied ? "Link copied" : "Copy link"}
        className={button}
        title={copied ? "Link copied" : "Copy link"}
        type="button"
        onClick={copy}
      >
        {copied ? <FiCheck /> : <FiLink />}
      </button>
    </div>
  );
}
