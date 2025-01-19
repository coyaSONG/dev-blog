import { allPosts } from 'contentlayer2/generated'
import { compareDesc } from 'date-fns'
import Link from 'next/link'
import type { Post } from '@/types/post'

export const metadata = {
  title: '블로그 포스트',
  description: '모든 블로그 포스트를 확인하세요.',
}

export default function PostsPage() {
  const posts = (allPosts as Post[]).sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">모든 포스트</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          아직 작성된 포스트가 없습니다.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article 
              key={post._id} 
              className="rounded-lg border dark:border-gray-800 border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Link href={post.url}>
                {post.tags && (
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