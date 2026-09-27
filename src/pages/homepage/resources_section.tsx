import type { PostSummary } from "@/components/blog/post_card";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiShare2 } from "react-icons/fi";

import { wisp } from "@/lib/wisp";

const POST_COUNT = 3;

function postUrl(slug: string) {
  return `${window.location.origin}/blog/${slug}`;
}

function TagPill({ post }: { post: PostSummary }) {
  const name = post.tags[0]?.name.replace(/_/g, " ") ?? "Article";

  return (
    <span className="inline-block rounded-md bg-primary/70 px-3 py-0.5 text-xs font-medium text-black">
      {name}
    </span>
  );
}

function Cover({ post, className }: { post: PostSummary; className: string }) {
  if (post.image) {
    return (
      <img
        alt=""
        className={`${className} object-cover transition-transform duration-500 group-hover:scale-105`}
        loading="lazy"
        src={post.image}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${className} flex items-center justify-center bg-gradient-to-br from-primary/25 via-primary-bg to-gray-100`}
    >
      <span className="select-none text-3xl font-bold tracking-tight text-lisah-green/15">
        Lisah
      </span>
    </div>
  );
}

function ShareButton({ post }: { post: PostSummary }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = postUrl(post.slug);

    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url });

        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The user dismissed the share sheet or clipboard access was denied.
    }
  };

  return (
    <button
      aria-label={copied ? "Link copied" : `Share "${post.title}"`}
      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-primary-bg hover:text-lisah-green"
      type="button"
      onClick={share}
    >
      {copied ? <FiCheck className="text-lisah-green" /> : <FiShare2 />}
    </button>
  );
}

function FeaturedArticle({ post }: { post: PostSummary }) {
  return (
    <Link
      className="group relative flex min-h-[18rem] lg:min-h-[26rem] overflow-hidden rounded-[2rem] bg-gray-200"
      to={`/blog/${post.slug}`}
    >
      <Cover className="absolute inset-0 h-full w-full" post={post} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative mt-auto space-y-3 p-6 lg:p-8">
        <TagPill post={post} />
        <h3 className="line-clamp-2 max-w-md text-lg lg:text-xl font-medium leading-snug text-white underline decoration-white/60 underline-offset-4 group-hover:decoration-white">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

function ArticleRow({ post }: { post: PostSummary }) {
  return (
    <article className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[12rem_1fr] gap-4 lg:gap-6">
      <Link
        aria-hidden="true"
        className="group block overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] bg-gray-200"
        tabIndex={-1}
        to={`/blog/${post.slug}`}
      >
        <Cover className="aspect-[6/5] h-full w-full" post={post} />
      </Link>

      <div className="flex min-w-0 flex-col items-start gap-2 py-1">
        <TagPill post={post} />
        <Link
          className="line-clamp-2 text-base lg:text-lg leading-snug text-gray-900 underline decoration-gray-400 underline-offset-4 transition-colors hover:text-lisah-green hover:decoration-lisah-green"
          to={`/blog/${post.slug}`}
        >
          {post.title}
        </Link>
        <div className="mt-auto flex justify-end self-stretch">
          <ShareButton post={post} />
        </div>
      </div>
    </article>
  );
}

function ResourcesSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-6 lg:grid-cols-2">
      <div className="min-h-[18rem] lg:min-h-[26rem] animate-pulse rounded-[2rem] bg-gray-200" />
      <div className="grid gap-6">
        {[0, 1].map((key) => (
          <div
            key={key}
            className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[12rem_1fr] gap-4 lg:gap-6"
          >
            <div className="aspect-[6/5] animate-pulse rounded-[1.5rem] lg:rounded-[2rem] bg-gray-200" />
            <div className="space-y-3 py-1">
              <div className="h-5 w-14 animate-pulse rounded-md bg-gray-200" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResourcesSection() {
  const [posts, setPosts] = useState<PostSummary[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    wisp
      .getPosts({ page: 1, limit: POST_COUNT })
      .then((result) => {
        if (!cancelled) setPosts(result.posts);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Nothing published (or the CMS is unreachable): leave the section out
  // rather than showing an empty shell.
  if (posts?.length === 0) return null;

  const [featured, ...rest] = posts ?? [];

  return (
    <section
      aria-labelledby="resources-heading"
      className="mx-auto max-w-7xl px-4 lg:px-12 space-y-8 lg:space-y-10"
    >
      <div className="flex items-end justify-between gap-4">
        <h2
          className="text-3xl lg:text-5xl font-medium tracking-tight"
          id="resources-heading"
        >
          Resources &amp; Articles:
        </h2>
        <Link
          className="hidden sm:inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-lisah-green hover:underline"
          to="/blog"
        >
          View all articles <FiArrowRight />
        </Link>
      </div>

      {posts === null ? (
        <ResourcesSkeleton />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <FeaturedArticle post={featured} />
          {rest.length > 0 && (
            <div className="grid content-start gap-6">
              {rest.map((post) => (
                <ArticleRow key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}

      <Link
        className="flex sm:hidden items-center justify-center gap-2 text-sm font-semibold text-lisah-green"
        to="/blog"
      >
        View all articles <FiArrowRight />
      </Link>
    </section>
  );
}
