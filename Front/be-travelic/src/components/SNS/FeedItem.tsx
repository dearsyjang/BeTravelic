import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import CommentsModal from "./CommentsModal"
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

          {/* 장소 표시하려 했으나, 데이터 없어서 빼겠습니다 */}
          {/* <FaMapMarkerAlt id="MarkIcon" />
          <h2 className="ml-1 mr-5">장소</h2> */}

          <FaRegCalendarAlt id="CalendarIcon" />
          <h2 className="ml-1 mr-3">{visited_at}</h2>
        </div>
      </div>

      <div id="FeedCardBody">
        <div id="FeedImageContainer">
          <img id="FeedImage" className="" alt="SNSimage" src={real_file_name} />
        </div>

        {/* 좋아요 버튼 => 수정 예정 */}
        <div id="FeedButton" className="flex">
          <Like 
          review_id = {review_id}/>
          <p className="mt-2"></p>

          {/* 댓글 버튼 */}
          <div>
            <button
              onClick={openModal}
              className="rounded-full ml-3 w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </button>

            <CommentsModal
              open={modalOpen}
              close={closeModal}
              review_id={review_id}/>
          </div>
        </div>

        <div id="FeedContent" className="w-full m-3 mb-5">
          <p className="leading-relaxed">{contents}</p>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
