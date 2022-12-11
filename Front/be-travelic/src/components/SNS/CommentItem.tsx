import { useState, useLayoutEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

import { getMemberId } from "../../apis/auth";
import '../css/CommentsModal.css'
import { FiTrash } from 'react-icons/fi'

interface CommentItem {
  commentId: number
  contents: string
  createdAt: string
  userId: number
  review_id: number
  nickname: string
}

function CommentItem ( props : CommentItem ) {
  const { review_id, nickname, commentId, contents, createdAt, userId } = props

  const [ Id, setUserId ] = useState();
  const accessToken = localStorage.getItem("accessToken");

  // // userId GET (spring)
  // const getUserId = async() => {
  //   console.log(review_id)
  //   const response = await axios.get(`http://j7d205.p.ssafy.io:8443/users`,
  //   {
  //     headers: {
  //       Authorization: `${accessToken}`,
  //     },
  //   }
  //   )
  //   console.log('Id', response.data.data.user_id)
  //   setId(response.data.data.user_id)
  // }
  // useEffect(() => {
  //   getUserId()
  // }, [])

    // userId GET
    useLayoutEffect(() => {
      const getId = async () => {
        const user_id = await getMemberId();
        setUserId(user_id);
      };
      getId();
    }, []);
    

  // 댓글 DELETE (spring)
  const deleteComment = async() => {
    console.log(commentId)
    const response  = await axios.delete(`http://j7d205.p.ssafy.io:8443/feed/travel-review/comment/${commentId}`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
    )
    console.log(response)
    window.location.reload()
  }
  
  return (
    <div id="CommentBody" className="flex items-center ml-5">
      <div id="Comments" className="flex items-center">
        <div className="m-3">
          <div className="inline-flex items-center">
                <div className="flex-grow">
                  <Link to={`/mypage`}>
                    <h2 className="title-font font-bold">{nickname}</h2>
                  </Link>
                </div>
            <span id="CommentContent" className="title-font font-medium ml-2">
              | {contents}
            </span>
          </div>
        </div>
      </div>
      <button onClick={deleteComment}>
        { userId === Id ? (
          <FiTrash/>  ) : null
        }
        </button>
    </div>
  );
}

export default CommentItem