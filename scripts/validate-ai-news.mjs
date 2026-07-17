import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { aiNewsTopics } from './ai-news-topics.mjs'

const root = new URL('..', import.meta.url).pathname
const postsDir = join(root, 'content', 'posts')
const expectedLastDate = '2026-07-18'
const monthCounts = new Map()
const errors = []

for (const topic of aiNewsTopics) {
  const month = topic.date.slice(0, 7)
  monthCounts.set(month, (monthCounts.get(month) ?? 0) + 1)

  if (topic.date > expectedLastDate) errors.push(`${topic.slug}: date is after ${expectedLastDate}`)

  const filePath = join(postsDir, `${topic.slug}.mdx`)
  let source
  try {
    source = await readFile(filePath, 'utf8')
  } catch {
    errors.push(`${topic.slug}: generated post is missing`)
    continue
  }

  const { data, content } = matter(source)
  if (data.date !== topic.date) errors.push(`${topic.slug}: frontmatter date does not match the official date`)
  if (data.title !== topic.title) errors.push(`${topic.slug}: frontmatter title is out of sync`)
  if (data.category !== 'AI') errors.push(`${topic.slug}: category must be AI`)
  if (!content.includes(`](${topic.sourceUrl})`)) errors.push(`${topic.slug}: primary source link is missing`)
  if (content.split(/\s+/).length < 150) errors.push(`${topic.slug}: post is too short`)
}

for (let year = 2024; year <= 2026; year += 1) {
  const finalMonth = year === 2026 ? 7 : 12
  for (let month = 1; month <= finalMonth; month += 1) {
    const key = `${year}-${String(month).padStart(2, '0')}`
    const count = monthCounts.get(key) ?? 0
    if (count < 4) errors.push(`${key}: expected at least 4 posts, found ${count}`)
  }
}

if (aiNewsTopics.length < 124) errors.push(`expected at least 124 posts, found ${aiNewsTopics.length}`)

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Validated ${aiNewsTopics.length} AI posts across ${monthCounts.size} months.`)
}
