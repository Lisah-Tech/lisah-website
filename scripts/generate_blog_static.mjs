/**
 * Generates the blog's static build artifacts from the Wisp CMS:
 *
 *   - dist/rss.xml, dist/sitemap.xml
 *   - dist/blog/<slug>/index.html — a copy of the built index.html with that
 *     post's real title, description and og:image baked into the head.
 *
 * The site is a client-rendered SPA, so link scrapers (X, LinkedIn, Facebook,
 * Slack, WhatsApp) never run the JavaScript that sets per-post meta tags — they
 * would otherwise only ever see the generic site card. Netlify, Vercel and
 * Firebase all serve a matching static file before applying their SPA rewrite,
 * so these files reach crawlers and real visitors alike; React then takes over
 * and renders the same route as usual.
 *
 * Because this runs at build time, a post published in Wisp only gets its card
 * after the next deploy.
 *
 * Run as part of `npm run build`.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
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

const SITE_NAME = "Lisah";
/** Used for posts with no featured image set in Wisp. */
const OG_FALLBACK_IMAGE = `${SITE_URL}/og-image.png`;
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

/**
 * Escaping for HTML attributes and text. Deliberately leaves apostrophes alone:
 * `&apos;` is valid HTML5 but predates neither HTML4 nor every link scraper, and
 * a bare `'` is safe inside the double-quoted attributes used below.
 */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

/**
 * Strips the head tags we are about to replace. Anything a crawler reads for a
 * link card must be post-specific, so the site-wide defaults have to go rather
 * than sit alongside duplicates.
 */
function stripDefaultMeta(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "");
}

function buildHead(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | ${SITE_NAME}`;
  const description = (post.description ?? SITE_DESCRIPTION).replace(
    /\s+/g,
    " "
  );
  const published = new Date(post.publishedAt ?? post.createdAt).toISOString();
  const modified = new Date(
    post.updatedAt ?? post.publishedAt ?? post.createdAt
  ).toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: published,
    dateModified: modified,
    author: { "@type": "Person", name: post.author?.name ?? SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.image ? { image: post.image } : {}),
  };

  const image = post.image ?? OG_FALLBACK_IMAGE;

  return `    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}"/>
    <link rel="canonical" href="${escapeHtml(url)}"/>
    <meta property="og:type" content="article"/>
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}"/>
    <meta property="og:title" content="${escapeHtml(title)}"/>
    <meta property="og:description" content="${escapeHtml(description)}"/>
    <meta property="og:url" content="${escapeHtml(url)}"/>
    <meta property="og:image" content="${escapeHtml(image)}"/>
    <meta property="og:image:alt" content="${escapeHtml(post.title)}"/>
    <meta property="article:published_time" content="${published}"/>
    <meta property="article:modified_time" content="${modified}"/>
${post.author?.name ? `    <meta property="article:author" content="${escapeHtml(post.author.name)}"/>\n` : ""}    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="${escapeHtml(title)}"/>
    <meta name="twitter:description" content="${escapeHtml(description)}"/>
    <meta name="twitter:image" content="${escapeHtml(image)}"/>
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
`;
}

async function prerenderPosts(posts) {
  const shell = await readFile(join(OUT_DIR, "index.html"), "utf8");

  if (!/<\/head>/i.test(shell)) {
    throw new Error("dist/index.html has no </head> to inject into");
  }

  for (const post of posts) {
    const html = stripDefaultMeta(shell).replace(
      /<\/head>/i,
      `${buildHead(post)}  </head>`
    );
    const dir = join(OUT_DIR, "blog", post.slug);

    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "index.html"), html, "utf8");
  }

  return posts.length;
}

async function main() {
  const posts = await fetchAllPosts();

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(join(OUT_DIR, "rss.xml"), buildRss(posts), "utf8");
  await writeFile(join(OUT_DIR, "sitemap.xml"), buildSitemap(posts), "utf8");

  const prerendered = await prerenderPosts(posts);

  console.log(
    `[blog-static] wrote rss.xml, sitemap.xml and ${prerendered} prerendered post page(s)`
  );
}

main().catch((error) => {
  // A CMS hiccup shouldn't fail the whole deploy — the site still works without
  // these files, so warn loudly and carry on.
  console.warn(`[blog-static] skipped: ${error.message}`);
});
