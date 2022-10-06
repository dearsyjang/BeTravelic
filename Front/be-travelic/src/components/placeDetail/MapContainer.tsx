import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapContainer {
  mapx: string;
  mapy: string;
}

function MapContainer( props : MapContainer ){

  const { mapx, mapy } = props

  useEffect(() => {

    // const mapScript = document.createElement("script");
    // mapScript.async = true;
    // mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=df4bdb2422933e11c1563504af4b0c33&libraries=clusterer&autoload=false;`

    // document.head.appendChild(mapScript);

      let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = { //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(mapy, mapx), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };
      let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴 & 기본 맵 container, options, map 설정

      // 마커 위치
      let markerPosition = new window.kakao.maps.LatLng(mapy, mapx); 

      // 마커 생성
      var marker = new window.kakao.maps.Marker({
          position: markerPosition
      });
      
      // 마커 표시
      marker.setMap(map)

      // 마커 드래그
      marker.setDraggable(true); 
    }, [mapy, mapx])

    return (
      <div id="map" style={{ width: "auto", height: "50vh" }} />
  );

  }

export default MapContainer; 

