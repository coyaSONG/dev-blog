import type { SearchIndexItem } from '@/types/search'

/**
 * Lightweight search across the prebuilt search index.
 * Limits matching to title, description, tags (no body content to keep payload small).
 */
export function searchIndexItems(items: SearchIndexItem[], query: string): SearchIndexItem[] {
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return []

  return items.filter(({ title, description, tags, slug }) => {
    return (
      title.toLowerCase().includes(normalizedQuery) ||
      description.toLowerCase().includes(normalizedQuery) ||
      slug.toLowerCase().includes(normalizedQuery) ||
      tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    )
  })
}
