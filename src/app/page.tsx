import { allPosts } from 'contentlayer2/generated'
import { Link } from 'next-view-transitions'
import type { Post } from '@/types/post'
import FeaturedSnippet from '@/components/FeaturedSnippet'
import CategorySection from '@/components/CategorySection'
import Footer from '@/components/Footer'
import { PostCard } from '@/components/PostCard'
import { getRecentPosts } from '@/utils/posts'
import { getViewCounts } from '@/lib/views'

export default async function Home() {
  const recentPosts = getRecentPosts(allPosts as Post[], 3)

  // Fetch view counts for all recent posts in parallel
  const viewCounts = await getViewCounts(recentPosts.map(post => post.slug))

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 소개 섹션 */}
        <section className="mb-16 animate-fade-in">
          <div className="mb-3 font-mono text-sm text-brand-primary dark:text-brand-primary-light">
            <span className="text-gray-400 dark:text-gray-500">// Developer.tsx</span>
          </div>
          <h1 className="text-6xl font-bold mb-4 leading-tight font-heading">
            <span className="text-gray-400 dark:text-gray-500 font-mono text-2xl font-normal">const</span>
            <br />
            <span className="text-brand-primary dark:text-brand-primary-light">
              developer
            </span>
            <span className="text-gray-400 dark:text-gray-500 font-mono text-3xl font-normal"> = {`{`}</span>
          </h1>
          <div className="pl-8 mb-6 font-mono text-lg space-y-2">
            <div>
              <span className="text-accent-css">name</span>
              <span className="text-gray-400 dark:text-gray-500">:</span>
              <span className="text-accent-web"> 'coyaSONG'</span>
              <span className="text-gray-400 dark:text-gray-500">,</span>
            </div>
            <div>
              <span className="text-accent-css">role</span>
              <span className="text-gray-400 dark:text-gray-500">:</span>
              <span className="text-accent-web"> 'Frontend Developer'</span>
              <span className="text-gray-400 dark:text-gray-500">,</span>
            </div>
            <div>
              <span className="text-accent-css">focus</span>
              <span className="text-gray-400 dark:text-gray-500">: [</span>
              <span className="text-accent-web">'User Experience'</span>
              <span className="text-gray-400 dark:text-gray-500">, </span>
              <span className="text-accent-web">'Performance'</span>
              <span className="text-gray-400 dark:text-gray-500">, </span>
              <span className="text-accent-web">'Aesthetics'</span>
              <span className="text-gray-400 dark:text-gray-500">]</span>
            </div>
          </div>
          <div className="mb-8 font-mono text-3xl text-gray-400 dark:text-gray-500">
            {`}`}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
            픽셀과 코드 사이에서 의미 있는 경험을 설계합니다. <br />
            사용자를 위한 인터페이스, 그리고 더 나은 웹에 대한 이야기를 나눕니다.
          </p>
          <div className="flex gap-4">
            <Link
              href="/posts"
              className="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3 rounded-lg transition-all hover:shadow-lg hover:scale-105 font-medium"
            >
              블로그 글 보기
            </Link>
            <a
              href="https://github.com/coyaSONG"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-6 py-3 rounded-lg transition-all hover:shadow-md font-medium"
            >
              GitHub 방문하기
            </a>
          </div>
        </section>

        {/* 최근 포스트 섹션 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white font-heading">최근 포스트</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post, index) => (
              <PostCard
                key={post._id}
                post={post}
                viewCount={viewCounts.get(post.slug)}
                index={index}
                headingLevel="h3"
              />
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
