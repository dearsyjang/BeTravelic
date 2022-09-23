import { useEffect, useState } from "react";
import { RecommendList } from "../components/index";
import { RadioGroup } from "@headlessui/react";
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
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const contentTypes = [
  {
    typeNum: 12,
    name: "관광지",
    imageUrl: `${process.env.PUBLIC_URL}/icons/palace.png`,
  },
  {
    typeNum: 14,
    name: "박물관",
    imageUrl: `${process.env.PUBLIC_URL}/icons/museum.png`,
  },
  {
    typeNum: 15,
    name: "축제",
    imageUrl: `${process.env.PUBLIC_URL}/icons/festival.png`,
  },
  {
    typeNum: 28,
    name: "레저스포츠",
    imageUrl: `${process.env.PUBLIC_URL}/icons/leisure.png`,
  },
  {
    typeNum: 32,
    name: "숙박",
    imageUrl: `${process.env.PUBLIC_URL}/icons/travel-bag.png`,
  },
  {
    typeNum: 38,
    name: "쇼핑",
    imageUrl: `${process.env.PUBLIC_URL}/icons/shopping.png`,
  },
  {
    typeNum: 39,
    name: "음식점",
    imageUrl: `${process.env.PUBLIC_URL}/icons/restaurant.png`,
  },
];

function RecommendPlaceMain({ latitude, longitude }: MapProps) {
  const [openTab, setOpenTab] = useState(1);
  const [contentType, setContentType] = useState(0);
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
          level: 12,
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
        window.kakao.maps.event.addListener(map, "center_changed", function () {
          var level = map.getLevel();
          var latlng = map.getCenter();
          console.log("Center : " + latlng.getLat() + " ," + latlng.getLng());
          console.log("Level : " + level);
        });
        // marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);
  function changeContentType(type: number) {
    setContentType(type);
    console.log(contentType);
  }
  return (
    <>
      <div id='RecommendPlaceMap'>
        <div id='RecommendListContainer'>
          <div className='grid grid-cols-1 p-3 mt-2'>
            <ul
              className='flex mb-0 list-none flex-wrap flex-row'
              role='tablist'
            >
              <li className='w-1/2 flex-auto text-center'>
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

              <li className='w-1/2 flex-ato text-center'>
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
                  href='#link3'
                  data-toggle='tab'
                  role='tablist'
                >
                  북마크
                </a>
              </li>
            </ul>

            <div
              id='RecommendListIcons'
              className='gird gap-2 grid-cols-6 grid-rows-1'
            >
              <RadioGroup
                value={contentType}
                onChange={setContentType}
                className='mt-4'
              >
                <div className='grid grid-cols-7 gap-2 sm:grid-cols-7 lg:grid-cols-7'>
                  {contentTypes.map((contentType, idx) => (
                    <div>
                      <RadioGroup.Option
                        key={contentType.name}
                        value={contentType.typeNum}
                        disabled={false}
                        className={({ active }) =>
                          classNames(
                            true
                              ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                              : "bg-gray-50 text-gray-200 cursor-not-allowed",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6",
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as='span' className='flex flex-col items-center'>
                              <img className="w-8 flex justify-center" src={contentType.imageUrl} />
                              {contentType.name}
                            </RadioGroup.Label>
                            {true ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md",
                                )}
                                aria-hidden='true'
                              />
                            ) : (
                              <span
                                aria-hidden='true'
                                className='pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200'
                              >
                                <svg
                                  className='absolute inset-0 h-full w-full stroke-2 text-gray-200'
                                  viewBox='0 0 100 100'
                                  preserveAspectRatio='none'
                                  stroke='currentColor'
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect='non-scaling-stroke'
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className={openTab === 1 ? "block" : "hidden"}>
              <RecommendList />{" "}
            </div>
            <div className={openTab === 3 ? "block" : "hidden"}> 북마크 </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendPlaceMain;
