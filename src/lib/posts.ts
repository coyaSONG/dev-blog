import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Author, Post } from '@/types/post'

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts')

function listMdxFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return listMdxFiles(fullPath)
    return entry.isFile() && entry.name.endsWith('.mdx') ? [fullPath] : []
  })
}

function requiredString(value: unknown, field: string, filePath: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Invalid or missing ${field} in ${filePath}`)
  }
  return value
}

function normalizeDate(value: unknown, filePath: string): string {
  const date = value instanceof Date ? value : new Date(requiredString(value, 'date', filePath))
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date in ${filePath}`)
  return date.toISOString()
}

function optionalAuthor(value: unknown): Author | undefined {
  if (!value || typeof value !== 'object') return undefined
  const author = value as Record<string, unknown>
  if (typeof author.name !== 'string') return undefined
  return {
    name: author.name,
    email: typeof author.email === 'string' ? author.email : undefined,
    avatar: typeof author.avatar === 'string' ? author.avatar : undefined,
  }
}

function loadPost(filePath: string): Post {
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  const relativePath = path.relative(POSTS_DIRECTORY, filePath).split(path.sep).join('/')
  const flattenedPath = relativePath.replace(/\.mdx$/, '')
  const words = content.trim().split(/\s+/).filter(Boolean).length

  return {
    title: requiredString(data.title, 'title', relativePath),
    date: normalizeDate(data.date, relativePath),
    description: requiredString(data.description, 'description', relativePath),
    category: typeof data.category === 'string' ? data.category : 'General',
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    viewCount: typeof data.viewCount === 'number' ? data.viewCount : 0,
    author: optionalAuthor(data.author),
    slug: flattenedPath,
    url: `/posts/${flattenedPath}`,
    readingTime: Math.max(1, Math.ceil(words / 200)),
    body: { raw: content },
    _id: relativePath,
    _raw: {
      sourceFilePath: relativePath,
      sourceFileName: path.basename(relativePath),
      sourceFileDir: path.dirname(relativePath),
      contentType: 'mdx',
      flattenedPath,
    },
  }
}

export const allPosts: Post[] = listMdxFiles(POSTS_DIRECTORY).map(loadPost)
