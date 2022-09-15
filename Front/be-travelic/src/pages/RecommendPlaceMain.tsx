import { useEffect, useState } from "react";
import { RecommendList } from "../components/index";
import "./css/RecommendPlaceMain.css";

// 카카오 맵 이용하기 위해서 전역변수로 인터페이스 Window 사용
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
}
// 레저 & 스포츠는 텍스트 길이가 길어서 폰트 사이즈 그 부분만 조정
const minFont = {
  fontSize: "14px",
};

function RecommendPlaceMain({ latitude, longitude }: MapProps) {
  const [openTab, setOpenTab] = useState(1);
  useEffect(() => {
    // console.log("UseEffect CALL in RecommendPlaceMain");
    // const KakaoAppKey = process.env.REACT_APP_KAKAO_API_KEY;
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=df4bdb2422933e11c1563504af4b0c33&autoload=false`;

    document.head.appendChild(mapScript);
    const onLoadKakaoMap = () => {
      //   console.log("Loading Kakao Map...");

      window.kakao.maps.load(() => {
        const container = document.getElementById("RecommendPlaceMap");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 13,
        };
        // const markerPosition = new window.kakao.maps.LatLng(
        //   latitude,
        //   longitude,
        // );
        const map = new window.kakao.maps.Map(container, options);
        // 아래는 마커 테스트 및 센터 좌표 구하기 위함
        // const marker = new window.kakao.maps.Marker({
        //   position: markerPosition,
        // });
        // window.kakao.maps.event.addListener(map, "center_changed", function () {
        //   var level = map.getLevel();
        //   var latlng = map.getCenter();
        //   console.log("Center : " + latlng.getLat() + " ," + latlng.getLng());
        //   console.log("Level : " + level);
        // });
        // marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return (
    <>
      <div id='RecommendPlaceMap'>
        <div id='RecommendListContainer'>
          <div className='grid grid-cols-1 p-3 mt-2'>
            <ul
              className='flex mb-0 list-none flex-wrap flex-row'
              role='tablist'
            >
              <li className='w-1/3 flex-auto text-center'>
                <a
                  className={
                    "text-s px-2 py-2 shadow-lg rounded block leading-rnomal cusor-pointer" +
                    (openTab === 1
                      ? "text-white bg-blue-400"
                      : "text-gray-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  href='#link1'
                  data-toggle='tab'
                  role='tablist'
                >
                  추천 여행지
                </a>
              </li>
              <li className='w-1/3 flex-auto text-center'>
                <a
                  className={
                    "text-s px-2 py-2 shadow-lg rounded block leading-rnomal cusor-pointer" +
                    (openTab === 2
                      ? "text-white bg-blue-400"
                      : "text-gray-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  href='#link2'
                  data-toggle='tab'
                  role='tablist'
                >
                  전체 여행지
                </a>
              </li>
              <li className='w-1/3 flex-ato text-center'>
                <a
                  className={
                    "text-s px-2 py-2 shadow-lg rounded block leading-rnomal cusor-pointer" +
                    (openTab === 3
                      ? "text-white bg-blue-400"
                      : "text-gray-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  href='#link1'
                  data-toggle='tab'
                  role='tablist'
                >
                  북마크
                </a>
              </li>
            </ul>

            <div id='RecommendListIcons'>
              <div className='RecommendIconsItem'>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/palace.png`}
                  alt='NOIMAGE'
                />
                관광지
              </div>
              <div className='RecommendIconsItem'>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/museum.png`}
                  alt='NOIMAGE'
                />
                박물관
              </div>
              <div className='RecommendIconsItem'>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/festival.png`}
                  alt='NOIMAGE'
                />
                축제
              </div>
              <div className='RecommendIconsItem' style={minFont}>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/leisure.png`}
                  alt='NOIMAGE'
                />
                레저&스포츠
              </div>
              <div className='RecommendIconsItem'>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/shopping.png`}
                  alt='NOIMAGE'
                />
                쇼핑
              </div>
              <div className='RecommendIconsItem'>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/restaurant.png`}
                  alt='NOIMAGE'
                />
                음식점
              </div>
            </div>

            <div className={openTab === 1 ? "block" : "hidden"}>
              <RecommendList />{" "}
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
              {" "}
              전체 여행지 List{" "}
            </div>
            <div className={openTab === 3 ? "block" : "hidden"}> 북마크 </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendPlaceMain;
