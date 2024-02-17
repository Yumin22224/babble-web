import { Map, MapMarker, CustomOverlayMap, Circle } from "react-kakao-maps-sdk";
import { useMyLocationContext } from "../../Context/MyLocationContext";
import { useContext, useEffect, useState } from "react";
import { ChatRoomType, SampleChatRoomList } from "../../Constants";
import { ChatRoomMarker } from "./Components/ChatRoomMarker";
import { getChatRooms } from "../../API/ChatAPI";
import { useNavigate } from "react-router-dom";
import Marker from "../../assets/Marker.png";
import { NewChatRoomContext } from "../../Context/ChatRoomsContext";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3; // 지구의 반지름, 미터 단위
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ는 라디안 단위
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = Math.abs(((lat2 - lat1) * Math.PI) / 180);
  const Δλ = Math.abs(((lon2 - lon1) * Math.PI) / 180);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 최종 거리, 미터 단위
  return distance;
}

const MainMap = () => {
  const { curLocation, setCurLocation } = useMyLocationContext();
  const { setWatchID } = useMyLocationContext();
  //const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const context = useContext(NewChatRoomContext);
  if (!context) {
    throw new Error(
      "useContext(NewChatRoomContext) must be inside a Provider with a value"
    );
  }
  const { setChatRooms, chatRooms, filteredRoomIds, setFilteredRoomIds } = context;

  const navigate = useNavigate();



  useEffect(() => {
    const updateCurrentLocation = () => {
      if (navigator.geolocation) {
        const wId = navigator.geolocation.watchPosition(
          async (position) => {
            // 위치 정보가 업데이트될 때마다 실행되는 콜백
            const { latitude, longitude } = position.coords;
            setCurLocation({ lat: latitude, lng: longitude });
            console.log("위치 정보 업데이트 성공:", latitude, longitude);

            await fetchChatRooms({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("위치 정보 접근 실패:", error);
            if (error.code === 3) {
              alert("잠시만 기다려주세요. (위치 정보 갱신 지연...)");
            }
          },
          {
            enableHighAccuracy: false,
            maximumAge: 5000, // 5초 동안 캐시된 위치 정보 사용 허용
            timeout: 300000, // 위치 정보를 가져오기 위한 최대 대기 시간(밀리초)
          }
        );
        setWatchID(wId);
      } else {
        console.error("This browser does not support Geolocation.");
      }
    };

    async function fetchChatRooms({ lat, lng }: { lat: number; lng: number }) {
      try {
        const fetchedChatRooms = await getChatRooms(curLocation);
        if (fetchedChatRooms.err) {
          alert("다시 로그인 해주세요.");
          navigate(`/login`);
        } else {
          const filteredChatRooms = fetchedChatRooms
            .filter(
              (chatRoom: ChatRoomType) =>
                calculateDistance(
                  lat,
                  lng,
                  chatRoom.location.lat,
                  chatRoom.location.lng
                ) <= 70
            )
            .map((chatRoom: ChatRoomType) => chatRoom.id);
          setFilteredRoomIds(filteredChatRooms);
          setChatRooms(fetchedChatRooms);
          console.log(curLocation);
          console.log("fetching chat rooms success", filteredChatRooms);
        }
      } catch (error) {
        console.error("Fetching chat rooms failed:", error);
      }
    }

    updateCurrentLocation();
    //fetchChatRooms();
  }, [setCurLocation, setWatchID, curLocation, navigate, setFilteredRoomIds, setChatRooms]);

  //   const handleDragEnd = (event: kakao.maps.Marker) => {
  //     const position = event.getPosition();
  //     setCurLocation({ lat: position.getLat(), lng: position.getLng() });
  //     console.log(`New Position: ${position}`);
  //   };

  return (
    <>
      <Map
        id="map"
        center={curLocation}
        style={{
          // 지도의 크기
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: "1",
        }}
        level={2}
        draggable={false}
        zoomable={false}
      >
        {chatRooms.map((chatRoom) => (
          <CustomOverlayMap
            key={chatRoom.id}
            position={chatRoom.location}
            yAnchor={0.7}
          >
            <ChatRoomMarker
              chatRoom={chatRoom}
              isValid={filteredRoomIds.includes(chatRoom.id)}
            />
          </CustomOverlayMap>
        ))}
        <MapMarker
          position={curLocation}
          draggable={false}
          zIndex={4}
          image={{
            src: `${Marker}`,
            size: {
              width: 30,
              height: 40,
            },
          }}
        />
        <Circle
          center={{
            lat: curLocation.lat,
            lng: curLocation.lng,
          }}
          radius={70}
          strokeWeight={3}
          strokeColor={"#75B8FA"}
          strokeOpacity={0.5}
          fillColor={"#CFE7FF"}
          fillOpacity={0.3}
          zIndex={1}
        />
      </Map>
    </>
  );
};

export default MainMap;
