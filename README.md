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

### RPC 란?
RPC는 "원격 프로시저 호출"의 줄임말입니다. 다른 컴퓨터(클라이언트)에서 한 컴퓨터(서버)의 함수를 호출하는 방식입니다. 기존 HTTP/REST API를 사용하면 URL을 호출하고 응답을 받습니다. RPC를 사용하면 함수를 호출하고 응답을 받습니다.
```ts
// HTTP/REST
const res = await fetch('/api/users/1');
const user = await res.json();
// RPC
const user = await api.users.getById({ id: 1 });
```
- tRPC(타입스크립트 원격 프로시저 호출)는 타입스크립트 모노레포스를 위해 설계된 RPC의 한 구현입니다. 자체적인 특징이 있지만 핵심은 RPC입니다.

**용어**
tRPC 생태계에서 자주 사용되는 몇 가지 용어

Term | Description
--- | ---
Procedure | API 엔드포인트 - 쿼리, 변경 또는 구독이 될 수 있습니다.
Query	| 일부 데이터를 가져오는 프로시저입니다.
Mutation | 일부 데이터를 생성, 업데이트 또는 삭제하는 절차입니다.
Subscription | 영구 연결을 만들고 변경 사항을 수신하는 프로시저입니다.
Router | 공유 네임스페이스 아래의 프로시저(및/또는 다른 라우터)의 모음입니다.
Context | 모든 프로시저가 액세스할 수 있는 항목입니다. 일반적으로 세션 상태 및 데이터베이스 연결과 같은 용도로 사용됩니다.
Middleware | 프로시저 전후에 코드를 실행할 수 있는 함수입니다. 컨텍스트를 수정할 수 있습니다.
Validation | "이 입력 데이터에 올바른 내용이 포함되어 있나요?"

### tRPC 소개
tRPC를 사용하면 스키마나 코드 생성 없이도 완전한 타입 안전 API를 쉽게 빌드하고 사용할 수 있습니다.

웹 개발에서 TypeScript와 정적 타이핑이 점점 더 모범 사례로 자리 잡으면서 API 컨트랙트는 큰 문제점으로 대두되고 있습니다. API 엔드포인트를 정적으로 타이핑하고 클라이언트와 서버(또는 서버 대 서버) 간에 이러한 유형을 공유하는 더 나은 방법이 필요합니다. 저희는 최신 TypeScript의 모든 기능을 활용하는 타입 안전 API를 구축하기 위한 간단한 라이브러리를 구축하기 시작했습니다.

### Who is tRPC for?
- tRPC는 풀스택 타입스크립트 개발자를 위한 것입니다. 앱의 프론트엔드와 백엔드 모두에서 안전하게 사용할 수 있는 엔드포인트를 쉽게 작성할 수 있습니다. API 컨트랙트의 유형 오류는 빌드 시점에 포착되므로 런타임에 애플리케이션에서 버그가 발생할 여지가 줄어듭니다.

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
- Create categories schema
- Push changes to the database
- Seed categories
- Organize tRPC routers
- Prefetch categories
- Create categories component

### Work
- `src/db/schema.ts` 수정
  - 카테고리 스키마 추가
  - `bunx drizzle-kit push` 스키마 푸시
  - `bunx drizzle-kit studio` 테이블 생성 확인
- `src/scripts/seed-categories.ts` 생성
  - 시드 스크립트 생성
  - `bun src/scripts/seed-categories.ts` 터미널에서 시드 스크립트 실행시켜서 DB 삽입
- `src/modules/categories/server/procedures.ts` 생성
  - categoriesRouter 생성
- `src/trpc/routers/_app.ts` 수정
  - categories에 categoriesRouter 추가
- `src/app/(home)/page.tsx` 수정 
  - HomeView 컴포넌트 추가
- `src/modules/home/ui/views/home-view.tsx` 생성
  - HomeView 컴포넌트
- `src/modules/home/ui/sections/categories-section.tsx` 생성
  - CategoriesSection 컴포넌트
- `src/components/filter-carousel.tsx` 생성
  - FilterCarousel 컴포넌트
  - 카테고리별 뱃지 아이템 추가


## Studio layout
- Create studio route group
- Create studio layout
- Protect studio routes

