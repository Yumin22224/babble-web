import { useParams } from "react-router-dom";
import { GlassmorphismDiv } from "../../StyledComponents/GmDiv";
import styled from "styled-components";
import { SampleChatRoomList } from "../../Constants";

const StyledChatRoomDiv = styled(GlassmorphismDiv)``;

const ChatRoomPage = () => {
    const chatRoomId = parseInt(useParams().id!);
    const CurChatRoom = SampleChatRoomList.filter((chatRoom) => chatRoom.id === chatRoomId);

    return <StyledChatRoomDiv>
        
    </StyledChatRoomDiv>
}

export default ChatRoomPage;