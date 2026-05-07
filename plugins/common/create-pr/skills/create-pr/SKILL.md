---
name: create-pr
description: >
  변경사항을 분석하여 커밋(Conventional Commits)하고, 프로젝트 템플릿에 맞춰 GitHub PR을 생성합니다.
  Use when "PR 생성", "PR 만들어", "커밋하고 PR", "/create-pr", "풀리퀘스트 생성", "pr-create"
---

# Create PR Workflow

이 스킬은 현재 변경사항을 프로젝트 표준에 맞춰 커밋하고 GitHub Pull Request를 생성합니다.

## 1. 정보 수집 및 분석

1. **사용자 확인**: 다음 정보를 확인합니다. (입력되지 않았다면 질문하세요)

- **티켓 번호**: (예: DPT-10557)
- **버전 태그**: `#major`, `#minor`, `#patch` (기본값: `#patch`)
- **Base 브랜치**: PR의 대상 브랜치 (기본값: `develop`, 사용자가 다른 브랜치를 지정할 수 있음)

2. **변경사항 분석**: 아래 명령어로 현재 작업 내용을 파악합니다.

- **미커밋 변경사항**: `git diff --staged` (현재 스테이징된 내용)
- **브랜치 간 차이**: `git diff {base_branch}...HEAD` (base 브랜치에서 갈라져 나온 후의 모든 코드 변경점)
- **커밋 히스토리**: `git log {base_branch}..HEAD --oneline` (이미 작성된 커밋 메시지들 확인)

> **Claude의 역할**: 위 3가지 정보를 종합하여 전체 작업의 맥락을 파악하고 PR 본문의 '작업 내용'을 상세히 작성합니다.

## 2. Commit 생성 (필요한 경우)

스테이징된 변경사항이 있다면 **Conventional Commits** 규격으로 커밋을 진행합니다.

- **커밋 메시지**: `{타입}: {요약} #{버전태그}\n\n- {주요 변경사항}\n\nCo-Authored-By: Claude {model_name} <noreply@anthropic.com>`
- **타입**: `feat` (기능), `fix` (버그), `refactor` (리팩토링), `docs` (문서), `chore` (기타)
- 이미 모든 작업이 커밋되어 있다면 이 단계를 건너뛰고 바로 Push로 진행합니다.

## 3. Push 및 PR 생성

1. **Push**: 현재 브랜치를 `origin`에 푸시합니다.

```bash
git push -u origin $(git rev-parse --abbrev-ref HEAD)

```

2. **PR 생성**: `gh` CLI를 사용하여 `{base_branch}` 브랜치를 대상으로 아래 템플릿에 따라 PR을 생성합니다.

```bash
gh pr create \
  --base {base_branch} \
  --draft \
  --assignee @me\
  --title "[{티켓번호}] {타입}: {요약}" \
  --body "{PR_BODY}"
```

### [PR Body 템플릿]

```markdown
# 🔗 티켓 링크

{티켓번호}

# 📋 작업 내용

- {변경사항 요약}

## 🧐 주요 검토 필요 사항

- {검토 포인트}

# 스크린샷

(생략)

# ✅ 체크리스트

- [x] 나는 코드 셀프 리뷰를 하였다.
- [x] 나는 수정사항에 대해 철저하게 테스트 하였다.
- [x] 코드 변경 사이즈가 적절하다 생각한다.
```

## 4. PR 생성 후 검증

PR 생성 후 반드시 CLI로 실제 생성 여부를 검증합니다:

### 검증

1. 방금 만든 PR이 존재해야 함

```bash
gh pr view --json url
```

2. 생성한 URL의 organization이 실제 CLI 실행결과와 일치해야함

```
git remote get-url origin
```

### 검증 성공 시

- PR URL과 번호 출력
- 다음 단계 안내 (리뷰 요청, 리뷰 코멘트 검토, worktree 정리 등)

### 검증 실패 시 (PR이 생성되지 않은 경우)

사용자에게 직접 실행할 수 있는 명령어를 제공합니다:

```
gh pr create --base {base_branch} --title "[{티켓번호}] {타입}: {제목}" --body "{PR 본문}"
```

**중요** : PR 생성 결과를 추측하지 말 것. 반드시 gh pr view 명령어로 확인한 실제
결과만 사용자에게 전달할 것.

## 5. Worktree 및 특이사항 지원

- **Worktree**: `git worktree list`를 확인하여 워크트리 환경인 경우 해당 경로의 컨텍스트를 유지합니다.
- **이미 커밋된 경우**: 스테이징된 변경사항이 없다면 최근 커밋 메시지를 분석하여 PR 생성 단계로 바로 넘어갑니다.
