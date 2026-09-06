/** Formatting + HTML helpers shared by the blog listing and post pages. */

export function formatDate(
  value: Date | string | null | undefined,
  opts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", opts).format(date);
}

export function toIsoDate(value: Date | string | null | undefined): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

/** Strips tags so HTML can be measured or used as a meta description. */
export function htmlToText(html: string): string {
  if (typeof window === "undefined") return html.replace(/<[^>]*>/g, " ");
  const el = document.createElement("div");

  el.innerHTML = html;

  return (el.textContent ?? "").replace(/\s+/g, " ").trim();
}

/** ~225 wpm, rounded up, matching Wisp's own readingTime metadata. */
export function readingTimeFromHtml(html: string): number {
  const words = htmlToText(html).split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 225));
}

/**
 * Posts often have no cover image set, but almost always lead with an inline
 * one. Fall back to that so cards are never blank.
 */
export function firstImageFromHtml(html: string | null): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);

  return match ? match[1] : null;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface PreparedContent {
  html: string;
  headings: Heading[];
}

function slugify(text: string, taken: Set<string>): string {
  const base =
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || "section";

  let id = base;
  let n = 2;

  while (taken.has(id)) id = `${base}-${n++}`;
  taken.add(id);

  return id;
}

export interface PrepareOptions {
  /**
   * Set when the article's first inline image is being promoted to the cover,
   * so the same image isn't rendered twice.
   */
  stripLeadingImage?: boolean;
}

/**
 * Prepares CMS HTML for rendering: drops anything executable, gives headings
 * stable ids so the table of contents can link to them, makes external links
 * safe, and lazy-loads images.
 */
export function prepareContent(
  html: string,
  { stripLeadingImage = false }: PrepareOptions = {},
): PreparedContent {
  if (typeof window === "undefined") return { html, headings: [] };

  const doc = new DOMParser().parseFromString(html, "text/html");

  doc
    .querySelectorAll("script, style, iframe[src^='javascript:']")
    .forEach((node) => node.remove());

  doc.querySelectorAll("*").forEach((node) => {
    for (const attr of Array.from(node.attributes)) {
      if (/^on/i.test(attr.name)) node.removeAttribute(attr.name);
    }
  });

  if (stripLeadingImage) {
    const firstImage = doc.body.querySelector("img");

    // Only strip it if nothing but empty paragraphs precede it.
    if (firstImage) {
      const before = htmlToText(
        Array.from(doc.body.children)
          .slice(
            0,
            Array.from(doc.body.children).indexOf(
              firstImage.closest("body > *") ?? firstImage,
            ),
          )
          .map((el) => el.innerHTML)
          .join(""),
      );

      if (!before) {
        const wrapper = firstImage.parentElement;

        firstImage.remove();
        if (
          wrapper &&
          !wrapper.textContent?.trim() &&
          !wrapper.querySelector("img")
        )
          wrapper.remove();
      }
    }
  }

  const taken = new Set<string>();
  const headings: Heading[] = [];

  doc.querySelectorAll("h2, h3").forEach((node) => {
    const text = (node.textContent ?? "").trim();

    if (!text) return;
    const id = node.id || slugify(text, taken);

    node.id = id;
    headings.push({ id, text, level: Number(node.tagName[1]) });
  });

  doc.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", "lazy");
    img.setAttribute("decoding", "async");
  });

  doc.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") ?? "";

    if (/^https?:\/\//i.test(href) && !href.includes(window.location.host)) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });

  return { html: doc.body.innerHTML, headings };
}
