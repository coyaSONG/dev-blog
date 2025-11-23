export type SearchIndexItem = {
  slug: string
  title: string
  description: string
  tags: string[]
}

export type SearchIndexResponse = {
  items: SearchIndexItem[]
}
