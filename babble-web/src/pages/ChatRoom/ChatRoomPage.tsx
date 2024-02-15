import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GlassmorphismDiv } from "../../StyledComponents/GmDiv";
import styled from "styled-components";
//import { SampleChatRoomList } from "../../Constants";
import { Wrapper } from "../../StyledComponents/Wrapper";
import { useContext, useState } from "react";
import { NewChatRoomContext } from "../../Context/ChatRoomsContext";
import { useEffect } from "react";
import {
  getChat,
  getChatRooms,
  getRecentChat,
  sendChat,
} from "../../API/ChatAPI";
import { useMyLocationContext } from "../../Context/MyLocationContext";
import Chat, { ChatType } from "./Components/Chat";
import { ColorType, useUserContext } from "../../Context/UserContext";
import SendIcon from "./Components/SendIcon";
import { invertColor } from "../../API/GenerateColor";
import squaredPaper from "../../assets/squaredPaper.jpeg";
//import linePaper from "../../assets/linePaper.jpg";

const StyledChatRoomDiv = styled(GlassmorphismDiv)`
  display: grid;
  border-radius: 0;
  border: none;
  padding: 0;
  background-image: url(${squaredPaper});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  backdrop-filter: brightness(10%);
  color: #040159;
  .chatWrapper {
    padding-bottom: 1vh;
  }
`;

const StyledChatRoomInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  //border-bottom: 1px solid;

  div {
    background-color: white;
    border-radius: 30% 30% 0% 0% / 40% 40% 0% 0%;
    padding: calc(0.5rem + 0.5vw);
    position: relative;
    box-shadow: 3px 0px 5px -3px rgba(0, 0, 0, 0.5);
  }
  .roomName {
    background-color: var(--4-hex);
    z-index: 100;
    margin-right: -10px;
  }
  .tag {
    background-color: var(--3-hex);
    z-index: 50;
    min-width: calc(3rem + 1vw);
    margin-right: -10px;
  }
  .memberCount {
    background-color: var(--5-hex);
    z-index: 10;
    min-width: calc(2rem + 1vw);
  }
  //height: 5vh;
`;

const StyledDateDiv = styled.div`
  z-index: 200;
  height: calc(2rem + 1vh);
  line-height: 2.5;
  font-weight: 600;
  border-top: 1px solid;
  border-bottom: 1px solid;
`;

const StyledChatsDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  overscroll-behavior: contain;
  height: 70vh;

  // 웹킷 기반 브라우저를 위한 스타일
  &::-webkit-scrollbar {
    width: 0;
  }

  // Firefox를 위한 스타일
  scrollbar-width: none;
`;

