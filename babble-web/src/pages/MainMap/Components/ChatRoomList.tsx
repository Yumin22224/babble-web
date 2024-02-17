import styled from "styled-components";
import { GlassmorphismDiv } from "../../../StyledComponents/GmDiv.tsx";
import { ChatRoomType, SampleChatRoomList } from "../../../Constants";
import { useNavigate } from "react-router-dom";
import { getChatRooms, getRecentChat } from "../../../API/ChatAPI";
import { useMyLocationContext } from "../../../Context/MyLocationContext";
import { useEffect, useState } from "react";

const StyledListDiv = styled(GlassmorphismDiv)<{ $show: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    ${(props) => (props.$show ? "scale(1)" : "scale(0)")};
  z-index: 1000;
  min-width: calc(15rem + 5vw);
  padding: 3vw;
  overflow-y: auto;
  overscroll-behavior: contain;
  height: calc(20rem + 5vh);
  background: var(--4-hex);
  box-shadow:
    -8px -8px 16px rgba(255, 255, 255, 0.8),
    8px 8px 16px rgba(163, 177, 198, 0.5);
  border-radius: 20px;
  transition: transform 0.5s ease-in-out;

  &::-webkit-scrollbar {
    width: 0;
  }

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
    <StyledListDiv $show={show} className="list shadow-2-drop">
      {chatRooms.map((chatRoom) => (
        <Box chatRoom={chatRoom} />
      ))}
    </StyledListDiv>
  );
};

const StyledBox = styled(GlassmorphismDiv)`
  margin-bottom: 3vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 2fr;
  gap: 1vw 1vw;
  align-items: stretch;
  justify-items: center;
  //margin: 1vw;
  padding: 1vw;
  border-radius: 15%/30%;
  background: #e0e5ec; /* 하늘색 계열의 배경색 */
  box-shadow:
    -5px -5px 10px rgba(255, 255, 255, 0.8),
    5px 5px 10px rgba(163, 177, 198, 0.5);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dce4f2; /* 호버 시 배경색 변경 */
  }

  .hashTag {
    grid-column: 1/2;
    grid-row: 1/2;
    border-radius: 30px;
    background-color: rgba(12, 46, 242, 0.1); /* 파란색 계열의 배경색 */
    padding: 0.3vw;
    font-weight: bold;
    color: rgba(12, 46, 242, 1); /* 진한 파란색 텍스트 */
  }
  .roomName {
    width: 90%;
    grid-column: 1/4;
    grid-row: 2/3;
    font-weight: 600;
    line-height: 1.5;
    font-size: 1.3rem;
    color: rgba(53, 81, 242, 1); /* 중간 파란색 텍스트 */
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
