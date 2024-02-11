//import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useMyLocationContext } from "../../Context/MyLocationContext";
import { useEffect } from "react";
//import { useEffect } from "react";

const MainMap = () => {
  const { curLocation, setCurLocation } = useMyLocationContext();
  const { setWatchID } = useMyLocationContext();

  useEffect(() => {
    const updateCurrentLocation = () => {
      if (navigator.geolocation) {
        const wId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurLocation({ lat: latitude, lng: longitude });
            console.log("위치 정보 업데이트 성공:", latitude, longitude);
          },
          (error) => {
            console.error("위치 정보 접근 실패:", error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 10000, // 10초 동안 캐시된 위치 정보 사용 허용
            timeout: 5000, // 위치 정보를 가져오기 위한 최대 대기 시간(밀리초)
          }
        );
        setWatchID(wId);
      } else {
        console.error("This browser does not support Geolocation.");
      }
    };

    updateCurrentLocation();
  }, [setCurLocation, setWatchID]);

  return (
    <>
      <Map
        id="map"
        center={curLocation}
        style={{
          // 지도의 크기
          width: "100vw",
          height: "100vh",
        }}
        level={1}
        draggable={false}
        zoomable={false}
      >
        <MapMarker position={curLocation} />
      </Map>
    </>
  );
};

export default MainMap;