const StyledSendDiv = styled.div<{ $color: ColorType; $invColor: ColorType }>`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ $invColor }) =>
    `rgba(${$invColor.r}, ${$invColor.g}, ${$invColor.b}, 1)`};

  input {
    grid-row: 1/2;
    grid-column: 1/2;
    display: block;
    justify-self: stretch;
    max-width: calc(23.5rem + 5vw);
    height: calc(3rem + 1vh);

    font-size: 1.3em;

    border: none;
    background-color: ${({ $color }) =>
      `rgba(${$color.r}, ${$color.g}, ${$color.b}, 1)`};
    color: ${({ $invColor }) =>
      `rgba(${$invColor.r}, ${$invColor.g}, ${$invColor.b}, 1)`};
  }
  input::placeholder {
    font-size: 1.5em;
    margin-top: 1vw;
  }

  .send {
    grid-row: 1/2;
    grid-column: 2/3;
    height: 30px;
    margin: 0 calc(0.3rem + 0.25vw) 0 calc(0.3rem + 0.25vw);
    cursor: pointer;
  }
`;

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const context = useContext(NewChatRoomContext);
  if (!context) {
    throw new Error(
      "useContext(NewChatRoomContext) must be inside a Provider with a value"
    );
  }
  const { setChatRooms } = context;
  const { curLocation } = useMyLocationContext();
  const { color } = useUserContext();
  const invColor = invertColor(color);

  const chatRoomId = parseInt(useParams().id!);
  const [curChatRoom, setCurChatRoom] = useState({
    id: -100,
    roomName: "",
    location: { lat: 0, lng: 0 },
    hashTag: "",
    memberCount: 0,
  });
  const [chatterCnt, setChatterCnt] = useState(0);

  const [chats, setChats] = useState<ChatType[]>([]);

  const [lastChatDate, setLastChatDate] = useState({
    year: 0,
    month: 0,
    day: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const roomsResponse = await getChatRooms(curLocation);
        setChatRooms(roomsResponse);

        const foundRoom = roomsResponse.find((room) => room.id === chatRoomId);
        if (foundRoom) {
          setCurChatRoom(foundRoom);
          //console.log(foundRoom);
        } else {
          console.log("No room found with ID:", chatRoomId);
          alert("해당 채팅방은 존재하지 않습니다.");
          navigate(`/main`);
          return;
        }

        if (foundRoom) {
          const chatsResponse = await getRecentChat(
            chatRoomId,
            curLocation.lat,
            curLocation.lng
          );
          setChatterCnt(chatsResponse.chatterCount);

          setChats(chatsResponse.chats);

          if (chatsResponse.chats.length > 0) {
            const date = new Date(
              chatsResponse.chats[0].createdTimeInSec * 1000
            );
            setLastChatDate({
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
            });
          }
        }
      } catch (error) {
        console.error("Fetching failed:", error);
        alert("다시 로그인 해주세요.");
        navigate(`/login`);
      }
    }
    fetchData();
  }, [chatRoomId, curLocation, navigate, setChatRooms]);

  const [chatContent, setChatContent] = useState("");

  const handleChange = (e) => {
    setChatContent(e.target.value);
  };

  const handleSend = () => {
    if (chatContent.length > 0) {
      sendChat(
        {
          content: chatContent,
          latitude: curLocation.lat,
          longitude: curLocation.lng,
        },
        chatRoomId
      )
        .then((res) => {
          getChat({ latestChatId: res.id, location: curLocation }, chatRoomId)
            .then((res) => {
              setChats(res);
            })
            .catch((err) => {
              console.log("Fetching chats failed:", err);
            });
        })
        .catch((err) => {
          console.log("Sending chat failed:", err);
        });
      setChatContent("");
    } else {
      alert("채팅을 입력해주세요.");
    }
  };

  //-------------------------------------------------------------------------//

  return (
    <>
      <Wrapper>
        <StyledChatRoomDiv>
          <StyledChatRoomInfo className="chatRoomInfo">
            <div className="roomName">{curChatRoom.roomName}</div>
            <div className="tag">{curChatRoom.hashTag}</div>
            <div className="memberCount">{chatterCnt}</div>
          </StyledChatRoomInfo>

          <StyledDateDiv>
            {lastChatDate.year !== 0
              ? `${lastChatDate.year}년 ${lastChatDate.month}월 ${lastChatDate.day}일`
              : "Too Quiet..."}
          </StyledDateDiv>
          <div className="chatWrapper">
            <StyledChatsDiv>
              {chats.map((chat, index) => (
                <Chat chat={chat} key={index} />
              ))}
            </StyledChatsDiv>
          </div>
          <StyledSendDiv
            className="sendContainer"
            $color={color}
            $invColor={invColor}
          >
            <input
              id="sendConent"
              className="content"
              placeholder="Send Message"
              onChange={handleChange}
              value={chatContent}
            />
            <div className="send" onClick={handleSend}>
              <SendIcon width="30px" height="30px" color={color} />
            </div>
          </StyledSendDiv>
        </StyledChatRoomDiv>
      </Wrapper>
    </>
  );
};

export default ChatRoomPage;
