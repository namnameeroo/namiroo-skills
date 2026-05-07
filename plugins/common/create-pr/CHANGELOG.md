# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2026-03-11

### Changed
- 트리거 키워드에 `"pr-create"` 추가
- PR Body 템플릿에 스크린샷 섹션 추가
- 검증 성공 시 안내에 "리뷰 코멘트 검토" 항목 추가

## [1.1.0] - 2026-03-11

### Changed
- Base 브랜치를 사용자 지정 가능하도록 변경 (기본값: `develop`)
- 하드코딩된 `develop`을 `{base_branch}` 변수로 교체
- 정보 수집 단계에서 base 브랜치 확인 항목 추가

## [1.0.0] - 2026-02-06

### Added
- Initial release of create-pr skill
- 정보 수집 및 분석 (티켓 번호, 버전 태그, 변경사항)
- Conventional Commits 규격 커밋 생성
- GitHub PR 생성 (develop 브랜치 대상, Draft PR)
- PR 템플릿 적용 (티켓 링크, 작업 내용, 검토 사항, 체크리스트)
- PR 검증 (gh pr view, organization 확인)
- Worktree 환경 지원
