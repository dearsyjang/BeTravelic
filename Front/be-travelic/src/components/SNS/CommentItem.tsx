import { useState, useEffect } from 'react'
import axios from 'axios'

import '../css/CommentsModal.css'
import { FiTrash } from 'react-icons/fi'

interface CommentItem {
  commentId: number
  contents: string
  createdAt: string
  userId: number
  review_id: number
}

function CommentItem ( props : CommentItem ) {
  const { review_id, commentId, contents, createdAt, userId } = props

  const [ Id, setId ] = useState();
  const accessToken = localStorage.getItem("accessToken");

  // userId GET (spring)
  const getUserId = async() => {
    console.log(review_id)
    const response = await axios.get(`http://j7d205.p.ssafy.io:8443/users`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
    )
    console.log('Id', response.data.data.user_id)
    setId(response.data.data.user_id)
  }
  useEffect(() => {
    getUserId()
  }, [])

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
  }
  
  return (
    <div id="CommentBody" className="flex items-center ml-5">
      <div id="Comments" className="flex items-center">
        <div className="m-3">
          <div className="inline-flex items-center">
            {/* <img
                  alt=""
                  className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                  src="https://dummyimage.com/103x103"
                />
                <div className="flex-grow">
                  <Link to={`/mypage`}>
                    <h2 className="title-font font-medium ml-3">{nickname} |</h2>
                  </Link>
                </div> */}
            <span id="CommentContent" className="title-font font-medium ml-3">
              {contents}
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