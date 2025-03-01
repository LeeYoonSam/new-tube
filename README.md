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

### Integrate Clerk
- Clerk - Application 만들기
- 디펜던시 추가
  - `bun add @clerk/nextjs@6.10.3`
- .env.local 추가
  - Clerk key 정보 추가

### Add Sign in screens
- src/app/(auth)/sign-in/[[...sign-in]]/page.tsx 생성
- src/app/(auth)/sign-up/[[...sign-up]]/page.tsx 생성
- src/app/(auth)/layout.tsx 생성

### Add UserButton
- src/modules/auth/ui/componenets/auth-button.tsx 수정

### Add middleware
- src/middleware.ts 생성
  - 미들웨어 추가

### Use auth state on sidebar sections
- src/modules/home/ui/components/home-sidebar/main-section.tsx 수정
- src/modules/home/ui/components/home-sidebar/personal-section.tsx 수정
```tsx
const clerk = useClerk();
const { isSignedIn } = useAuth();

...

onClick={(e) => {
  if (!isSignedIn && item.auth) {
    e.preventDefault();
    return clerk.openSignIn();
  }
}
```
- 로그인 여부 및 인증 필요 여부에 따라 clerk SignIn 팝업 표시 처리

### Protect routes
- src/middleware.ts 수정
  - createRouteMatcher 를 통해서 Route 보호
  ```tsx
  const isProtectedRoute = createRouteMatcher([
    "/protected(.*)",
  ]);

  export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
  });
  ```


## Database setup
### Create a PostgreSQL database(www.neon.tech)
- New Project > Create project
- .env.local 수정
  - DATABASE_URL 추가

### Setup DrizzleORM(https://orm.drizzle.team/docs/overview)
- 디펜던시 추가
  - bun add drizzle-orm@0.39.0 @neondatabase/serverless@0.10.4 dotenv@16.4.7
  - bun add -D drizzle-kit@0.30.3 tsx@4.19.2

### Create users schema
- src/db/index.ts
  - drizzle db 연결
- src/db/schema.ts 생성
  - 유저 스키마 생성

### Migrate changes to database
### Learn how to use dirzzle-kit
- `bunx drizzle-kit push` - DB 변경사항 push
- `bunx drizzle-kit studio` - DB 스튜디오

### Why Drizzle ORM?
- Only ORM with both relational and SQL-like query APIs
- Serverless by default
- Forcing us to "understand" our queries


## Webhook sync
- Create ngrok account(or any other local tunnel solution)
- Obtain a static domain(not required, but easier development)
- Add script to concurrently run local tunnel & app
- Create the users Webhook
- Connect the webhook on Clerk dashboard

### Work
- ngrok 설치
  - `brew install ngrok`
- ngrok Domain 실행
  - `ngrok http --url=national-utterly-beetle.ngrok-free.app 3000`
- concurrentlry 설치(여러 명령을 동시에 실행)
  - `bun add concurrently@9.1.2 `
- `package.json` 수정
  - `dev:webhook` 스크립트 추가
    - ngrok http 실행
  - `dev:all` 스크립트 추가
    - concurrently 를 사용해서 dev 실행 및 ngrok 동시 실행
- Clerk Webhooks 설정
  - Clerk Dashboard > Configure > Webhooks
  - Add Endpoints
    - Endpoint URL 입력
      - ngrok domain: `https://national-utterly-beetle.ngrok-free.app/api/users/webhook`
    - Subscribe Event : User 전체  선택
  - Signing Secret 복사
  - `.env.local` 수정
    - CLERK_SIGNING_SECRET 추가
  - [Sync Clerk data to your app with webhooks](https://clerk.com/docs/webhooks/sync-data)
  - Install `svix`
    - Clerk는 svix를 사용하여 웹훅을 전달하므로 웹훅 서명을 확인하는 데 사용
    - bun add svix@1.45.1
  - src/app/api/users/webhook/route.ts 생성
    - Clerk 에서 제공하는 webhooks/route.ts 코드 추가
    - DB 에 유저정보 저장
      - evt 정보로 users 테이블에 웹훅에서 받은 정보 저장


## TRPC setup
### Why tRPC?
- end-to-end typesafety
- familiar hooks (useQuery, useMutation etc.)
- v11 allows us to do authenticated prefetching

### Why prefetch
- "render as you fetch" concept
- leverage RSCS as "loaders"
- faster load time
- parallel data loading

### Work
- [tRPC 설정](https://trpc.io/docs/client/react/server-components)
  1. Install deps
    - `bun add @trpc/server@11.0.0-rc.802`
    - `bun add @trpc/client@11.0.0-rc.802`
    - `bun add @trpc/react-query@11.0.0-rc.802`
    - `bun add @tanstack/react-query@5.65.1`
    - `bun add zod client-only server-only`
  2. Create a tRPC router
    - `src/app/trpc/init.ts` 생성 및 코드 복사
    - `src/app/trpc/routers/_app.ts` 생성 및 코드 복사
    - `src/app/api/trpc/[trpc]/route.ts` 생성 및 코드 복사
  3. Create a Query Client factory
    - `src/app/trpc/query-client.ts` 생성 및 코드 복사
  4. Create a tRPC client for Client Components
    - `src/app/trpc/client.tsx` 생성 및 코드 복사
  5. Create a tRPC caller for Server Components
    - `src/app/trpc/server.tsx` 생성 및 코드 복사
  6. Using your API
    - Client Component
    ```tsx
    "use client";
    ...
    const { data } = trpc.hello.useQuery({ text: "Albert" })
    ```

    - Server Component
    ```tsx
    const data = await trpc.hello ({ text: "Albert" })
    ```

    - Prefetch
    ```tsx
    void trpc.hello.prefetch ({ text: "Albert" })

    // 사용하는 곳
    const [data] = trpc.hello.useSuspenseQuery({
      text: "Albert",
    });
    ```


## TRPC configuration
- Enable transformer on tRPC
- Add auth to tRPC context
- Add protected Procedure
- Add reate limiting

### Work
- tRPC 설정 수정
  - superjson 활성화
    - JavaScript 표현식을 날짜, BigInts 등을 포함하는 JSON의 상위 집합으로 안전하게 직렬화
  - `bun add superjson@2.2.2`
  - `src/app/trpc/init.ts` 수정
    - protectedProcedure 추가
  - `src/app/trpc/query-client.ts` 수정
  - `src/app/trpc/routers/_app.ts` 수정
    - protectedProcedure 적용
- [Upstach](https://upstash.com/) 데이터베이스 설정
  - Create Database
  - [Rate Limit Analytics](https://console.upstash.com/ratelimit?teamid=0) 설정
    - 디펜던시 설치
      - `bun add @upstash/redis@1.34.3`
      - `bun add @upstash/ratelimit@2.0.5`
    - .env.local 수정
      - Upstash REST URL, Token 추가
    - Ratelimit 추가
      - `src/lib/redis.ts` 생성
      - `src/lib/ratelimit.ts` 생성


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