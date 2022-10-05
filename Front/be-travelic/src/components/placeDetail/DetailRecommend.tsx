import { useEffect, useState } from "react";
import axios from 'axios'

import DetailRecommendItem from "./DetailRecommendItem";
import "../css/DetailRecommend.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface DetailRecommend {
  title: string;
}

function DetailRecommend({ title }: DetailRecommend) {
  const [ recommendplaces, setRecommendPlace ] = useState<DetailRecommendItem[]>([]);

  // 추천 여행지 GET (django)
  const getRecommendPlace = async() => {
    const response = await (await axios.get(`http://j7d205.p.ssafy.io:8081/api/v1/another_recommend/${title}`))

    // console.log(response.data) => 데이터 임의로 자름
    var data = response.data.slice(0, 30)
    console.log(data)
    setRecommendPlace(data)
  }

  useEffect(() => {
    getRecommendPlace()
  }, [])

  // 캐러셀 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div>
        <Slider {...settings}>
          {recommendplaces.map((recommendplace, index) => (
            <div key="{recommendplace.recommend_id}">
              <DetailRecommendItem
                key={index}
                place_id={recommendplace.place_id}
                addr={recommendplace.addr}
                score={recommendplace.score}
                mapx={recommendplace.mapx}
                mapy={recommendplace.mapy}
                title={recommendplace.title}
                image={recommendplace.image}
                overview={recommendplace.overview}
              />
            </div>
          ))}
        </Slider>
    </div>
  );
}

export default DetailRecommend

