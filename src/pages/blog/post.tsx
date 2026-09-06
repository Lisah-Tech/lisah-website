import type { GetPostResult, GetRelatedPostsResult } from "@wisp-cms/client";

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@heroui/react";
import { FiArrowLeft, FiChevronRight, FiClock } from "react-icons/fi";

import ReadingProgress from "@/components/blog/reading_progress";
import ShareButtons from "@/components/blog/share_buttons";
import TableOfContents from "@/components/blog/table_of_contents";
import Comments from "@/components/blog/comments";
import NewsletterCta from "@/components/blog/newsletter_cta";
import { PostSkeleton } from "@/components/blog/skeletons";
import { wisp } from "@/lib/wisp";
import {
  firstImageFromHtml,
  formatDate,
  htmlToText,
  prepareContent,
  readingTimeFromHtml,
  toIsoDate,
} from "@/lib/blog_utils";
import { useSeo } from "@/hooks/use_seo";

interface PostMetadata extends Record<string, unknown> {
  readingTime?: number;
}

type Post = NonNullable<GetPostResult<PostMetadata>["post"]>;
type RelatedPosts = GetRelatedPostsResult["posts"];

export default function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<RelatedPosts>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setNotFound(false);
    setPost(null);
    setRelated([]);

    wisp
      .getPost<PostMetadata>(slug)
      .then((result) => {
        if (cancelled) return;
        if (!result.post) {
          setNotFound(true);

          return;
        }
        setPost(result.post);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    wisp
      .getRelatedPosts({ slug, limit: 3 })
      .then((result) => {
        if (!cancelled) setRelated(result.posts);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Posts frequently have no cover set but open with an inline image; promote
  // that image to the cover and drop it from the body so it isn't shown twice.
  const usesLeadingImageAsCover = Boolean(post && !post.image);

  const { html, headings } = useMemo(
    () =>
      post
        ? prepareContent(post.content, {
            stripLeadingImage: usesLeadingImageAsCover,
          })
        : { html: "", headings: [] },
    [post, usesLeadingImageAsCover],
  );

  const readingTime = useMemo(() => {
    if (!post) return 0;
    const fromCms = post.metadata?.readingTime;

    return typeof fromCms === "number"
      ? fromCms
      : readingTimeFromHtml(post.content);
  }, [post]);

  const cover = post?.image ?? firstImageFromHtml(post?.content ?? null);
  const publishedAt = toIsoDate(post?.publishedAt ?? post?.createdAt);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `/blog/${slug}`;

  const description =
    post?.description ?? (post ? htmlToText(post.content).slice(0, 160) : "");

  useSeo({
    enabled: Boolean(post),
    title: post?.title,
    description,
    image: cover,
    url: `/blog/${slug}`,
    type: "article",
    publishedAt,
    modifiedAt: toIsoDate(post?.updatedAt),
    author: post?.author?.name ?? null,
    tags: post?.tags.map((tag) => tag.name),
    jsonLd: post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description,
          image: cover ?? undefined,
          datePublished: publishedAt,
          dateModified: toIsoDate(post.updatedAt),
          author: {
            "@type": "Person",
            name: post.author?.name ?? "Lisah",
          },
          publisher: {
            "@type": "Organization",
            name: "Lisah",
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          keywords: post.tags.map((tag) => tag.name).join(", ") || undefined,
        }
      : null,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <PostSkeleton />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-white px-4">
        <div className="max-w-md space-y-5 text-center">
          <p className="text-6xl font-bold text-primary">404</p>
          <h1 className="text-2xl font-bold text-gray-900">
            We couldn&apos;t find that article
          </h1>
          <p className="text-sm text-gray-600">
            It may have been moved or unpublished. Browse the latest writing
            instead.
          </p>
          <Button
            as={Link}
            className="bg-primary px-8 font-semibold text-black shadow-md"
            radius="full"
            startContent={<FiArrowLeft />}
            to="/blog"
          >
            BACK TO BLOG
          </Button>
        </div>
      </div>
    );
  }

  const toc = <TableOfContents headings={headings} />;

  // Note: no `overflow-hidden` on the page wrapper — it would become the scroll
  // container for the sticky sidebar below and stop it from sticking.
  return (
    <div className="relative min-h-screen bg-white">
      <ReadingProgress />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] overflow-hidden">
        <div className="absolute -top-32 right-0 h-[22rem] w-[22rem] rounded-full bg-light-lisah-green blur-[120px] lg:w-[36rem]" />
      </div>

      {/*
        Header, cover and article all sit in the same grid column so their left
        edges line up, with the table of contents in a sticky sidebar beside
        them. Below `lg` the sidebar is hidden and the contents list is rendered
        inline after the cover instead.
      */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-14 px-4 pb-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:px-12 lg:pb-24">
        <div className="min-w-0">
          <header className="mx-auto max-w-3xl pb-8 pt-10 lg:mx-0 lg:pt-16">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-gray-500"
            >
              <Link className="hover:text-lisah-green" to="/">
                Home
              </Link>
              <FiChevronRight aria-hidden className="shrink-0 text-gray-300" />
              <Link className="hover:text-lisah-green" to="/blog">
                Blog
              </Link>
              <FiChevronRight aria-hidden className="shrink-0 text-gray-300" />
              <span className="truncate text-gray-700">{post.title}</span>
            </nav>

            <div className="mt-6 space-y-6">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      className="rounded-full bg-primary-bg px-3 py-1 text-xs font-medium text-lisah-green transition-colors hover:bg-primary hover:text-black"
                      to={`/blog?tag=${encodeURIComponent(tag.name)}`}
                    >
                      {tag.name.replace(/_/g, " ")}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-base text-gray-600 lg:text-lg">
                  {post.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-gray-100 py-4">
                <div className="flex items-center gap-3">
                  {post.author?.image ? (
                    <img
                      aria-hidden
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                      src={post.author.image}
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-bg text-sm font-bold text-lisah-green">
                      {(post.author?.name ?? "L").slice(0, 1)}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {post.author?.name ?? "Lisah"}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-gray-500">
                      <time dateTime={publishedAt}>
                        {formatDate(post.publishedAt ?? post.createdAt)}
                      </time>
                      <span aria-hidden>·</span>
                      <span className="flex items-center gap-1">
                        <FiClock aria-hidden /> {readingTime} min read
                      </span>
                    </p>
                  </div>
                </div>

                {/* Wraps onto its own line on narrow screens. */}
                <div className="ml-auto">
                  <ShareButtons title={post.title} url={url} />
                </div>
              </div>
            </div>
          </header>

          {cover && (
            <img
              alt={post.title}
              className="mx-auto max-h-[28rem] w-full max-w-3xl rounded-2xl object-cover lg:mx-0"
              src={cover}
            />
          )}

          <div className="mx-auto mt-8 max-w-3xl lg:hidden">{toc}</div>

          {/*
            Content is authored in Lisah's own Wisp CMS and sanitized in
            prepareContent. The HTML is set on the .blog-prose element itself so
            the stylesheet's direct-child spacing rules reach the CMS markup.
          */}
          <article
            dangerouslySetInnerHTML={{ __html: html }}
            className="blog-prose mx-auto mt-10 w-full max-w-3xl lg:mx-0 lg:mt-12"
          />

          <div className="mx-auto mt-12 max-w-3xl space-y-12 lg:mx-0">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary-bg/50 px-5 py-5">
              <p className="text-sm font-medium text-gray-700">
                Found this useful? Share it.
              </p>
              <ShareButtons title={post.title} url={url} />
            </div>

            <Comments slug={slug} />
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 pt-16">{toc}</div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="relative border-t border-gray-100 bg-primary-bg/30">
          <div className="mx-auto max-w-7xl px-4 py-14 lg:px-12 lg:py-20">
            <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
              Keep reading
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_10px_32px_rgba(16,157,63,0.12)]"
                  to={`/blog/${item.slug}`}
                >
                  <p className="text-xs text-gray-500">
                    {formatDate(item.publishedAt ?? item.createdAt)}
                  </p>
                  <h3 className="line-clamp-2 text-base font-bold text-gray-900 transition-colors group-hover:text-lisah-green">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {item.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-12 lg:py-20">
        <NewsletterCta />
      </div>
    </div>
  );
}
