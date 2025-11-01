import { allPosts } from 'contentlayer2/generated'
import Link from 'next/link'
import type { Post } from '@/types/post'

export default function CategorySection() {
  // 모든 포스트에서 카테고리 추출 및 카운트
  const categoryCount = (allPosts as Post[]).reduce((acc, post) => {
    const category = post.category || 'General'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // 카테고리를 배열로 변환하고 포스트 수로 정렬
  const categories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))

  return (
    <section className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={`/posts?category=${encodeURIComponent(category.name)}`}
            className={`p-6 rounded-lg border dark:border-gray-800 border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h3 className="font-bold mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {category.count}개의 포스트
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
} 