import { Feed, UserRecommend } from "../components/index";
import "./css/SNS.css";

const FeedData = [
  {
  feedid: 1,
  nickname: '초코누나',
  place: '포항 영일대',
  date: '2022-01-25',
  likes: 52,
  comments: 8,
  imgUrl: '',
  contents: '초코랑 바다 보러 왔어요!',
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

function SNS() {
  return (
      <div id="SNS" className="flex flex-row">
        <div className="FeedContainer">
          <div id="Feed" className="flex flex-col mt-20 mr-10">
            {FeedData.map((feed) => (
                <div id="FeedContainer" key='{feed.feedid}' className="item-center justify-content">
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
          <UserRecommend/>
        </div>
      </div>
  )
}

export default SNS;