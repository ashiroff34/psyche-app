"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="text-4xl mb-4">😵</div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          An unexpected error occurred. Try refreshing.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 active:scale-[0.98] transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
