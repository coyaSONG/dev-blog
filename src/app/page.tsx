import { allPosts } from '@/lib/posts'
import Link from 'next/link'
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
            <span className="text-gray-400 dark:text-gray-500">{'// Developer.tsx'}</span>
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
              <span className="text-accent-web"> &apos;coyaSONG&apos;</span>
              <span className="text-gray-400 dark:text-gray-500">,</span>
            </div>
            <div>
              <span className="text-accent-css">role</span>
              <span className="text-gray-400 dark:text-gray-500">:</span>
              <span className="text-accent-web"> &apos;AI Tooling &amp; Open Source Engineer&apos;</span>
              <span className="text-gray-400 dark:text-gray-500">,</span>
            </div>
            <div>
              <span className="text-accent-css">focus</span>
              <span className="text-gray-400 dark:text-gray-500">: [</span>
              <span className="text-accent-web">&apos;AI Agents&apos;</span>
              <span className="text-gray-400 dark:text-gray-500">, </span>
              <span className="text-accent-web">&apos;Developer Tooling&apos;</span>
              <span className="text-gray-400 dark:text-gray-500">, </span>
              <span className="text-accent-web">&apos;Open Source&apos;</span>
              <span className="text-gray-400 dark:text-gray-500">]</span>
            </div>
          </div>
          <div className="mb-8 font-mono text-3xl text-gray-400 dark:text-gray-500">
            {`}`}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
            검증 가능한 AI 에이전트와 개발자 도구를 만들고, <br />
            여러 오픈소스 생태계에 재현 가능한 수정과 테스트를 기여합니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3 rounded-lg transition-all hover:shadow-lg hover:scale-105 font-medium"
            >
              포트폴리오 보기
            </Link>
            <Link
              href="/posts"
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-6 py-3 rounded-lg transition-all hover:shadow-md font-medium"
            >
              블로그 글 보기
            </Link>
            <a
              href="https://github.com/coyaSONG"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 dark:border-gray-700 hover:border-brand-primary px-6 py-3 rounded-lg transition-all hover:shadow-md font-medium"
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
