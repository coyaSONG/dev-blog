# coyaSONG 개발 블로그

AI 에이전트, 개발자 도구, 오픈소스 엔지니어링을 기록하는 CoyaSONG의 기술 블로그와 포트폴리오입니다.

## 🚀 기술 스택

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **React**: 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Content**: 직접 로딩하는 MDX + gray-matter
- **Code Highlighting**: rehype-pretty-code + Shiki

## ✨ 주요 기능

- 📝 **MDX 기반 블로그**: 인터랙티브한 콘텐츠 작성 가능
- 🎨 **다크/라이트 모드**: 테마 전환 지원
- 🔍 **검색 기능**: 포스트 검색 모달
- 🏷️ **태그 시스템**: 카테고리별 분류
- 🧰 **엔지니어링 포트폴리오**: 대표 도구와 upstream 기여의 검증 근거
- 📱 **반응형 디자인**: 모바일 최적화
- ⚡ **Turbopack**: 빠른 빌드 및 개발 경험
- 🎯 **코드 하이라이팅**: GitHub Dark 테마

## 🛠️ 시작하기

### 설치

```bash
corepack enable
pnpm install --frozen-lockfile
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
pnpm build
```

### 프로덕션 서버 실행

```bash
pnpm start
```

## 📁 프로젝트 구조

```
dev-blog/
├── content/posts/          # MDX 블로그 포스트
├── src/
│   ├── app/               # Next.js 16 App Router
│   │   ├── page.tsx       # 홈페이지
│   │   ├── posts/         # 블로그 페이지
│   │   ├── portfolio/     # 프로젝트·오픈소스 포트폴리오
│   │   └── layout.tsx     # 루트 레이아웃
│   ├── components/        # React 컴포넌트
│   │   ├── common/        # 공통 컴포넌트
│   │   └── layout/        # 레이아웃 컴포넌트
│   ├── config/            # 설정 파일
│   ├── hooks/             # Custom Hooks
│   ├── types/             # TypeScript 타입
│   └── utils/             # 유틸리티 함수
└── next.config.ts         # Next.js 설정
```

## 📝 블로그 포스트 작성

`content/posts/` 디렉토리에 MDX 파일을 생성하세요:

```mdx
---
title: "포스트 제목"
date: "2025-11-01"
description: "포스트 설명"
tags: ["React", "Next.js"]
---

여기에 콘텐츠를 작성하세요...
```

## 🔧 환경 요구사항

- **Node.js**: 22.x
- **pnpm**: 10.22.0 (`packageManager` 필드 기준)

## 🌐 배포

Vercel을 통한 배포를 권장합니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/coyaSONG/dev-blog)

## 📚 Learn More

Next.js에 대해 더 알아보기:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

## 📄 License

MIT License

## 👤 Author

**coyaSONG**

- GitHub: [@coyaSONG](https://github.com/coyaSONG)
- Blog: [https://coyasong.dev](https://coyasong.dev)
