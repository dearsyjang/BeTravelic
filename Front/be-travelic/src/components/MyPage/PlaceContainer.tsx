import React, {
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import PlaceItemList from "./PlaceItemList";
import "../css/MyPageCard.css";
import { fetchAllBookMarks, fetchAllVisitedPlaces } from "../../apis/mypage";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { style } from "d3";

export interface PlaceData {
  id: number;
  imageUrl: string;
  title: string;
  visited_at?: string;
  isBookMarked?: boolean;
  image?: string;
  placeId?: string;
  placeName?: string;
}

const PlaceContainer: React.FC<{
  openTab: number;
  setOpenTab: React.Dispatch<SetStateAction<number>>;
  displayedPlace: PlaceData[];
  setDisplayedPlace: React.Dispatch<SetStateAction<PlaceData[]>>;
}> = ({ openTab, setOpenTab, setDisplayedPlace, displayedPlace }) => {
  let { id } = useParams();
  const [allPlaces, setAllPlaces] = useState<PlaceData[]>([]);
  const [allBookmarks, setAllBookmarks] = useState<PlaceData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const initialData = async () => {
      const userId = Number(id);
      const [visited, bookmark] = await Promise.all([
        fetchAllVisitedPlaces(userId),
        fetchAllBookMarks(userId),
      ]);

      setDisplayedPlace(visited);
      setAllPlaces(visited);
      setAllBookmarks(bookmark);
      console.log(visited, "boo");
    };

    initialData();
  }, []);

  // tab 변경시 체인지
  useEffect(() => {
    setIsLoading(true);
    const items = openTab === 1 ? allPlaces : allBookmarks;
    console.log(items, "items");

    setDisplayedPlace(items);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [openTab]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [displayedPlace]);

  const changeTabHandler = async (
    identifier: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();

    if (identifier === "visited") {
      // setDisplayedPlace(allPlaces);
    } else if (identifier === "bookmark") {
      // const res = await fetchAllBookMarks(userId!);
      // setDisplayedPlace(res);
      console.log("bookmark");
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
        {isLoading && (
          <div
            className="flex items-center justify-center"
            style={{ height: "700px" }}
          >
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}
        {!isLoading && !displayedPlace?.length && (
          <div
            className="flex items-center justify-center"
            style={{ height: "700px" }}
          >
            {openTab === 1
              ? "아직 방문한 장소가 없네요. 여행지를 기록해보세요"
              : "아직 북마크한 장소가 없네요. 북마크를 해보세요."}
          </div>
        )}
        {!isLoading && displayedPlace && (
          <PlaceItemList items={displayedPlace} />
        )}
      </div>
    </div>
  );
};

export default PlaceContainer;
