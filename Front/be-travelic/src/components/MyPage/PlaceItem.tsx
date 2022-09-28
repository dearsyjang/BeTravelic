import React from "react";
import { PlaceData } from "./PlaceContainer";
import "../css/MyPageCard.css";
import { Link } from "react-router-dom";

const PlaceItem = ({ item }: { item: PlaceData }) => {
  const year = item.visitedDate?.getFullYear().toString().slice(2, 4);
  const month = item.visitedDate?.getMonth();

  return (
    <div className="flex justify-center my-5">
      <Link to={`/place/${item.id}`} className="imageContainer">
        <img src={item.imageUrl} className="card" />
        <p className="cardTitle">{item.title}</p>
        <p className="cardDate">
          {year}년 {month}월의 기록
        </p>
      </Link>
    </div>
  );
};

export default PlaceItem;
