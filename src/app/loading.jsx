export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="flex items-center gap-3 rounded-full border border-neutral/20 bg-white/80 px-5 py-3 shadow-sm dark:bg-secondary/80">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-sm font-medium text-secondary dark:text-tertiary">
          Loading ...
        </span>
      </div>
    </div>
  );
}
