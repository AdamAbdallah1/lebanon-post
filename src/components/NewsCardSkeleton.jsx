function NewsCardSkeleton() {
  return (
    <div className="border border-neutral-900 rounded-2xl overflow-hidden bg-neutral-950 animate-pulse">
      <div className="h-48 bg-neutral-900" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-neutral-900 w-3/4 rounded-md" />
        <div className="space-y-1.5">
          <div className="h-3 bg-neutral-900 w-full rounded-md" />
          <div className="h-3 bg-neutral-900 w-5/6 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default NewsCardSkeleton;