import { useEffect, useState } from "react";
import axios from "axios";

import { FeedCreate, Feed, UserRecommend } from "../components/index";
import "./css/SNS.css";


function SNS() {

  const [ userId, setUserId ] = useState();
  const accessToken = localStorage.getItem("accessToken");

  // userId GET (spring)
  const getUserId = async() => {
    const response = await axios.get(`http://j7d205.p.ssafy.io:8443/users`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
    )
    console.log('userId', response.data.data.user_id)
    setUserId(response.data.data.user_id)
  }
  useEffect(() => {
    getUserId()
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
            {userId &&
              <Feed
              user_id = {userId}
              />}
          </div>
        </div>
        
        {/* 팔로우 추천 */}
        <div id="UserRecommend">
          { userId && 
            <UserRecommend
            user_id = {userId}
            />
          }
        </div>
      </div>
  );
}

export default SNS;