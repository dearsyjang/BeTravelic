import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { useState } from "react";
import { ColorRing, Watch } from "react-loader-spinner";
import { getMapPothos } from "../apis/mypage";
import ArticleModal from "../components/common/ArticleModal";
import { dummyData } from "../components/MyPage/DummyData";
import MyMap from "../components/MyPage/MyMap";
import MyPageCard from "../components/MyPage/MyPageCard";
import PhotoInputModal from "../components/MyPage/PhotoInputModal";
import PlaceContainer from "../components/MyPage/PlaceContainer";
import "../pages/css/OnBoard.css";

export interface Display {
  regionId: number;
  image: string | null;
  // x: number;
  // y: number;
  // width: string;
  // height: string;
}

const MyPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showArticleModal, setShowArticleModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displays, setDisplays] = useState<Display[]>([]);
  const [regionId, setRegionId] = useState<number>(0);
  const [changes, setChanges] = useState(true);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const changeDisplaysHandler = async (id: number, image: string) => {
    const newDisplays = displays;
    newDisplays.forEach((display) => {
      if (display.regionId === id) {
        display.image = image;
      }
    });
    console.log("여기는 displays");
    setChanges((prev) => !prev);
    setDisplays(newDisplays);
    return newDisplays;
  };

  useLayoutEffect(() => {
    setIsLoading(true);
    const initialData = async () => {
      // 초기 데이터 호출

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    initialData();
  }, []);

  return (
    <div
      className={`bg-blue-100 h-screen ${
        isLoading && "flex justify-center items-center"
      }`}
    >
      {isLoading ? (
        <div className="flex flex-col items-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
          <div>
            <p>여행지를 추천해드릴게요. 잠시만 기다려주세요</p>
          </div>
        </div>
      ) : (
        <div className="fadeIn">
          {showArticleModal && (
            <ArticleModal setShowArticleModal={setShowArticleModal} />
          )}
          {showModal && (
            <PhotoInputModal
              setShowModal={setShowModal}
              changeDisplayHandler={changeDisplaysHandler}
              regionId={regionId}
              // setShowArticleModal={setShowArticleModal}
            />
          )}
          {/* 프로필 */}
          <div className="flex justify-around">
            <section>
              <MyPageCard />
            </section>
            <section>
              {/* 맵 */}
              <MyMap
                setShowModal={setShowModal}
                displays={displays}
                setRegionId={setRegionId}
                changes={changes}
                setDisplays={setDisplays}
              />
            </section>
            {/* 추천 */}
            <section>
              <PlaceContainer />
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
