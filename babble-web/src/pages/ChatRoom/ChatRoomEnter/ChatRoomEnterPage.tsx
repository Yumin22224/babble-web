import styled, { keyframes } from "styled-components";
import { GlassmorphismDiv } from "../../../StyledComponents/GmDiv";
import { useNavigate, useParams } from "react-router-dom";
//import { SampleChatRoomList } from "../../../Constants";
import { ColorType, useUserContext } from "../../../Context/UserContext";
import { StyledButton } from "../../../StyledComponents/Button";
import { useContext } from "react";
import { NewChatRoomContext } from "../../../Context/ChatRoomsContext";
import { getChatRooms, joinChat, makeChatRooms } from "../../../API/ChatAPI";
import { useMyLocationContext } from "../../../Context/MyLocationContext";
import { useEffect } from "react";

const generateColor = (nickname: string) => {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  const hexColor = "#" + "00000".substring(0, 6 - color.length) + color;

  // Hex 색상을 RGBA로 변환
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  return { r: r, g: g, b: b };
};

//처음에 페이지로 이동할 때 효과를 주고 싶은데 전혀 나타나질 않는다... (미해결)
const fadeIn = keyframes` {
    0%{
      opacity:0;
    }
    100%{
      opacity:1;
    }
  }`;

const StyledChatRoomEnterDiv = styled(GlassmorphismDiv)<{ $color: ColorType }>`
  width: calc(5vw + 15em);
  height: calc(5vw + 15em);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ $color }) =>
    `rgba(${$color.r}, ${$color.g}, ${$color.b}, 0.1)`};
  color: ${({ $color }) => `rgba(${$color.r}, ${$color.g}, ${$color.b}, 1)`};

  animation: ${fadeIn} 1s forwards;

  .chatRoomInfo {
    align-self: stretch;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 2fr;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    border-radius: 10% / 40%;
  }

  .roomName {
    grid-column: 1/3;
    grid-row: 2/3;
    font-weight: 600;
    font-size: x-large;
    margin: 0;
  }
  .memberCount {
    grid-column: 2/3;
    grid-row: 1/2;

    //margin: 1vw 1.5vw 1vw 2vw;
    margin-top: 0.3vw;
  }
  .hashTag {
    grid-column: 1/2;
    grid-row: 1/2;

    //margin: 1vw 1.5vw 1vw 2vw;
    margin-top: 0.3vw;
  }

  label {
    font-size: 1.5em;
    font-weight: 600;
    margin: 2vw 0 0.5vw 0;
  }

  input {
    all: unset;
    color: white;
    align-self: stretch;
    height: 5vw;
    border-radius: 10% / 50%;
    background-color: ${({ $color }) =>
      `rgba(${$color.r}, ${$color.g}, ${$color.b}, 1)`};
  }
  .enter {
    margin-top: 2vw;
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
  const { curLocation } = useMyLocationContext();

  const curChatRoom =
    chatRoomId !== -100
      ? chatRooms.find((chatRoom) => chatRoom.id === chatRoomId)
      : { ...roomSpec, memberCount: 0 };

  const handleChange = (e: { target: { value: string } }) => {
    //닉네임을 받아서 서버에 전송 밑 기타 처리 (정규식에 맞지 않는 닉네임일 경우 입장 비활성화)
    setNickName(e.target.value);
    setColor(generateColor(e.target.value));
  };

  const handleEnter = () => {
    if (chatRoomId !== -100) {
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
          navigate(`/chat/${res}`);
          console.log(roomSpec);
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
    <StyledChatRoomEnterDiv $color={color}>
      <div className="chatRoomInfo">
        <p className="roomName">{curChatRoom!.roomName}</p>
        <div className="hashTag">
          {chatRoomId !== -100 ? curChatRoom!.hashTag : tag}
        </div>
        <div className="memberCount">
          {chatRoomId !== -100 && curChatRoom!.memberCount}
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
