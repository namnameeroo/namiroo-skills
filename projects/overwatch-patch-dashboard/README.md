# 오버워치 패치 대시보드

오버워치 패치 노트를 영웅 단위로 모아 보고, 시즌·미드시즌에 걸친 버프/너프 추이를 시각화하는 Next.js 토이프로젝트.

## 기능

- **패치 타임라인** — 최신 순으로 패치를 시각화, 영웅 변경 요약/카운트 표시
- **검색 / 필터링** — 영웅·스킬·키워드 검색, 공식/커뮤니티 소스 필터
- **패치별 변경 표** — 영웅별 버프/너프/리워크를 역할·종류로 필터링
- **영웅별 추이 차트** — Recharts 기반 버프·너프·순변화 추이
- **영웅 목록** — 누적 버프/너프 카운트와 함께 빠른 탐색

## 실행

```bash
cd projects/overwatch-patch-dashboard
npm install
npm run dev
# http://localhost:3000
```

## 구조

```
projects/overwatch-patch-dashboard/
├── app/
│   ├── layout.tsx           # 공통 레이아웃 + 네비
│   ├── page.tsx             # 패치 타임라인 (홈)
│   ├── patches/[id]/page.tsx
│   ├── heroes/page.tsx
│   └── heroes/[id]/page.tsx
├── components/
│   ├── PatchTimeline.tsx    # 검색/필터 + 타임라인
│   ├── PatchChangeTable.tsx # 패치 상세 변경표
│   ├── HeroChangeChart.tsx  # 영웅 추이 차트 (recharts)
│   ├── HeroGrid.tsx         # 영웅 목록 그리드
│   ├── ChangeBadge.tsx, RoleBadge.tsx
├── lib/
│   ├── types.ts
│   ├── data.ts              # 데이터 접근 헬퍼
│   └── utils.ts
└── data/
    ├── heroes.ts            # 영웅 시드
    └── patches.ts           # 패치 시드 (샘플)
```

## 데이터 소스

지금은 `data/patches.ts`에 손으로 작성한 샘플 데이터가 들어 있습니다. `Patch` 타입의
`source` 필드(`official` | `community`)와 `sourceUrl`로 출처를 구분하므로,
다음과 같이 실제 소스에서 채울 수 있습니다.

- **공식 패치노트** — Blizzard 공식 페이지(<https://overwatch.blizzard.com/ko-kr/news/patch-notes/>)
  스크래퍼를 만들어 `Patch[]` 형태로 직렬화한 뒤 `data/patches.ts`를 대체.
- **커뮤니티** — Fandom 위키, Liquipedia, RSS 등에서 동일 스키마로 변환해 머지.

스크래퍼는 본 토이프로젝트의 범위 밖이며, 데이터 레이어와 UI는 소스에 독립적입니다.

## 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
