import { allPosts } from 'contentlayer2/generated'
import { Link } from 'next-view-transitions'
import { ArrowRight, Rss, Github } from 'lucide-react'
import type { Post } from '@/types/post'
import { getRecentPosts } from '@/utils/posts'
import { getTagClasses } from '@/utils/styles'
import { siteConfig } from '@/config/site'

export default function FeaturedSnippet() {
  const [featured] = getRecentPosts(allPosts as Post[], 1)

  if (!featured) return null

  return (
    <section className="mb-16 grid gap-6 lg:grid-cols-3 animate-fade-in">
      <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/70 shadow-sm">
        <p className="text-xs font-mono text-brand-primary dark:text-brand-primary-light mb-3">지금 읽기 좋은 글</p>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 font-heading">{featured.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{featured.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {featured.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagClasses(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={featured.url}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primary-dark transition-colors"
          >
            글 읽기
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-brand-primary"
          >
            모든 글 보기
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <a
          href={`${siteConfig.url}/feed.xml`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 hover:border-brand-primary transition-all"
        >
          <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
            <Rss className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">RSS로 구독하기</p>
            <p className="font-semibold text-gray-900 dark:text-white">/feed.xml</p>
          </div>
        </a>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 hover:border-brand-primary transition-all"
        >
          <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">소스 코드 / 메모</p>
            <p className="font-semibold text-gray-900 dark:text-white">@coyaSONG</p>
          </div>
        </a>
      </div>
    </section>
  )
}
