/**
 * Generates dist/rss.xml and dist/sitemap.xml from the Wisp CMS after a build.
 *
 * The site is a client-rendered SPA, so these files are the only blog metadata
 * a non-JS crawler (or a feed reader) can see. Run as part of `npm run build`.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "dist");

const BLOG_ID =
  process.env.VITE_WISP_BLOG_ID ?? "35a52fbc-bec0-4c98-8876-ea94537f3f13";
const WISP_BASE = process.env.VITE_WISP_BASE_URL ?? "https://www.wisp.blog";
const SITE_URL = (process.env.VITE_SITE_URL ?? "https://uselisah.com").replace(
  /\/$/,
  ""
);

const SITE_TITLE = "Lisah Blog";
const SITE_DESCRIPTION =
  "Insights on long-term investing, financial discipline, and building wealth without the noise.";

/** Static routes that should appear in the sitemap alongside the posts. */
const STATIC_ROUTES = [
  "/",
  "/features",
  "/company-pricing",
  "/blog",
  "/careers",
  "/early-access",
  "/privacy-policy",
  "/terms-of-use",
];

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchAllPosts() {
  const url = `${WISP_BASE}/api/v1/${BLOG_ID}/posts?limit=all`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Wisp responded ${response.status} for ${url}`);
  }

  const { posts } = await response.json();

  return posts ?? [];
}

function buildRss(posts) {
  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const date = new Date(post.publishedAt ?? post.createdAt);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(post.description ?? "")}</description>
      <pubDate>${date.toUTCString()}</pubDate>
${post.author?.name ? `      <dc:creator>${escapeXml(post.author.name)}</dc:creator>\n` : ""}    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function buildSitemap(posts) {
  const entries = [
    ...STATIC_ROUTES.map((route) => ({
      loc: `${SITE_URL}${route}`,
      lastmod: null,
    })),
    ...posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: new Date(post.updatedAt ?? post.publishedAt ?? post.createdAt)
        .toISOString()
        .slice(0, 10),
    })),
  ];

  const urls = entries
    .map(
      ({ loc, lastmod }) =>
        `  <url>\n    <loc>${escapeXml(loc)}</loc>${
          lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""
        }\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  const posts = await fetchAllPosts();

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(join(OUT_DIR, "rss.xml"), buildRss(posts), "utf8");
  await writeFile(join(OUT_DIR, "sitemap.xml"), buildSitemap(posts), "utf8");

  console.log(
    `[blog-feed] wrote rss.xml and sitemap.xml for ${posts.length} post(s)`
  );
}

main().catch((error) => {
  // A CMS hiccup shouldn't fail the whole deploy — the site still works without
  // these files, so warn loudly and carry on.
  console.warn(`[blog-feed] skipped: ${error.message}`);
});
