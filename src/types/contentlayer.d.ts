declare module 'contentlayer/generated' {
  import { Post as PostType } from '../../.contentlayer/generated'
  
  export type Post = PostType
  export const allPosts: Post[]
} 