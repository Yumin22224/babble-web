import { useParams } from "react-router-dom";
import { GlassmorphismDiv } from "../../StyledComponents/GmDiv";
import styled from "styled-components";
import { SampleChatRoomList } from "../../Constants";
import { Wrapper } from "../../StyledComponents/Wrapper";


const StyledChatRoomDiv = styled(GlassmorphismDiv)``;

const ChatRoomPage = () => {
  const chatRoomId = parseInt(useParams().id!);
  const CurChatRoom = SampleChatRoomList.filter(
    (chatRoom) => chatRoom.id === chatRoomId
  );

  return (
    <>
      <Wrapper>
        <StyledChatRoomDiv></StyledChatRoomDiv>
      </Wrapper>
    </>
  );
};

export default ChatRoomPage;
