import { allPosts } from 'contentlayer2/generated'
import { Link } from 'next-view-transitions'
import type { Post } from '@/types/post'
import { getSortedCategories } from '@/utils/posts'

export default function CategorySection() {
  // 카테고리 목록 가져오기
  const categories = getSortedCategories(allPosts as Post[])

  return (
    <section className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 font-heading">Browse by Category</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={`/posts?category=${encodeURIComponent(category.name)}`}
            className={`p-6 rounded-2xl border dark:border-gray-800 border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h3 className="font-bold mb-2 font-heading">{category.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {category.count}개의 포스트
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
} 