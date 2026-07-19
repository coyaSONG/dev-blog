import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { aiNewsTopics } from './ai-news-topics.mjs'
import { aiNewsDeepDives } from './ai-news-deep-dives.mjs'

const root = new URL('..', import.meta.url).pathname
const postsDir = join(root, 'content', 'posts')
const expectedLastDate = '2026-07-19'
const expectedDeepDiveUpdatedDate = '2026-07-18'
const monthCounts = new Map()
const errors = []
const topicSlugs = new Set(aiNewsTopics.map((topic) => topic.slug))

if (aiNewsDeepDives.size < 15 || aiNewsDeepDives.size > 20) {
  errors.push(`expected 15-20 deep dives, found ${aiNewsDeepDives.size}`)
}

for (const [slug, deepDive] of aiNewsDeepDives) {
  if (!topicSlugs.has(slug)) errors.push(`${slug}: deep dive has no matching topic`)
  const required = [
    'thesis',
    'lead',
    'releaseState',
    'question',
    'mechanism',
    'flow',
    'change',
    'evaluationNote',
    'judgment',
  ]
  for (const key of required) {
    if (typeof deepDive[key] !== 'string' || deepDive[key].trim() === '') {
      errors.push(`${slug}: deep dive ${key} is required`)
    }
  }
  for (const key of ['designLessons', 'limits', 'evaluation', 'relatedSlugs']) {
    if (!Array.isArray(deepDive[key]) || deepDive[key].length < 3) {
      errors.push(`${slug}: deep dive ${key} needs at least three entries`)
    }
  }
  for (const relatedSlug of deepDive.relatedSlugs ?? []) {
    if (!topicSlugs.has(relatedSlug)) errors.push(`${slug}: unknown related post ${relatedSlug}`)
    if (relatedSlug === slug) errors.push(`${slug}: cannot link to itself`)
  }
}

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
  const isDeepDive = aiNewsDeepDives.has(topic.slug)
  const expectedFormat = isDeepDive ? 'deep-dive' : 'brief'
  const wordCount = content.split(/\s+/).filter(Boolean).length
  if (data.date !== topic.date) errors.push(`${topic.slug}: frontmatter date does not match the official date`)
  if (data.title !== topic.title) errors.push(`${topic.slug}: frontmatter title is out of sync`)
  if (data.category !== 'AI') errors.push(`${topic.slug}: category must be AI`)
  if (data.format !== expectedFormat) errors.push(`${topic.slug}: format must be ${expectedFormat}`)
  if (data.author?.name !== 'coyaSONG') errors.push(`${topic.slug}: author must be coyaSONG`)
  if (!content.includes(`](${topic.sourceUrl})`)) errors.push(`${topic.slug}: primary source link is missing`)
  if (isDeepDive && data.updated !== expectedDeepDiveUpdatedDate) {
    errors.push(`${topic.slug}: deep dive update date is missing`)
  }
  if (isDeepDive && wordCount < 550) errors.push(`${topic.slug}: deep dive is too short (${wordCount} words)`)
  if (!isDeepDive && wordCount < 110) errors.push(`${topic.slug}: brief is too short (${wordCount} words)`)
  if (isDeepDive && !content.includes('## 직접 평가한다면 이렇게 본다')) {
    errors.push(`${topic.slug}: deep dive evaluation section is missing`)
  }
  if (isDeepDive && !content.includes('## 검증 범위')) errors.push(`${topic.slug}: verification scope is missing`)
  if (content.includes('공식 문서가 밝힌 지원 범위와 실제 사용 가능한')) {
    errors.push(`${topic.slug}: legacy repeated checklist remains`)
  }
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
