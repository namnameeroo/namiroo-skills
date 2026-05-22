# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-21

### Added
- Initial release of save-output skill
- 3-target 저장: Notion (database / page), Obsidian markdown, Local markdown
- 3-tier source 해상: 직전 어시스턴트 응답 / 사용자가 지목한 파일 / 인라인 본문
- 첫 호출 시 인터랙티브 default target 세팅 (`~/.claude/save-output/config.json`)
- 슬래시 (`/save-output [target] [path]`) + 한국어/영어 자연어 트리거 동시 지원
- Notion MCP 도구명 런타임 동적 해상 (환경별 서버명 차이 흡수, 없으면 명시적 fallback 안내)
- Notion DB 저장 시 Date/Source 자동 채우기를 try-then-retry로 분기 처리 (DB에 컬럼이 없으면 한 번만 graceful retry)
- 제목 자동 생성 (source 본문 50자 이내 요약)
- Obsidian/Local 파일 frontmatter (date / source / tags / title) 자동 작성
- 책임 경계 명시: 순수 저장 전용 (본문 transform·멀티 플랫폼 동시 저장은 비범위)
