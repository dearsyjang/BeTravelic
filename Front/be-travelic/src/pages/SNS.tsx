import { useEffect, useState } from "react";
import { Feed, UserRecommend } from "../components/index";
import "./css/SNS.css";

const FeedData = [
  {
  feedid: 1,
  nickname: '초코',
  place: '포항 영일대',
  date: '2022-01-25',
  likes: 52,
  comments: 8,
  imgUrl: '',
  contents: '바다 보러 왔어요!',
  },
  {
    feedid: 2,
    nickname: '울산주모',
    place: '울산 횟집',
    date: '2022-08-03',
    likes: 124,
    comments: 15,
    imgUrl: '',
    contents: '회 너무 맛있어요!',
  }
]

const contentTypes = [
  {
    typeNum: 12,
    name: "관광지",
    imageUrl: `${process.env.PUBLIC_URL}/icons/palace.png`,
  },
  {
    typeNum: 14,
    name: "박물관",
    imageUrl: `${process.env.PUBLIC_URL}/icons/museum.png`,
  },
  {
    typeNum: 15,
    name: "축제",
    imageUrl: `${process.env.PUBLIC_URL}/icons/festival.png`,
  },
  {
    typeNum: 28,
    name: "레저스포츠",
    imageUrl: `${process.env.PUBLIC_URL}/icons/leisure.png`,
  },
  {
    typeNum: 32,
    name: "숙박",
    imageUrl: `${process.env.PUBLIC_URL}/icons/travel-bag.png`,
  },
  {
    typeNum: 38,
    name: "쇼핑",
    imageUrl: `${process.env.PUBLIC_URL}/icons/shopping.png`,
  },
  {
    typeNum: 39,
    name: "음식점",
    imageUrl: `${process.env.PUBLIC_URL}/icons/restaurant.png`,
  },
];

function SNS() {
  const [contentType, setContentType] = useState(0);

  return (
      // 카테고리 필터 넣기

      <div id="SNS" className="flex flex-row">
        <div className="FeedContainer">
          <div id="Feed" className="flex flex-col mt-20 mr-10">
            {FeedData.map((feed) => (
              <div
                id="FeedContainer"
                key="{feed.feedid}"
                className="item-center justify-content"
              >
                <Feed
                  feedid={feed.feedid}
                  nickname={feed.nickname}
                  date={feed.date}
                  place={feed.place}
                  imgUrl={feed.imgUrl}
                  likes={feed.likes}
                  comments={feed.comments}
                  contents={feed.contents}
                />
              </div>
            ))}
          </div>
        </div>

        <div id="UserRecommend">
          <UserRecommend />
        </div>
      </div>
  );
}

export default SNS;