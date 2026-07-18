import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { aiNewsTopics } from './ai-news-topics.mjs'
import { aiNewsDeepDives } from './ai-news-deep-dives.mjs'

const root = new URL('..', import.meta.url).pathname
const outputDir = join(root, 'content', 'posts')
const legacyOutputDir = join(outputDir, 'ai-news')

const yamlString = (value) => JSON.stringify(value)

const author = `author:\n  name: "coyaSONG"`

const renderBrief = (topic) => `---
title: ${yamlString(topic.title)}
date: ${yamlString(topic.date)}
description: ${yamlString(topic.summary)}
category: "AI"
tags: ${JSON.stringify(topic.tags)}
format: "brief"
${author}
---

> **한 문장 요약**: ${topic.summary}

## 무엇이 발표됐나

${topic.organization}의 공식 발표일은 ${topic.date}다. 이날 공개된 **${topic.subject}**의 핵심은 다음과 같다. ${topic.announcement}

## 기술적으로 볼 지점

${topic.technical}

## 왜 중요했고, 무엇을 경계해야 하나

${topic.impact}

${topic.caveat}

이 글은 발표 당시의 핵심을 빠르게 확인하기 위한 브리핑이다. 수치와 제공 범위는 아래 1차 출처를 기준으로 정리했으며, 별도의 직접 벤치마크를 수행했다는 의미는 아니다.

## 공식 1차 출처

- [${topic.sourceLabel}](${topic.sourceUrl}) — ${topic.organization}, ${topic.date}${topic.extraSource ? `\n- [${topic.extraSource.label}](${topic.extraSource.url})` : ''}
`

const renderList = (items) => items.map((item) => `- ${item}`).join('\n')

const renderDeepDive = (topic, deepDive) => {
  const related = deepDive.relatedSlugs
    .map((slug) => aiNewsTopics.find((candidate) => candidate.slug === slug))
    .filter(Boolean)
    .map((candidate) => `- [${candidate.title}](/posts/${candidate.slug})`)
    .join('\n')

  return `---
title: ${yamlString(topic.title)}
date: ${yamlString(topic.date)}
updated: "2026-07-18"
description: ${yamlString(topic.summary)}
category: "AI"
tags: ${JSON.stringify([...topic.tags, 'Deep Dive'])}
format: "deep-dive"
${author}
---

> **핵심 판단**: ${deepDive.thesis}

${deepDive.lead}

## 발표를 한눈에 보기

- **발표 주체**: ${topic.organization}
- **공식 발표일**: ${topic.date}
- **대상**: ${topic.subject}
- **발표 당시 상태**: ${deepDive.releaseState}
- **이 글의 질문**: ${deepDive.question}

${topic.announcement}

## 기술 구조: 무엇이 실제로 달라졌나

${topic.technical}

${deepDive.mechanism}

> **작동 흐름**: ${deepDive.flow}

이 구조에서 개발자가 가져갈 설계 원칙은 다음과 같다:

${renderList(deepDive.designLessons)}

## 발표가 바꾼 것과 바꾸지 않은 것

${topic.impact}

${deepDive.change}

다만 다음 문제까지 해결됐다고 확대 해석해서는 안 된다:

${renderList(deepDive.limits)}

## 직접 평가한다면 이렇게 본다

발표사의 종합 점수 하나를 재현하는 것보다, 실제 제품의 입력과 실패 비용에 맞춘 평가가 더 유용하다. 이 주제라면 다음 순서로 확인한다:

${renderList(deepDive.evaluation)}

${deepDive.evaluationNote}

## 내 판단

${deepDive.judgment}

${topic.caveat}

## 검증 범위

이 글은 공식 발표와 공개된 기술 자료를 바탕으로 구조와 제품 영향을 분석했다. 직접 벤치마크나 장기 운영 검증은 수행하지 않았으며, 발표사가 제시한 수치는 해당 기관의 평가 조건에 한정해 해석했다. 업데이트 시점은 2026년 7월 18일이다.

## 함께 읽을 글

${related}

## 공식 1차 출처

- [${topic.sourceLabel}](${topic.sourceUrl}) — ${topic.organization}, ${topic.date}${topic.extraSource ? `\n- [${topic.extraSource.label}](${topic.extraSource.url})` : ''}
`
}

const renderPost = (topic) => {
  const deepDive = aiNewsDeepDives.get(topic.slug)
  return deepDive ? renderDeepDive(topic, deepDive) : renderBrief(topic)
}

const validate = () => {
  const seen = new Set()
  const monthCounts = new Map()

  for (const topic of aiNewsTopics) {
    const required = ['date', 'slug', 'title', 'organization', 'subject', 'summary', 'announcement', 'technical', 'impact', 'caveat', 'sourceLabel', 'sourceUrl']
    for (const key of required) {
      if (!topic[key]) throw new Error(`${topic.slug || 'unknown'}: ${key} is required`)
    }

    if (!/^202[456]-\d{2}-\d{2}$/.test(topic.date)) throw new Error(`${topic.slug}: invalid date`)
    if (seen.has(topic.slug)) throw new Error(`${topic.slug}: duplicate slug`)
    if (!topic.sourceUrl.startsWith('https://')) throw new Error(`${topic.slug}: source must use HTTPS`)

    seen.add(topic.slug)
    const month = topic.date.slice(0, 7)
    monthCounts.set(month, (monthCounts.get(month) ?? 0) + 1)
  }

  for (let year = 2024; year <= 2026; year += 1) {
    const finalMonth = year === 2026 ? 7 : 12
    for (let month = 1; month <= finalMonth; month += 1) {
      const key = `${year}-${String(month).padStart(2, '0')}`
      if ((monthCounts.get(key) ?? 0) < 4) throw new Error(`${key}: fewer than four posts`)
    }
  }

  return monthCounts
}

const generate = async () => {
  const monthCounts = validate()
  await mkdir(outputDir, { recursive: true })
  await rm(legacyOutputDir, { recursive: true, force: true })

  const generatedFiles = new Set(aiNewsTopics.map((topic) => `${topic.slug}.mdx`))
  for (const file of await readdir(outputDir)) {
    if (generatedFiles.has(file)) await rm(join(outputDir, file))
  }

  for (const topic of aiNewsTopics) {
    await writeFile(join(outputDir, `${topic.slug}.mdx`), renderPost(topic), 'utf8')
  }

  console.log(`Generated ${aiNewsTopics.length} AI posts across ${monthCounts.size} months.`)
}

await generate()
