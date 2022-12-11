# 여행이 체질 Be Travelic 🚋

## 목차
- [기획배경](#기획배경)
- [프로젝트 소개](#프로젝트-소개)
- [프로젝트 기간](#프로젝트-기간)
- [주요 자료](#주요-자료)
- [팀원 소개](#팀원-소개)
- [설치](#설치)
- [추천 알고리즘](#추천-알고리즘)
- [ERD](#erd)
- [기능 소개](#기능-소개)
- [시스템 아키텍처](#시스템-아키텍처)
- [기술 스택](#기술-스택)
- [폴더 구조](#폴더-구조)

## 기획배경

- 포스트 코로나 시대로 여행 수요 증가
- 여행은 가고싶지만 어디로 가야될지 모르겠는 사용자를 위한 여행지 추천
- 여행 계획 수립에 어려움을 느끼는 사람들이 많음
- 자신의 여행 기록을 정리하고 공유하는 사람들이 많음
- 여행지, 레저, 축제 등 여행지 정보를 따로 찾아야 하는 번거로움이 있음

## 프로젝트 소개

- 빅데이터 기반 사용자 맞춤 여행지 및 SNS 여행 게시물 추천받고 여행 기록을 공유와 나만의 국내 여행 지도를 만들 수 있는 웹 서비스
- 회원가입 시 설문조사를 통해 사용자 여행 성향과 정보를 입력받아 여행지 추천을 진행할 수 있도록 했습니다. 추천 받은 여행지를 방문한 후 여행 후기를 남길 수 있는데, 이를 이용해서 자신만의 여행 지도를 제작할 수 있습니다. 그리고 다른 사용자들이 남긴 여행 기록들을 추천 받아 또 다른 여행 계획을 세울 수 있도록 합니다.

## 프로젝트 기간

- SSAFY 특화 프로젝트 2022.08.22 ~ 2022.10.07 (7주)

## 주요 자료
- [NOTION🖋️](https://eager-botany-6f9.notion.site/Be-Travelic-8523ef3826f247169c90ed440ac4bb60)
- [FIGMA🎨](https://www.figma.com/file/qY2oHdTcgF620YlvJBrGx8/D205?node-id=0%3A1&t=tugyfb4lDwIvwTFF-1)
- [UCC🎥](https://youtu.be/Ednd9VuJLZ4)

## 팀원 소개

|   이름   |     [정윤해](https://github.com/JEONGYOONHAE)         |     [강지명](https://github.com/rainbow77777)     |     [조호형](https://github.com/johoh0)     |     [신혜원](https://github.com/HeyWonee)     |     [임채현](https://github.com/dlacogus5239)     |     [장수영](https://github.com/dearsyjang)     |
| :------------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: |
|  포지션  |                 Team Leader<br/>Back-end                 |         Data          |         Back-end          |            Front-end Leader<br/>UI/UX            | Front-end<br/>UI/UX<br/>CI/CD | Front-end<br/>UI/UX |

## 설치

서비스를 사용하기 위해서는 다음과 같은 방법으로 실행합니다.<br/>
레포지토리를 clone 받습니다.

**[ BACK-END ]**

1. 백엔드를 실행합니다.

```java
run application
```

**[ DATA ]**

1. 추천 데이터를 실행합니다.
```python
python manage.py runserver
```

**[ FRONT-END ]**

1. pacakge.json에 정의된 패키지 및 모듈을 설치합니다.
```jsx
npm install
```
2. 설치 완료 후, 프론트엔드를 실행합니다.
```jsx
npm run 
```

## 추천 알고리즘

### [컨텐츠 기반 필터링] 여행지 추천

   - 여행지에 대한 사용자의 주관적 특성(리뷰)에서 `형태소분석`을 통해 keyword를 뽑아내고 이를 정제, 정규화 하는 과정을 거친다.
   - 각 여행지의 특성 벡터를 뽑아내고, 사용자와 여행지 두 벡터간의 코사인 유사도를 측정하고 `User-Item-Matrix`를 채워 추천하는 방식
   - 사용자의 방문기록이 없을 경우(cold start) 생기는 문제를 해결하기 위해 회원가입 시 여행지 설문조사를 바탕으로 사용자의 주관적 특성(keyword)를 설정
   - 여행지의 객관적 특성 데이터(overview)를 바탕으로 모든 여행지 벡터간의 `토사인 유사도`를 측정하여 비슷한 여행지를 추천

### [협업 필터링] SNS 피드 추천

   - sclkit-learn의 `SVD 행렬분해`를 기반으로 잠재 요인 협업 필터링을 구현
   - 사용자가 여행지에 대한 리뷰 작성시 부여한 score를 기반으로 사용자간 `피어슨 상관계수` 측정, 비슷한 user의 피드를 추천
   
## ERD
<img width="800" alt="erd" src="https://user-images.githubusercontent.com/97591083/206901123-4ac61e10-c72b-4dae-9ca0-58209a2db453.png">

   
## 기능 소개

| 구분                             | 기능                           | 설명                                    |
| ---------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------- |
| 회원                             | 회원가입<br/>설문조사<br/>로그인 & 로그아웃 | - id, pw, nickname 작성을 통한 회원관리 <br/> - 선호하는 사진을 고르며 선호하는 여행 스타일 조사  |
| 마이페이지 | 사용자 기본정보<br/> 사용자 여행지도 |- 프로필 사진 등록 및 팔로워, 팔로잉, 여행기록 수, 여행 스타일 조회 <br/> - 나만의 여행 사진으로 시,도 별 여행 지도 커스텀 <br/> - 지도에서 지역 선택 시, 해당 지역별 여행 기록 및 찜한 여행지 조회  |
| 여행지 추천                          | 사용자 맞춤 여행지 추천                   | - 추천 여행지 카카오맵 클러스터 & 마커 <br/> - 추천 여행지 지역별 카테고리화|
| 여행지 조회                      | 추천 여행지 상세 정보 <br/> 비슷한 추천 여행지                       | - 여행지 주소, 소개 등 기본정보 조회 <br/> - 해당 여행지 카카오맵 마커 및 지도 표시<br/> - 해당 여행지와 비슷한 여행지 추천   |
| 여행지 조회                      | 추가 기능                       | - 반응형 웹페이지 <br/> - 카카오톡 공유하기 <br/> - 해당 여행지 찜   |
| SNS | 여행기록 작성 <br/> 다른 사용자 여행기록 조회 <br/> 팔로우할 만한 다른 사용자 |- 지역&여행지, 방문날짜, 여행지 평가 별점, 여행사진, 여행기록 작성 <br/> - 사용자 맞춤 다른 사용자의 여행기록 추천 <br/> - 여행 스타일이 비슷한 다른 사용자 계정 추천 <br/> - 클릭시 해당 사용자 마이페이지 방문 |

### 💙회원
#### 회원가입 및 로그인
<img width="800" src="https://user-images.githubusercontent.com/94509971/194459308-11885d97-b489-4d55-bde9-d42ca2887fb9.JPG">
<img width="800" src="https://user-images.githubusercontent.com/94509971/194459332-13bfd756-9b1f-49e1-a368-520b9423ddbc.JPG">

#### 설문조사
<img width="800" src="https://user-images.githubusercontent.com/94509971/194459358-a4417a93-882d-499f-bd9d-4db3c3a38a5b.png">

### 💙마이페이지

<img width="800" src="https://user-images.githubusercontent.com/94509971/194459634-32f375ae-ce96-431c-bb59-ba7201d35523.PNG">
<img width="800" src="https://user-images.githubusercontent.com/97591083/206900633-5c2dfeb1-b54c-4eb5-8430-a5bbe2ed32e4.gif">

#### 나만의 여행지도
<img width="500" src="https://user-images.githubusercontent.com/94509971/194459683-633f7701-abda-4791-8be8-bce09f13da0a.png">


### 💙여행지 추천: 컨텐츠 기반 필터링을 이용한 사용자 맞춤 여행지 추천
<img width="800" src="https://user-images.githubusercontent.com/94509971/194459436-6e2c6ddc-10d3-4983-88cb-2ada746e5c99.png">

### 💙여행지 상세
<img width="800" alt="여행지 상세2" src="https://user-images.githubusercontent.com/94509971/194459470-2422d6cd-0ac0-4633-acc4-ce7465dfad09.png">
<img width="800" alt="여행지 상세" src="https://user-images.githubusercontent.com/94509971/194459530-3a875083-07db-4e50-91fc-b7421c9addae.png">

#### 반응형 페이지
<div>
<img width="350" alt="상세페이지 반응형" src="https://user-images.githubusercontent.com/94509971/194459584-ac1f7540-a1e0-441a-9c21-b110ff4f217b.png">
<img width="350" src="https://user-images.githubusercontent.com/94509971/194459603-fa2e52ce-9d30-4b92-aa4c-6b1dc80a6b44.png">
</div>

### 💙여행 기록 SNS
<img width="800" src="https://user-images.githubusercontent.com/94509971/194459715-651780a3-af71-4fff-9b58-743248006098.PNG">


## ERD
<img width="800" src="https://user-images.githubusercontent.com/97591083/206901004-1702f1e4-5e57-4914-b08c-7dc48a2b236a.png">

## 시스템 아키텍처
<img width="800" alt="image" src="https://user-images.githubusercontent.com/97591083/206901568-60949f9b-3c18-4e22-abdd-550291ad45ec.png">

## 기술 스택
<img width="800" alt="image" src="https://user-images.githubusercontent.com/97591083/206901467-dd61c6b1-3ab2-47c7-9385-a4c924c888bb.png">

**[ FRONT-END ]**

- **React**
- **TypeScript**
- D3
- Kakao Map
- Tailwind CSS

**[ BACK-END ]**

- **Spring Boot**
- **Java**
- **Django** 
- **Python**
- JPA
- MySQL
- Google Cloud Storage Cloud

**[ CI/CD ]**
- **Docker**
- **Jenkins**

## 폴더 구조
**[ FRONT ]**
```markdown
📁 be-travelic
├── 📁ngnix
├── 📁public
├── 📁src
│ ├── 📁apis          # Axios 데이터 통신
│   ├── 📄auth.ts
│   ├── 📄index.ts
│   └── 📄mypage.ts
│ ├── 📁assets
│   ├── 📁geojson
│   ├── 📁image
│   └── 📁video
│ ├── 📁components
│   ├── 📁MyPage
│     ├──📄CloseButton.ts
│     ├──📄FrequentPlace.tsx
│     ├──📄MyMap.tsx
│     ├──📄MyPageCard.tsx
│     ├──📄PhotoInputModal.tsx
│     ├──📄PlaceContainer.tsx
│     ├──📄PlaceItem.tsx
│     ├──📄TripStyle.tsx
│     ├──📄UploadPhoto.tsx
│     └──📄UserInfo.tsx
│   ├── 📁OnBoard
│     ├──📄OnBoardMain.tsx
│     └──📄SignUpForm.tsx
│   ├── 📁SNS
│     ├──📄CommentItem.tsx
│     ├──📄Comments.tsx
│     ├──📄Feed.tsx
│     ├──📄FeedCreate.tsx
│     ├──📄FeedDate.tsx
│     ├──📄FeedItem.tsx
│     ├──📄FeedPhoto.tsx
│     ├──📄FeedPlace.tsx
│     ├──📄Like.tsx
│     ├──📄UserRecommend.tsx
│     └──📄UserRecommendItem.tsx
│   ├── 📁Survey
│     ├──📄ProgressBar.tsx
│     ├──📄SurveyData.js
│     └──📄SurveyPhotos.tsx
│   ├── 📁common
│     ├──📄FollowModal.tsx
│     ├──📄KakaoShare.tsx
│     └──📄ProtectedRoute.tsx
│   ├── 📁css
│     ├──📄CommentsModal.css
│     ├──📄DetailRecommend.css
│     ├──📄Feed.css
│     ├──📄FeedCreate.css
│     ├──📄FeedDate.css
│     ├──📄FeedPhoto.css
│     ├──📄FeedPlace.css
│     ├──📄KakaoShare.css
│     ├──📄MyMap.css
│     ├──📄MyPageCard.css
│     ├──📄PhotoInputModal.css
│     ├──📄PlaceDetail.css
│     ├──📄RecommendList.css
│     ├──📄SurveyPhotos.css
│     ├──📄Transition.css
│     ├──📄UploadPhoto.css
│     └──📄UserRecommend.css
│   ├── 📁placeDetail
│     ├──📄Bookmark.tsx
│     ├──📄DetailInfo.tsx
│     ├──📄DetailRecommend.tsx
│     ├──📄DetailRecommendItem.tsx
│     └──📄MapContainer.tsx
│   ├── 📁recommendPlace
│     ├──📄BookmarkList.tsx
│     ├──📄RecommendList.tsx
│     └──📄RecommendListItem.tsx
│ ├── 📁pages
│   ├── 📁css
│     ├── 📄OnBoard.css
│     ├── 📄PlaceDetailMain.css
│     ├── 📄RecommendPlaceMain.css
│     ├── 📄SNS.css
│     └── 📄Survey.css
│   ├── 📄MyPage.tsx
│   ├── 📄OnBoard.tsx
│   ├── 📄PlaceDetailMain.tsx
│   ├── 📄RecommendPlaceMain.tsx
│   ├── 📄SNS.tsx
│   ├── 📄Survey.tsx
│   └── 📄index.js
│ ├── 📁store
│   ├── 📄auth.ts
│   └── 📄index.ts
│ ├── 📄App.css
│ ├── 📄App.tsx
│ ├── 📄index.css
│ ├── 📄index.tsx
│ └── 📄react-app-env.d.ts
├── 📄.dockerignore
├── 📄.gitignore
├── 📄Dockerfile
├── 📄package-lock.json
├── 📄package.json
├── 📄postcss.config.js
├── 📄tailwind.config.js
└── 📄tsconfig.json
```

**[ DATA ]**
```markdown
📁 backend
├── 📁backend
│ ├── 📄__init__.py
│ ├── 📄asgi.py
│ ├── 📄settings.py
│ ├── 📄urls.py
│ └── 📄wsgi.py
├── 📁recommend
│ ├── 📁migrations
│   ├── 📄0001_initial.py
│   └── 📄__init__.py
│ ├── 📁recommendAlgo
│   └── 📄test.py
│ ├── 📁serializers
│   ├── 📄place.py
│   ├── 📄recommendplace.py
│   ├── 📄recommenduser.py
│   ├── 📄review.py
│   └── 📄user.py
├── 📄dockerfile
├── 📄manage.py
├── 📄my_settings.py
└── 📄requirements.txt
```

**[ BACK ]**
```markdown
📁 Back
├── 📁demo
├── 📁gradle/wrapper
├── 📁src
│ ├── 📁main
│   ├── 📁java/beTravelic/demo
│     ├── 📁domain
│       ├── 📁controller
│         ├── 📄BookmarkController.java
│         ├── 📄CommentController.java
│         ├── 📄FollowController.java
│         ├── 📄MypagePictureController.java
│         ├── 📄PlaceController.java
│         ├── 📄ReviewController.java
│         ├── 📄SurveyController.java
│         └── 📄UserController.java
│       ├── 📁dto
│         ├── 📄BookmarkResDto.java
│         ├── 📄BookmarkSaveRequestDto.java
│         ├── 📄CommentResDto.java
│         ├── 📄CommentSaveRequestDto.java
│         ├── 📄CommentSaveResponseDto.java
│         ├── 📄CommentUpdateRequestDto.java
│         ├── 📄CommentUpdateResponseDto.java
│         ├── 📄FollowSaveRequestDto.java
│         ├── 📄FollowSaveResponseDto.java
│         ├── 📄FollowerListResponseDto.java
│         ├── 📄FollowingListResponseDto.java
│         ├── 📄GetAccessTokenResponseDto.java
│         ├── 📄GetUserRegionReqDto.java
│         ├── 📄LoginRequestDto.java
│         ├── 📄LoginResponseDto.java
│         ├── 📄MypagePictureResponseDto.java
│         ├── 📄MypagePictureViewDto.java
│         ├── 📄MypageUpdateResponseDto.java
│         ├── 📄MypicturesViewResponseDto.java
│         ├── 📄PictureDto.java
│         ├── 📄PlaceResponseDto.java
│         ├── 📄PlacesByRegionDto.java
│         ├── 📄ProfileSaveRequestDto.java
│         ├── 📄ProfileSaveResponseDto.java
│         ├── 📄ReviewLikeReqDto.java
│         ├── 📄ReviewLikeResDto.java
│         ├── 📄ReviewReqDto.java
│         ├── 📄ReviewResDto.java
│         ├── 📄SignUpRequestDto.java
│         ├── 📄SignupResponseDto.java
│         ├── 📄SurveyCategoryDto.java
│         ├── 📄SurveyKeywordDto.java
│         ├── 📄SurveySaveRequestDto.java
│         ├── 📄SurveySaveResponseDto.java
│         ├── 📄UpdateUserResponseDto.java
│         ├── 📄UserInfoResponseDto.java
│         └── 📄isExistResponseDto.java
│       ├── 📁entity
│         ├── 📄Authority.java
│         ├── 📄Bookmark.java
│         ├── 📄Categories.java
│         ├── 📄Comment.java
│         ├── 📄Follow.java
│         ├── 📄MypagePicture.java
│         ├── 📄Picture.java
│         ├── 📄Place.java
│         ├── 📄Region.java
│         ├── 📄Review.java
│         ├── 📄ReviewLike.java
│         ├── 📄Survey.java
│         ├── 📄SurveyCategory.java
│         ├── 📄SurveyKeyword.java
│         ├── 📄User.java
│         └── 📄UserPlace.java
│       ├── 📁exception
│         ├── 📄DuplicatedIdException.java
│         ├── 📄DuplicatedNickNameException.java
│         ├── 📄NoExistPlaceException.java
│         ├── 📄NoExistUserException.java
│         └── 📄NoPermissionUserInfoException.java
│       ├── 📁repository
│         ├── 📄BookmarkRepository.java
│         ├── 📄CommentRepository.java
│         ├── 📄FollowRepository.java
│         ├── 📄MypagePictureRepository.java
│         ├── 📄PictureRepository.java
│         ├── 📄PlaceKeywordsRepository.java
│         ├── 📄PlaceRepository.java
│         ├── 📄RegionRepository.java
│         ├── 📄ReviewLikeRepository.java
│         ├── 📄ReviewRepository.java
│         ├── 📄SurveyCategoryRepository.java
│         ├── 📄SurveyKeywordRepository.java
│         ├── 📄SurveyRepository.java
│         ├── 📄UserPlaceRepositrory.java
│         └── 📄UserRepository.java
│       └── 📁service
│         ├── 📄BookmarkService.java
│         ├── 📄CommentService.java
│         ├── 📄FollowService.java
│         ├── 📄MypageService.java
│         ├── 📄PictureService.java
│         ├── 📄PlaceService.java
│         ├── 📄ReviewService.java
│         ├── 📄SnsService.java
│         ├── 📄SurveyService.java
│         └── 📄UserService.java
│     ├── 📁global
│     └── 📄DemoApplication.java
├── 📄.gitignore
├── 📄build.gradle
├── 📄dockerfile
├── 📄gradle.bat
└── 📄settings.gradle
```
