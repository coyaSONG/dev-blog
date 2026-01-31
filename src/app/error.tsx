'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            오류가 발생했습니다
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Something went wrong
          </p>
        </div>

        <div className="mb-8 p-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200 font-mono break-all">
            {error.message || '알 수 없는 오류가 발생했습니다.'}
          </p>
          {error.digest && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-80 transition-opacity"
          >
            다시 시도
          </button>
          <a
            href="/"
            className="px-6 py-3 border-2 border-black dark:border-white rounded-lg font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
