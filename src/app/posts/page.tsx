import { allPosts } from 'contentlayer2/generated'
import { Link } from 'next-view-transitions'
import type { Post } from '@/types/post'
import { ViewCount } from '@/components/ViewCount'
import { sortPostsByDate, filterPostsByCategory, getSortedCategories } from '@/utils/posts'
import { getViewCounts } from '@/lib/views'
import { getTagClasses, getCardAccentColor } from '@/utils/styles'

export const metadata = {
  title: '블로그 포스트',
  description: '모든 블로그 포스트를 확인하세요.',
}

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams
  const selectedCategory = params.category

  // 모든 포스트를 날짜순으로 정렬
  const allSortedPosts = sortPostsByDate(allPosts as Post[])

  // 카테고리 필터링
  const posts = filterPostsByCategory(allSortedPosts, selectedCategory)

  // 카테고리 목록 가져오기
  const categories = getSortedCategories(allSortedPosts)

  // Fetch view counts for all posts in parallel
  const viewCounts = await getViewCounts(posts.map(post => post.slug))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
        {selectedCategory ? `${selectedCategory} 포스트` : '모든 포스트'}
      </h1>

      {/* 카테고리 필터 */}
      <div className="mb-12 flex flex-wrap gap-3">
        <Link
          href="/posts"
          className={`px-5 py-2.5 rounded-lg transition-all font-medium ${
            !selectedCategory
              ? 'bg-brand-primary text-white shadow-md hover:shadow-lg hover:scale-105'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
          }`}
        >
          전체 ({allSortedPosts.length})
        </Link>
        {categories.map(({ name, count }) => (
          <Link
            key={name}
            href={`/posts?category=${encodeURIComponent(name)}`}
            className={`px-5 py-2.5 rounded-lg transition-all font-medium ${
              selectedCategory === name
                ? 'bg-brand-primary text-white shadow-md hover:shadow-lg hover:scale-105'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
            }`}
          >
            {name} ({count})
          </Link>
        ))}
      </div>

      {/* 포스트 목록 */}
      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          {selectedCategory
            ? `${selectedCategory} 카테고리에 작성된 포스트가 없습니다.`
            : '아직 작성된 포스트가 없습니다.'}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className={`group rounded-xl border border-gray-200 dark:border-gray-800 ${getCardAccentColor(post.tags || [])} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-900/50 backdrop-blur-sm animate-fade-in`}
              style={{
                viewTransitionName: 'post-card',
                animationDelay: `${index * 50}ms`
              } as React.CSSProperties}
            >
              <Link href={post.url}>
                {/* 카테고리 표시 */}
                {post.category && (
                  <div className="mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {post.category}
                    </span>
                  </div>
                )}

                {/* 태그 표시 */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagClasses(tag)} transition-transform group-hover:scale-105`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors line-clamp-2">
                  {post.title}
                </h2>
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
      )}
    </div>
  )
} 