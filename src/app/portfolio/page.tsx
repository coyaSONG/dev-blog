import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Github, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'coyaSONG의 AI 에이전트 도구와 검증된 오픈소스 기여 포트폴리오',
}

const projects = [
  {
    name: 'YouTube Research MCP',
    description: '영상 URL을 타임스탬프와 원문 링크가 포함된 인용 가능한 연구 근거로 바꾸는 MCP 서버',
    proof: 'API 키 없는 자막 연구, 2–5개 영상 비교, stdio·Streamable HTTP, npm·MCPB 배포',
    stack: ['TypeScript', 'MCP', 'Node.js', 'Docker'],
    repository: 'https://github.com/coyaSONG/youtube-mcp-server',
    action: 'npm 패키지와 1-click bundle 제공',
  },
  {
    name: 'ralph-research',
    description: '실제 산출물을 반복 개선하고 신뢰할 수 있는 평가를 통과한 후보만 frontier로 승격하는 로컬 우선 런타임',
    proof: '지속 가능한 run·decision·frontier 상태, 중단 복구, CLI와 stdio MCP의 공통 서비스 계층',
    stack: ['TypeScript', 'CLI', 'MCP', 'Vitest'],
    repository: 'https://github.com/coyaSONG/ralph-research',
    action: 'writing·code 데모를 자격 증명 없이 실행',
  },
  {
    name: 'tmuxicate',
    description: '여러 코딩 에이전트에 pane·mailbox·task workflow를 제공하는 관찰 가능한 tmux 협업 CLI',
    proof: '원자적 파일 mailbox, 명시적 receipt 상태, delivery retry, coordinator·review·blocker 흐름',
    stack: ['Go', 'tmux', 'Filesystem', 'Cobra'],
    repository: 'https://github.com/coyaSONG/tmuxicate',
    action: '모델 공급자와 분리된 로컬 협업 계층',
  },
]

const contributions = [
  {
    project: 'Effect',
    result: 'Schema 기반 record property test가 수집 단계에서 실패하던 버그를 고치고 회귀 테스트를 추가',
    validation: '패키지 테스트 34개 통과, check·lint 통과',
    url: 'https://github.com/Effect-TS/effect/pull/6416',
  },
  {
    project: 'Quicktype',
    result: 'Swift 생성기에 호환성을 유지하는 opt-in final class 옵션을 추가',
    validation: '단위 테스트 130개와 Swift fixture 241개 통과',
    url: 'https://github.com/glideapps/quicktype/pull/2947',
  },
  {
    project: 'Kopia',
    result: 'cachefs와 list cache의 문자열 로그를 검색 가능한 구조화 로그로 전환',
    validation: 'Go CI 테스트 6,449개 통과, 109개 skip',
    url: 'https://github.com/kopia/kopia/pulls?q=is%3Apr+author%3AcoyaSONG+is%3Amerged',
  },
  {
    project: 'MDN Content',
    result: 'ARIA range role, MP4 Opus codec string, colspan 상한 설명을 표준 문서에 맞게 수정',
    validation: '공식 스펙 근거와 저장소 pre-commit 검증을 포함한 3개 PR 병합',
    url: 'https://github.com/mdn/content/pulls?q=is%3Apr+author%3AcoyaSONG+is%3Amerged',
  },
]

export default function PortfolioPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      <header className="max-w-4xl animate-fade-in">
        <p className="text-sm font-mono text-brand-primary dark:text-brand-primary-light mb-3">
          portfolio.tsx
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
          신뢰할 수 있는 도구를 만들고,
          <span className="block mt-2 bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
            검증 가능한 변경을 기여합니다.
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          AI 에이전트가 실제 개발 흐름에서 유용하려면 결과뿐 아니라 근거, 상태, 실패 방식까지 확인할 수 있어야 합니다.
          직접 만드는 프로젝트와 오픈소스 기여 모두 같은 원칙으로 접근합니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://github.com/coyaSONG"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white transition hover:bg-brand-primary-dark hover:shadow-lg"
          >
            <Github className="h-5 w-5" /> GitHub 보기
          </a>
          <Link
            href="/posts/open-source-contribution-playbook"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 font-semibold transition hover:border-brand-primary hover:shadow-md"
          >
            기여 사례 읽기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section aria-labelledby="projects-heading">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-mono text-brand-primary dark:text-brand-primary-light">01 · Products</p>
            <h2 id="projects-heading" className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              대표 프로젝트
            </h2>
          </div>
          <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400">설치 가능하고, 테스트되며, 공개적으로 검토할 수 있습니다.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/70"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <ShieldCheck className="h-8 w-8 text-brand-primary dark:text-brand-primary-light" aria-hidden="true" />
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} GitHub 저장소`}
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-brand-primary dark:hover:bg-gray-800"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
              <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">{project.description}</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{project.proof}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-auto pt-6 text-sm font-semibold text-brand-primary dark:text-brand-primary-light">{project.action}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="contributions-heading">
        <p className="text-sm font-mono text-brand-primary dark:text-brand-primary-light">02 · Upstream</p>
        <h2 id="contributions-heading" className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          병합된 오픈소스 기여
        </h2>
        <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-300 leading-relaxed">
          저장소의 규칙을 먼저 읽고, 변경 범위를 좁힌 뒤, 회귀 테스트와 프로젝트 고유 검증 명령으로 결과를 증명합니다.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-gray-900/70">
          {contributions.map((contribution, index) => (
            <a
              key={contribution.project}
              href={contribution.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group grid gap-3 p-6 transition hover:bg-gray-50 dark:hover:bg-gray-800/70 md:grid-cols-[10rem_1fr_auto] md:items-center ${index > 0 ? 'border-t border-gray-200 dark:border-gray-800' : ''}`}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{contribution.project}</h3>
              <div>
                <p className="text-gray-700 dark:text-gray-300">{contribution.result}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">검증: {contribution.validation}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 transition group-hover:text-brand-primary" aria-hidden="true" />
            </a>
          ))}
        </div>
        <a
          href="https://github.com/pulls?q=is%3Apr+author%3AcoyaSONG+is%3Amerged+-user%3AcoyaSONG"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-primary hover:underline dark:text-brand-primary-light"
        >
          외부 프로젝트의 병합 PR 전체 보기 <ExternalLink className="h-4 w-4" />
        </a>
      </section>

      <section className="rounded-3xl bg-gray-900 px-6 py-10 text-white dark:bg-black/40 md:px-10">
        <p className="text-sm font-mono text-brand-primary-light">03 · Working agreement</p>
        <h2 className="mt-2 text-3xl font-bold">자동화는 투명하게, 검증은 저장소의 방식으로.</h2>
        <div className="mt-6 grid gap-4 text-gray-300 md:grid-cols-3">
          <p>문제를 먼저 재현하고 실패를 설명하는 최소 사례를 남깁니다.</p>
          <p>해당 저장소의 lint·typecheck·test·build를 기준으로 검증합니다.</p>
          <p>AI 보조 사용과 실행하지 못한 검증은 PR에 명확히 공개합니다.</p>
        </div>
      </section>
    </main>
  )
}