### Work
- `src/app/(studio)/studio/page.tsx` 수정
  - 스튜디오 페이지 추가
- - src/modules/studio/ui/layouts/studio-layout.tsx 생성
  - 스튜디오 레이아웃 추가
- `src/modules/auth/ui/componenets/auth-button.tsx` 수정
  - UserButton.MenuItems 추가
- `src/modules/studio/ui/components/studio-navbar/index.tsx` 생성
  - 스튜디오용 네비게이션바 컴포넌트
  - StudioUploadModal 컴포넌트 추가
  - AuthButton 컴포넌트 추가
- `src/modules/studio/ui/components/studio-sidebar/index.tsx` 생성
  - 스튜디오용 사이드바 컴포넌트
  - StudioSidebarHeader 컴포넌트 추가
  - 사이드바 메뉴 아이템 추가
- `src/modules/studio/ui/components/studio-sidebar/studio-sidebar-header.tsx` 생성
  - 스튜디오 사이드바 헤더 컴포넌트
  - UserAvatar 컴포넌트 추가
  - 유저 데이터로 정보 표시
- `src/components/user-avatar.tsx` 생성
  - 유저 아바타 컴포넌트
  - VariantProps 를 사용해서 커스텀 속성 생성
- `src/modules/studio/ui/components/studio-upload-modal.tsx` 생성
  - StudioUploadModal 컴포넌트
- src/middleware.ts 수정
  - 미들웨어 보호
  - createRouteMatcher 에 `/studio(.*)` 추가


## Studio videos
- Create video schema
- Push database changes
- Create studio procedures
- Add video record creation

