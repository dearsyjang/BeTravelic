import axios from "axios";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "../../apis/mypage"

import "../css/PlaceDetail.css"
import Bookmark from "./Bookmark"

interface DetailInfo {
  placeId: number;
  categories: number;
  region: number;
  addr: string;
  title: string;
  image: string;
  mapx: string;
  mapy: string;
  score: number;
  content_id: number;
  overview: string;
}

function DetailInfo( props: DetailInfo) {

  const { region, placeId, addr, title, image, score, overview } = props  
  const [ like, setLike ] = useState(false)
  const accessToken = localStorage.getItem("accessToken");
  // 북마크 조회 GET (spring)

  // 북마크 설정 POST (spring)
  const postLike = async() => {
    console.log(placeId)
    console.log(region)
    console.log(accessToken)
    console.log({accessToken})
    const response = await axios.post(`http://j7d205.p.ssafy.io:8443/bookmark/`,
    {},
    {
      headers: {
        Authorization: `${accessToken}`,
      },
      params: {
        place_id: placeId,
        region_id: region
      },
    }
    )
    console.log(response)
    setLike(!like)
  } 
  

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div id="placeDetailInfoCard">
          <div id="placeDetailInfo">
            <div className="lg:w-full mx-auto flex flex-wrap lg:pl-2">
              <img
                id="placeImage"
                alt="placeImage"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:pr-2 lg:py-6 mt-6 lg:mt-0">
                <div className="flex">
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {title}
                  </h1>

                  {/* 북마크 버튼 */}
                  <Bookmark
                    like={like}
                    onClick={postLike}
                  />
                </div>                  
                <hr />
                <h3 className="text-gray-900 text-xl title-font font-medium m-1 m">{addr}</h3>

                {/* 별점과 리뷰 */}
                <div className="flex m-1">
                  {(function () {
                    let stars = [];
                    for (let i = 0; i < score; i++) {
                      stars.push(<span>⭐</span>);
                    }
                    return stars;
                  })()}
                  <p>({score})</p>
                </div>

                <p className="leading-relaxed text-lg m-1 mt-5">{overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailInfo