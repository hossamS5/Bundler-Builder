export function AppLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <span
          className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-gray-900"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-gray-500">Loading your bundle…</p>
      </div>
    </main>
  );
}
