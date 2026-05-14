# session-wrap

세션 종료 시 멀티에이전트로 작업을 다각도 분석하고 후속 액션을 한 번에 처리하는 스킬.

## 설치

```bash
/plugin install session-wrap@namiroo-skills
```

## 사용법

### 트리거

- `/session-wrap`
- "session wrap", "wrap up"
- "오늘 정리", "세션 마무리"

### 동작 흐름

1. **Git 상태 점검** — 비-git 디렉토리면 명시적 에러 후 종료
2. **자동 가드** — 수정 파일 < 3 AND 변경 줄 < 20 인 사소한 세션은 1줄 confirm 후 진행 여부 확인
3. **Phase 1 (병렬 격리 3)**
   - `diff-summarizer`: 변경 요약 + 파일 분류
   - `learning-extractor`: TIL 추출 (`_agent/knowledge/` 중복 자체 검사)
   - `automation-scout`: 자동화 idea 1~3개 (기존 스킬 중복 자체 검사)
4. **Phase 2 (메인 직접)** — `followup-suggester`로 우선순위 태그된 다음 일 작성
5. **통합 리포트** — 콘솔에 3섹션(작업 요약/학습/다음 일) + 자동화 후보 푸터(있을 때만)
6. **액션 메뉴** — multi-select로 후속 액션 선택 + 순차 실행

### 액션 메뉴

| 액션 | 동작 |
|---|---|
| **커밋 생성** | `diff-summarizer` 기반 Conventional Commits 메시지 초안 → 사용자 1줄 확인 → `git commit` |
| **문서 업데이트** | `learning-extractor`가 `[knowledge]` 태그로 표시한 항목 중 docs 갱신 대상만 처리 |
| **자동화 스킬 생성** | `/khc-skill-creator` 호출용 가이드 출력 (자동 호출 안 함) |
| **`_agent` work-log** | `_agent/projects/<name>.md`에 분석 본문 자동 매핑하여 append |

### work-log 라우팅

- 현재 디렉토리명이 `_agent` → `_agent/projects/project.md` (메타 로그)
- 그 외 → `_agent/projects/<basename>.md` (없으면 자동 생성)

### work-log 매핑

| 분석 결과 | work-log 필드 |
|---|---|
| `diff-summarizer` 작업 요약 | 작업 내용 요약 + 변경된 주요 파일 |
| `learning-extractor` `[knowledge]` | `[knowledge]` 태그 항목 |
| `learning-extractor` `[learn]` | `[learn]` 태그 항목 |
| `followup-suggester` (P1~P2만) | 다음에 할 일 |
| `automation-scout` | 미포함 (콘솔에만 표시) |

## 디렉토리 구조

```
session-wrap/
├── .claude-plugin/
│   └── plugin.json
├── agents/
│   ├── diff-summarizer.md
│   ├── learning-extractor.md
│   └── automation-scout.md
├── skills/
│   └── session-wrap/
│       └── SKILL.md
├── CHANGELOG.md
└── README.md
```

## 모델

3 격리 에이전트 모두 `sonnet`. 메인 스킬은 호출 측 모델 사용.

## 버전

- Current: 1.0.0
- [CHANGELOG](./CHANGELOG.md)
