# save-output

AI 산출물(직전 응답·파일·인라인 본문)을 Notion / Obsidian / Local markdown 중 사전 설정한 저장소에 한 번에 저장하는 스킬.

## 설치

```bash
/plugin marketplace add namnameeroo/namiroo-skills
/plugin install save-output@namiroo-skills
```

## 사용법

### 첫 호출 시 흐름

1. `~/.claude/save-output/config.json`이 없으면 인터랙티브 세팅이 시작됨
2. default target 선택 (Notion / Obsidian / Local) + 필요한 ID·경로 입력
3. config가 저장되고 곧바로 요청한 저장이 이어서 실행됨

이후 호출부터는 세팅 단계 없이 바로 저장.

### 트리거

- `/save-output` — default target에 저장
- `/save-output notion` / `/save-output obsidian` / `/save-output local` — target override
- `/save-output local <abs-path>` — local 임시 경로
- 자연어: "이거 저장해줘", "노션에 저장", "옵시디언에 저장", "방금 답변 저장", "이 파일 저장"

### Source 해상 (3-tier)

| 우선순위 | 패턴 | source |
|---------|------|--------|
| 1 | 사용자가 파일 지목 ("이 파일", 명시 경로) | 해당 파일 본문 |
| 2 | 사용자가 인라인 본문 제공 | 제공된 본문 |
| 3 | 둘 다 아님 | 직전 어시스턴트 응답 |

## 디렉토리 구조

```
save-output/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── save-output/
│       └── SKILL.md
├── CHANGELOG.md
└── README.md
```

## 전제·범위 (Limitations)

- **Notion 저장**: Notion 계열 MCP가 활성화돼 있어야 함. 서버명은 환경마다 다를 수 있으나 스킬이 런타임에 자동 탐색.
- **Notion DB 자동 채우기 속성**: **Title (필수)** + **Date / Source (DB에 같은 이름 컬럼이 있을 때만)**. 두 컬럼이 없는 DB에서는 graceful retry로 Title만 저장. 그 외 추가 컬럼은 v1.0.0에서 다루지 않음.
- **Obsidian / Local 저장**: vault 경로·저장 폴더는 **절대 경로**여야 함 (`~`, 상대 경로 불가 — SKILL.md가 Write 단계에서 그대로 사용).
- **비범위**: 멀티 플랫폼 동시 저장, 본문 transform, 자동 태그 분류, 여러 턴 묶어 저장.

## 버전

- Current: 1.0.0
- [CHANGELOG](./CHANGELOG.md)
