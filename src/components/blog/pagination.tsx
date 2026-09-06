import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/** Compact page list: always shows first/last, with an ellipsis around a window. */
function pageList(page: number, totalPages: number): (number | "gap")[] {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages = new Set<number>([1, totalPages, page]);

  if (page - 1 > 1) pages.add(page - 1);
  if (page + 1 < totalPages) pages.add(page + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];

  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });

  return out;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const base =
    "flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors";

  return (
    <nav
      aria-label="Blog pagination"
      className="flex items-center justify-center gap-2"
    >
      <button
        aria-label="Previous page"
        className={`${base} border border-gray-200 text-gray-600 hover:border-primary hover:text-lisah-green disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600`}
        disabled={page <= 1}
        type="button"
        onClick={() => onChange(page - 1)}
      >
        <FiChevronLeft />
      </button>

      {pageList(page, totalPages).map((entry, i) =>
        entry === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={entry}
            aria-current={entry === page ? "page" : undefined}
            className={`${base} ${
              entry === page
                ? "bg-primary font-semibold text-black"
                : "border border-gray-200 text-gray-600 hover:border-primary hover:text-lisah-green"
            }`}
            type="button"
            onClick={() => onChange(entry)}
          >
            {entry}
          </button>
        ),
      )}

      <button
        aria-label="Next page"
        className={`${base} border border-gray-200 text-gray-600 hover:border-primary hover:text-lisah-green disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600`}
        disabled={page >= totalPages}
        type="button"
        onClick={() => onChange(page + 1)}
      >
        <FiChevronRight />
      </button>
    </nav>
  );
}
