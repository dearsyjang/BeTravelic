import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


import { DetailInfo, DetailRecommend, MapContainer } from "../components/index";
import "./css/PlaceDetailMain.css";

function PlaceDetailMain() {
  
  const { place_id } = useParams()
  const [ place, setPlace ] = useState<DetailInfo>();

  // 여행지 상세정보 GET (spring)
  const getPlaceDetail = async() => {
    const response = await (await axios.get(`http://j7d205.p.ssafy.io:8443/places/${place_id}`))
    console.log(response.data.data)
    setPlace(response.data.data)
  }
  
  useEffect(() => {
    getPlaceDetail()
  }, [])

  return (
    <div>
      <div>
      {/* 여행지 상세정보 */}
        {place && <DetailInfo
          placeId={place.placeId}
          categories={place.categories}
          region={place.region}
          addr={place.addr}
          title={place.title}
          image={place.image}
          mapx={place.mapx}
          mapy={place.mapy}
          score={place.score}
          content_id={place.content_id}
          overview={place.overview}
        />}
      </div>

      <div className="container px-5 mx-auto">
        <div id="kakaomap">
          {place &&
            <MapContainer 
              mapx={place.mapx}
              mapy={place.mapy}
            />}
        </div>
      </div>
      
      {/* 추천여행지 카드 */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-10">
            <div className="w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900">다른 여행지는 어때요? 😎</h1>
              <hr/>
            </div>
          </div>

          <div id="DetailRecommendContainer">
            {place && <DetailRecommend
              title={place.title}
             />}
          </div>

        </div>
      </section>
    </div>
  )
}

export default PlaceDetailMain