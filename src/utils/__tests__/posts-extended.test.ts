import { Post } from '@/types/post'
import { getRelatedPosts } from '../posts'

// Mock post data for testing related posts
const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'React Hooks Guide',
    description: 'Learn React hooks',
    date: '2024-01-15',
    category: 'Frontend',
    tags: ['react', 'javascript', 'hooks'],
    slug: 'react-hooks-guide',
    url: '/posts/react-hooks-guide',
    readingTime: 5,
    body: {
      code: '',
      raw: 'React hooks guide content',
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
    title: 'React State Management',
    description: 'State management patterns',
    date: '2024-02-20',
    category: 'Frontend',
    tags: ['react', 'state', 'redux'],
    slug: 'react-state-management',
    url: '/posts/react-state-management',
    readingTime: 8,
    body: {
      code: '',
      raw: 'State management content',
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
    title: 'TypeScript Basics',
    description: 'Introduction to TypeScript',
    date: '2024-01-10',
    category: 'Frontend',
    tags: ['typescript', 'javascript'],
    slug: 'typescript-basics',
    url: '/posts/typescript-basics',
    readingTime: 6,
    body: {
      code: '',
      raw: 'TypeScript basics content',
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
    _id: '4',
    title: 'Node.js Performance',
    description: 'Optimize Node.js apps',
    date: '2024-03-01',
    category: 'Backend',
    tags: ['nodejs', 'performance'],
    slug: 'nodejs-performance',
    url: '/posts/nodejs-performance',
    readingTime: 7,
    body: {
      code: '',
      raw: 'Node.js performance content',
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

describe('getRelatedPosts', () => {
  it('should return posts with same category and common tags', () => {
    const currentPost = mockPosts[0] // React Hooks Guide
    const related = getRelatedPosts(currentPost, mockPosts, 3)

    // Should find React State Management (same category + 1 common tag: react)
    expect(related).toHaveLength(2)
    expect(related[0]._id).toBe('2') // React State Management (highest score)
    expect(related[1]._id).toBe('3') // TypeScript Basics (same category + 1 common tag: javascript)
  })

  it('should exclude the current post from results', () => {
    const currentPost = mockPosts[0]
    const related = getRelatedPosts(currentPost, mockPosts, 10)

    expect(related.every(post => post._id !== currentPost._id)).toBe(true)
  })

  it('should return empty array when no related posts found', () => {
    const isolatedPost: Post = {
      ...mockPosts[0],
      _id: '999',
      category: 'Unique',
      tags: ['unique-tag'],
    }

    const related = getRelatedPosts(isolatedPost, [isolatedPost, ...mockPosts], 3)

    expect(related).toHaveLength(0)
  })

  it('should respect the limit parameter', () => {
    const currentPost = mockPosts[0]
    const related = getRelatedPosts(currentPost, mockPosts, 1)

    expect(related).toHaveLength(1)
  })

  it('should prioritize posts with more common tags', () => {
    const currentPost = mockPosts[0] // Tags: react, javascript, hooks
    const related = getRelatedPosts(currentPost, mockPosts, 3)

    // First result should be React State Management (same category + common tag: react)
    expect(related[0]._id).toBe('2')
  })

  it('should handle posts without tags', () => {
    const postWithoutTags: Post = {
      ...mockPosts[0],
      _id: '5',
      tags: undefined,
    }

    const related = getRelatedPosts(postWithoutTags, [postWithoutTags, ...mockPosts], 3)

    // Should still find posts by category
    expect(related.length).toBeGreaterThan(0)
  })
})
