import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer2/generated'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Post } from '@/types/post'
import ReadingProgress from '@/components/common/ReadingProgress'
import SocialShare from '@/components/common/SocialShare'
import RelatedPosts from '@/components/RelatedPosts'
import TableOfContents from '@/components/TableOfContents'
import { ViewCount } from '@/components/ViewCount'
import { getRelatedPosts } from '@/utils/posts'
import { extractHeadings } from '@/utils/toc'
import { rehypeHeadingIds } from '@/utils/rehype-heading-ids'

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const postUrl = `${siteUrl}/posts/${post.slug}`

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
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
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

  return (
    <>
      <ReadingProgress />
      <TableOfContents items={tocItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="prose dark:prose-invert mx-auto py-8">
        <div className="mb-8">
          <h1 className="mb-2">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'PPP', { locale: ko })}
            </time>
            <ViewCount slug={post.slug} />
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
        <SocialShare
          title={post.title}
          url={postUrl}
          description={post.description}
        />
        <div className="mt-8">
          <MDXRemote
            source={post.body.raw}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeHeadingIds],
              },
            }}
          />
        </div>
        <RelatedPosts posts={relatedPosts} />
      </article>
    </>
  )
} 