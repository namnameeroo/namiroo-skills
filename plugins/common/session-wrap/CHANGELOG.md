# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-14

### Added
- Initial release of session-wrap skill
- 격리 병렬 3 subagent: `diff-summarizer`, `learning-extractor`, `automation-scout` (모두 sonnet)
- 메인 직접 처리: `followup-suggester` (우선순위 태그된 다음 일)
- 가벼운 자동 가드 (수정 파일 < 3 AND 변경 줄 < 20 → 1줄 confirm)
- 통합 리포트 (3섹션 + 자동화 후보 푸터, 후보 없으면 푸터 생략)
- 액션 메뉴 multi-select: 커밋 / 문서 업데이트 / 자동화 스킬 생성 가이드 / `_agent` work-log
- work-log 라우팅 (`cwd=_agent` → `project.md` / 그 외 → `<basename>.md`)
- work-log 분석 본문 자동 매핑 (CLAUDE.md 형식과 호환)
- `learning-extractor` 자체 중복 검사 (`_agent/knowledge/*.md`)
- `automation-scout` 자체 중복 검사 (`~/.claude/plugins/**`, `~/.claude/skills/**`, 마켓플레이스 SKILL.md)
- skill-creator는 가이드만 출력 (자동 호출 안 함)
