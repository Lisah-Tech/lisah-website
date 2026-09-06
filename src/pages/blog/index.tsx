import type { GetPostsResult, GetTagsResult } from "@wisp-cms/client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiAlertCircle, FiSearch } from "react-icons/fi";

import PostCard from "@/components/blog/post_card";
import TagFilter from "@/components/blog/tag_filter";
import SearchInput from "@/components/blog/search_input";
import Pagination from "@/components/blog/pagination";
import NewsletterCta from "@/components/blog/newsletter_cta";
import {
  FeaturedSkeleton,
  PostCardSkeleton,
} from "@/components/blog/skeletons";
import { wisp, POSTS_PER_PAGE } from "@/lib/wisp";
import { useSeo } from "@/hooks/use_seo";

type Posts = GetPostsResult["posts"];
type Tags = GetTagsResult["tags"];

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);
  const tag = searchParams.get("tag");
  const query = searchParams.get("q") ?? "";

  // Local mirror so typing stays responsive; the URL updates after a pause.
  const [searchDraft, setSearchDraft] = useState(query);
  const [posts, setPosts] = useState<Posts>([]);
  const [tags, setTags] = useState<Tags>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isFiltered = Boolean(tag) || query.trim().length > 0;

  const updateParams = useCallback(
    (next: Record<string, string | null>) => {
      setSearchParams(
        (current) => {
          const params = new URLSearchParams(current);

          Object.entries(next).forEach(([key, value]) => {
            if (value === null || value === "") params.delete(key);
            else params.set(key, value);
          });

          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  useEffect(() => setSearchDraft(query), [query]);

  useEffect(() => {
    if (searchDraft === query) return;

    const timer = setTimeout(
      () => updateParams({ q: searchDraft.trim() || null, page: null }),
      350,
    );

    return () => clearTimeout(timer);
  }, [searchDraft, query, updateParams]);

  useEffect(() => {
    let cancelled = false;

    wisp
      .getTags(1, "all")
      .then((result) => {
        if (!cancelled) setTags(result.tags);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(false);

    wisp
      .getPosts({
        page,
        limit: POSTS_PER_PAGE,
        ...(tag ? { tags: [tag] } : {}),
        ...(query.trim() ? { query: query.trim() } : {}),
      })
      .then((result) => {
        if (cancelled) return;
        setPosts(result.posts);
        setTotalPages(result.pagination.totalPages || 1);
        setTotalPosts(result.pagination.totalPosts);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, tag, query]);

  const [featured, rest] = useMemo<[Posts[number] | null, Posts]>(() => {
    if (isFiltered || page > 1 || posts.length === 0) return [null, posts];

    return [posts[0], posts.slice(1)];
  }, [posts, isFiltered, page]);

  useSeo({
    title: tag ? `${tag.replace(/_/g, " ")} articles` : "Blog",
    description:
      "Insights on long-term investing, financial discipline, and building wealth without the noise — from the team behind Lisah.",
    url: "/blog",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Lisah Blog",
      description:
        "Insights on long-term investing, financial discipline, and building wealth without the noise.",
      url: `${window.location.origin}/blog`,
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 right-0 h-[20rem] w-[20rem] shrink-0 rounded-full bg-light-lisah-green blur-[110px] lg:h-[28rem] lg:w-[38rem]" />
        <div className="absolute -left-24 top-32 h-[16rem] w-[16rem] shrink-0 rounded-full bg-light-lisah-green blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 lg:px-12 lg:pb-14 lg:pt-20">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white/70 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-lisah-green backdrop-blur">
              The Lisah Blog
            </span>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Ideas for the long game.
            </h1>

            <p className="mx-auto max-w-xl text-sm text-gray-600 lg:text-base">
              Insights on long-term investing, financial discipline, and
              building wealth without the noise.
            </p>

            <div className="mx-auto max-w-xl pt-2">
              <SearchInput value={searchDraft} onChange={setSearchDraft} />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-4 lg:px-12">
        <TagFilter
          active={tag}
          tags={tags}
          onChange={(next) => updateParams({ tag: next, page: null })}
        />
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16 pt-8 lg:px-12 lg:pb-24 lg:pt-10">
        {isFiltered && !loading && !error && (
          <p className="text-sm text-gray-500">
            {totalPosts === 0
              ? "No results"
              : `${totalPosts} article${totalPosts === 1 ? "" : "s"}`}
            {query.trim() && (
              <>
                {" "}
                for{" "}
                <span className="font-medium text-gray-900">
                  “{query.trim()}”
                </span>
              </>
            )}
            {tag && (
              <>
                {" "}
                tagged{" "}
                <span className="font-medium text-gray-900">
                  {tag.replace(/_/g, " ")}
                </span>
              </>
            )}
          </p>
        )}

        {loading ? (
          <div className="space-y-10">
            {!isFiltered && page === 1 && <FeaturedSkeleton />}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
            <FiAlertCircle
              aria-hidden
              className="mx-auto mb-4 text-3xl text-gray-300"
            />
            <h2 className="text-lg font-semibold text-gray-900">
              We couldn&apos;t load the articles
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
              Something went wrong reaching the blog. Please check your
              connection and try again.
            </p>
            <button
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black shadow-md"
              type="button"
              onClick={() => updateParams({ page: null })}
            >
              Try again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
            <FiSearch
              aria-hidden
              className="mx-auto mb-4 text-3xl text-gray-300"
            />
            <h2 className="text-lg font-semibold text-gray-900">
              No articles found
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
              {isFiltered
                ? "Try a different search term or clear the filters to see everything."
                : "New writing is on the way — check back soon."}
            </p>
            {isFiltered && (
              <button
                className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black shadow-md"
                type="button"
                onClick={() => updateParams({ q: null, tag: null, page: null })}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {featured && <PostCard featured post={featured} />}

            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(next) =>
                updateParams({ page: next === 1 ? null : String(next) })
              }
            />
          </div>
        )}

        <NewsletterCta />
      </div>
    </div>
  );
}
