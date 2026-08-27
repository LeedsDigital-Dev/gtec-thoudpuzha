export default function PublicLoading() {
  return (
    <main className="animate-pulse">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="h-6 w-24 rounded-full bg-muted" />
            <div className="h-12 w-3/4 rounded-lg bg-muted" />
            <div className="h-5 w-full rounded bg-muted" />
            <div className="flex gap-4">
              <div className="h-12 w-36 rounded-lg bg-muted" />
              <div className="h-12 w-36 rounded-lg bg-muted" />
            </div>
          </div>
          <div className="h-96 rounded-xl bg-muted" />
        </div>
      </div>
      <div className="space-y-12 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-muted p-6 text-center">
                <div className="mx-auto mb-2 h-8 w-16 rounded bg-muted-foreground/20" />
                <div className="mx-auto h-4 w-20 rounded bg-muted-foreground/20" />
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="h-48 rounded-xl bg-muted" />
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="h-80 rounded-xl bg-muted" />
            <div className="space-y-4">
              <div className="h-8 w-1/3 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
