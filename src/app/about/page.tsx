import { Metadata } from 'next'
import { Github, Rss, Globe, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'About',
  description: '개발자 소개 페이지',
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      <header className="animate-fade-in">
        <p className="text-sm font-mono text-brand-primary dark:text-brand-primary-light mb-3">
          about.tsx
        </p>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
          coyaSONG · Frontend Developer
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          픽셀과 코드 사이에서 UX, 성능, 미감을 균형 있게 만드는 프론트엔드 개발자입니다.
          Next.js 16, React 19, TypeScript를 중심으로 RSC, View Transitions, Turbopack 같은 최신 스택을 실무에 적용합니다.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">지향점</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>· 사용자가 체감하는 속도와 깔끔한 인터랙션에 집착합니다.</li>
            <li>· 유지보수 쉬운 설계(명확한 경계, 타입 안전성, 테스트)로 팀 속도를 끌어올립니다.</li>
            <li>· 문서화·자동화·관찰 가능성을 통해 “예측 가능한 제품”을 만듭니다.</li>
          </ul>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">최근 집중하는 것</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>· React Server Components & Partial Prerendering 실전 패턴</li>
            <li>· View Transitions / 모션을 통한 UX 품질 제어</li>
            <li>· Vercel Analytics + KV/Redis로 데이터 기반 개선</li>
            <li>· MDX 기반 콘텐츠 워크플로우 정교화</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">기술 스택</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light uppercase tracking-wide mb-3">Frontend</p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Next.js 16 / React 19 (App Router, RSC, View Transitions)</li>
              <li>TypeScript 5, Contentlayer 2, MDX</li>
              <li>Tailwind CSS 3, Shiki + rehype-pretty-code</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light uppercase tracking-wide mb-3">Tooling & Ops</p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Turbopack, Vitest, Playwright (E2E), eslint/tailwind linting</li>
              <li>Vercel Analytics, Upstash KV (조회수, 세션), GitHub Actions</li>
              <li>DX: pnpm, Type-safe utils, 자동화된 스크립트 작성</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light uppercase tracking-wide mb-3">콘텐츠 & 커뮤니티</p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>MDX로 인터랙티브 문서 작성</li>
              <li>Giscus로 독자 피드백 루프 운영</li>
              <li>RSS 피드와 검색으로 아카이빙 개선</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light uppercase tracking-wide mb-3">관심사</p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>UX & 마이크로인터랙션, 모션 디자인</li>
              <li>웹 성능 최적화 (Core Web Vitals, INP)</li>
              <li>개발자 경험 개선: 테스트 속도, 코드 모듈성</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">연락 및 팔로우</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 hover:border-brand-primary hover:shadow-md transition-all"
          >
            <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
              <p className="font-semibold text-gray-900 dark:text-white">@coyaSONG</p>
            </div>
            <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400" />
          </a>
          <a
            href={`${siteConfig.url}/feed.xml`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 hover:border-brand-primary hover:shadow-md transition-all"
          >
            <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
              <Rss className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">RSS</p>
              <p className="font-semibold text-gray-900 dark:text-white">/feed.xml</p>
            </div>
            <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400" />
          </a>
          <a
            href={siteConfig.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 hover:border-brand-primary hover:shadow-md transition-all"
          >
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Blog</p>
              <p className="font-semibold text-gray-900 dark:text-white">coyasong.dev</p>
            </div>
            <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400" />
          </a>
        </div>
      </section>
    </div>
  )
}
