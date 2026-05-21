---
name: save-output
description: AI 산출물(직전 어시스턴트 응답, 사용자가 명시한 파일, 인라인 본문)을 사전 설정한 default 저장소(또는 즉석 override)에 저장. Notion / Obsidian / Local markdown 지원. 첫 호출 시 인터랙티브 세팅. Use when "/save-output", "save this", "save output", "이거 저장해줘", "이거 보관해줘", "방금 답변 저장", "노션에 저장", "옵시디언에 저장", "obsidian에 저장", "로컬에 저장", "local에 저장", "이 파일 저장", "방금 만든 파일 저장".
argument-hint: "[target] [path]"
---

# save-output

AI 산출물을 외부 저장소에 한 번에 저장한다. 책임 범위는 **순수 저장만**이다. 사용자가 "X에 Y 추가해서 저장" 같이 transform을 요청하면, transform은 이 스킬 호출 **이전**에 메인 Claude가 Edit/compose로 처리한 뒤, 완성된 컨텐츠를 source로 이 스킬에 넘긴다.

## 1. 실행 진입 시 가장 먼저: config 확인

```
~/.claude/save-output/config.json
```

존재 여부에 따라 분기한다:

- **없음** → 섹션 2(인터랙티브 세팅)로 진행
- **있음** → 섹션 3(저장 흐름)로 진행

config 파일은 Read 도구로 직접 읽는다. 없으면 ENOENT 에러가 발생하므로 그것을 분기 신호로 사용한다.

## 2. 인터랙티브 세팅 (config 없을 때만)

처음 사용 시 한 번 실행한다. 사용자가 호출한 의도(저장)가 있으므로, 세팅이 끝나면 곧바로 섹션 3로 이어 저장을 실행한다.

### 2-1. default target 선택
AskUserQuestion으로 묻는다:

- 질문: "default 저장소를 무엇으로 설정할까요? (이후 매번 호출 시 이곳에 저장됩니다. 다른 곳도 즉석 override 가능합니다.)"
- 옵션: Notion / Obsidian / Local

### 2-2. 선택된 target의 세부값 받기

**target=notion 인 경우**:
- AskUserQuestion으로 종류 선택: `database` 또는 `page`
- 종류에 따라 ID 입력받기:
  - `database` → "Notion 데이터베이스의 data_source_id를 입력해주세요." (사용자가 직접 입력)
  - `page` → "Notion 부모 페이지의 page_id를 입력해주세요."
- DB인 경우 Title property 이름도 묻기 (default: "Title")

**target=obsidian 인 경우**:
- "Obsidian vault 절대 경로를 입력해주세요." (예: `/path/to/ObsidianVault`)
- "vault 내 default 폴더 경로를 입력해주세요. (vault 루트 기준 상대 경로, 없으면 빈 문자열)" (예: `Claude/captures`)

**target=local 인 경우**:
- "기본 저장 폴더의 절대 경로를 입력해주세요." (예: `/path/to/captures`)

### 2-3. config 파일 작성

`~/.claude/save-output/` 디렉토리를 먼저 보장한다. 그다음 `config.json`을 Write한다.

스키마:
```json
{
  "default_target": "notion" | "obsidian" | "local",
  "notion": {
    "kind": "database" | "page",
    "id": "<data_source_id 또는 parent_page_id>",
    "title_property": "Title"
  },
  "obsidian": {
    "vault_path": "/abs/path/to/vault",
    "default_folder": "subdir/inside/vault"
  },
  "local": {
    "default_folder": "/abs/path/to/folder"
  }
}
```

**lazy init 원칙**: default로 선택된 플랫폼의 블록만 먼저 채운다. 나머지 플랫폼은 추후 사용자가 override하려고 할 때 그 시점에 추가로 묻고 config를 업데이트한다.

세팅이 끝나면 사용자에게 한 줄로 알린 뒤 (`"설정 저장 완료. 요청하신 저장을 이어서 진행합니다."`) 섹션 3로 진행한다.

## 3. 저장 흐름 (config 있을 때)

### 3-1. Target 해상

호출 입력에서 다음 패턴을 인식해 target을 정한다. 명시 없으면 `config.default_target`을 사용한다.

| 입력 패턴 | target |
|-----------|--------|
| `/save-output` (인자 없음), "이거 저장해줘", "방금 답변 저장" | default_target |
| `/save-output notion`, "노션에 저장" | notion |
| `/save-output obsidian`, "옵시디언에 저장", "obsidian에 저장" | obsidian |
| `/save-output local`, "로컬에 저장", "local에 저장" | local |
| `/save-output local <path>` | local + 임시 경로 (`<path>`로 default_folder 대체) |

**override 시 해당 플랫폼 블록이 config에 없으면**: 그 플랫폼만 섹션 2-2 형식으로 묻고 config를 업데이트한 뒤 진행한다 (lazy init 확장).

### 3-2. Source 해상 (3-tier 우선순위)

| 우선순위 | 트리거 패턴 | source 본문 |
|---------|------------|------------|
| 1 | 사용자가 파일을 가리킴 ("방금 만든 .md 파일", "이 파일", 명시 경로) | 해당 파일을 Read → 본문 사용 |
| 2 | 사용자가 인라인 본문 제공 ("다음을 저장: <text>") | 제공된 본문 그대로 |
| 3 | 위 둘 다 아님 ("이거 저장해줘") | 직전 어시스턴트 응답 본문 (메인 Claude의 컨텍스트에 있는 직전 자기 응답을 그대로 사용) |

