import UserRecommendItem from "./UserRecommendItem"
import "../css/UserRecommend.css"

const UserRecommendData = [
    {
      userid: 1,
      nickname: '혜원'
    },
    {
      userid: 2,
      nickname: '지명'
    },
    {
      userid: 3,
      nickname: '호형'
    },
    {
      userid: 4,
      nickname: '수영'
    },
    {
      userid: 5,
      nickname: '윤해'
    },
    {
      userid: 6,
      nickname: '채현'
    }
  ]


function UserRecommend() {
    return (
        <div id="UserRecommendCard" className="mt-20">
          <div id="UserRecommendCardContainer" className="flex flex-col">
            <div id="UserRecommendCardHeader" className="justify-content-center align-content-center item-center">
                  <h2 className="text-center text-gray-900 m-3">다른 사용자 추천 🚀</h2>
              </div>
              <div>
                {UserRecommendData.map((user) => (
                <div key='{user.userid}'>
                    <UserRecommendItem
                        userid={user.userid}
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