import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

/**
 * Server-side function to get view count for a post
 * @param slug - Post slug
 * @returns View count or 0 if not found
 */
export async function getViewCount(slug: string): Promise<number> {
  try {
    const views = await redis.get<number>(`views:${slug}`)
    return views ?? 0
  } catch (error) {
    console.error('Error fetching view count:', error)
    return 0
  }
}

/**
 * Server-side function to get view counts for multiple posts
 * @param slugs - Array of post slugs
 * @returns Map of slug to view count
 */
export async function getViewCounts(slugs: string[]): Promise<Map<string, number>> {
  const counts = new Map<string, number>()

  try {
    // Fetch all view counts in parallel
    const results = await Promise.all(
      slugs.map(async (slug) => {
        const views = await redis.get<number>(`views:${slug}`)
        return { slug, views: views ?? 0 }
      })
    )

    results.forEach(({ slug, views }) => {
      counts.set(slug, views)
    })
  } catch (error) {
    console.error('Error fetching view counts:', error)
  }

  return counts
}
