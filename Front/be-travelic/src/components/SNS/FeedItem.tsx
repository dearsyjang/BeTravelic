import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import Comments from "./Comments"
import Like from "./Like";

import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa'
import "../css/Feed.css"

interface FeedItem {
  contents: string
  created_at: string
  file_name: string
  file_name_user: string
  nickname: string
  place_id: number
  real_file_name: string
  real_file_name_user: string
  recommend_user_id: number
  review_id: number
  user_id: number
  visited_at: string
}

function FeedItem( props: FeedItem ) {
  const { contents, file_name, file_name_user, real_file_name, real_file_name_user, nickname, visited_at, user_id, review_id } = props

  // 모달창
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div id="FeedCard" className="mb-10">
      {/* 게시글 피드 */}
      <div id="FeedCardHeader">
        <div className="flex items-center m-5">
          <img
            alt=""
            className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
            src={real_file_name_user}
          />
          <div className="flex-grow">
            <Link to={`/mypage/${user_id}`}>
              <h2 className="title-font font-medium ml-3">{nickname}</h2>
            </Link>
          </div>

          {/* 장소 => 데이터 없음 */}
          {/* <FaMapMarkerAlt id="MarkIcon" />
          <h2 className="ml-1 mr-5">장소</h2> */}

          <FaRegCalendarAlt id="CalendarIcon" />
          <h2 className="ml-1 mr-3">{visited_at.slice(0, 10)}</h2>
        </div>
      </div>

      <div id="FeedCardBody">
        <div id="FeedImageContainer" className="items-center">
          <img id="FeedImage" className="" alt="SNSimage" src={real_file_name} />
          {/* 좋아요 버튼 */}
        <div id="FeedButton" className="flex ml-2">
          <Like
            review_id={review_id} />
        </div>
        </div>

        <div>

        </div>
        

        <div id="FeedContent">
          <p className="leading-relaxed w-full ml-7 m-3">{contents}</p>
        </div>
        <div>
          <Comments
            review_id={review_id} />
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
