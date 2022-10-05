import { useEffect, useState } from "react";
import axios from "axios";
import "../css/RecommendList.css";
import RecommendListItem from "./RecommendListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface place {
  recommend_id: number;
  addr: string;
  title: string;
  image: string;
  mapx: string;
  mapy: string;
  place_id: number;
  overview: string;
  score: number;
}
async function getRecommendPlace(userId: any, category: any) {
  let places: place[] = [];
  console.log("userId in RecommendList : " + userId);
  console.log("category in RecommendList");
  console.log(category.category);

  await axios
    .get(
      `http://j7d205.p.ssafy.io:8081/api/v1/place_recommend/${userId}/${category.category}`,
    )
    .then((res) => {
      // console.log(res.data);
      places = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(places);

  return places;
}

function RecommendList(category: any) {
  const [places, setPlaces] = useState<place[]>([]);
  const userId = useSelector((state: RootState) => state.auth.userId);
  useEffect(() => {
    var localplaces: place[] = [];
    (async () => {
      localplaces = await getRecommendPlace(userId, category);
      console.log(localplaces);
      setPlaces(localplaces);
    })();
    console.log("category in RecommendList");
    console.log(category);
    console.log("places");
    console.log(places);
  }, []);
  return (
    <div className='RecommendListCoverContainer'>
      <div>
        {places.map((place) => (
          <div key='{place.recommend_id}'>
            <RecommendListItem
              title={place.title}
              imgUrl={place.image}
              rating={place.score}
              address={place.addr}
              detailInfo={place.overview}
              placeId={place.place_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default RecommendList;
