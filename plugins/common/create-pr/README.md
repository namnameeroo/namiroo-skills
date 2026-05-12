# create-pr

변경사항을 분석하여 커밋(Conventional Commits)하고 프로젝트 템플릿에 맞춰 GitHub PR을 생성하는 스킬

## 설치

```bash
/plugin install create-pr@namiroo-skills
```

## 사용법

### 트리거

- "PR 생성", "PR 만들어"
- "커밋하고 PR", "/create-pr"
- "풀리퀘스트 생성"

### 제공 기능

1. **정보 수집 및 분석**
   - 티켓 번호 확인
   - 버전 태그 확인 (#major, #minor, #patch)
   - 변경사항 분석 (staged, branch diff, commit history)

2. **Commit 생성**
   - Conventional Commits 규격
   - Co-Authored-By 자동 추가

3. **Push 및 PR 생성**
   - develop 브랜치 대상
   - Draft PR 생성
   - PR 템플릿 적용

4. **PR 검증**
   - gh pr view로 실제 생성 확인
   - organization 일치 검증

5. **Worktree 지원**
   - 워크트리 환경 자동 감지
   - 컨텍스트 유지

### PR 템플릿

```markdown
# 🔗 티켓 링크
{티켓번호}

# 📋 작업 내용
- {변경사항 요약}

## 🧐 주요 검토 필요 사항
- {검토 포인트}

# ✅ 체크리스트
{변경사항 컨텍스트에 따라 동적으로 구성}
```

체크리스트는 변경된 파일 유형(테스트/UI/API/DB 마이그레이션/의존성/문서 등)을 감지해 매번 다르게 생성됩니다.
모든 항목은 빈 체크박스(`- [ ]`)로 시작하며, 작성자가 직접 확인 후 체크합니다.
자세한 구성 규칙은 [SKILL.md](./skills/create-pr/SKILL.md)의 "체크리스트 동적 구성 규칙" 섹션을 참고하세요.

## 버전

- Current: 1.2.0
- [CHANGELOG](./CHANGELOG.md)
