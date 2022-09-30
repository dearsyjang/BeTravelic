import axios from "axios"
import { useEffect, useState } from "react"

import UserRecommendItem from "./UserRecommendItem"
import "../css/UserRecommend.css"

interface UserRecommend {
  recommmend_user_id: number;
  nickname: string;
  image: string;
  user_id: number;
}

function UserRecommend() {
  const user_id = 1
  const [ userRecommends, setUserRecommends ] = useState<UserRecommend[]>([]);

  // UserRecommend GET
  useEffect(() => {
    axios
      .get(`http://j7d205.p.ssafy.io:8081/api/v1/user_recommend/${user_id}`)
      .then(({data}) => {
        console.log(data)
        setUserRecommends(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
      <div id="UserRecommendCard" className="mt-20">
        <div id="UserRecommendCardContainer" className="flex flex-col">
          <div id="UserRecommendCardHeader" className="justify-content-center align-content-center item-center">
                <h2 className="text-center text-gray-900 m-3">다른 사용자 추천 🚀</h2>
            </div>
            <div id="UserRecommendCardBody">
              {userRecommends.map((user, index) => (
              <div>
                  <UserRecommendItem
                    key={index}
                    user_id={user.user_id}
                    image={user.image}
                    nickname={user.nickname}
                  />
              </div>
              ))}
            </div>
          </div>
        </div>                    
  )
}

export default UserRecommend