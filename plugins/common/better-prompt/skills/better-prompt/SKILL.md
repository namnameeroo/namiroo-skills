---
name: better-prompt
description: 내 프롬프트의 목적을 파악해 더 나은 프롬프트로 다듬고, 확인받은 뒤 실행한다.
argument-hint: "[다듬을 프롬프트 — 비우면 직전 메시지]"
disable-model-invocation: true
---

초안을 더 나은 프롬프트로 다듬는다. 목표는 그럴듯한 프롬프트가 아니라, 목적을 제대로 파악해 더 나은 응답을 내는 것이다.
기준은 이 테스트다: "Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too."

<draft>
$ARGUMENTS
</draft>

`<draft>`가 비어 있으면 직전 사용자 메시지를 초안으로 쓴다. 그것도 없으면 "다듬을 프롬프트를 주세요." 한 줄만 답한다.

## 맥락은 이미 보이는 데서

목적은 지금 볼 수 있는 것에서 추론한다: 이 세션의 대화, 로드된 메모리·CLAUDE.md, 설치된 스킬·MCP·에이전트 목록, 초안이 가리키는 파일·레포·URL. 레포와 무관한 질문(아이디어·설계·학습)이면 사용자가 이미 가진 도구와 해 온 작업이 핵심 맥락이다. 그래야 이미 있는 걸 다시 제안하는 답을 막는다.
프롬프트를 다듬으려고 따로 탐색하지 않는다. 더 조사할 게 있으면 "먼저 X를 확인하고"처럼 다듬은 프롬프트 안의 단계로 넘긴다. 처음 보는 이름이나 대상은 기억으로 채우지 않는다. "먼저 X가 무엇인지 확인하고"로 넘긴다.

## 먼저 판정

다듬기 전에 먼저 판정한다. 이 초안만 받은 유능한 동료가 되묻지 않고 일할 수 있나? 실행하면서 스스로 확인할 수 있는 사실(PR·파일·코드 내용)은 빠진 정보가 아니다. 실행하면서 내릴 사소한 판단(어디에 코멘트를 달지, 순서, 표현)도 실행하는 쪽 몫이다. 빠진 게 그것뿐이면 더할 것도 거의 없다. 초안을 거의 그대로 두고, 목적과 꼭 필요한 `(가정)`만 더한다.

## 무엇이 프롬프트를 좋게 만드나

- **목적이 보인다.** 이 결과로 무엇을 결정하거나 할 것인지. 그게 보이면 실행하는 쪽이 판단 축을 갖고 빈칸을 그 방향으로 채운다. 분석·리뷰 요청에서 특히 자주 빠진다.
- **결과물과 범위가 보인다.** 무엇을 받고 싶은지(코드 수정·비교표·추천 하나·짧은 답)와 어디까지 할지. Claude는 요청을 보수적으로 읽어 최소판을 만들기 쉬우니 더 크게 원하면 그렇게 적는다. 제약에는 이유를 붙인다. 이유가 있어야 비슷한 상황에도 적용된다.
- **끝났는지 판정할 수단이 있다.** 실행 가능한 검사(테스트·빌드·스크린샷)가 있으면 그걸로. 탐색·제안 요청엔 억지로 만들지 않는다.
- **Claude가 볼 수 없는 것만 담는다.** 다듬은 프롬프트에 더한 문장마다 "실행하는 쪽이 이걸 스스로 알 수 없다"를 통과해야 하고, 통과하지 못하면 지운다. 레포를 읽으면 알 수 있는 구조·컨벤션, 실행하며 확인할 PR·파일 내용은 길이만 늘린다. 역할 설정보다 사용자의 실제 상황(가진 도구, 겪는 불편)이 응답을 더 크게 바꾼다.
- **필요한 최소한의 구조만 쓴다.** "The best prompt isn't the longest or most complex. It's the one that achieves your goals reliably with the minimum necessary structure." "Longer, more complex prompts are NOT always better." 대부분은 "clear headings, whitespace, and explicit language … work just as well with less overhead." 그래서 기본은 이유가 이어지는 짧은 줄글이다. 목록은 "when the order or completeness of steps matters"일 때만, XML 태그는 프롬프트가 "mixes instructions, context, examples, and variable inputs"일 때만 쓴다. "The formatting style used in your prompt might influence Claude's response style." 논의·제안을 원하는 요청을 목록으로 쪼개면 응답도 쪼개진다. 대문자 강조·"꼼꼼히"·"끝까지 해"는 쓰지 않는다.

추론으로 채운 부분은 `(가정)`으로 표시한다. 해석에 따라 답이 실질적으로 달라지는 지점이면 `(가정, 다르면: a / b / c)`처럼 선택지를 붙인다. 목적이 안 보여 프롬프트 자체를 다듬을 수 없을 때만 따로 질문한다(최대 2개).

## 계약 (매번 같다)

1. 출력은 이 모양이다:
   ```
   🎯 목적: <한 줄>

   <다듬은 프롬프트>

   진행할까요? `go` 또는 고칠 부분만 알려주세요.
   ```
2. `go`나 수정 지시를 받기 전에는 실행하지 않는다.
3. 수정 지시를 받으면 반영해 다시 묻지 않고 바로 실행한다.

## 예시

거의 더할 게 없는 초안: "develop -> main 병합 PR에 달린 coderabbit comment 야. 병합 PR이니까 여기서 해결 안 하고 싶은데, acceptable 이면 후속 작업 comment 달아 <PR 리뷰 링크>"

```
🎯 목적: 병합 PR에서는 고치지 않고, 타당한 CodeRabbit 지적은 후속 작업으로 넘긴다.

develop -> main 병합 PR에 달린 coderabbit comment야. 병합 PR이니까 여기서 해결 안 하고 싶은데, acceptable이면 후속 작업 comment 달아. acceptable은 지적은 맞지만 병합 후로 미뤄도 되는 수준으로 본다(가정). <PR 리뷰 링크>

진행할까요? `go` 또는 고칠 부분만 알려주세요.
```

상황, 이유가 붙은 제약, 판단 조건, 할 일이 이미 있어서 초안을 거의 그대로 두고, 해석이 갈릴 수 있는 한 곳만 `(가정)`으로 밝혔다. 코멘트를 어디에 달지 같은 판단은 실행하는 쪽 몫이다.

다듬을 초안: "claude mod 구현해둔 거 리뷰해봐"

```
🎯 목적: claude mod를 팀에 공유해도 되는지 판단한다 (가정)

claude mod를 팀에 공유해도 되는지 판단하려고 리뷰를 부탁하는 거야(가정, 다르면: 내가 계속 쓰기 전 점검 / 구조 개선 아이디어). 발견한 건 공유를 막을 문제와 나중에 고쳐도 될 것으로 나눠줘.

진행할까요? `go` 또는 고칠 부분만 알려주세요.
```

인용 출처: Anthropic 블로그 "Prompt engineering best practices for 2026", Claude Platform Docs "Prompting best practices".
