import { FiSearch, FiX } from "react-icons/fi";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search articles…",
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <FiSearch
        aria-hidden
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg text-gray-400"
      />
      <input
        aria-label="Search articles"
        className="w-full rounded-full border border-gray-200 bg-white py-4 pl-13 pr-12 text-sm text-gray-900 shadow-[0_1px_12px_rgba(3,41,18,0.04)] outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          type="button"
          onClick={() => onChange("")}
        >
          <FiX />
        </button>
      )}
    </div>
  );
}
