import "../css/UserRecommend.css"
import { Link } from "react-router-dom";

interface UserRecommendItem {
    file_name: string;
    nickname: string;
    real_file_name: string;
    user_id: number;
}

function UserRecommendItem( props: UserRecommendItem ) {
    const { file_name, nickname, real_file_name, user_id } = props
    return(
      <div id="UserRecommendCardItem">
          <p className="flex items-center m-4">
              <div className="inline-flex items-center">
                  <img alt="ProfileImage" src={real_file_name} className="w-8 h-8 rounded-full object-cover object-center" />
                      <Link to={`/mypage/${user_id}`}>
                          <span className="flex-grow flex flex-col pl-3">
                              <span className="title-font font-medium text-gray-900">{nickname}</span>
                          </span>
                      </Link>
              </div>
              
              {/* 팔로우 버튼 */}
              <button id="FollowButton" className="flex ml-auto bg-indigo-500 border-0 py-1 px-2 focus:outline-none rounded">팔로우</button>
          </p>
      </div>
    )
}

export default UserRecommendItem;