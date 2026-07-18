export interface Author {
  name: string
  email?: string
  avatar?: string
}

export type PostFormat = 'brief' | 'deep-dive'

export interface Post {
  title: string
  date: string
  updated?: string
  description: string
  category?: string
  tags?: string[]
  format?: PostFormat
  viewCount?: number
  author?: Author
  slug: string
  url: string
  readingTime: number
  body: {
    raw: string
  }
  _id: string
  _raw: {
    sourceFilePath: string
    sourceFileName: string
    sourceFileDir: string
    contentType: string
    flattenedPath: string
  }
}

export interface PostCardProps {
  post: Post
  isFeature?: boolean
}
