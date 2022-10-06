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
    // var data = response.data.slice(0, 30)
    console.log(response.data)
    setRecommendPlace(response.data)
  }

  useEffect(() => {
    getRecommendPlace()
  }, [])

  // 캐러셀 설정 설정
  const settings = {
    dots: true,
    infinite: true, // 무한 스와이프
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySilde: 15000, // 자동 슬라이드 시, 한 슬라이드에서 머무르는 시간
    pauseOnHover: true,
    responsive: [ // 반응형
      {
          breakpoint: 1440,
          settings: {
              slidesToShow: 5,
              slidesToScroll: 5
          }
      },
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 4,
              slidesToScroll: 4
          }
      },
      {
          breakpoint: 720,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      },
      {
          breakpoint: 320,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
  ]
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

