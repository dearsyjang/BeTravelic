# 여행이 체질

## 커밋 규칙

### Commit Title

`[{type}] Update [README.md](http://README.md)` `{jira_issue_num}`

- Jira Issue Num: `{jira_issue_num}`
- Type: `{type}`
- Subject: `Update README.md`

### Type

- [feat] : 새로운 기능 추가
- [fix] : 버그 수정
- [docs] : 문서 수정
- [style] : 코드 포맷 변경, 세미콜론 누락, 코드 변경 없음
- [refactor] : 프로덕션 코드 리팩터링
- [test] : 테스트 추가, 테스트 코드 리팩터링, 프로덕션 코드 변경 없음
- [build] : gradle 세팅, 패키지 추가
- [chore] : 빌드 테스크 업데이트, 패키지 매니저 환경설정, 프로덕션 코드 변경 없음

### Subject

- Subject만 보고도 해당 작업을 판단할 수 있게 작성해준다.
    
    ex ) 클라이언트에서 토큰 받아오는 기능 추가
    
- 길이는 50자 이하로 작성한다.
- 끝에는 마침표를 붙이지 않는다.
- 동사로 끝난다.

### Jira Issue Num

- 지라에서 자동적으로 정해주는 issue 번호를 사용한다.

## 브랜치 이름 규칙

### release branch

- Jenkins와 연동해서 실제 배포를 하는 브랜치

### develop branch

- sprint 시작시, 각 개발자들은 develop branch에서 각 feature branch를 만들어 작업한다.

### feature branch

- fe/be 구분해준다.
- feature/fe/{domain}/{verb}/{JIRA_story_num}
    
    예시. feature/fe/category/create/{JIRA_story_num}
    
- 브랜치의 동사는 기본적으로 CRUD를 따른다.
    - 단, 조회 브랜치 끝의 동사는 get으로 고정한다.
- 애매한 경우가 있다면 하단에 새로 추가해주고 팀원에게 알려준다.