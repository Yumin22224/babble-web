import styled, { keyframes } from "styled-components";
import { ChatRoomType } from "../../../Constants";

const hologramBeam = keyframes`
  0% {
    clip-path: polygon(25% 100%, 75% 100%, 65% 100%, 35% 100%);
    opacity: 0.5;
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 65% 100%, 35% 100%);
    opacity: 1;
  }
`;

const StyledChatRoomInfo = styled.div<{ $show: boolean }>`
  display: ${(prop) => (prop.$show ? "flex" : "none")};
  flex-direction: column;
  justify-content:center;

  position: absolute;
  bottom: 50px;

  width: 120px;
  height: 150px;
  background-color: transparent;
  color: rgba(12, 46, 242, 1);
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(12, 46, 242, 0.5), transparent);
    clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
    animation: ${hologramBeam} 1s forwards;
  }

  div {
    font-weight: 600;
  }
`;

const ChatRoomInfo = ({
  chatRoom,
  isHover,
}: {
  chatRoom: ChatRoomType;
  isHover: boolean;
}) => {
  return (
    <StyledChatRoomInfo $show={isHover} className="chatRoomInfo">
      <div className="hashTag">{chatRoom.hashTag}</div>
      <div className="roomName">{chatRoom.roomName}</div>
      <div className="memberCount">{chatRoom.memberCount}</div>
    </StyledChatRoomInfo>
  );
};

export default ChatRoomInfo;