### 3-3. 제목 자동 생성

source 본문을 50자 이내 1줄로 요약해 제목으로 만든다. 한글/영문 모두 가능. 코드/긴 인용은 제외하고 핵심 주제 위주로.

### 3-4. Target별 저장 분기

#### Notion
도구: 현재 세션에서 사용 가능한 Notion 계열 MCP의 "create page" 액션 (예: `mcp__claude_ai_Notion__notion-create-pages`, `mcp__notion__create_page`). 정확한 도구명은 시스템이 안내한 도구 목록에서 확인해 호출한다. 사용 가능한 Notion MCP가 없으면 Notion 저장은 불가하다고 안내한다.

- `kind=database`인 경우:
  - **필수 property**: `{ <title_property>: <제목> }`
  - **선택 auto-property** (DB에 동일 이름 컬럼이 있을 때만 채워짐):
    - `Date`: 오늘 날짜 `YYYY-MM-DD`
    - `Source`: `"claude-code"`
  - **호출 전략**:
    1. 1차: 필수 + 선택 auto-property 모두 포함해 create page 호출
    2. 실패 시(응답이 "unknown property" 또는 validation_error 류이고 메시지에 `Date` 또는 `Source`가 포함되면): 해당 property를 properties에서 제외하고 **한 번만** 재시도
    3. 그래도 실패하면 에러를 그대로 사용자에게 보고
  - 본문 markdown은 page content로 첨부.
- `kind=page`인 경우: parent에 page_id 지정, child page 생성. 제목은 page title, 본문은 page content.
- 사용자 정의 속성을 사용할 일이 생기면 `userDefined:` prefix 규칙을 따른다 (예: `userDefined:URL`).

저장 후 응답에서 page URL을 추출해 사용자에게 반환한다.

#### Obsidian
- 파일 경로: `{vault_path}/{default_folder}/{YYYY-MM-DD}-{title-slug}.md`
- title-slug: 제목을 소문자화 + 공백/특수문자를 `-`로 치환 + 30자 이내 잘라서 사용
- 파일 내용:
  ```markdown
  ---
  date: YYYY-MM-DD
  source: claude-code
  tags: [claude, capture]
  title: <제목>
  ---

  <source 본문>
  ```
- Write 도구로 생성. 폴더가 없으면 Bash `mkdir -p`로 보장한다.
- 저장 후 절대 경로를 반환한다.

#### Local
- 파일 경로: `{default_folder 또는 override path}/{YYYY-MM-DD}-{title-slug}.md`
- 파일 내용은 Obsidian과 동일한 frontmatter + 본문 구조.
- Write 도구로 생성. 폴더가 없으면 `mkdir -p`로 보장.
- 저장 후 절대 경로를 반환한다.

### 3-5. 결과 보고

저장 성공 시 사용자에게 다음을 1줄로 알린다:

- Notion: `"저장 완료: <Notion URL>"`
- Obsidian/Local: `"저장 완료: <절대 경로>"`

실패 시(권한, 잘못된 ID 등) 에러 메시지를 그대로 보여주고, 가능한 원인 1~2줄로 짚어준다.

## 4. 트리거 인자 파싱 상세

### 슬래시 호출
```
/save-output                        # default
/save-output notion                 # notion override
/save-output obsidian               # obsidian override
/save-output local                  # local override (default_folder)
/save-output local <abs-path>       # local + 임시 경로
```

### 자연어 호출
"노션", "옵시디언/obsidian", "로컬/local" 키워드가 있으면 그것을 target으로 한다. 키워드가 없으면 default.

### 파일 source 인식 키워드
다음과 같은 표현이 있으면 우선순위 1 (파일 source)로 해상한다:
- "방금 만든 파일", "방금 작성한 .md", "이 파일", "그 markdown"
- 명시적 경로 포함 (예: `~/Desktop/foo.md`)

대화 컨텍스트에서 파일 경로를 식별할 수 없으면, 사용자에게 한 번 짧게 묻는다 ("어느 파일을 저장할까요? 경로를 알려주세요.").

## 5. 책임 경계

### 이 스킬이 하는 일
- config 로드/세팅
- target 분기 저장 (Notion / Obsidian / Local)
- 제목 자동 생성
- source 해상 (파일 / 인라인 / 직전 응답)

### 이 스킬이 하지 않는 일
- 본문 transform (action item 추가, 요약, 재구성 등) → 메인 Claude가 호출 **이전**에 처리해야 함
- 멀티 플랫폼 동시 저장
- 여러 턴 묶어 저장
- 자동 태그 분류 (frontmatter의 `tags`는 고정값)

## 6. 안전/예외 처리

- config.json 손상(JSON parse 실패): 사용자에게 알리고 인터랙티브 세팅을 다시 제안 (덮어쓸지 확인).
- Notion MCP 호출 실패: 응답의 에러 메시지 그대로 + ID 형식 확인 안내.
- Notion 저장 요청인데 사용 가능한 Notion MCP가 없는 경우: "Notion MCP가 활성화돼 있지 않습니다. `/mcp` 또는 설정에서 Notion 연결을 활성화하거나, 다른 target(obsidian/local)을 사용하세요."로 안내하고 종료.
- 파일 source 경로 미존재: 한 줄로 알리고 다시 묻기.
- 직전 응답이 없는 첫 메시지에서 호출됐을 때: "저장할 직전 응답이 없습니다" 안내.
