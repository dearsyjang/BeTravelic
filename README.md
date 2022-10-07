## 여행이 체질 : Be Travelic

---

### 팀원 소개

---

| NAME   | ROLE                  |
| ------ | --------------------- |
| 정윤해 | Backend & Team Leader |
| 강지명 | Backend & Data        |
| 임채현 | Frontend              |
| 신혜원 | Frontend              |
| 장수영 | Frontend & Notion     |
| 조호형 | Backend & Data & Jira |



### 프로젝트 소개

---

여행이 체질은 사용자 여행 성향에 맞는 여행지 추천 서비스입니다. 
회원가입 시 설문조사를 통해 사용자 여행 성향과 정보를 입력받아 여행지 추천을 진행할 수 있도록 했습니다. 추천 받은 여행지를 방문한 후 여행 후기를 남길 수 있는데, 이를 이용해서 자신만의 여행 지도를 제작할 수 있습니다. 그리고 다른 사용자들이 남긴 여행 기록들을 추천 받아 또 다른 여행 계획을 세울 수 있도록 합니다.



### 주요 기능 소개

---

![홈2](https://user-images.githubusercontent.com/94509971/194459308-11885d97-b489-4d55-bde9-d42ca2887fb9.JPG)

1. 회원 가입 및 설문조사

![회원가입](https://user-images.githubusercontent.com/94509971/194459332-13bfd756-9b1f-49e1-a368-520b9423ddbc.JPG)

![설문조사](https://user-images.githubusercontent.com/94509971/194459358-a4417a93-882d-499f-bd9d-4db3c3a38a5b.png)

2. 여행지 추천 : 컨텐츠 기반 필터링을 이용한 사용자 맞춤 여행지 추천

![추천](https://user-images.githubusercontent.com/94509971/194459436-6e2c6ddc-10d3-4983-88cb-2ada746e5c99.png)

<img width="879" alt="여행지 상세2" src="https://user-images.githubusercontent.com/94509971/194459470-2422d6cd-0ac0-4633-acc4-ce7465dfad09.png"><img width="809" alt="여행지 상세" src="https://user-images.githubusercontent.com/94509971/194459530-3a875083-07db-4e50-91fc-b7421c9addae.png">
ent.com/94509971/194459470-2422d6cd-0ac0-4633-acc4-ce7465dfad09.png">



- 반응형 페이지

![상세페이지 반응형](https://user-images.githubusercontent.com/94509971/194459584-ac1f7540-a1e0-441a-9c21-b110ff4f217b.png)

![상세페이지 반응형2](https://user-images.githubusercontent.com/94509971/194459603-fa2e52ce-9d30-4b92-aa4c-6b1dc80a6b44.png)

3. Mypage : 사용자 여행 기록 조회, 자신만의 여행 지도 제작

![mypage](https://user-images.githubusercontent.com/94509971/194459634-32f375ae-ce96-431c-bb59-ba7201d35523.PNG)

![mypage2](https://user-images.githubusercontent.com/94509971/194459683-633f7701-abda-4791-8be8-bce09f13da0a.png)

4. SNS : 작성한 여행기록 공유 가능하고, 유사한 사용자의 여행 기록도 추천

![배포 피드작성1](https://user-images.githubusercontent.com/94509971/194459715-651780a3-af71-4fff-9b58-743248006098.PNG)



### 추천 알고리즘 소개

---

1. 컨텐츠 기반 필터링 -> 여행지 추천

   - 여행지에 대한 사용자의 주관적 특성(리뷰)에서 `형태소분석`을 통해 keyword를 뽑아내고 이를 정제, 정규화 하는 과정을 거친다.
   - 각 여행지의 특성 벡터를 뽑아내고, 사용자와 여행지 두 벡터간의 코사인 유사도를 측정하고 `User-Item-Matrix`를 채워 추천하는 방식
   - 사용자의 방문기록이 없을 경우(cold start) 생기는 문제를 해결하기 위해 회원가입 시 여행지 설문조사를 바탕으로 사용자의 주관적 특성(keyword)를 설정
   - 여행지의 객관적 특성 데이터(overview)를 바탕으로 모든 여행지 벡터간의 `토사인 유사도`를 측정하여 비슷한 여행지를 추천

2. 협업 필터링 -> SNS 피드 추천

   - sclkit-learn의 `SVD 행렬분해`를 기반으로 잠재 요인 협업 필터링을 구현
   - 사용자가 여행지에 대한 리뷰 작성시 부여한 score를 기반으로 사용자간 `피어슨 상관계수` 측정, 비슷한 user의 피드를 추천

   

### 기획

---

Figma

ERD



### 기술스택

---

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=java&logoColor=white"><img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=aws&logoColor=white">



### 커밋 규칙

---

#### Commit Title

```
[{type}] Update [README.md](http://README.md)` `{jira_issue_num}
```

- Jira Issue Num: `{jira_issue_num}`
- Type: `{type}`
- Subject: `Update README.md`

#### Type

- [feat] : 새로운 기능 추가

- [fix] : 버그 수정

- [docs] : 문서 수정

- [style] : 코드 포맷 변경, 세미콜론 누락, 코드 변경 없음

- [refactor] : 프로덕션 코드 리팩터링

- [test] : 테스트 추가, 테스트 코드 리팩터링, 프로덕션 코드 변경 없음

- [build] : gradle 세팅, 패키지 추가

- [chore] : 빌드 테스크 업데이트, 패키지 매니저 환경설정, 프로덕션 코드 변경 없음

#### Subject

- Subject만 보고도 해당 작업을 판단할 수 있게 작성해준다.

​		ex ) 클라이언트에서 토큰 받아오는 기능 추가

- 길이는 50자 이하로 작성한다.

- 끝에는 마침표를 붙이지 않는다.

- 동사로 끝난다.

#### Jira Issue Num

- 지라에서 자동적으로 정해주는 issue 번호를 사용한다.



### 브랜치 이름 규칙

---

#### release branch

- Jenkins와 연동해서 실제 배포를 하는 브랜치

#### develop branch

- sprint 시작시, 각 개발자들은 develop branch에서 각 feature branch를 만들어 작업한다.

#### feature branch

- fe/be 구분해준다.

- feature/fe/{domain}/{verb}/{JIRA_story_num}

  예시. feature/fe/category/create/{JIRA_story_num}

- 브랜치의 동사는 기본적으로 CRUD를 따른다.

  - 단, 조회 브랜치 끝의 동사는 get으로 고정한다.

- 애매한 경우가 있다면 하단에 새로 추가해주고 팀원에게 알려준다.
