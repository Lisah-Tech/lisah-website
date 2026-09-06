import type { GetPostsResult } from "@wisp-cms/client";

import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

import { formatDate } from "@/lib/blog_utils";

export type PostSummary = GetPostsResult["posts"][number];

interface PostCardProps {
  post: PostSummary;
  /** Renders the wide, split hero treatment used for the featured post. */
  featured?: boolean;
}

/**
 * Not every post has a cover image, so fall back to the wordmark watermark used
 * on the homepage rather than leaving a blank tile.
 */
function CoverFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/25 via-primary-bg to-white">
      <span
        aria-hidden
        className="select-none text-5xl font-bold tracking-tight text-lisah-green/15 lg:text-7xl"
      >
        Lisah
      </span>
    </div>
  );
}

function TagPill({ name, small = false }: { name: string; small?: boolean }) {
  return (
    <span
      className={`rounded-full bg-primary-bg font-medium text-lisah-green ${
        small ? "px-2.5 py-1 text-[0.7rem]" : "px-3 py-1 text-xs"
      }`}
    >
      {name.replace(/_/g, " ")}
    </span>
  );
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const date = formatDate(post.publishedAt ?? post.createdAt);

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-3xl border border-primary/25 bg-white shadow-[0_2px_24px_rgba(16,157,63,0.06)] transition-shadow hover:shadow-[0_8px_40px_rgba(16,157,63,0.14)]">
        <Link className="grid gap-0 lg:grid-cols-2" to={`/blog/${post.slug}`}>
          <div className="relative h-56 min-h-[18rem] overflow-hidden bg-primary-bg sm:h-72 lg:h-full">
            {post.image ? (
              <img
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
                src={post.image}
              />
            ) : (
              <CoverFallback />
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-lisah-green backdrop-blur">
              Featured
            </span>
          </div>

          <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-12">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <TagPill key={tag.id} name={tag.name} />
                ))}
              </div>
            )}

            <h2 className="text-2xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-lisah-green lg:text-4xl">
              {post.title}
            </h2>

            {post.description && (
              <p className="line-clamp-3 text-sm text-gray-600 lg:text-base">
                {post.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
              {post.author?.name && (
                <span className="flex items-center gap-2">
                  {post.author.image && (
                    <img
                      aria-hidden
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                      src={post.author.image}
                    />
                  )}
                  <span className="font-medium text-gray-700">
                    {post.author.name}
                  </span>
                </span>
              )}
              {date && <span>{date}</span>}
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-lisah-green">
              Read article
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_12px_rgba(3,41,18,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_10px_32px_rgba(16,157,63,0.12)]">
      <Link className="flex h-full flex-col" to={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden bg-primary-bg">
          {post.image ? (
            <img
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              src={post.image}
            />
          ) : (
            <CoverFallback />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 lg:p-6">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <TagPill key={tag.id} small name={tag.name} />
              ))}
            </div>
          )}

          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-lisah-green">
            {post.title}
          </h3>

          {post.description && (
            <p className="line-clamp-3 text-sm text-gray-600">
              {post.description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between pt-4 text-xs text-gray-500">
            <span>{date}</span>
            <FiArrowUpRight className="text-base text-lisah-green opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </Link>
    </article>
  );
}
