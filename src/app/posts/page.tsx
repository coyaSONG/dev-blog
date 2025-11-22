import { allPosts } from 'contentlayer2/generated'
import { Link } from 'next-view-transitions'
import type { Post } from '@/types/post'
import { PostCard } from '@/components/PostCard'
import { sortPostsByDate, filterPostsByCategory, getSortedCategories } from '@/utils/posts'
import { getViewCounts } from '@/lib/views'

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
      <h1 className="text-4xl font-bold mb-8 text-brand-primary dark:text-brand-primary-light font-heading">
        {selectedCategory ? `${selectedCategory} 포스트` : '모든 포스트'}
      </h1>

      {/* 카테고리 필터 */}
      <div className="mb-12 flex flex-wrap gap-3">
        <Link
          href="/posts"
          className={`px-5 py-2.5 rounded-2xl transition-all duration-200 font-medium ${!selectedCategory
            ? 'bg-brand-primary text-white shadow-md hover:shadow-lg hover:scale-[1.02]'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-[1.02]'
            }`}
        >
          전체 ({allSortedPosts.length})
        </Link>
        {categories.map(({ name, count }) => (
          <Link
            key={name}
            href={`/posts?category=${encodeURIComponent(name)}`}
            className={`px-5 py-2.5 rounded-2xl transition-all duration-200 font-medium ${selectedCategory === name
              ? 'bg-brand-primary text-white shadow-md hover:shadow-lg hover:scale-[1.02]'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-[1.02]'
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
            <PostCard
              key={post._id}
              post={post}
              viewCount={viewCounts.get(post.slug)}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
} 