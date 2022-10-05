import React, {
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as d3 from "d3";
import korea from "../../assets/geojson/korea.json";
import "../css/MyMap.css";
import { useEffect } from "react";
import logo from "../../assets/image/logo.png";
import {
  fetchRegionalBookMarks,
  fetchRegionalVisitedPlaces,
} from "../../apis/mypage";
import { useParams } from "react-router-dom";
import { PlaceData } from "./PlaceContainer";
import { Display } from "../../pages/MyPage";
import { getMapPothos } from "../../apis/mypage";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const mapInfo = [
  {
    id: 0,
    x: 0,
    y: 0,
    width: "100%",
    height: "100%",
  },
  {
    id: 1,
    x: 170,
    y: 220,
    width: "50px",
    height: "50px",
    name: "서울특별시",
  },
  {
    id: 2,
    x: 350,
    y: 500,
    width: "70px",
    height: "70px",
    name: "부산광역시",
  },
  {
    id: 3,
    x: 300,
    y: 440,
    width: "70px",
    height: "70px",
    name: "대구광역시",
  },
  {
    id: 4,
    x: 100,
    y: 220,
    width: "80px",
    height: "80px",
    name: "인천광역시",
  },
  {
    id: 5,
    x: 150,
    y: 520,
    width: "50px",
    height: "50px",
    name: "광주광역시",
  },
  {
    id: 6,
    x: 200,
    y: 400,
    width: "50px",
    height: "50px",
    name: "대전광역시",
  },
  {
    id: 7,
    x: 370,
    y: 460,
    width: "70px",
    height: "70px",
    name: "울산광역시",
  },
  {
    id: 8,
    x: 210,
    y: 370,
    width: "50px",
    height: "50px",
    name: "세종특별자치시",
  },
  {
    id: 9,
    x: 40,
    y: 120,
    width: "250px",
    height: "250px",
    name: "경기도",
  },
  {
    id: 10,
    x: 200,
    y: 70,
    width: "300px",
    height: "300px",
    name: "강원도",
  },
  {
    id: 11,
    x: 200,
    y: 250,
    width: "150px",
    height: "230px",
    name: "충청북도",
  },
  {
    id: 12,
    x: 50,
    y: 250,
    width: "250px",
    height: "250px",
    name: "충청남도",
  },
  {
    id: 13,
    x: 50,
    y: 350,
    width: "250px",
    height: "250px",
    name: "전라북도",
  },
  {
    id: 14,
    x: 50,
    y: 450,
    width: "250px",
    height: "250px",
    name: "전라남도",
  },
  {
    id: 15,
    x: 250,
    y: 260,
    width: "280px",
    height: "280px",
    name: "경상북도",
  },
  {
    id: 16,
    x: 250,
    y: 400,
    width: "250px",
    height: "250px",
    name: "경상남도",
  },
  {
    id: 17,
    x: 100,
    y: 700,
    width: "100px",
    height: "100px",
    name: "제주도",
  },
];
const dummyData = [
  {
    id: 1,
    url: "https://picsum.photos/500",
  },
  {
    id: 2,
    url: "https://picsum.photos/500",
  },
  {
    id: 3,
    url: "https://picsum.photos/500",
  },
  {
    id: 4,
    url: "https://picsum.photos/500",
  },
  {
    id: 5,
    url: "https://picsum.photos/500",
  },
  {
    id: 6,
    url: "https://picsum.photos/500",
  },
  {
    id: 7,
    url: "https://picsum.photos/500",
  },
  {
    id: 8,
    url: "https://picsum.photos/500",
  },
  {
    id: 9,
    url: "https://picsum.photos/500",
  },
  {
    id: 10,
    url: "https://picsum.photos/500",
  },
  {
    id: 11,
    url: "https://picsum.photos/500",
  },
  {
    id: 12,
    url: "https://picsum.photos/500",
  },
  {
    id: 13,
    url: "https://picsum.photos/500",
  },
  {
    id: 14,
    url: "https://picsum.photos/500",
  },
  {
    id: 15,
    url: "https://picsum.photos/500",
  },
  {
    id: 16,
    url: "https://picsum.photos/500",
  },
  {
    id: 17,
    url: "https://picsum.photos/500",
  },
];

const MyMap: React.FC<{
  openTab: number;
  setDisplayedPlace: React.Dispatch<SetStateAction<PlaceData[]>>;

  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  displays: Display[];
  setRegionId: React.Dispatch<SetStateAction<number>>;
  changes: boolean;
  setDisplays: React.Dispatch<SetStateAction<Display[]>>;
  changedPhoto: { id: number; image: string };
}> = ({
  setShowModal,
  displays,
  setRegionId,
  changes,
  setDisplays,
  openTab,
  setDisplayedPlace,
  changedPhoto,
}) => {
  const initialScale = 5500; //확대시킬 값
  const initialX = -12000; //초기 위치값 X
  const initialY = 4150; //초기 위치값 Y
  console.log(displays, "여기는 mymap");
  const didMount = useRef(false);
  const { id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);

  // const [displays, setDisplays] = useState(dummyData);
  // const path = d3.select("path");
  console.log(openTab);

  // 전역 변수로 timer를 선언하여 if state에서 접근할 수 있게 함.
  let timer: any;

  const fetchRecordsHandler = (e: any) => {
    const userId = String(id);
    const regionId = e.target.__data__.properties.id;
    let res;

    if (e.type == "mouseover") {
      timer = setTimeout(async () => {
        console.log("지역", e.target.__data__.properties.id);
        if (openTab === 1) {
          res = await fetchRegionalVisitedPlaces(regionId, userId);
          console.log(res, "지역 방문장소");
        } else {
          res = await fetchRegionalBookMarks(regionId, userId);
          console.log(res, "지역 북마크");
        }
        setDisplayedPlace(res);
      }, 3000);
    }

    if (e.type === "mouseleave") {
      console.log(timer, "클리어 번호");
      clearTimeout(timer);
    }
  };

  const areaFn = (d: any) => {
    const code = d.properties.id;
    return "code" + code;
  };

  const fileFn = (d: any) => {
    const code = d.properties.id;
    // const imgfile = "data:image/png;base64," + d[code].file;
    // console.log("imgfile 받음?", d[code].file);
    const id = d.properties.id;
    const fill = "url(#defs" + id + ")";

    return fill;
  };

  const fillFn = (d: any) => {
    const pcolor = "white";
    // const id = d.properties.id;
    // const fill = "url(#" + id + ")";
    return pcolor;
  };

  const showModalHandler = (e: any) => {
    console.log(typeof id, typeof userId);

    if (id !== String(userId)) {
      return;
    }

    setRegionId(e.target.__data__.properties.id);
    setShowModal(true);
  };

  useLayoutEffect(() => {
    const projection = d3
      .geoMercator()
      .scale(initialScale)
      .translate([initialX, initialY]);

    const svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", 600)
      .attr("height", 1000);

    const g = svg.append("g");
    const path: any = d3.geoPath().projection(projection);

    // 맵 그리기
    g.selectAll("path")
      .data(korea.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "countries")
      .attr("fill", fillFn)
      .attr("id", areaFn)
      .on("click", showModalHandler)
      .on("mouseover", fetchRecordsHandler)
      .on("mouseleave", fetchRecordsHandler);

    const defs = svg.append("defs");

    const initialPhotos = async () => {
      const res = await getMapPothos();
      setDisplays(res);

      mapInfo.map((initial) => {
        defs
          .append("pattern")
          .attr("id", `defs${initial.id}`)
          .attr("patternUnits", "userSpaceOnUse")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("x", 0)
          .attr("y", 0);
      });

      res.map((display: Display) => {
        g.select(`#code${display.regionId}`).attr("fill", fileFn);

        if (display.image !== null) {
          defs
            .select(`#defs${display.regionId}`)
            .append("image")
            .attr("xlink:href", display.image)
            .attr("width", mapInfo[display.regionId].width)
            .attr("height", mapInfo[display.regionId].height)
            .attr("x", mapInfo[display.regionId].x)
            .attr("y", mapInfo[display.regionId].y);
        }
      });
    };
    initialPhotos();
  }, []);

  useEffect(() => {
    // opnetab 변경 시 마다 mouseover 및 mouseleave 이벤트 변경
    d3.selectAll("path")
      .on("mouseover", fetchRecordsHandler)
      .on("mouseleave", fetchRecordsHandler);
  }, [openTab]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const svg = d3.select(".canvas");
    const g = d3.select("g");
    const defs = d3.select("defs");

    d3.select(`#code${changedPhoto.id}`).attr("fill", fileFn);
    defs
      .select(`#defs${changedPhoto.id}`)
      .append("image")
      .attr("xlink:href", changedPhoto.image)
      .attr("width", mapInfo[changedPhoto.id].width)
      .attr("height", mapInfo[changedPhoto.id].height)
      .attr("x", mapInfo[changedPhoto.id].x)
      .attr("y", mapInfo[changedPhoto.id].y);

    // displays.map((display) => {
    //   d3.select(`#code${display.regionId}`).attr("fill", fileFn);
    //   if (display.image !== null) {
    //     defs
    //       .select(`#defs${display.regionId}`)
    //       .attr("xlink:href", display.image)
    //       .attr("width", "500px")
    //       .attr("height", "500px")
    //       .attr("x", mapInfo[display.regionId].x)
    //       .attr("y", mapInfo[display.regionId].y);
    //   }
    // });
    console.log("변경");
  }, [changes, changedPhoto]);

  return (
    <>
      <div className="canvas"></div>
    </>
  );
};

export default MyMap;
