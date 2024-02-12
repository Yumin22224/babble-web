import styled from "styled-components";
import { GlassmorphismDiv } from "../../../StyledComponents/GmDiv";
import { ChatRoomType, SampleChatRoomList } from "../../../Constants";
import { useNavigate } from "react-router-dom";

const StyledListDiv = styled(GlassmorphismDiv)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 30%/20%;
  padding: 3vw;
`;

export const ListDiv = () => {
  return (
    <StyledListDiv>
      {SampleChatRoomList.map((chatRoom) => (
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

    const handleBoxClick = () => {
      //navigate(`/chat/${chatRoom.id}`); //기존 채팅방 유저
      navigate(`/enter/${chatRoom.id}`); //새로운 채팅방 유저
    };

  return (
    <StyledBox onClick={handleBoxClick}>
      <div className="hashTag">{chatRoom.hashTag}</div>
      <div className="memberCount">{chatRoom.memberCount}</div>
      <div className="roomName">{chatRoom.roomName}</div>
    </StyledBox>
  );
};
