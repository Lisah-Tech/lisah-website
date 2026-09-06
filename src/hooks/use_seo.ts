import { useEffect } from "react";

export interface SeoOptions {
  title?: string;
  description?: string;
  image?: string | null;
  /** Absolute or root-relative URL for <link rel="canonical"> and og:url. */
  url?: string;
  type?: "website" | "article";
  publishedAt?: string;
  modifiedAt?: string;
  author?: string | null;
  tags?: string[];
  /** JSON-LD injected as <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown> | null;
  /** Skip while data is still loading so we don't flash a wrong title. */
  enabled?: boolean;
}

const SITE_NAME = "Lisah";

/**
 * Applies a head tag and returns a function that puts the document back the way
 * it was — either restoring the previous value of a tag from index.html, or
 * removing a tag this hook created. Without this, values from an article (its
 * og:image, say) would leak onto the next page the user visits.
 */
type Undo = () => void;

function setAttr(el: Element, name: string, value: string): Undo {
  const previous = el.getAttribute(name);

  el.setAttribute(name, value);

  return () => {
    if (previous === null) el.removeAttribute(name);
    else el.setAttribute(name, previous);
  };
}

function setMeta(
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
): Undo {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (existing) return setAttr(existing, "content", content);

  const el = document.createElement("meta");

  el.setAttribute(attr, key);
  el.setAttribute("content", content);
  document.head.appendChild(el);

  return () => el.remove();
}

function setLink(rel: string, href: string): Undo {
  const existing = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );

  if (existing) return setAttr(existing, "href", href);

  const el = document.createElement("link");

  el.setAttribute("rel", rel);
  el.setAttribute("href", href);
  document.head.appendChild(el);

  return () => el.remove();
}

/**
 * Client-side head management. This app is a Vite SPA with no prerendering, so
 * these tags are read by crawlers that execute JS (Google) but not by every
 * social scraper — see the note in the blog README section.
 */
export function useSeo(options: SeoOptions) {
  const {
    title,
    description,
    image,
    url,
    type = "website",
    publishedAt,
    modifiedAt,
    author,
    tags,
    jsonLd,
    enabled = true,
  } = options;

  useEffect(() => {
    if (!enabled) return;

    const previousTitle = document.title;
    const fullTitle = title ? `${title} | ${SITE_NAME}` : previousTitle;
    const absoluteUrl = url
      ? new URL(url, window.location.origin).toString()
      : window.location.href;
    const undos: Undo[] = [];

    document.title = fullTitle;

    if (description) {
      undos.push(
        setMeta('meta[name="description"]', "name", "description", description),
        setMeta(
          'meta[property="og:description"]',
          "property",
          "og:description",
          description,
        ),
        setMeta(
          'meta[name="twitter:description"]',
          "name",
          "twitter:description",
          description,
        ),
      );
    }

    undos.push(
      setMeta('meta[property="og:title"]', "property", "og:title", fullTitle),
      setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle),
      setMeta('meta[property="og:type"]', "property", "og:type", type),
      setMeta('meta[property="og:url"]', "property", "og:url", absoluteUrl),
      setMeta(
        'meta[property="og:site_name"]',
        "property",
        "og:site_name",
        SITE_NAME,
      ),
      setMeta(
        'meta[name="twitter:card"]',
        "name",
        "twitter:card",
        "summary_large_image",
      ),
      setLink("canonical", absoluteUrl),
    );

    if (image) {
      undos.push(
        setMeta('meta[property="og:image"]', "property", "og:image", image),
        setMeta('meta[name="twitter:image"]', "name", "twitter:image", image),
      );
    }

    if (type === "article") {
      const add = (property: string, content: string) => {
        const el = document.createElement("meta");

        el.setAttribute("property", property);
        el.setAttribute("content", content);
        document.head.appendChild(el);
        undos.push(() => el.remove());
      };

      if (publishedAt) add("article:published_time", publishedAt);
      if (modifiedAt) add("article:modified_time", modifiedAt);
      if (author) add("article:author", author);
      tags?.forEach((tag) => add("article:tag", tag));
    }

    if (jsonLd) {
      const script = document.createElement("script");

      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
      undos.push(() => script.remove());
    }

    return () => {
      document.title = previousTitle;
      // Unwind in reverse so overlapping tags land back on their original value.
      undos.reverse().forEach((undo) => undo());
    };
  }, [
    enabled,
    title,
    description,
    image,
    url,
    type,
    publishedAt,
    modifiedAt,
    author,
    tags?.join(","),
    jsonLd ? JSON.stringify(jsonLd) : null,
  ]);
}
