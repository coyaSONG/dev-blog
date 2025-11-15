import { allPosts } from 'contentlayer2/generated'
import { Link } from 'next-view-transitions'
import type { Post } from '@/types/post'
import FeaturedSnippet from '@/components/FeaturedSnippet'
import CategorySection from '@/components/CategorySection'
import Footer from '@/components/Footer'
import { ViewCount } from '@/components/ViewCount'
import { getRecentPosts } from '@/utils/posts'

export default function Home() {
  const recentPosts = getRecentPosts(allPosts as Post[], 3)

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 소개 섹션 */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-4">안녕하세요! 👋</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            프론트엔드 개발자 CoyaSONG의 기술 블로그입니다.<br />
            웹 개발, React, Next.js에 대한 이야기를 공유합니다.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/posts" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              블로그 글 보기
            </Link>
            <a 
              href="https://github.com/coyaSONG"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              GitHub 방문하기
            </a>
          </div>
        </section>

        {/* 최근 포스트 섹션 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">최근 포스트</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <article 
                key={post._id} 
                className="rounded-lg border dark:border-gray-800 border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              >
                <Link href={post.url}>
                  <div className="flex items-center space-x-2 mb-4">
                    {post.tags && post.tags.map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 hover:text-blue-500">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                    <ViewCount slug={post.slug} increment={false} />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <FeaturedSnippet />
        <CategorySection />
      </main>
      <Footer />
    </div>
  )
}
