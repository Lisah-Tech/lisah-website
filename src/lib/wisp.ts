import { buildWispClient } from "@wisp-cms/client";

/**
 * Wisp CMS client.
 *
 * The blog ID is a public identifier (it is used from the browser), so it is
 * safe to ship a default. Override per-environment with VITE_WISP_BLOG_ID.
 */
export const WISP_BLOG_ID =
  import.meta.env.VITE_WISP_BLOG_ID ?? "35a52fbc-bec0-4c98-8876-ea94537f3f13";

export const wisp = buildWispClient({
  baseUrl: import.meta.env.VITE_WISP_BASE_URL ?? "https://www.wisp.blog",
  blogId: WISP_BLOG_ID,
});

export const POSTS_PER_PAGE = 9;
