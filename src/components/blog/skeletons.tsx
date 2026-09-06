export function PostCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="h-48 animate-pulse bg-gray-100" />
      <div className="space-y-3 p-5 lg:p-6">
        <div className="h-5 w-20 animate-pulse rounded-full bg-gray-100" />
        <div className="h-5 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-50" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-50" />
      </div>
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div className="grid overflow-hidden rounded-3xl border border-gray-100 bg-white lg:grid-cols-2">
      <div className="h-72 animate-pulse bg-gray-100 lg:h-full lg:min-h-[20rem]" />
      <div className="space-y-4 p-6 sm:p-8 lg:p-12">
        <div className="h-6 w-24 animate-pulse rounded-full bg-gray-100" />
        <div className="h-9 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-9 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-50" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-50" />
      </div>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-16 lg:px-0">
      <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
      <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-10 w-3/4 animate-pulse rounded bg-gray-100" />
      <div className="h-64 w-full animate-pulse rounded-2xl bg-gray-100" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-4 animate-pulse rounded bg-gray-50"
          style={{ width: `${70 + ((i * 7) % 30)}%` }}
        />
      ))}
    </div>
  );
}
