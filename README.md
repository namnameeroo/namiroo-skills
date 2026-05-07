# namiroo-skills

namiroo의 개인 Claude Code 스킬 마켓플레이스

## 개요

Claude Code에서 사용하는 개인 스킬과 플러그인을 모아두는 저장소입니다.

## 설치

```bash
# 마켓플레이스 추가
/plugin marketplace add namnameeroo/namiroo-skills

# 플러그인 설치 (예시)
/plugin install create-pr@namiroo-skills
```

## 플러그인 목록

| 이름 | 설명 | 버전 |
|------|------|------|
| [create-pr](./plugins/common/create-pr) | 변경사항을 분석하여 커밋(Conventional Commits)하고 프로젝트 템플릿에 맞춰 GitHub PR을 생성합니다. | 1.1.1 |

## 저장소 구조

```
namiroo-skills/
├── .claude-plugin/
│   └── marketplace.json        # 마켓플레이스 매니페스트
└── plugins/
    └── common/
        └── create-pr/
            ├── .claude-plugin/
            │   └── plugin.json # 플러그인 매니페스트
            ├── skills/
            │   └── create-pr/
            │       └── SKILL.md
            ├── README.md
            └── CHANGELOG.md
```

## 새 플러그인 추가

1. 플러그인 디렉토리 생성: `plugins/{domain}/{plugin-name}/`
2. `.claude-plugin/plugin.json` 작성
3. `skills/{skill-name}/SKILL.md` 작성
4. `README.md`, `CHANGELOG.md` 작성
5. `.claude-plugin/marketplace.json`에 등록

## License

MIT
