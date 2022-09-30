import { useEffect, useState } from "react";
import axios from "axios";

import { FeedCreate, Feed, UserRecommend } from "../components/index";
import "./css/SNS.css";


function SNS() {
  const user_id = 1
  const [ feeds, setFeeds ] = useState<Feed[]>([]);

  // Feed GET (django)
  useEffect(() => {
    axios
      .get(`http://j7d205.p.ssafy.io:8081/api/v1/feed_recommend/${user_id}`)
      .then(( { data } ) => {
        console.log(data)
        setFeeds(data)
      })
      .catch((err) => console.log(err))
   }, [])
   

  return (
      <div id="SNS" className="flex flex-row">
        <div className="SNSContainer">
          {/* 피드작성 */}
          <div id="FeedCreate" className="flex flex-col mt-20 mr-10">
            <FeedCreate />
          </div>

          {/* 피드조회 */}
          <div id="Feed" className="flex flex-col mt-10 mr-10">
            {feeds.map((feed, index) => (
              <div
                id="FeedContainer"
                key="{feed.feedid}"
                className="item-center justify-content"
              >
                <Feed
                  key={index}
                  nickname={feed.nickname}
                  contents={feed.contents}
                  created_at={feed.created_at}
                  image_x={feed.image_x}
                  image_y={feed.image_y}
                  place_id={feed.place_id}
                  user_id={feed.user_id}
                  visited_at={feed.visited_at}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* 팔로우 추천 */}
        <div id="UserRecommend">
          <UserRecommend />
        </div>
      </div>
  );
}

export default SNS;