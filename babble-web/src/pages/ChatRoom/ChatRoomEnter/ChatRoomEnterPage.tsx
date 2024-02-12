import styled from "styled-components";
import { GlassmorphismDiv } from "../../../StyledComponents/GmDiv";
import { useNavigate, useParams } from "react-router-dom";
import { SampleChatRoomList } from "../../../Constants";
import { useUserContext } from "../../../Context/UserContext";

const StyledChatRoomEnterDiv = styled(GlassmorphismDiv)`
  width: calc(5vw + 15em);
  height: calc(5vw + 15em);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .chatRoomInfo {
    align-self: stretch;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    border: 1px solid;
  }

  .roomName {
    grid-column: 1/2;
    grid-row: 1/3;
    font-weight: 600;
    font-size: x-large;
  }
  .memberCount {
    grid-column: 2/3;
    grid-row: 1/2;
    margin: 1vw 0 0 0;
  }
  .hashTag {
    grid-column: 2/3;
    grid-row: 2/3;
    margin: 0 0 1vw 0;
  }

  label {
    font-size: 1.5em;
    font-weight: 600;
    margin: 3vw 0;
  }

  input {
    align-self: stretch;
    height: 4vw;
  }
`;

const StyledButton = styled(GlassmorphismDiv)`
  border-radius: 20%;
  padding: 1vw;
  width: calc(2em + 1vw);
  height: calc(0.5em + 1vw);
  vertical-align: middle;
  margin-top: 3vw;
`;

const ChatRoomEnterPage = () => {
  const navigate = useNavigate();
  const chatRoomId = parseInt(useParams().id!);
  const curChatRoom = SampleChatRoomList.find(
    (chatRoom) => chatRoom.id === chatRoomId
  );
    const { setNickName } = useUserContext();

  const handleChange = (e: { target: { value: string; }; }) => {
      //닉네임을 받아서 서버에 전송 밑 기타 처리 (정규식에 맞지 않는 닉네임일 경우 입장 비활성화)
      setNickName(e.target.value);
  };

  const handleEnter = () => {
    navigate(`/chat/${curChatRoom!.id}`); //기존 채팅방 유저
  };

  return (
    <StyledChatRoomEnterDiv>
      <div className="chatRoomInfo">
        <div className="roomName">{curChatRoom!.roomName}</div>
        <div className="hashTag">{curChatRoom!.hashTag}</div>
        <div className="memberCount">{curChatRoom!.memberCount}</div>
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
