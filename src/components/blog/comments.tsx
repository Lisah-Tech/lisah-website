import type { Comment, CommentConfig } from "@wisp-cms/client";

import { useEffect, useState } from "react";
import { Button, Checkbox, Input, Textarea } from "@heroui/react";
import { FiMessageCircle } from "react-icons/fi";

import { wisp } from "@/lib/wisp";
import { formatDate } from "@/lib/blog_utils";

interface CommentsProps {
  slug: string;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [config, setConfig] = useState<CommentConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [allowEmailUsage, setAllowEmailUsage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    wisp
      .getComments({ slug, page: 1, limit: "all" })
      .then((result) => {
        if (cancelled) return;
        setComments(result.comments);
        setConfig(result.config);
      })
      .catch(() => {
        if (!cancelled) setConfig(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading || !config?.enabled) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await wisp.createComment({
        slug,
        author: author.trim(),
        email: email.trim(),
        content: content.trim(),
        allowEmailUsage,
        ...(config.allowUrls && url.trim() ? { url: url.trim() } : {}),
      });
      setSubmitted(true);
      setAuthor("");
      setEmail("");
      setUrl("");
      setContent("");
      setAllowEmailUsage(false);
    } catch {
      setError("We couldn't post your comment. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8" id="comments">
      <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 lg:text-2xl">
        <FiMessageCircle aria-hidden className="text-lisah-green" />
        Comments
        {comments.length > 0 && (
          <span className="rounded-full bg-primary-bg px-2.5 py-0.5 text-sm font-semibold text-lisah-green">
            {comments.length}
          </span>
        )}
      </h2>

      {comments.length > 0 ? (
        <ul className="space-y-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 lg:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-bg text-xs font-bold text-lisah-green">
                  {initials(comment.author)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {comment.url ? (
                      <a
                        className="hover:text-lisah-green"
                        href={comment.url}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        {comment.author}
                      </a>
                    ) : (
                      comment.author
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">
          No comments yet — start the conversation.
        </p>
      )}

      <div className="rounded-2xl border border-gray-100 bg-primary-bg/40 p-5 lg:p-8">
        {submitted ? (
          <div className="space-y-2 text-center">
            <p className="text-base font-semibold text-lisah-green">
              Thanks for joining in.
            </p>
            <p className="text-sm text-gray-600">
              {config.reviewType === "AUTO_APPROVE"
                ? "Check your inbox to verify your email and your comment will appear."
                : "Verify your email from your inbox — your comment appears once it's approved."}
            </p>
            <button
              className="text-sm font-medium text-lisah-green underline underline-offset-4"
              type="button"
              onClick={() => setSubmitted(false)}
            >
              Write another comment
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={submit}>
            <h3 className="text-base font-semibold text-gray-900">
              Leave a comment
            </h3>
            {config.signUpMessage && (
              <p className="text-sm text-gray-600">{config.signUpMessage}</p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                isRequired
                label="Name"
                labelPlacement="outside"
                placeholder="Your name"
                radius="lg"
                value={author}
                variant="bordered"
                onValueChange={setAuthor}
              />
              <Input
                isRequired
                label="Email"
                labelPlacement="outside"
                placeholder="you@example.com"
                radius="lg"
                type="email"
                value={email}
                variant="bordered"
                onValueChange={setEmail}
              />
            </div>

            {config.allowUrls && (
              <Input
                label="Website"
                labelPlacement="outside"
                placeholder="https://"
                radius="lg"
                type="url"
                value={url}
                variant="bordered"
                onValueChange={setUrl}
              />
            )}

            <Textarea
              isRequired
              label="Comment"
              labelPlacement="outside"
              minRows={4}
              placeholder="Share your thoughts…"
              radius="lg"
              value={content}
              variant="bordered"
              onValueChange={setContent}
            />

            <Checkbox
              classNames={{ label: "text-xs text-gray-600" }}
              isSelected={allowEmailUsage}
              size="sm"
              onValueChange={setAllowEmailUsage}
            >
              Lisah may email me about new posts and product updates.
            </Checkbox>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <p className="text-xs text-gray-500">
              Your email is never published. We&apos;ll send a link to verify it
              before your comment goes live.
            </p>

            <Button
              className="bg-primary px-8 font-semibold text-black shadow-md"
              isDisabled={!author.trim() || !email.trim() || !content.trim()}
              isLoading={submitting}
              radius="full"
              type="submit"
            >
              POST COMMENT
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
