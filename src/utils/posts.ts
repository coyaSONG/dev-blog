import { Post } from '@/types/post'
import { compareDesc } from 'date-fns'

/**
 * 포스트를 날짜순으로 정렬 (최신순)
 * @param posts - 정렬할 포스트 배열
 * @returns 날짜순으로 정렬된 포스트 배열 (새 배열)
 */
export function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )
}

/**
 * 카테고리별 포스트 수 계산
 * @param posts - 포스트 배열
 * @returns 카테고리명과 포스트 수의 매핑 객체
 */
export function getCategoryCount(posts: Post[]): Record<string, number> {
  return posts.reduce((acc, post) => {
    const category = post.category || 'General'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * 카테고리 목록을 포스트 수로 정렬하여 반환
 * @param posts - 포스트 배열
 * @returns 카테고리 이름과 수를 포함한 배열
 */
export function getSortedCategories(posts: Post[]): Array<{ name: string; count: number }> {
  const categoryCount = getCategoryCount(posts)
  return Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))
}

/**
 * 카테고리별 포스트 필터링
 * @param posts - 포스트 배열
 * @param category - 필터링할 카테고리 (없으면 전체 반환)
 * @returns 필터링된 포스트 배열
 */
export function filterPostsByCategory(
  posts: Post[],
  category?: string
): Post[] {
  if (!category) return posts
  return posts.filter(post => post.category === category)
}

/**
 * 포스트 검색
 * @param posts - 포스트 배열
 * @param query - 검색어
 * @returns 검색어와 일치하는 포스트 배열
 */
export function searchPosts(posts: Post[], query: string): Post[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return []

  return posts.filter((post) => {
    // 제목 검색
    if (post.title.toLowerCase().includes(lowerQuery)) {
      return true
    }

    // 설명 검색
    if (post.description.toLowerCase().includes(lowerQuery)) {
      return true
    }

    // 태그 검색
    if (post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      return true
    }

    // 본문 검색
    if (post.body.raw.toLowerCase().includes(lowerQuery)) {
      return true
    }

    return false
  })
}

/**
 * 최신 포스트 N개 가져오기
 * @param posts - 포스트 배열
 * @param limit - 가져올 포스트 개수
 * @returns 최신 포스트 N개
 */
export function getRecentPosts(posts: Post[], limit: number): Post[] {
  return sortPostsByDate(posts).slice(0, limit)
}

/**
 * 관련 포스트 추천
 * @param currentPost - 현재 포스트
 * @param allPosts - 전체 포스트 배열
 * @param limit - 추천할 포스트 개수
 * @returns 유사도 순으로 정렬된 관련 포스트 배열
 */
export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit: number = 3
): Post[] {
  // 현재 포스트 제외
  const otherPosts = allPosts.filter(post => post._id !== currentPost._id)

  // 각 포스트의 유사도 계산
  const postsWithScore = otherPosts.map(post => {
    let score = 0

    // 카테고리가 같으면 +3점
    if (post.category === currentPost.category) {
      score += 3
    }

    // 공통 태그 개수만큼 점수 추가
    if (post.tags && currentPost.tags) {
      const commonTags = post.tags.filter(tag =>
        currentPost.tags?.includes(tag)
      )
      score += commonTags.length * 2
    }

    return { post, score }
  })

  // 점수순으로 정렬하고 상위 N개 반환
  return postsWithScore
    .filter(item => item.score > 0) // 점수가 0보다 큰 것만
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}
