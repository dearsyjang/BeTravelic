import React, { useState } from "react";
import bus from "../../assets/image/bus.png";

const FrequentPlace = () => {
  const [places, setPlaces] = useState<string[]>([
    "경상북도 경주시",
    "대구광역시",
    "제주도",
  ]);

  const placeList = places.map((place) => {
    return (
      <div className="mt-2">
          {places.indexOf(place) + 1}위. {place}
      </div>
    );
  });

  return (
    <div className="border border-blue-200 mx-5 rounded-2xl pt-1 px-3">
      <div className="flex flex-col my-5">
        <div className="flex mx-2">
          <img src={bus} alt="" className="w-5 mx-2" />
          자주 방문한 여행지
        </div>
        <div className="flex">
          <div className="flex-col mx-2 mt-5">{placeList} </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentPlace;
