import { Button } from "@/components/ui";

interface AppErrorProps {
  message?: string;
  onRetry: () => void;
}

export function AppError({ message, onRetry }: AppErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="text-lg font-semibold text-gray-900">
          We couldn’t load the bundle
        </h1>
        <p className="text-sm text-gray-500">
          {message ??
            "Something went wrong while contacting the server. Please try again."}
        </p>
        <Button variant="primary" size="md" onClick={onRetry}>
          Try again
        </Button>
      </div>
    </main>
  );
}
