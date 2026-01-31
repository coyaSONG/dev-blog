import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-[150px] font-bold leading-none mb-4 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-3xl font-bold mb-3 text-black dark:text-white">
            페이지를 찾을 수 없습니다
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-80 transition-opacity"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/posts"
            className="px-6 py-3 border-2 border-black dark:border-white rounded-lg font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            글 목록 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
