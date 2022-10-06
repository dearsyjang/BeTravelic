import axios from "axios"
import { useEffect, useState } from "react"

import UserRecommendItem from "./UserRecommendItem"
import "../css/UserRecommend.css"

interface UserRecommend {
  user_id: number;
}

function UserRecommend( { user_id } : UserRecommend ) {
  const [ userRecommends, setUserRecommends ] = useState<UserRecommendItem[]>([]);

  // UserRecommend Get (django)
  const getUserRecommend = async() => {
    console.log('사용자추천 props', user_id)
    const response = await (await axios.get(`http://j7d205.p.ssafy.io:8081/api/v1/user_recommend/${user_id}`))
    console.log('userRecommend', response.data)
    setUserRecommends(response.data)
  }

  useEffect(() => {
    getUserRecommend()
  }, [])

  return (
      <div id="UserRecommendCard" className="mt-20 ml-0">
        <div id="UserRecommendCardContainer" className="flex flex-col">
          <div id="UserRecommendCardHeader" className="justify-content-center align-content-center item-center">
                <h2 className="text-center text-gray-900 m-3">다른 사용자 추천 🚀</h2>
            </div>
            <div id="UserRecommendCardBody" key="{user.recommend_user_id}">
              {userRecommends.map((user, index) => (
              <div>
                  <UserRecommendItem
                    key={index}
                    file_name={user.file_name}
                    real_file_name={user.real_file_name}
                    nickname={user.nickname}
                    user_id={user.user_id}
                  />
              </div>
              ))}
            </div>
          </div>
        </div>                    
  )
}

export default UserRecommend