import { NextResponse } from 'next/server'
import { allPosts } from 'contentlayer2/generated'
import type { Post } from '@/types/post'
import type { SearchIndexItem, SearchIndexResponse } from '@/types/search'

// Cache for 1 hour, works in both dev and prod
export const revalidate = 3600 // seconds

export async function GET() {
  const items: SearchIndexItem[] = ([...allPosts] as Post[])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      tags: post.tags ?? [],
    }))

  return NextResponse.json<SearchIndexResponse>(
    { items },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    },
  )
}
