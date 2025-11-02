import { Post } from '@/types/post'
import {
  sortPostsByDate,
  getCategoryCount,
  getSortedCategories,
  filterPostsByCategory,
  searchPosts,
  getRecentPosts,
} from '../posts'

// Mock post data
const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'React Best Practices',
    description: 'Learn React best practices',
    date: '2024-01-15',
    category: 'Frontend',
    tags: ['react', 'javascript'],
    slug: 'react-best-practices',
    url: '/posts/react-best-practices',
    readingTime: 5,
    body: {
      code: '',
      raw: 'This is a post about React best practices and hooks',
    },
    _raw: {
      sourceFilePath: '',
      sourceFileName: '',
      sourceFileDir: '',
      contentType: 'mdx',
      flattenedPath: '',
    },
  },
  {
    _id: '2',
    title: 'TypeScript Advanced Types',
    description: 'Deep dive into TypeScript',
    date: '2024-02-20',
    category: 'Frontend',
    tags: ['typescript', 'types'],
    slug: 'typescript-advanced',
    url: '/posts/typescript-advanced',
    readingTime: 8,
    body: {
      code: '',
      raw: 'Advanced TypeScript types and generics',
    },
    _raw: {
      sourceFilePath: '',
      sourceFileName: '',
      sourceFileDir: '',
      contentType: 'mdx',
      flattenedPath: '',
    },
  },
  {
    _id: '3',
    title: 'Node.js Performance',
    description: 'Optimize Node.js applications',
    date: '2024-01-10',
    category: 'Backend',
    tags: ['nodejs', 'performance'],
    slug: 'nodejs-performance',
    url: '/posts/nodejs-performance',
    readingTime: 6,
    body: {
      code: '',
      raw: 'Performance optimization tips for Node.js',
    },
    _raw: {
      sourceFilePath: '',
      sourceFileName: '',
      sourceFileDir: '',
      contentType: 'mdx',
      flattenedPath: '',
    },
  },
]

describe('Post Utilities', () => {
  describe('sortPostsByDate', () => {
    it('should sort posts by date in descending order (newest first)', () => {
      const sorted = sortPostsByDate([...mockPosts])

      expect(sorted[0].title).toBe('TypeScript Advanced Types')
      expect(sorted[1].title).toBe('React Best Practices')
      expect(sorted[2].title).toBe('Node.js Performance')
    })

    it('should not mutate the original array', () => {
      const original = [...mockPosts]
      const sorted = sortPostsByDate(original)

      expect(sorted).not.toBe(original)
    })
  })

  describe('getCategoryCount', () => {
    it('should count posts per category', () => {
      const counts = getCategoryCount(mockPosts)

      expect(counts['Frontend']).toBe(2)
      expect(counts['Backend']).toBe(1)
    })

    it('should use "General" for posts without category', () => {
      const postsWithoutCategory: Post[] = [
        { ...mockPosts[0], category: undefined },
      ]

      const counts = getCategoryCount(postsWithoutCategory)

      expect(counts['General']).toBe(1)
    })

    it('should return empty object for empty array', () => {
      const counts = getCategoryCount([])

      expect(counts).toEqual({})
    })
  })

  describe('getSortedCategories', () => {
    it('should return categories sorted by post count (descending)', () => {
      const categories = getSortedCategories(mockPosts)

      expect(categories).toHaveLength(2)
      expect(categories[0].name).toBe('Frontend')
      expect(categories[0].count).toBe(2)
      expect(categories[1].name).toBe('Backend')
      expect(categories[1].count).toBe(1)
    })

    it('should return empty array for empty posts', () => {
      const categories = getSortedCategories([])

      expect(categories).toEqual([])
    })
  })

  describe('filterPostsByCategory', () => {
    it('should filter posts by category', () => {
      const filtered = filterPostsByCategory(mockPosts, 'Frontend')

      expect(filtered).toHaveLength(2)
      expect(filtered.every(post => post.category === 'Frontend')).toBe(true)
    })

    it('should return all posts when category is undefined', () => {
      const filtered = filterPostsByCategory(mockPosts)

      expect(filtered).toHaveLength(3)
    })

    it('should return empty array when no posts match', () => {
      const filtered = filterPostsByCategory(mockPosts, 'DevOps')

      expect(filtered).toHaveLength(0)
    })
  })

  describe('searchPosts', () => {
    it('should find posts by title', () => {
      const results = searchPosts(mockPosts, 'React')

      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('React Best Practices')
    })

    it('should find posts by description', () => {
      const results = searchPosts(mockPosts, 'optimize')

      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('Node.js Performance')
    })

    it('should find posts by tags', () => {
      const results = searchPosts(mockPosts, 'typescript')

      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('TypeScript Advanced Types')
    })

    it('should find posts by content', () => {
      const results = searchPosts(mockPosts, 'hooks')

      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('React Best Practices')
    })

    it('should be case insensitive', () => {
      const results = searchPosts(mockPosts, 'REACT')

      expect(results).toHaveLength(1)
    })

    it('should return empty array for empty query', () => {
      const results = searchPosts(mockPosts, '')

      expect(results).toHaveLength(0)
    })

    it('should trim whitespace from query', () => {
      const results = searchPosts(mockPosts, '  React  ')

      expect(results).toHaveLength(1)
    })

    it('should return empty array when no matches', () => {
      const results = searchPosts(mockPosts, 'nonexistent')

      expect(results).toHaveLength(0)
    })
  })

  describe('getRecentPosts', () => {
    it('should return N most recent posts', () => {
      const recent = getRecentPosts(mockPosts, 2)

      expect(recent).toHaveLength(2)
      expect(recent[0].title).toBe('TypeScript Advanced Types')
      expect(recent[1].title).toBe('React Best Practices')
    })

    it('should return all posts if limit exceeds array length', () => {
      const recent = getRecentPosts(mockPosts, 10)

      expect(recent).toHaveLength(3)
    })

    it('should return empty array for empty posts', () => {
      const recent = getRecentPosts([], 5)

      expect(recent).toHaveLength(0)
    })

    it('should return empty array when limit is 0', () => {
      const recent = getRecentPosts(mockPosts, 0)

      expect(recent).toHaveLength(0)
    })
  })
})
