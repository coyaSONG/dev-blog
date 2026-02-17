import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer2/generated'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import type { Post } from '@/types/post'
import SocialShare from '@/components/common/SocialShare'
import RelatedPosts from '@/components/RelatedPosts'
import TableOfContents from '@/components/TableOfContents'
import { ViewCount } from '@/components/ViewCount'
import { Comments } from '@/components/common/Comments'
import { getRelatedPosts } from '@/utils/posts'
import { extractHeadings } from '@/utils/toc'
import { getViewCount } from '@/lib/views'
import { getTagClasses } from '@/utils/styles'

import { MDXContent } from '@/components/mdx/MDXContent'
import { siteConfig } from '@/config/site'

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url
  const postUrl = `${siteUrl}/posts/${post.slug}`
  const ogImage = `${siteUrl}/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      locale: 'ko_KR',
      url: postUrl,
      title: post.title,
      description: post.description,
      siteName: 'coyaSONG',
      publishedTime: post.date,
      authors: ['coyaSONG'],
      tags: post.tags,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params
  const post = (allPosts as Post[]).find((post) => post.slug === resolvedParams.slug)

  if (!post) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const postUrl = `${siteUrl}/posts/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'coyaSONG',
    },
    publisher: {
      '@type': 'Organization',
      name: 'coyaSONG',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags?.join(', '),
  }

  const relatedPosts = getRelatedPosts(post, allPosts as Post[], 3)
  const tocItems = extractHeadings(post.body.raw)

  // Fetch initial view count from server
  const initialViews = await getViewCount(post.slug)

  return (
    <>
      <TableOfContents items={tocItems} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="prose dark:prose-invert mx-auto py-8">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-8">
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'PPP', { locale: ko })}
            </time>
            <ViewCount slug={post.slug} initialViews={initialViews} />
          </div>
          {post.tags && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagClasses(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <SocialShare
          title={post.title}
          url={postUrl}
          description={post.description}
        />
        <div className="mt-8">
          <MDXContent code={post.body.code} />
        </div>
        <RelatedPosts posts={relatedPosts} />
        <Comments />
      </article>
    </>
  )
} 
