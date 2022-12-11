import axios from "axios";
import { useState, useEffect } from "react";

interface Like {
  review_id: number;
}

function Like( props: Like ) {
  const { review_id } = props
  const [ like, setlike ] = useState(false)
  const accessToken = localStorage.getItem("accessToken");

  // 좋아요 state 조회 GET (spring) => state가 필요한데, 데이터에 없습니다.
  useEffect(() => {
    const getLike = async() => {
      console.log(review_id)
      const response = await axios.get(`http://j7d205.p.ssafy.io:8443/like/${review_id}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
      )
      if (response.data === 'true') setlike(true)
      console.log('like', response.data)
    }
    getLike()
  },[])

  // 좋아요 설정 POST (spring)
  const postLike = async() => {
    console.log('현재상태', like)
    console.log(review_id)
    console.log(accessToken)
    const response = await axios.post(`http://j7d205.p.ssafy.io:8443/feed/like`,
    {},
    {
      headers: {
        Authorization: `${accessToken}`,
      },
      params: {
        review_id: review_id
      },
    }
    )
    console.log(response)
    setlike(!like)
  }

  return (
    <div>
      <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-2" onClick={postLike}>
      {like ? (
        <svg
          fill="red"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
        </svg>
      ) : (
        <svg
          fill="white"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
        </svg>
      )}
    </button>
    </div>
  );
}

export default Like