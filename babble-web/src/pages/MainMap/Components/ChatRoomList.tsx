import styled from "styled-components";
import { GlassmorphismDiv } from "../../../StyledComponents/GmDiv";
import { ChatRoomType, SampleChatRoomList } from "../../../Constants";
import { useNavigate } from "react-router-dom";
import { getChatRooms, getRecentChat } from "../../../API/ChatAPI";
import { useMyLocationContext } from "../../../Context/MyLocationContext";
import { useEffect, useState } from "react";

const StyledListDiv = styled(GlassmorphismDiv)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 30%/20%;
  padding: 3vw;
  overflow-y: auto;
  overscroll-behavior:contain;
  height: calc(20rem + 5vh);
`;

export const ListDiv = () => {
  const { curLocation } = useMyLocationContext();
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const fetchedChatRooms = await getChatRooms(curLocation);
        const transformedChatRooms = fetchedChatRooms.map((room) => ({
          id: room.id,
          roomName: room.name,
          location: {
            lat: room.latitude,
            lng: room.longitude,
          },
          hashTag: room.hashTag,
          memberCount: 0, // 멤버 카운트는 무시하고 기본값으로 설정
        }));
        setChatRooms(transformedChatRooms);
        console.log("fetching chat rooms success");
      } catch (error) {
        console.error("Fetching chat rooms failed:", error);
      }
    }
    fetchChatRooms();
  }, []);
  return (
    <StyledListDiv>
      {chatRooms.map((chatRoom) => (
        <Box chatRoom={chatRoom} />
      ))}
    </StyledListDiv>
  );
};

const StyledBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 2fr;
  gap: 1vw 1vw;
  align-items: stretch;
  justify-items: center;

  margin: 1vw;
  padding: 1vw;

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10% /20%;
  background: rgba(255, 255, 255, 0.3);

  .hashTag {
    grid-column: 1/2;
    grid-row: 1/2;
    //margin: 1vw 0 0 1vw;
  }
  .memberCount {
    grid-column: 2/3;
    grid-row: 1/2;
    //margin: 0.5vw;
  }
  .roomName {
    grid-column: 1/4;
    grid-row: 2/3;
    font-weight: 600;
  }
`;

const Box = ({ chatRoom }: { chatRoom: ChatRoomType }) => {
  const navigate = useNavigate();
  const { curLocation } = useMyLocationContext();

  const handleBoxClick = () => {
    getRecentChat(chatRoom.id, curLocation.lat, curLocation.lng)
      .then((res) => {
        if (res.isChatter) {
          //기존 채팅방, isChatter가 true인 경우
          navigate(`/chat/${chatRoom.id}`);
        } else {
          //기존 채팅방, isChatter가 false인 경우
          navigate(`/enter/${chatRoom.id}`);
        }
      })
      .catch((error) => {
        console.log(
          "error getting recent chat (getting previous chats)",
          error
        );
      });
  };

  return (
    <StyledBox onClick={handleBoxClick}>
      <div className="hashTag">{chatRoom.hashTag}</div>
      <div className="memberCount">{chatRoom.memberCount}</div>
      <div className="roomName">{chatRoom.roomName}</div>
    </StyledBox>
  );
};
