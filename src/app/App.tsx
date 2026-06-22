import { BundleBuilder } from "@/features/bundle-builder";
import { ReviewPanel } from "@/features/review-panel";

function App() {
  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8">
        <BundleBuilder />
        <ReviewPanel />
      </div>
    </main>
  );
}

export default App;
