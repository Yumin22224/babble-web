import styled, { css, keyframes } from "styled-components";
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

const StyledChatRoomInfo = styled.div<{
  $show: boolean;
  $expand: boolean;
  $valid: boolean;
}>`
  display: ${(prop) => (prop.$show && !prop.$expand ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;

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
    ${($valid) =>
      $valid
        ? css`
            background: linear-gradient(
              to top,
              rgba(12, 46, 242, 0.5),
              transparent
            );
          `
        : css`
            background: linear-gradient(
              to top,
              rgba(2, 0, 36, 0.5494791666666667) 0%,
              rgba(0, 212, 255, 0.4150253851540616) 100%
            );
          `}
    clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
    animation: ${hologramBeam} 1s forwards;
  }

  div {
    font-weight: 600;
    text-shadow:
      0 0 5px #ffffff,
      0 0 9px #ffffff,
      0 0 13px #ffffff,
      0 0 17px #ffffff,
      0 0 21px #fff;
  }
  .roomName {
    word-break: break-all;
    white-space: pre-wrap;
  }

  ${$valid => !$valid && `color: white;`}
`;

const ChatRoomInfo = ({
  chatRoom,
  isHover,
  expand,
  valid,
}: {
  chatRoom: ChatRoomType;
  isHover: boolean;
  expand: boolean;
  valid: boolean;
}) => {
  return (
    <StyledChatRoomInfo
      $show={isHover}
      $expand={expand}
      $valid={valid}
      className="chatRoomInfo"
    >
      <div className="hashTag">{chatRoom.hashTag}</div>
      <div className="roomName">{chatRoom.roomName}</div>
    </StyledChatRoomInfo>
  );
};

export default ChatRoomInfo;
