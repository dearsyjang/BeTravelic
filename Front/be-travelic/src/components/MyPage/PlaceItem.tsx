import React from "react";
import { PlaceData } from "./PlaceContainer";
import "../css/MyPageCard.css";
import { Link } from "react-router-dom";

const PlaceItem = ({ item }: { item: PlaceData }) => {
  // const year = item.visited_at?.getFullYear().toString().slice(2, 4);
  // const month = item.visited_at?.getMonth();
  let year;
  let month;
  if (item.visited_at?.includes("2")) {
    year = item.visited_at.slice(0, 4);
    month = item.visited_at.slice(5, 7);
  }
  console.log(year, month);

  // if (item. === 1) {
  //   // const title =
  // } else {
  // }

  return (
    <div className="flex justify-center my-5">
      <Link to={`/place/${item.placeId}`} className="imageContainer">
        <img src={item.image} className="card" />
        <p className="cardTitle">{item.placeName}</p>
        {year && (
          <p className="cardDate">
            {year}년 {month}월의 기록
          </p>
        )}
      </Link>
    </div>
  );
};

export default PlaceItem;