### Work
- `src/db/schema.ts` 수정
  - videos 스키마 추가
  - videosRelation 추가
  - [Drizzle soft relations](https://orm.drizzle.team/docs/relations)
- dirizzle 스키마 업데이트
  - `bunx drizzle-kit push`
- `src/modules/studio/server/procedures.ts` 생성
  - studioRouter 생성
  - 데이터 가져오기 (items, nextCursor)
- `src/trpc/routers/_app.ts` 수정
  - studioRouter 추가
  - videosRouter 추가
- `src/app/(studio)/studio/page.tsx` 수정
  - trpc HydrateClient 추가
  - StudioView 컴포넌트 추가
- `src/modules/studio/ui/view/studio-view.tsx` 생성
  - 스튜디오뷰 컴포넌트
  - VideosSection 컴포넌트 추가
- `src/modules/studio/ui/sections/videos-section.tsx` 생성
  - 비디오 섹션 컴포넌트
  - **useSuspenseInfiniteQuery** 사용해서 스튜디오 데이터 무한 갱신
  - (useSuspenseInfiniteQuery)[https://trpc.io/docs/client/react/suspense#usesuspenseinfinitequery]
- `src/modules/vidoes/server/procedures.ts` 생성
  - 비디오 프로시저
  - create 추가(비디오 추가)
- `src/constants.ts` 생성
  - 상수 관리
- `src/modules/studio/ui/components/studio-upload-modal.tsx` 수정
  - Create 버튼 클릭시 샘플 데이터 추가


## Infinite loading
- Add suspense and error boundaries
- Create reuseable InfiniteScroll component
- Demonstrate infinite scroll

### Work
- `src/modules/studio/ui/sections/videos-section.tsx` 수정
  - Suspense, ErrorBoundary 추가
  - InfiniteScorll 추가
  - 비디오 데이터로 테이블 구성
  - <Link .. legacyBehavior> 사용시 테이블 컬럼에 맞게 데이터가 들어감
- `src/hooks/use-intersection-observer.ts` 생성
  - 교차 확인용 옵저버 훅
- `src/components/infinite-scroll.tsx` 생성
  - 무한로딩 스크롤 컴포넌트
  - 수동/자동 로드 기능
  - **useIntersectionObserver** 혹을 사용해서 다음 페이지 로드
- `src/modules/studio/ui/view/studio-view.tsx` 수정
  - 상단 제목 및 설명 부분 추가


## Mux integration
- Create a resposive dialog
- Create a free Mux account
  - Credit card NOT required!
- Get a 15-second video with english audio
  - https://tinyurl.com/newtube-clip
- Create upload modal

**Mux free account limitations**
- Length limit(30s)
- Video deletion after 24h
- Mux watermark

### Work
- `src/components/responsive-modal.tsx` 생성
  - ResponsiveModal 컴포넌트
  - 모바일 모드인지 아닌지에 따라 Drawer, Dialog 분기
- `src/modules/studio/ui/components/studio-upload-modal.tsx` 수정
  - ResponsiveModal 컴포넌트 추가
  - mux 업로드 URL 을 사용해서 StudioUploader 에 전달
- [Mux 설정](#mux-설정)
- `src/modules/studio/ui/components/studio-uploader.tsx` 생성
  - MuxUploader 컴포넌트
- `src/lib/mux.ts` 생성
  - Mux 를 사용하기 위한 객체 생성
- `src/modules/vidoes/server/procedures.ts` 수정
  - mux 비디오 업로드 url 생성
- `src/db/schema.ts` 수정
  - videos 테이블 수정
    - mux 관련 컬럼 추가
  - `bunx drizzle-kit push` 데이터베이스 변경사항 푸시
- `Mux Webhooks` 설정
  - Mux Dashboard > Settings > Webhooks > Environment 선택 > Create new webhook
  - ngrok 으로 만들어 놓은 url 을 웹훅으로 사용
    - `https://national-utterly-beetle.ngrok-free.app/api/videos/webhook`
  - Signing Secret 복사 > MUX_WEBHOOK_SECRET 추가(.env.local)
- `src/app/api/videos/webhook/route.ts` 생성
  - 웹훅 API 추가
  - mux 에서 웹훅으로 이벤트를 받아서 DB 업데이트


### [Mux](https://www.mux.com/) integration
- 회원가입
- [Environment 추가](https://dashboard.mux.com/organizations/mp0nd6/environments)
- Environment 생성 > Host and Stream Video
  - Integrate with your app 진입
    - Environment 선택 후 퍼미션 전체 추가 후 토큰 생성
      - Access Token ID, Secret Key 프로젝트에 추가(.evn.local)
- [Integration Next.js](https://www.mux.com/docs/integrations/next-js)
  - `bun add @mux/mux-uploader-react` install mux
    - Mux-flavored React 업로더 컴포넌트로, mux-uploader 웹 컴포넌트
  - `bun add @mux/mux-node` install mux node
    - 서버 측 타입스크립트 또는 자바스크립트에서 Mux REST API에 편리하게 액세스


## Mux webhooks
- Update video schema
- Push databaase schanges
- Handle "video.asset.ready" event
  - assign thumbnail
  - assign preview
- Handle "video.asset.errored" event
  - update status
- Handle "video.asset.deleted" event
  - delete from database
- Handle "video.asset.track.ready" event
  - update trackId and trackStatus

### Work
- `public` 이미지 추가
  - placeholder.svg
  - user-placeholder.svg
- `src/modules/vidoes/ui/components/video-thumbnail.tsx` 생성
  - 비디오 썸네일 컴포넌트
  - thumbnail, preview, title 속성
- `src/modules/studio/ui/sections/videos-section.tsx` 수정
  - 비디오 썸네일 컴포넌트 추가
  - 썸네일 테이블 셀 구성
    - thumbnail, preview, title 로 썸네일 구성
    - duration 추가
  - Status 테이블 셀 구성
  - Date 테이블 셀 구성
  - Visibility 테이블 셀 구성
- `src/app/api/videos/webhook/route.ts` 수정
  - video.asset.ready 웹훅 추가
  - video.asset.errored 웹훅 추가
  - video.asset.deleted 웹훅 추가
  - video.asset.track.ready 웹훅 추가
- `src/db/schema.ts` video 스키마 수정
  - thumbnailUrl(jpg) 추가
  - previewUrl(gif) 추가
- `next.config.ts` 수정
  - Error: Invalid src prop (https://image.mux.com/.../thumbnail.jpg) on next/image, hostname "image.mux.com" is not configured under images in your next.config.js
  - 이미지 리모트 패턴 설정 추가
- `src/lib/utils.ts` 수정
  - formatDuration 으로 00:00 으로 duration 표시하도록 포맷 설정


## Video form
## Video thumbnails
## AI background jobs
## AI thumbnails
## End of part 1