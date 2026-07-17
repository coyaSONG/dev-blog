import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { aiNewsTopics } from './ai-news-topics.mjs'

const root = new URL('..', import.meta.url).pathname
const outputDir = join(root, 'content', 'posts')
const legacyOutputDir = join(outputDir, 'ai-news')

const yamlString = (value) => JSON.stringify(value)

const renderPost = (topic) => `---
title: ${yamlString(topic.title)}
date: ${yamlString(topic.date)}
description: ${yamlString(topic.summary)}
category: "AI"
tags: ${JSON.stringify(topic.tags)}
---

> **핵심 요약**: ${topic.summary}

## 무엇이 발표됐나

${topic.organization}의 공식 발표일은 ${topic.date}다. 이날 공개된 **${topic.subject}**의 핵심은 다음과 같다. ${topic.announcement}

## 기술적으로 볼 지점

${topic.technical}

이 발표를 제품에 적용할 때는 데모나 단일 벤치마크보다 실제 입력 분포에서의 품질, 지연 시간, 비용을 함께 측정해야 한다. 모델 자체의 성능뿐 아니라 API 안정성, 도구 호출 방식, 관측 가능성, 데이터 처리 경계까지 포함해 시스템 수준으로 검증하는 것이 중요하다.

## 당시 중요했던 이유

${topic.impact}

## 개발자가 확인할 것

- 공식 문서가 밝힌 지원 범위와 실제 사용 가능한 지역·플랜·API를 구분한다.
- 기존 기준 모델과 동일한 데이터셋, 프롬프트, 예산으로 재평가한다.
- 실패 사례를 먼저 수집하고 정확도·지연 시간·비용·안전성 지표를 함께 기록한다.
- 프리뷰 기능이라면 버전 고정, 폴백, 사용량 제한, 감사 로그를 준비한다.

## 발표를 읽을 때의 주의점

${topic.caveat}

공식 발표 수치는 발표자가 선택한 조건에서 측정된 결과다. 따라서 다른 모델과의 우열이나 프로덕션 적합성을 단정하기보다, 아래 1차 출처를 기준으로 요구사항에 맞는 재현 평가를 설계하는 편이 안전하다.

## 공식 1차 출처

- [${topic.sourceLabel}](${topic.sourceUrl}) — ${topic.organization}, ${topic.date}${topic.extraSource ? `\n- [${topic.extraSource.label}](${topic.extraSource.url})` : ''}
`

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
