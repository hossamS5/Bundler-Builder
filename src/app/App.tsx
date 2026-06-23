import { BundleBuilder } from "@/features/bundle-builder";
import { CatalogProvider, useCatalogQuery } from "@/features/catalog";
import { ReviewPanel } from "@/features/review-panel";

import { AppError } from "./AppError";
import { AppLoading } from "./AppLoading";

function App() {
  const { data: catalog, isPending, isError, error, refetch } = useCatalogQuery();

  if (isPending) {
    return <AppLoading />;
  }

  if (isError) {
    return <AppError message={error?.message} onRetry={() => refetch()} />;
  }

  return (
    <CatalogProvider catalog={catalog}>
      <main className="px-4 py-8 min-h-screen bg-white sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1264px] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8">
          <BundleBuilder />
          <ReviewPanel />
        </div>
      </main>
    </CatalogProvider>
  );
}

export default App;
