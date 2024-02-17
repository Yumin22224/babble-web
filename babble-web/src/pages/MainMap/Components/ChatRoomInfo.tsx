import styled, { css, keyframes } from "styled-components";
import { ChatRoomType } from "../../../Constants";

//EAE5C9
//6CC6CB

//014871
//D7EDE2

const expandCircle = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
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
  width: 150px;
  height: 150px;
  background-color: transparent;

  overflow: hidden;

  color: #9fa5d5;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%; /* 원 모양을 만듭니다. */
    animation: ${expandCircle} 1s forwards;
    background-color: #85ffbd;
    background-image: linear-gradient(
      45deg,
      #85ffbd 0%,
      #fffb7d 50%,
      #ffffff 100%
    );
    filter: opacity(0.5);
  }

  &.valid {
    color: var(--1-hex);
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(to top, rgba(12, 46, 242, 0.5), transparent);
      border-radius: 50%; /* 원 모양을 만듭니다. */
      animation: ${expandCircle} 1s forwards;
    }
  }

  div {
    font-weight: 600;
    text-shadow:
      0 0 5px #ffffff,
      0 0 6px #ffffff,
      0 0 7px #ffffff,
      0 0 8px #ffffff,
      0 0 9px #ffffff,
      0 0 11px #ffffff,
      0 0 13px #ffffff,
      0 0 15px #ffffff,
      0 0 17px #ffffff,
      0 0 21px #fff;
  }
  .roomName {
    word-break: break-all;
    white-space: pre-wrap;
  }
`;

const StyledTag = styled.div`
  mix-blend-mode: hard-light;
  border-radius: 40%;
  z-index: 500;
`;

const StyledName = styled.div`
  mix-blend-mode: hard-light;
  border-radius: 40%;
  z-index: 500;
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
      className={`chatRoomInfo ${valid && `valid`}`}
    >
      <StyledTag className={`hashTag ${valid && `valid`}`}>
        {chatRoom.hashTag}
      </StyledTag>
      <StyledName className={`roomName ${valid && `valid`}`}>
        {chatRoom.roomName}
      </StyledName>
    </StyledChatRoomInfo>
  );
};

export default ChatRoomInfo;
