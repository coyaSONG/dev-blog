import Link from 'next/link'
import { allPosts } from '@/lib/posts'
import type { Post } from '@/types/post'

export const metadata = {
  title: 'AI 주요 발표 타임라인',
  description: '2024년 1월부터 월별로 정리한 주요 AI 모델, 연구, 제품, 정책 발표입니다.',
}

const monthFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  timeZone: 'UTC',
})

const dayFormatter = new Intl.DateTimeFormat('ko-KR', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

export default function AiNewsPage() {
  const posts = (allPosts as Post[])
    .filter((post) => post.category === 'AI')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const postsByMonth = posts.reduce<Map<string, Post[]>>((months, post) => {
    const key = post.date.slice(0, 7)
    const entries = months.get(key) ?? []
    entries.push(post)
    months.set(key, entries)
    return months
  }, new Map())
  const deepDives = posts.filter((post) => post.format === 'deep-dive')

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-brand-primary-light">
          AI Timeline
        </p>
        <h1 className="font-heading text-4xl font-bold text-gray-950 dark:text-white sm:text-5xl">
          AI 주요 발표 타임라인
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          모델·연구·개발 도구·인프라·정책 가운데 개발자가 다시 확인할 만한 발표를
          공식 발표일 기준으로 정리했습니다. 각 글에서 기술적 핵심과 한계, 1차 출처를 함께 확인할 수 있습니다.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          날짜는 각 기관의 공식 발표일을 기준으로 합니다. AI는 자료 구조화와 초안 작성에 사용했으며,
          공식 1차 출처와 직접 검증 여부를 글마다 구분했습니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
          <span className="rounded-full border border-gray-200 px-4 py-2 dark:border-gray-700">
            {posts.length}개 글
          </span>
          <span className="rounded-full border border-gray-200 px-4 py-2 dark:border-gray-700">
            {postsByMonth.size}개월
          </span>
          <span className="rounded-full border border-gray-200 px-4 py-2 dark:border-gray-700">
            월별 4개 이상
          </span>
          <span className="rounded-full border border-gray-200 px-4 py-2 dark:border-gray-700">
            심층 분석 {deepDives.length}편
          </span>
        </div>
      </header>

      <section className="mb-14" aria-labelledby="deep-dives">
        <div className="mb-5 flex items-end justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
          <div>
            <p className="mb-1 text-sm font-semibold text-brand-primary dark:text-brand-primary-light">Editor&apos;s picks</p>
            <h2 id="deep-dives" className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
              먼저 읽을 심층 분석
            </h2>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{deepDives.length}편</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {deepDives.slice(0, 6).map((post) => (
            <Link
              key={post._id}
              href={post.url}
              className="group rounded-2xl border border-brand-primary/25 bg-brand-primary/5 p-5 transition hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-md dark:bg-brand-primary/10"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-primary-light">
                심층 분석 · {post.readingTime}분
              </span>
              <span className="mt-2 block font-semibold leading-6 text-gray-900 group-hover:text-brand-primary dark:text-gray-100 dark:group-hover:text-brand-primary-light">
                {post.title}
              </span>
              <span className="mt-2 line-clamp-2 block text-sm leading-6 text-gray-600 dark:text-gray-400">
                {post.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="space-y-12">
        {Array.from(postsByMonth.entries()).map(([month, monthPosts]) => (
          <section key={month} aria-labelledby={`month-${month}`}>
            <div className="mb-5 flex items-baseline justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
              <h2 id={`month-${month}`} className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
                {monthFormatter.format(new Date(`${month}-01T00:00:00Z`))}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">{monthPosts.length}건</span>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2">
              {monthPosts.map((post) => (
                <li key={post._id}>
                  <Link
                    href={post.url}
                    className="group flex h-full gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60"
                  >
                    <time
                      dateTime={post.date}
                      className="shrink-0 pt-0.5 text-sm font-semibold text-brand-primary dark:text-brand-primary-light"
                    >
                      {dayFormatter.format(new Date(post.date))}
                    </time>
                    <span>
                      {post.format && (
                        <span className="mb-1 block text-xs font-bold text-brand-primary dark:text-brand-primary-light">
                          {post.format === 'deep-dive' ? `심층 분석 · ${post.readingTime}분` : '브리핑'}
                        </span>
                      )}
                      <span className="block font-semibold leading-6 text-gray-900 transition group-hover:text-brand-primary dark:text-gray-100 dark:group-hover:text-brand-primary-light">
                        {post.title}
                      </span>
                      <span className="mt-2 line-clamp-2 block text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {post.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </main>
  )
}
