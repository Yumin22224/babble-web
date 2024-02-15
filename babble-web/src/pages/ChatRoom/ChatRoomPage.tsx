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

const StyledChatRoomDiv = styled(GlassmorphismDiv)`
  display: grid;
  border-radius: 0;
  border: none;
  padding: 0;

  .chatWrapper {
    padding: 0 4vw 1vw 4vw;
  }
`;

const StyledChatRoomInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid;
  //border-radius: 15%/100%;
  div {
    margin: 0 1vw;
    background-color: white;
    border-radius: 35% 35% 0% 0% / 60% 60% 0% 0%;
  }
  height: 5vw;
`;

const StyledDateDiv = styled.div``;

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  input {
    display: block;
    justify-self: stretch;
    width: 40vw;
    height: 10vw;
    all: unset;
    background-color: ${({ $color }) =>
      `rgba(${$color.r}, ${$color.g}, ${$color.b}, 1)`};
    color: ${({ $invColor }) =>
      `rgba(${$invColor.r}, ${$invColor.g}, ${$invColor.b}, 1)`};
  }

  .send {
    height: 20px;
    margin-right: 1vw;
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
        }

        if (foundRoom) {
          const chatsResponse = await getRecentChat(
            chatRoomId,
            curLocation.lat,
            curLocation.lng
          );
          setChatterCnt(chatsResponse.chatterCount);

          setChats(chatsResponse.chats);

          const date = new Date(chatsResponse.chats[0].createdTimeInSec * 1000);
          setLastChatDate({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
          });
        }
      } catch (error) {
        console.error("Fetching chats failed:", error);
        alert("다시 로그인 해주세요.");
        navigate(`/login`);
      }
    }
    fetchData();
  }, [chatRoomId, curLocation, navigate, setChatRooms]);

  const [chatContent, setChatContent] = useState("");

  const handleChange = (e) => {
    setChatContent(e.target.value);
    console.log(chatContent);
  };

  const handleSend = () => {
    setChatContent("");
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

          <StyledDateDiv>{`${lastChatDate.year}년 ${lastChatDate.month}월 ${lastChatDate.day}일`}</StyledDateDiv>
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
              className="content"
              placeholder="Send Message"
              onChange={handleChange}
              value={chatContent}
            />
            <div className="send" onClick={handleSend}>
              <SendIcon width="20px" height="20px" color={color} />
            </div>
          </StyledSendDiv>
        </StyledChatRoomDiv>
      </Wrapper>
    </>
  );
};

export default ChatRoomPage;
