import { allPosts } from '@/lib/posts'
import { siteConfig } from '@/config/site'
import type { Post } from '@/types/post'
import { sortPostsByDate } from '@/utils/posts'
import { escapeXml, toCdata } from '@/utils/serialization'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url
  const posts = sortPostsByDate(allPosts as Post[])

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}${post.url}`
      const postDate = new Date(post.date).toUTCString()
      const categories = post.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ') || ''

      return `
    <item>
      <title>${toCdata(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <description>${toCdata(post.description)}</description>
      <content:encoded>${toCdata(post.body.raw)}</content:encoded>
      <pubDate>${postDate}</pubDate>
      ${categories}
    </item>`
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko</language>
    <generator>Next.js RSS</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(siteUrl)}/feed.xml" rel="self" type="application/rss+xml" />${rssItems}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
