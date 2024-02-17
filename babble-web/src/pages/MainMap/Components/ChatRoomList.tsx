import styled from "styled-components";
import { GlassmorphismDiv } from "../../../StyledComponents/GmDiv.tsx";
import { ChatRoomType, SampleChatRoomList } from "../../../Constants";
import { useNavigate } from "react-router-dom";
import { getChatRooms, getRecentChat } from "../../../API/ChatAPI";
import { useMyLocationContext } from "../../../Context/MyLocationContext";
import { useEffect, useState } from "react";

const StyledBackGround = styled.div<{ $show: boolean }>`
  box-sizing: border-box;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  box-shadow: inset 0px 4px 34px rgba(255, 255, 255, 0.6);
  filter: blur(40px);
`;

const StyledListDiv = styled(GlassmorphismDiv)<{ $show: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  z-index: 1000;
  border-radius: 20%;
  min-width: calc(15rem + 5vw);
  padding: 3vw;
  overflow-y: auto;
  overscroll-behavior: contain;
  height: calc(20rem + 5vh);

  background: linear-gradient(
    90deg,
    rgba(0, 240, 255, 0.3) 2.9%,
    rgba(255, 0, 229, 0.3) 49.2%,
    rgba(0, 255, 209, 0.3) 97.48%
  );
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: -9px -9px 16px rgba(255, 255, 255, 0.6);
  border-radius: 30px;

  //애니메이션이 안먹힌다... visibility로 해야할 것 같다 (미해결)
  ${($show) => $show && `transform : translate(-50%, -50%) scale(1);`}
  transition-delay: 1s;
  transition: scale ease-in-out 0.5s;

  // 웹킷 기반 브라우저를 위한 스타일
  &::-webkit-scrollbar {
    width: 0;
  }

  // Firefox를 위한 스타일
  scrollbar-width: none;
`;

export const ListDiv = ({ show }: { show: boolean }) => {
  const { curLocation } = useMyLocationContext();
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const fetchedChatRooms = await getChatRooms(curLocation);
        if (fetchedChatRooms.err) {
          alert("다시 로그인 해주세요.");
          navigate(`/login`);
        } else {
          setChatRooms(fetchedChatRooms);
          console.log("fetching chat rooms success");
        }
      } catch (error) {
        console.error("Fetching chat rooms failed:", error);
      }
    }

    fetchChatRooms();
  }, []);
  return (
    <StyledListDiv $show={show} className="list shadow-4-inner">
      <StyledBackGround $show={show} />
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

  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10% /20%;
  background: radial-gradient(
    45.31% 48.06% at 50% 48.06%,
    #f4fffc 0%,
    #95ffe6 100%
  );
  border: 7px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    9px 9px 16px rgba(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.6);
  border-radius: 30px;

  .hashTag {
    grid-column: 1/2;
    grid-row: 1/2;
    //margin: 1vw 0 0 1vw;
  }
  .roomName {
    grid-column: 1/4;
    grid-row: 2/3;
    font-weight: 600;
    line-height: 1.7;
  }
`;

const Box = ({ chatRoom }: { chatRoom: ChatRoomType }) => {
  const navigate = useNavigate();
  const { curLocation } = useMyLocationContext();

  const handleBoxClick = () => {
    getRecentChat(chatRoom.id, curLocation.lat, curLocation.lng)
      .then((res) => {
        if (res.status !== 401) {
          if (res.data.isChatter) {
            //기존 채팅방, isChatter가 true인 경우
            navigate(`/chat/${chatRoom.id}`);
          } else {
            //기존 채팅방, isChatter가 false인 경우
            navigate(`/enter/${chatRoom.id}`);
          }
        } else {
          alert("다시 로그인 해주세요.");
          navigate(`/login`);
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
      <div className="roomName">{chatRoom.roomName}</div>
    </StyledBox>
  );
};
