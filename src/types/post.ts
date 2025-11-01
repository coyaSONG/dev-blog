export interface Author {
  name: string
  email?: string
  avatar?: string
}

export interface Post {
  title: string
  date: string
  description: string
  category?: string
  tags?: string[]
  viewCount?: number
  author?: Author
  slug: string
  url: string
  readingTime: number
  body: {
    code: string
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