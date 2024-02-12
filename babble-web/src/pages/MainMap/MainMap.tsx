import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useMyLocationContext } from "../../Context/MyLocationContext";
import { useEffect } from "react";
import { SampleChatRoomList } from "../../Constants";
import { ChatRoomMarker } from "./Components/ChatRoomMarker";

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
            maximumAge: 5000, // 5초 동안 캐시된 위치 정보 사용 허용
            timeout: 10000, // 위치 정보를 가져오기 위한 최대 대기 시간(밀리초)
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
          position:"absolute",
        }}
        level={2}
        draggable={false}
        zoomable={false}
      >
        <MapMarker position={curLocation} />
        {SampleChatRoomList.map((chatRoom) => (
          <CustomOverlayMap
            key={chatRoom.id}
            position={chatRoom.location}
            yAnchor={0.7}
          >
            <ChatRoomMarker chatRoom={chatRoom} />
          </CustomOverlayMap>
        ))}
        <CustomOverlayMap
          position={{ lat: curLocation.lat, lng: curLocation.lng + 0.0025 }}
        >
        </CustomOverlayMap>
      </Map>
    </>
  );
};

export default MainMap;
