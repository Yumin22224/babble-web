import { useParams } from "react-router-dom";
import { GlassmorphismDiv } from "../../StyledComponents/GmDiv";
import styled from "styled-components";
//import { SampleChatRoomList } from "../../Constants";
import { Wrapper } from "../../StyledComponents/Wrapper";
import { useContext, useState } from "react";
import { NewChatRoomContext } from "../../Context/ChatRoomsContext";
import { useEffect } from "react";
import { getChatRooms, getRecentChat } from "../../API/ChatAPI";
import { useMyLocationContext } from "../../Context/MyLocationContext";
import Chat from "./Components/Chat";

const StyledChatRoomDiv = styled(GlassmorphismDiv)`
  display: grid;
`;

const StyledChatRoomInfo = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid;
  border-radius: 10%/60%;
  div {
    margin: 0 1vw;
  }
`;

const StyledDateDiv = styled.div``;

const StyledChatsDiv = styled.div``;

const ChatRoomPage = () => {
  const context = useContext(NewChatRoomContext);
  if (!context) {
    throw new Error(
      "useContext(NewChatRoomContext) must be inside a Provider with a value"
    );
  }
  const { chatRooms, setChatRooms } = context;
  const { curLocation } = useMyLocationContext();

  const chatRoomId = parseInt(useParams().id!);
  const curChatRoom = chatRooms[chatRoomId];
  const [chatterCnt, setChatterCnt] = useState(0);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChatRooms(curLocation).then(setChatRooms);
    getRecentChat(chatRoomId, curLocation.lat, curLocation.lng).then((res) => {
      setChatterCnt(res.chatterCount);
      setChats(res.chats);
    });
      //console.log(chatRooms);
  }, []);

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
                  <StyledDateDiv></StyledDateDiv>
                  <StyledChatsDiv>
                      {chats.map((chat, index) => (
                          <Chat chat={chat} key={index}/>
                      ))}
                  </StyledChatsDiv>
        </StyledChatRoomDiv>
      </Wrapper>
    </>
  );
};

export default ChatRoomPage;
