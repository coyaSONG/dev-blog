import { allPosts } from 'contentlayer2/generated'
import { siteConfig } from '@/config/site'
import { Post } from '@/types/post'
import { sortPostsByDate } from '@/utils/posts'

export async function GET() {
  const posts = sortPostsByDate(allPosts as Post[])

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteConfig.url}${post.url}`
      const postDate = new Date(post.date).toUTCString()

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${postDate}</pubDate>
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />${rssItems}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
