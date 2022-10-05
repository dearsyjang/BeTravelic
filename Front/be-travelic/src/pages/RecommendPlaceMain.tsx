import { useEffect, useState } from "react";
import { RecommendList } from "../components/index";
import { RadioGroup } from "@headlessui/react";
import "./css/RecommendPlaceMain.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import KakaoShare from "../components/common/KakaoShare";

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
interface place {
  recommend_id: number;
  addr: string;
  title: string;
  imageUrl: string;
  mapx: string;
  mapy: string;
  place_id: number;
  overview: string;
  score: number;
}

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
async function getRecommendPlace(userId: number, category: string) {
  let places: place[] = [];
  // console.log("userId in RecommendList : " + userId);
  console.log("category in RecommendList");
  console.log(category);

  await axios
    .get(
      `http://j7d205.p.ssafy.io:8081/api/v1/place_recommend/${userId}/${category}`,
    )
    .then((res) => {
      // console.log(res.data);
      places = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(places);

  return places;
}

function RecommendPlaceMain({ latitude, longitude }: MapProps) {
  const [openTab, setOpenTab] = useState(1);
  const [category, setCategory] = useState<string>("관광지");
  const [places, setPlaces] = useState<place[]>([]);
  const userId = useSelector((state: RootState) => state.auth.userId);
  useEffect(() => {
    // console.log("UseEffect CALL in RecommendPlaceMain");
    // const KakaoAppKey = process.env.REACT_APP_KAKAO_API_KEY;
    var localplaces: place[] = [];
    (async () => {
      localplaces = await getRecommendPlace(userId, category);
      // console.log(localplaces);
      setPlaces(localplaces);
    })();
    // console.log(localplaces);
    // console.log("places");
    // console.log(places);

    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=df4bdb2422933e11c1563504af4b0c33&libraries=clusterer&autoload=false`;

    document.head.appendChild(mapScript);
    const onLoadKakaoMap = () => {
      //   console.log("Loading Kakao Map...");

      window.kakao.maps.load(() => {
        const container = document.getElementById("RecommendPlaceMap");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 12,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 아래는 마커 테스트 및 센터 좌표 구하기 위함
        var markers = places.map((place) => {
          console.log("place ");
          console.log(place);

          console.log("place mapx, mapy --> " + place.mapx + ", " + place.mapy);

          return new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(place.mapy, place.mapx),
          });
        });
        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 12,
        });
        clusterer.addMarkers(markers);

        // window.kakao.maps.event.addListener(map, "center_changed", function () {
        //   var level = map.getLevel();
        //   var latlng = map.getCenter();
        //   console.log("Center : " + latlng.getLat() + " ," + latlng.getLng());
        //   console.log("Level : " + level);
        // });
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
  }, [latitude, longitude]);

  useEffect(() => {}, [places]);

  function changeCategory(type: string) {
    setCategory(type);
    console.log("changed type name in function");

    console.log(category);
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
                      ? "text-white-100 bg-blue-400"
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
              className='gird gap-2 grid-cols-5 grid-rows-1'
            >
              <RadioGroup
                value={category}
                onChange={changeCategory}
                className='mt-4'
              >
                <div className='grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-6'>
                  {contentTypes.map((contentType, idx) => (
                    <div>
                      <RadioGroup.Option
                        key={contentType.name}
                        value={contentType.name}
                        disabled={false}
                        className={({ active }) =>
                          classNames(
                            true
                              ? "bg-white shadow-md text-gray-900 cursor-pointer"
                              : "bg-gray-50 text-gray-200 cursor-not-allowed",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative border-none rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6",
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label
                              as='span'
                              className='flex flex-col items-center'
                            >
                              <img
                                className='w-8 flex justify-center'
                                src={contentType.imageUrl}
                              />
                              {contentType.name}
                            </RadioGroup.Label>
                            {true ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-none",
                                  checked ? "border-indigo-500" : "border-none",
                                  "pointer-events-none absolute -inset-px rounded-md",
                                )}
                                aria-hidden='true'
                              />
                            ) : (
                              <span
                                aria-hidden='true'
                                className='pointer-events-none absolute -inset-px rounded-xs border-2 border-gray-200'
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
              <RecommendList category={category} />{" "}
            </div>
            <div className={openTab === 3 ? "block" : "hidden"}> 북마크 </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendPlaceMain;
