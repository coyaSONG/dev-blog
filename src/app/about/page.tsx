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
          coyaSONG · AI Tooling &amp; Open Source Engineer
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          신뢰할 수 있는 AI 에이전트와 개발자 도구를 만들고, TypeScript·Go·Rust·Python·Swift 생태계의
          오픈소스에 테스트와 검증 근거를 갖춘 개선을 기여합니다.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">지향점</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>· 재현 가능한 문제 정의와 회귀 테스트를 변경의 출발점으로 삼습니다.</li>
            <li>· 명확한 경계, 타입 안전성, 지속 상태로 실패해도 복구 가능한 도구를 만듭니다.</li>
            <li>· 자동화의 결과와 한계를 공개해 사람이 검증하고 개입할 수 있게 합니다.</li>
          </ul>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">최근 집중하는 것</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>· MCP 기반 리서치 도구와 인용 가능한 에이전트 출력</li>
            <li>· 로컬 우선 연구 루프와 검증된 개선만 남기는 ratchet</li>
            <li>· tmux·파일 시스템 기반 멀티 에이전트 협업</li>
            <li>· 대규모 오픈소스의 테스트·릴리스·문서 워크플로우</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">기술 스택</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light uppercase tracking-wide mb-3">Agent &amp; Tooling</p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Model Context Protocol, CLI, stdio·HTTP transport</li>
              <li>TypeScript / Node.js, Go, Rust, Python, Swift</li>
              <li>상태 지속성, 복구 모델, 구조화된 관찰 가능성</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light uppercase tracking-wide mb-3">Tooling & Ops</p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Vitest, node:test, Go race detector, Playwright</li>
              <li>GitHub Actions, npm, MCP Registry, Docker</li>
              <li>재현 → 최소 수정 → 회귀 테스트 → 전체 검증</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light uppercase tracking-wide mb-3">콘텐츠 & 커뮤니티</p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>스펙과 공식 문서를 근거로 한 기술 문서 수정</li>
              <li>검증 명령과 환경 한계를 포함한 PR 설명</li>
              <li>AI 보조 사용을 공개하는 투명한 기여 방식</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light uppercase tracking-wide mb-3">관심사</p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>신뢰할 수 있는 에이전트 런타임과 평가</li>
              <li>개발자 경험, 테스트 속도, 릴리스 자동화</li>
              <li>접근성·웹 표준·타입 안전성</li>
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
