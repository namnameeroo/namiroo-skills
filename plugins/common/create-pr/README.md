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
- [x] 나는 코드 셀프 리뷰를 하였다.
- [x] 나는 수정사항에 대해 철저하게 테스트 하였다.
- [x] 코드 변경 사이즈가 적절하다 생각한다.
```

## 버전

- Current: 1.1.1
- [CHANGELOG](./CHANGELOG.md)
