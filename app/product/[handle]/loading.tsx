export default function ProductLoading() {
  return (
    <div className="bg-white min-h-screen pb-[76px] md:pb-0 animate-pulse">
      <div className="main-container pt-8">
        <div className="h-3 w-48 bg-neutral-100 rounded" />
      </div>
      <div className="main-container !pb-0">
        <div className="flex flex-col py-8 lg:flex-row lg:gap-16">
          <div className="basis-full lg:basis-1/2">
            <div className="relative aspect-square w-full max-h-[550px] bg-neutral-100 rounded-md" />
            <div className="mt-4 flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 w-16 bg-neutral-100 rounded-md"
                />
              ))}
            </div>
          </div>
          <div className="basis-full lg:basis-1/2 pt-8 lg:pt-0 space-y-5">
            <div className="h-5 w-32 bg-neutral-100 rounded" />
            <div className="h-10 w-3/4 bg-neutral-100 rounded" />
            <div className="h-8 w-40 bg-neutral-100 rounded" />
            <div className="h-24 w-full bg-neutral-100 rounded" />
            <div className="h-12 w-full bg-neutral-100 rounded" />
            <div className="flex gap-4">
              <div className="h-14 flex-1 bg-neutral-100 rounded" />
              <div className="h-14 flex-1 bg-neutral-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
