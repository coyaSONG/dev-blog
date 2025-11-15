import { allPosts } from 'contentlayer2/generated'
import { Link } from 'next-view-transitions'
import type { Post } from '@/types/post'
import { sortPostsByDate, filterPostsByCategory, getSortedCategories } from '@/utils/posts'

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">
        {selectedCategory ? `${selectedCategory} 포스트` : '모든 포스트'}
      </h1>

      {/* 카테고리 필터 */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/posts"
          className={`px-4 py-2 rounded-lg transition-colors ${
            !selectedCategory
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          전체 ({allSortedPosts.length})
        </Link>
        {categories.map(({ name, count }) => (
          <Link
            key={name}
            href={`/posts?category=${encodeURIComponent(name)}`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
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
          {posts.map((post) => (
            <article
              key={post._id}
              className="rounded-lg border dark:border-gray-800 border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ viewTransitionName: 'post-card' } as React.CSSProperties}
            >
              <Link href={post.url}>
                {/* 카테고리 표시 */}
                {post.category && (
                  <div className="mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100">
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
                        className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-xl font-bold mb-2 hover:text-blue-500">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.description}
                </p>
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
} 