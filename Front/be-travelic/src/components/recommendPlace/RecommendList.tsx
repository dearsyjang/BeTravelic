import { useEffect } from "react";
import "../css/RecommendList.css";
import RecommendListItem from "./RecommendListItem";

const dummyData = [
  {
    placeId: 101,
    title: "관광지 이름1",
    imgUrl: "관광지 이미지 URL",
    rating: 5,
    address: "관광지 주소1",
    detailInfo: "관광지 상세정보1",
  },
  {
    placeId: 102,
    title: "관광지 이름2",
    imgUrl: "관광지 이미지 URL",
    rating: 2,
    address: "관광지 주소2",
    detailInfo: "관광지 상세정보2",
  },
  {
    placeId: 103,
    title: "관광지 이름3",
    imgUrl: "관광지 이미지 URL",
    rating: 5,
    address: "관광지 주소3",
    detailInfo: "관광지 상세정보3",
  },
  {
    placeId: 104,
    title: "관광지 이름4",
    imgUrl: "관광지 이미지 URL",
    rating: 4,
    address: "관광지 주소4",
    detailInfo: "관광지 상세정보4",
  },
  {
    placeId: 105,
    title: "관광지 이름5",
    imgUrl: "관광지 이미지 URL",
    rating: 3,
    address: "관광지 주소5",
    detailInfo: "관광지 상세정보5",
  },
];

function RecommendList() {
  return (
    <div>
      <div>
        {dummyData.map((place) => (
          <div key='{place.placeId}'>
            <RecommendListItem
              title={place.title}
              imgUrl={place.imgUrl}
              rating={place.rating}
              address={place.address}
              detailInfo={place.detailInfo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default RecommendList;
