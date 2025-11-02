export interface TocItem {
  id: string
  text: string
  level: number
}

/**
 * MDX 콘텐츠에서 헤딩을 추출하여 목차 생성
 * @param content - MDX 원본 콘텐츠
 * @returns 목차 아이템 배열
 */
export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length // ## = 2, ### = 3
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ id, text, level })
  }

  return headings
}
