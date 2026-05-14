---
name: session-wrap
description: >
  세션 종료 시 멀티에이전트로 작업을 다각도 분석. Use when "/session-wrap",
  "session wrap", "wrap up", "오늘 정리", "세션 마무리", "wrap". diff 요약·학습
  추출·다음 일을 격리 병렬 분석한 뒤 통합 리포트와 액션 메뉴를 제시합니다.
version: 1.0.0
user-invocable: true
---

# Session Wrap

세션 종료 시 작업을 정리하고 후속 액션(커밋·문서 업데이트·work-log)을 한 번에 처리하는 오케스트레이션 스킬.

## 출력 요지

```
## Wrap Analysis · YYYY-MM-DD HH:MM

### 작업 요약
…

### 학습 — TIL
…

### 다음 일
…

---
💡 자동화 후보 (옵션, 발견 시에만)
…
```

이어서 multi-select 액션 메뉴(커밋 / docs 업데이트 / 자동화 스킬 생성 가이드 / `_agent` work-log)로 후속 처리.

## Skip when

- 수정 파일 < 3 AND 변경 줄 < 20 인 사소한 세션 (자동 가드가 1줄 confirm 호출)
- 읽기/탐색만 한 세션
- 일회성 질문 응답

---

## Step 1 — Git 상태 점검

```bash
git rev-parse --is-inside-work-tree 2>/dev/null
```

- 결과가 `true`가 아니면 다음 문구 출력 후 즉시 종료:
  > `session-wrap`은 git 저장소에서만 동작합니다. 현재 디렉토리는 git repo가 아닙니다.

이후 단계에서 사용할 객관 정보를 수집:

```bash
git status --short
git diff --shortstat
git diff --stat
git log --oneline -5
```

## Step 2 — 자동 가드

`git diff --shortstat` 결과에서 **수정 파일 수**와 **줄 변경 수**(insertion+deletion)를 파싱.

| 조건 | 동작 |
|---|---|
| 수정 파일 ≥ 3 OR 변경 줄 ≥ 20 | 정상 진행 |
| 그 외 (사소한 세션) | "이번 세션은 wrap 가치가 낮을 수 있습니다 (파일 N개, 줄 M개). 그래도 진행할까요?" 1줄 confirm 후 사용자 응답에 따라 진행/종료 |

## Step 3 — 세션 컨텍스트 압축

메인이 prompt에 넣을 공통 정보 묶음을 준비. 3 격리 에이전트는 동일한 body를 받음.

**객관 정보 (toolcall 결과)**

- `git status --short`
- `git diff --stat`
- `git diff` 발췌 (너무 길면 변경량이 큰 상위 5 파일만)
- `git log --oneline -5`

**주관 정보 (메인 회상, 1~2단락)**

- 이번 세션의 요지 — 사용자가 무엇을 요청했고 무엇을 했는가
- 핵심 결정 — A vs B 선택, 트레이드오프
- 막힘/실수 — 시간을 쓴 부분, 의외의 발견

회상은 best-effort. 컨텍스트 압축으로 초반이 흐릿하면 "초반 컨텍스트 일부 유실"로 명시.

## Step 4 — Phase 1 (격리 병렬 3)

단일 메시지에서 3 Task 도구를 동시 호출:

```
Task(subagent_type="diff-summarizer", prompt=공통_body + diff-summarizer_지시)
Task(subagent_type="learning-extractor", prompt=공통_body + learning-extractor_지시)
Task(subagent_type="automation-scout", prompt=공통_body + automation-scout_지시)
```

각 에이전트가 무엇을 산출하는지는 `agents/<name>.md` 참조.

## Step 5 — Phase 2 (메인 직접 followup)

3 에이전트 결과를 받은 뒤, 메인이 직접 **"다음 일"** 섹션을 작성. 입력:

- 객관 정보 (git status, 새로 생긴 untracked 파일, 미커밋 변경)
- diff-summarizer 결과의 "미완료/주석 TODO" 단서
- learning-extractor 결과의 "다음 세션에서 다뤄야 할 약점"

출력 형식:

```markdown
- (P1) [핵심 follow-up]
- (P2) [덜 시급]
- (P3) [선택적]
```

비어 있으면 "특이사항 없음" 1줄.

## Step 6 — 통합 리포트 출력

콘솔에 마크다운으로 출력:

```markdown
## Wrap Analysis · {{ISO_DATE_TIME}}

### 작업 요약
{{diff-summarizer 결과 본문 그대로}}

### 학습 — TIL
{{learning-extractor 결과 본문 그대로}}

### 다음 일
{{Step 5 결과}}
```

`automation-scout`가 1개 이상 후보를 산출한 경우에만 푸터 추가:

```markdown

---
💡 자동화 후보 (옵션, idea 수준)
{{automation-scout 결과 본문}}

별도 호출이 필요합니다:
- 새 스킬 생성: `/khc-skill-creator`
- 기존 스킬과의 중복 여부는 위 분석에 포함됨
```

