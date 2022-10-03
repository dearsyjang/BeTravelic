import React, { SetStateAction, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import korea from "../../assets/geojson/korea.json";
import "../css/MyMap.css";
import { useEffect } from "react";
import logo from "../../assets/image/logo.png";

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

const MyMap:React.FC<{
  setShowModal: React.Dispatch<SetStateAction<boolean>>
}> = ({setShowModal}) => {
  const initialScale = 5500; //확대시킬 값
  const initialX = -12000; //초기 위치값 X
  const initialY = 4150; //초기 위치값 Y
  const [displays, setDisplays] = useState(dummyData);
  // const path = d3.select("path");

  // 전역 변수로 timer를 선언하여 if state에서 접근할 수 있게 함.
  let timer:any;

  const fetchRecordsHandler = (e:any) => {
    if (e.type == "mouseover") {
      timer = setTimeout(() => {
        console.log("지역", e.target.__data__.properties.name);
      }, 3000);
    }

    if (e.type === "mouseleave") {
      console.log(timer, "클리어 번호");
      clearTimeout(timer);
    }
  };

  const areaFn = (d:any) => {
    console.log(d);
    const code = d.properties.id;
    console.log(code);
    //console.log(code);
    return code;
  };

  const fileFn = (d:any) => {
    const code = d.properties.id;
    // const imgfile = "data:image/png;base64," + d[code].file;
    // console.log("imgfile 받음?", d[code].file);

    const imgfile = "";

    return logo;
  };

  const fillFn = (d:any) => {
    // const pcolor = "#aaa";
    const id = d.properties.id;
    const fill = "url(#" + id + ")";
    return fill;
  };

  const showModalHandler = (e:any) => {
    console.log(e.target.__data__.properties);
    console.log(e);
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
    const path:any = d3.geoPath().projection(projection);

    // 맵 그리기
    g.selectAll("path")
      .data(korea.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "countries")
      .attr("fill", fillFn)
      .on("click", showModalHandler)
      .on("mouseover", fetchRecordsHandler)
      .on("mouseleave", fetchRecordsHandler);

    const defs = svg.append("defs");

    // 사진 넣기
    displays.map((display) => {
      if (display.url) {
        defs
          .append("pattern")
          .attr("id", display.id)
          .attr("patternUnits", "userSpaceOnUse")
          .attr("width", "100%")
          .attr("height", "100%")
          .append("svg:image")
          .attr("xlink:href", display.url)
          // .attr("width", "520px")
          // .attr("height", "500px")
          .attr("x", 30)
          .attr("y", -50);
      }
    });
    // defs
    //   .append("pattern")
    //   .attr("id", "5")
    //   .attr("patternUnits", "userSpaceOnUse")
    //   .attr("width", "100%")
    //   .attr("height", "100%")
    //   .append("svg:image")
    //   .attr("xlink:href", "https://picsum.photos/500")
    //   // .attr("width", "520px")
    //   // .attr("height", "500px")
    //   .attr("x", 100)
    //   .attr("y", 100)
    //   .style("background-size", "cover");

    // defs
    //   .append("pattern")
    //   .attr("id", "15")
    //   .attr("patternUnits", "userSpaceOnUse")
    //   .attr("width", "70%")
    //   .attr("height", "70%")
    //   .append("svg:image")
    //   .attr(
    //     "xlink:href",
    //     "data:image/jpeg;base64,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"
    //   )
    //   .attr("width", "250px")
    //   .attr("height", "250px")
    //   .attr("x", 250)
    //   .attr("y", 300)
    //   .style("background-size", "cover");

    // d3.select(".image-wrapper")
    //   .selectAll("svg")
    //   .data(korea.features)
    //   .enter()
    //   .append("svg")
    //   .attr("id", "mySvg")
    //   .attr("width", "0")
    //   .attr("height", "0")
    //   .append("defs")
    //   .attr("id", "mdef")
    //   .append("pattern")
    //   .attr("id", areaFn)
    //   .attr("patternUnits", "userSpaceOnUse")
    //   .attr("width", "100%")
    //   .attr("height", "100%")
    //   .append("svg:image")
    //   .attr(
    //     "xlink:href",
    //     "data:image/jpeg;base64,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"
    //   )
    //   .attr("width", "500px")
    //   .attr("height", "500px")
    //   .attr("x", 0)
    //   .attr("y", 0);
  }, []);

  useEffect(() => {
    
  }, [displays])


  return (
    <>
      <div className="canvas"></div>
    </>
  );
};

export default MyMap;
