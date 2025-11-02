import Link from 'next/link'
import { Post } from '@/types/post'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ArrowRight } from 'lucide-react'

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        관련 포스트
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={post.url}
            className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <div className="flex flex-col h-full">
              {post.category && (
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                  {post.category}
                </span>
              )}
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <time dateTime={post.date}>
                  {format(parseISO(post.date), 'PPP', { locale: ko })}
                </time>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
