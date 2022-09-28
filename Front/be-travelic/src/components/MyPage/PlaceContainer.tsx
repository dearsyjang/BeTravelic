import React, { useEffect, useLayoutEffect, useState } from "react";
import PlaceItemList from "./PlaceItemList";
import "../css/MyPageCard.css";
import { fetchAllBookMarks, fetchAllVisitedPlaces } from "../../apis/mypage";
import { useParams } from "react-router-dom";

export interface PlaceData {
  id: number;
  imageUrl: string;
  title: string;
  visitedDate?: Date;
  isBookMarked?: boolean;
}

const dummyData: Array<PlaceData> = [
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

const dummyData2: Array<PlaceData> = [
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
  const { userId } = useParams();
  const [allPlaces, setAllPlaces] = useState<PlaceData[]>([]);
  const [display, setDisplays] = useState<PlaceData[]>([]);

  useLayoutEffect(() => {
    const initialData = async () => {
      const res = await fetchAllVisitedPlaces(userId!);
      setAllPlaces(res);
    };

    // initialData()

  }, []);

  useEffect(() => {}, [openTab]);

  const changeTabHandler = async (
    identifier: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();

    if (identifier === "visited") {
      // setDisplays(allPlaces);
    } else if (identifier === "bookmark") {
      // const res = await fetchAllBookMarks(userId!);
      // setDisplays(res);
      console.log('bookmark');
      
    }

    setOpenTab((prev) => (prev + 1) % 2);
  };

  return (
    <div className="placeContainer no-scroll">
      <ul className="flex list-none flex-wrap flex-row" role="tablist">
        <li className="w-1/2 flex-auto text-center">
          <a
            className={
              "text-s px-2 py-5 shadow-lg rounded block leading-rnomal cusor-pointer" +
              (openTab === 1
                ? "text-white bg-blue-400"
                : "text-gray-600 bg-white")
            }
            onClick={changeTabHandler.bind(this, "visited")}
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
            onClick={changeTabHandler.bind(this, "bookmark")}
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
