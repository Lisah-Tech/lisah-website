interface Tag {
  id: string;
  name: string;
}

interface TagFilterProps {
  tags: Tag[];
  active: string | null;
  onChange: (tag: string | null) => void;
}

export default function TagFilter({ tags, active, onChange }: TagFilterProps) {
  if (tags.length === 0) return null;

  const base =
    "shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors";

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center gap-2">
        <button
          className={`${base} ${
            active === null
              ? "border-primary bg-primary text-black"
              : "border-gray-200 text-gray-600 hover:border-primary hover:text-lisah-green"
          }`}
          type="button"
          onClick={() => onChange(null)}
        >
          All posts
        </button>

        {tags.map((tag) => (
          <button
            key={tag.id}
            className={`${base} ${
              active === tag.name
                ? "border-primary bg-primary text-black"
                : "border-gray-200 text-gray-600 hover:border-primary hover:text-lisah-green"
            }`}
            type="button"
            onClick={() => onChange(active === tag.name ? null : tag.name)}
          >
            {tag.name.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
