import { allPosts } from 'contentlayer2/generated'
import { Link } from 'next-view-transitions'
import type { Post } from '@/types/post'
import FeaturedSnippet from '@/components/FeaturedSnippet'
import CategorySection from '@/components/CategorySection'
import Footer from '@/components/Footer'
import { ViewCount } from '@/components/ViewCount'
import { getRecentPosts } from '@/utils/posts'
import { getViewCounts } from '@/lib/views'
import { getTagClasses, getCardAccentColor } from '@/utils/styles'

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
            <span className="text-gray-400 dark:text-gray-600">// Developer.tsx</span>
          </div>
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            <span className="text-gray-400 dark:text-gray-600 font-mono text-2xl">const</span>
            <br />
            <span className="bg-gradient-to-r from-brand-primary via-purple-500 to-brand-primary-light bg-clip-text text-transparent">
              developer
            </span>
            <span className="text-gray-400 dark:text-gray-600 font-mono text-3xl"> = {`{`}</span>
          </h1>
          <div className="pl-8 mb-6 font-mono text-lg space-y-2">
            <div>
              <span className="text-purple-500">name</span>
              <span className="text-gray-400">:</span>
              <span className="text-emerald-500"> 'coyaSONG'</span>
              <span className="text-gray-400">,</span>
            </div>
            <div>
              <span className="text-purple-500">role</span>
              <span className="text-gray-400">:</span>
              <span className="text-emerald-500"> 'Frontend Developer'</span>
              <span className="text-gray-400">,</span>
            </div>
            <div>
              <span className="text-purple-500">focus</span>
              <span className="text-gray-400">: [</span>
              <span className="text-emerald-500">'User Experience'</span>
              <span className="text-gray-400">, </span>
              <span className="text-emerald-500">'Performance'</span>
              <span className="text-gray-400">, </span>
              <span className="text-emerald-500">'Aesthetics'</span>
              <span className="text-gray-400">]</span>
            </div>
          </div>
          <div className="mb-8 font-mono text-3xl text-gray-400 dark:text-gray-600">
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
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">최근 포스트</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post, index) => (
              <article
                key={post._id}
                className={`group rounded-xl border border-gray-200 dark:border-gray-800 ${getCardAccentColor(post.tags || [])} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-900/50 backdrop-blur-sm animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={post.url}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags && post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagClasses(tag)} transition-transform group-hover:scale-105`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('ko-KR')}
                    </time>
                    <ViewCount
                      slug={post.slug}
                      increment={false}
                      initialViews={viewCounts.get(post.slug)}
                    />
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
