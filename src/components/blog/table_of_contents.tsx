import type { Heading } from "@/lib/blog_utils";

import { useEffect, useState } from "react";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);

      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-3">
      <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-gray-400">
        On this page
      </p>
      <ul className="space-y-1 border-l border-gray-100">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              className={`block border-l-2 py-1.5 text-sm transition-colors ${
                heading.level === 3 ? "pl-7" : "pl-4"
              } ${
                activeId === heading.id
                  ? "-ml-px border-primary font-medium text-lisah-green"
                  : "-ml-px border-transparent text-gray-500 hover:text-lisah-green"
              }`}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(heading.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.replaceState(null, "", `#${heading.id}`);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
