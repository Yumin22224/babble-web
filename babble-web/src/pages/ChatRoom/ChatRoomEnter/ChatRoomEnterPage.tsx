import styled, { keyframes } from "styled-components";
import { GlassmorphismDiv } from "../../../StyledComponents/GmDiv.tsx";
import { useNavigate, useParams } from "react-router-dom";
//import { SampleChatRoomList } from "../../../Constants";
import { ColorType, useUserContext } from "../../../Context/UserContext";
import { StyledButton } from "../../../StyledComponents/Button";
import { useContext } from "react";
import { NewChatRoomContext } from "../../../Context/ChatRoomsContext";
import { getChatRooms, joinChat, makeChatRooms } from "../../../API/ChatAPI";
import { useMyLocationContext } from "../../../Context/MyLocationContext";
import { useEffect } from "react";
import { generateColor, invertColor } from "../../../API/GenerateColor";

//처음에 페이지로 이동할 때 효과를 주고 싶은데 전혀 나타나질 않는다... (미해결)
const fadeIn = keyframes` {
    0%{
      opacity:0;
    }
    100%{
      opacity:1;
    }
  }`;

const StyledChatRoomEnterDiv = styled(GlassmorphismDiv)<{
  $color: ColorType;
  $invColor: ColorType;
}>`
  width: calc(5vw + 15em);
  height: calc(5vw + 17em);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: var(--4-hex);

  animation: ${fadeIn} 1s forwards;

  .chatRoomInfo {
    align-self: stretch;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 2fr;
    align-items: center;
    justify-content: center;
    padding: 1em;
    background: #e0e5ec;
    border-radius: 20px;
    box-shadow:
      inset -6px -6px 12px rgba(255, 255, 255, 0.8),
      inset 6px 6px 12px rgba(163, 177, 198, 0.5);
    margin: 1vw 0;
  }

  .roomName,
  .hashTag,
  .memberCount {
    color: rgba(53, 81, 242, 1);
    font-weight: 600;
    text-align: center;
  }

  .roomName {
    grid-column: 1/3;
    grid-row: 2/3;
    font-weight: 600;
    font-size: larger;
    margin: 0;
  }
  .memberCount {
    grid-column: 2/3;
    grid-row: 1/2;
    background: rgba(209, 253, 255, 0.2);
    border-radius: 10px;
    padding: 5px 10px;

    margin-top: 0.3vw;
  }
  .hashTag {
    grid-column: 1/2;
    grid-row: 1/2;

    background: rgba(209, 253, 255, 0.6);
    border-radius: 10px;
    padding: 5px 10px;
    margin-top: 0.3vw;
  }

  label {
    font-size: 1.5em;
    font-weight: 600;
    margin: 2vw 0 0.5vw 0;
  }

  input {
    all: unset;
    //color: white;
    align-self: stretch;
    height: calc(3rem + 5vh);
    box-shadow:
      inset 8px 8px 16px rgba(163, 177, 198, 0.2),
      inset -8px -8px 16px rgba(255, 255, 255, 0.8);
    border-radius: 20px; /* 입력 필드에 둥근 모서리 적용 */
    background-color: ${({ $invColor }) =>
      `rgba(${$invColor.r}, ${$invColor.g}, ${$invColor.b}, 0.3)`};
    color: ${({ $color }) => `rgba(${$color.r}, ${$color.g}, ${$color.b}, 1)`};
  }

  .enter {
    background: rgba(53, 81, 242, 1); /* 버튼 배경색 */
    color: white; /* 버튼 텍스트 색상 */
    box-shadow:
      -5px -5px 10px rgba(255, 255, 255, 0.8),
      5px 5px 10px rgba(163, 177, 198, 0.5);
    border-radius: 20px; /* 버튼에 둥근 모서리 적용 */
    font-weight: 700;
    padding: 10px 20px; /* 버튼 내부 패딩 */
    cursor: pointer; /* 마우스 호버 시 커서 변경 */
    &:hover {
      background: rgba(12, 46, 242, 1); /* 호버 시 배경색 변경 */
    }

    margin-top: 2vh;
  }
`;

const ChatRoomEnterPage = () => {
  const navigate = useNavigate();
  const chatRoomId = parseInt(useParams().id!);

  const context = useContext(NewChatRoomContext);
  if (!context) {
    throw new Error(
      "useContext(NewChatRoomContext) must be inside a Provider with a value"
    );
  }
  const { roomSpec, chatRooms, setChatRooms, tag } = context;

  const { setNickName, color, setColor, nickName } = useUserContext();
  const invColor = invertColor(color);
  const { curLocation } = useMyLocationContext();

  const curChatRoom =
    chatRoomId !== 0
      ? chatRooms.find((chatRoom) => chatRoom.id === chatRoomId)
      : { ...roomSpec, memberCount: 0 };

  const handleChange = (e: { target: { value: string } }) => {
    //닉네임을 받아서 서버에 전송 밑 기타 처리 (정규식에 맞지 않는 닉네임일 경우 입장 비활성화)
    setNickName(e.target.value);
    setColor(generateColor(e.target.value));
  };

  const handleEnter = () => {
    if (chatRoomId !== 0) {
      //기존 채팅방, isChatter가 false인 경우
      joinChat(
        {
          nickname: nickName,
          latitude: curLocation.lat,
          longitude: curLocation.lng,
        },
        chatRoomId
      )
        .then(() => {
          navigate(`/chat/${chatRoomId}`);
        })
        .catch((error) => {
          console.log("Error joining as a new user", error);
        });
    } else {
      //새 채팅방
      const newRoom = { ...roomSpec, nickname: nickName };
      makeChatRooms(newRoom)
        .then((res) => {
          if (res) {
            const locationHeader = res.headers["location"];
            console.log("Location Header:", locationHeader);
            const id = locationHeader.split("/").pop();
            navigate(`/chat/${id}`);
            console.log(roomSpec);
          }
        })
        .catch((error) => {
          console.log("Creating new chat room failed:", error);
          //navigate(`/main`);
        });
    }
  };

  useEffect(() => {
    setColor({ r: 12, g: 46, b: 242 });
    getChatRooms(curLocation).then(setChatRooms);
  }, [setChatRooms, setColor]);

  return (
    <StyledChatRoomEnterDiv $color={color} $invColor={invColor}>
      <div className="chatRoomInfo">
        <p className="roomName">{curChatRoom!.roomName}</p>
        <div className="hashTag">
          {chatRoomId !== 0 ? curChatRoom!.hashTag : tag}
        </div>
        <div className="memberCount">
          {chatRoomId !== 0 && curChatRoom!.memberCount}
        </div>
      </div>
      <label htmlFor="nickName">닉네임을 입력해주세요</label>
      <input id="nickName" type="text" onChange={handleChange} />
      <StyledButton className="enter" onClick={handleEnter}>
        입장
      </StyledButton>
    </StyledChatRoomEnterDiv>
  );
};

export default ChatRoomEnterPage;
