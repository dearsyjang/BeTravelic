import { useEffect } from "react";
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

function RecommendPlaceMain({ latitude, longitude }: MapProps) {
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
          <RecommendList />
        </div>
      </div>
    </>
  );
}

export default RecommendPlaceMain;
