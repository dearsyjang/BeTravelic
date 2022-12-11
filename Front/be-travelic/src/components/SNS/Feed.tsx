import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

import FeedItem from "./FeedItem"
import { djangoAxios } from "../../apis";

interface UserId {
  user_id: number;
}

function Feed( { user_id }: UserId ) {
  const [ feeds, setFeeds ] = useState<FeedItem[]>([]);

  // Feed GET (django)
  const getFeed = async() => {
    console.log('props', user_id)
    const response = await (await axios.get(`http://j7d205.p.ssafy.io:8081/api/v1/feed_recommend/${user_id}`))
    console.log('feed', response.data)
    setFeeds(response.data)
  }

  useEffect(() => {
    getFeed()
  }, [])

 
  return (
    <div id="Feed">
      {feeds.map((feed, index) => (
        <div
          id="FeedContainer"
          key="{feed.review_id}"
          className="item-center justify-content"
        >
          <FeedItem
            key={index}
            contents={feed.contents}
            created_at={feed.created_at}
            file_name={feed.file_name}
            file_name_user={feed.file_name_user}
            nickname={feed.nickname}
            place_id={feed.place_id}
            real_file_name={feed.real_file_name}
            real_file_name_user={feed.real_file_name_user}
            recommend_user_id={feed.recommend_user_id}
            review_id={feed.review_id}
            user_id={feed.user_id}
            visited_at={feed.visited_at}
          />
        </div>
      ))}
    </div>
  );
}

export default Feed;
