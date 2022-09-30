import { useEffect, useState } from "react";
import axios from 'axios'

import DetailRecommendItem from "./DetailRecommendItem";
import "../css/PlaceDetail.css"

interface DetailRecommend {
  title: string;
}

function DetailRecommend({ title }: DetailRecommend) {
  const [ recommendplace, setRecommendPlace ] = useState<DetailRecommendItem>();

  useEffect(() => {
    axios
      .get(`http://j7d205.p.ssafy.io:8081/api/v1/another_recommend/${title}`)
      .then(( { data }) => {
        console.log(data)
        setRecommendPlace(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      { recommendplace && <DetailRecommendItem
        place_id={recommendplace.place_id}
        addr={recommendplace.addr}
        score={recommendplace.score}
        mapx={recommendplace.mapx}
        mapy={recommendplace.mapy}
        title={recommendplace.title}
        image={recommendplace.image}
        overview={recommendplace.overview}
       />}
    </div>
  )
}

export default DetailRecommend

