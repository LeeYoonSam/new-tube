# [YouTube Clone](https://www.youtube.com/watch?v=ArmPzvHTcfQ)

⭐️ Source Code & More: https://dub.sh/xp03EDA

🎬 PART 2: Coming soon

💬 Discord & Help: https://www.codewithantonio.com/discord

🎨 Assets (Free): https://dub.sh/youtube-clone-assets

- Clerk: https://go.clerk.com/4LzhRH5
- Upstash: https://dub.sh/eiTzkoT
- Mux: https://mux.com/

In this 24 hour tutorial split in 2 parts, you will learn how to create your very own Youtube clone. We will cover advanced topics such as Next 15 and React 19 with tRPC, prefetching in server components, leveraging suspense in client components, video processing, background jobs, AI features, and much more.

### Key Features:
- 🎥 Advanced video player with quality controls
- 🎬 Real-time video processing with Mux
- 📝 Automatic video transcription
- 🖼️ Smart thumbnail generation
- 🤖 AI-powered title and description generation
- 📊 Creator Studio with metrics
- 🗂️ Custom playlist management
- 📱 Responsive design across devices
- 🔄 Multiple content feeds
- 💬 Interactive comment system
- 👍 Like and subscription system
- 🎯 Watch history tracking
- 🔐 Authentication system
- 📦 Module-based architecture
- 🗄️ PostgreSQL with DrizzleORM
- 🚀 Next.js 15 & React 19
- 🔄 tRPC for type-safe APIs
- 💅 TailwindCSS & ShadcnUI styling

## Project setup
- Project 생성
  - `bunx create-next-app@15.1.6`
  ```bash
  ✔ What is your project named? … new-tube
  ✔ Would you like to use TypeScript? … No / Yes
  ✔ Would you like to use ESLint? … No / Yes
  ✔ Would you like to use Tailwind CSS? … No / Yes
  ✔ Would you like your code inside a `src/` directory? … No / Yes
  ✔ Would you like to use App Router? (recommended) … No / Yes
  ✔ Would you like to use Turbopack for `next dev`? … No / Yes
  ✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
  ```
- `shadcn/ui` 설치
  - `bunx shadcn@latest --version` 버전 확인
  - `bunx --bun shadcn@2.3.0 init`
- shadcn ui 전체 추가
  - `bunx --bun shadcn@2.3.0 add --all`


## Basic layout
- `public/logo.svg` 로고 추가
- `src/modules` 모듈 기반 폴더 추가
- `src/modules/home/ui/layout/home-layout.tsx` 생성
  - css 가 적용되지 않음
    - `tailwind.config.ts` 수정
      - content 배열에 새로운 경로 추가
        - "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  - SidebarProvider 추가
- `src/modules/home/ui/components/home-navbar/index.tsx` 생성
  - 홈 네비게이션바 컴포넌트
  ```tsx
  <SidebarTrigger />
  ```
  - Sidebar 컴포넌트 collapse 자동 적용
- `src/modules/home/ui/components/home-navbar/search-input.tsx` 생성
  - 홈 네비게이션바 검색창 컴포넌트
- `src/modules/auth/ui/componenets/auth-button.tsx` 생성
  - AuthButton 컴포넌트
- `src/modules/home/ui/components/home-sidebar/index.tsx` 생성
  - 홈 사이드바 컴포넌트
  - 메인 섹션 컴포넌트 추가
  - 개인 섹션 컴포넌트 추가
  ```tsx
  <Sidebar collapsible="icon" />
  ```
  - 사이드바 축소할때 icon만 보이도록 설정하는 옵션
- `src/modules/home/ui/components/home-sidebar/main-section.tsx` 생성
  - 메인 섹션 컴포넌트
- `src/modules/home/ui/components/home-sidebar/personal-section.tsx` 생성
  - 개인 섹션 컴포넌트
  - SidebarGroupLabel 그룹명 추가
- src/components/ui/sidebar.tsx 수정
  - 아이콘 변경
    - PanelLeft -> MenuIcon
  - 애니메이션 제거
    - transition, duration 관련 속성 제거


## Authentication
## Database setup
## Webhook sync
## TRPC setup
## TRPC configuration
## Video categories
## Studio layout
## Studio videos
## Infinite loading
## Mux integration
## Mux webhooks
## Video form
## Video thumbnails
## AI background jobs
## AI thumbnails
## End of part 1