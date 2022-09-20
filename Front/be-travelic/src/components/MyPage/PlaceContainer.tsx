import React, { useState } from "react";
import PlaceItemList from "./PlaceItemList";
import "../css/MyPageCard.css";

export interface placeData {
  id: number;
  imageUrl: string;
  title: string;
  visitedDate?: Date;
  isBookMarked?: boolean;
}

const dummyData: Array<placeData> = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/200/300",
    title: "랜덤사진",
    visitedDate: new Date("2022-09-20"),
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/200/300",
    title: "사진",
    visitedDate: new Date("2021-04-01"),
  },
  {
    id: 3,
    imageUrl: "https://loremflickr.com/320/240",
    title: "랜덤",
    visitedDate: new Date("2021-03-02"),
  },
  {
    id: 4,
    imageUrl: "https://loremflickr.com/320/240",
    title: "랜덤",
    visitedDate: new Date("2021-01-02"),
  },
];

const PlaceContainer = () => {
  const [openTab, setOpenTab] = useState(1);

  const changeTabHandler = () => {
    setOpenTab((prev) => (prev + 1) % 2);
  };

  return (
    <div className="placeContainer">
      <ul className="flex list-none flex-wrap flex-row" role="tablist">
        <li className="w-1/2 flex-auto text-center">
          <a
            className={
              "text-s px-2 py-5 shadow-lg rounded block leading-rnomal cusor-pointer" +
              (openTab === 1
                ? "text-white bg-blue-400"
                : "text-gray-600 bg-white")
            }
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            href="#link1"
            data-toggle="tab"
            role="tablist"
          >
            여행
          </a>
        </li>

        <li className="w-1/2 flex-ato text-center">
          <a
            className={
              "text-s px-2 py-5 shadow-lg rounded block leading-rnomal cusor-pointer" +
              (openTab === 0
                ? "text-white bg-blue-400"
                : "text-gray-600 bg-white")
            }
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(0);
            }}
            href="#link3"
            data-toggle="tab"
            role="tablist"
          >
            북마크
          </a>
        </li>
      </ul>
      <div>
        {/* tab 번호에 따라 다른 데이터 전송 */}
        {/* <PlaceItemList items={openTab ? A : B} */}

        <PlaceItemList items={dummyData} />
      </div>
    </div>
  );
};

export default PlaceContainer;
