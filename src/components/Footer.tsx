import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t dark:border-gray-800 border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-bold mb-4">coyaSONG</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              프론트엔드 개발 지식과 경험을 공유합니다.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-gray-900 dark:hover:text-gray-100">
                  Posts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <a
                  href="https://github.com/coyaSONG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-gray-100"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              최신 글과 튜토리얼을 이메일로 받아보세요.
            </p>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-800 border-gray-200 bg-transparent transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </footer>
  )
} 