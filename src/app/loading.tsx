export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* Spinning circle */}
          <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          로딩 중...
        </p>
      </div>
    </div>
  );
}
