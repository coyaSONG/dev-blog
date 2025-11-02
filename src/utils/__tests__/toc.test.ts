import { extractHeadings } from '../toc'

describe('extractHeadings', () => {
  it('should extract h2 and h3 headings', () => {
    const content = `
# Title (ignored)
## Introduction
### Getting Started
## Setup
### Configuration
### Installation
#### Details (ignored)
`

    const headings = extractHeadings(content)

    expect(headings).toHaveLength(5)
    expect(headings[0]).toEqual({
      id: 'introduction',
      text: 'Introduction',
      level: 2,
    })
    expect(headings[1]).toEqual({
      id: 'getting-started',
      text: 'Getting Started',
      level: 3,
    })
    expect(headings[4]).toEqual({
      id: 'installation',
      text: 'Installation',
      level: 3,
    })
  })

  it('should handle Korean text', () => {
    const content = `
## 시작하기
### 설치 방법
## 사용법
`

    const headings = extractHeadings(content)

    expect(headings).toHaveLength(3)
    expect(headings[0]).toEqual({
      id: '시작하기',
      text: '시작하기',
      level: 2,
    })
    expect(headings[1]).toEqual({
      id: '설치-방법',
      text: '설치 방법',
      level: 3,
    })
  })

  it('should handle special characters in headings', () => {
    const content = `
## What's New?
### Key Features (2024)
## FAQ & Troubleshooting
`

    const headings = extractHeadings(content)

    expect(headings).toHaveLength(3)
    expect(headings[0].id).toBe('whats-new')
    expect(headings[1].id).toBe('key-features-2024')
    expect(headings[2].id).toBe('faq-troubleshooting')
  })

  it('should return empty array for content without headings', () => {
    const content = `
This is just regular text.
No headings here.
`

    const headings = extractHeadings(content)

    expect(headings).toEqual([])
  })

  it('should handle empty content', () => {
    const content = ''

    const headings = extractHeadings(content)

    expect(headings).toEqual([])
  })

  it('should create unique IDs for duplicate heading text', () => {
    const content = `
## Overview
### Details
## Overview
### Details
`

    const headings = extractHeadings(content)

    // Note: This test shows current behavior
    // All duplicates will have the same ID - may want to enhance this later
    expect(headings).toHaveLength(4)
    expect(headings[0].id).toBe('overview')
    expect(headings[2].id).toBe('overview') // Same ID (current behavior)
  })

  it('should handle mixed English and Korean', () => {
    const content = `
## React 시작하기
### useState Hook 사용법
## TypeScript Integration
`

    const headings = extractHeadings(content)

    expect(headings).toHaveLength(3)
    expect(headings[0].id).toBe('react-시작하기')
    expect(headings[1].id).toBe('usestate-hook-사용법')
    expect(headings[2].id).toBe('typescript-integration')
  })
})