후보가 없으면 푸터 자체 생략.

## Step 7 — 액션 메뉴

`AskUserQuestion`을 `multi-select`로 호출. 옵션:

- ☐ 커밋 생성 (자동 메시지 초안 → 사용자 확인)
- ☐ 문서 업데이트 (CLAUDE.md / 프로젝트 docs)
- ☐ 자동화 스킬 생성 가이드 출력
- ☐ `_agent` work-log 작성

사용자가 0개 선택하면 종료.

**예외 — cwd basename이 `_agent`가 아닌데 `_agent/projects/<basename>.md`도 만들 의도가 명확하지 않은 경우**: work-log 옵션은 항상 표시하되, 선택 시 cwd 기반으로 자동 라우팅. 자세한 동작은 Step 8 참조.

## Step 8 — 액션 순차 실행

선택된 액션을 다음 순서로 순차 실행. 각 액션은 독립적이며 한 액션 실패가 다른 액션을 막지 않음.

### 8a. 커밋 생성

1. `diff-summarizer` 결과를 기반으로 Conventional Commits 메시지 초안:
   - 타입 추론: `feat` / `fix` / `refactor` / `docs` / `chore` / `test`
   - 형식: `타입: 요약 (한 줄)\n\n- 주요 변경 1\n- 주요 변경 2`
2. 사용자에게 1줄 확인:
   > 커밋 메시지: `feat: ...` 이대로 진행할까요? (y/수정)
3. `git add -u` (이미 스테이지된 게 있으면 추가 스테이지 안 함) + `git commit`

### 8b. 문서 업데이트

`learning-extractor`가 잡은 `[knowledge]` 태그 중 **문서 업데이트가 필요하다고 명시한 항목**만 처리.

1. 대상 파일 후보 (해당 경우만 처리):
   - 프로젝트 `CLAUDE.md` (프로젝트 컨벤션 추가)
   - 프로젝트 `docs/` 하위 파일 (가이드 보강)
2. 후보가 여러 개면 사용자에게 어느 파일에 적용할지 multi-select
3. 각 위치에 단답형 confirm 후 편집

후보가 없으면 "업데이트할 docs 항목이 없습니다." 출력 후 액션 종료.

### 8c. 자동화 스킬 생성 가이드

`automation-scout` 결과에서 사용자가 만들고 싶은 후보를 single-select. 선택된 후보 1개에 대해 다음 형태로 가이드 출력:

```
💡 자동화 스킬 생성을 시작하려면 다음 메시지에서 호출하세요:

  /khc-skill-creator

입력 힌트:
  이름: {{후보_name}}
  설명: {{후보_description}}
  트리거: {{후보_trigger 예시}}
  근거: {{automation-scout가 잡은 이번 세션 패턴}}
```

**중요**: 자동으로 `Skill("khc-skill-creator:skill-creator")` 호출하지 **않음**. 두 스킬의 흐름은 분리되어야 함.

### 8d. `_agent` work-log 작성

**라우팅**:

1. `basename "$(pwd)"`로 현재 디렉토리명 추출
2. 대상 파일 결정:
   - basename이 `_agent` → `/Users/namik/Desktop/project/_agent/projects/project.md`
   - 그 외 → `/Users/namik/Desktop/project/_agent/projects/<basename>.md`
3. 대상 파일이 없으면 자동 생성 (헤더 없이 빈 파일로 시작)

**append 형식**:

```markdown
### {{YYYY-MM-DD}}

- **status**: `done`
- {{diff-summarizer 결과: 작업 요약 1~2줄}}
- 변경된 주요 파일: {{diff-summarizer 결과: 변경 파일 분류}}
- 다음에 할 일: {{Step 5 결과 P1~P2}}
- {{learning-extractor 결과: [knowledge] 태그 항목들}}
- {{learning-extractor 결과: [learn] 태그 항목들}}
```

매핑 규칙:

| 분석 결과 | work-log 필드 |
|---|---|
| diff-summarizer 작업 요약 | "작업 내용 요약" 항목 |
| diff-summarizer 변경 파일 분류 | "변경된 주요 파일" 항목 |
| Step 5 follow-up (P1~P2만) | "다음에 할 일" 항목 |
| learning-extractor `[knowledge]` 태그 | 그대로 |
| learning-extractor `[learn]` 태그 | 그대로 |
| automation-scout 결과 | **포함하지 않음** (콘솔에만) |

이미 해당 날짜 헤더(`### YYYY-MM-DD`)가 있으면 그 아래에 항목 추가, 없으면 새 날짜 헤더 + 항목.

이 액션은 confirm 없이 자동 진행.

---

## 마무리

모든 액션 처리 후 1줄 종료 메시지:

> Wrap 완료. {{진행한_액션_요약}}

선택한 액션이 없으면:

> Wrap 분석만 출력했습니다. 액션 없이 종료.
