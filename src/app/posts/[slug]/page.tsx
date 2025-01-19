import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer2/generated'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Post } from '@/types/post'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return (allPosts as Post[]).map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const post = (allPosts as Post[]).find((post) => post.slug === resolvedParams.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params
  const post = (allPosts as Post[]).find((post) => post.slug === resolvedParams.slug)
  
  if (!post) notFound()
  
  return (
    <article className="prose dark:prose-invert mx-auto py-8">
      <div className="mb-8">
        <h1 className="mb-2">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={post.date}>
            {format(parseISO(post.date), 'PPP', { locale: ko })}
          </time>
          {post.tags && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <MDXRemote source={post.body.raw} />
    </article>
  )
} 