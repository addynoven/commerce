export default function SearchLoading() {
  return (
    <div className="w-full flex justify-center bg-white min-h-screen animate-pulse">
      <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-12 xl:px-24 pt-8">
        <div className="h-4 w-40 bg-neutral-100 rounded mb-6" />
        <div className="h-10 w-full bg-neutral-100 rounded mb-8" />
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 pb-24">
          <aside className="hidden md:block w-[280px] flex-none">
            <div className="space-y-4 bg-neutral-50 p-5 rounded-lg">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-6 w-full bg-neutral-100 rounded" />
              ))}
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square bg-neutral-100 rounded-md" />
                  <div className="h-4 w-3/4 bg-neutral-100 rounded" />
                  <div className="h-4 w-1/2 bg-neutral-100 rounded" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
