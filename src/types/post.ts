export interface Post {
  title: string
  date: string
  description: string
  category?: string
  tags?: string[]
  slug: string
  url: string
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