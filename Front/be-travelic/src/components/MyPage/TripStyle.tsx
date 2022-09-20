import React, { useState } from "react";
import emptyHeart from "../../assets/image/empty-heart.png";

const TripStyle = () => {
  const [tags, setTags] = useState<string[]>(["활동적", "축제"]);

  const tagList = tags.map((tag) => {
    return (<div className="mx-1">#{tag}</div>)
  });

  return (
    <div className="border border-blue-200 m-5 rounded-2xl pt-2 px-3 pb-5">
      <div className="flex flex-col my-5">
        <div className="flex mx-2">
          <img src={emptyHeart} alt="" className="w-5 mx-2" />
          나의 여행 스타일
        </div>
        <div className="flex">
          <div className="flex mt-5 mx-2">{tagList} </div>
        </div>
      </div>
    </div>
  );
};

export default TripStyle;
