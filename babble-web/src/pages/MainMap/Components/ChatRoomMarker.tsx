import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { ChatRoomType } from "../../../Constants";
import ChatRoomInfo from "./ChatRoomInfo";
import { useNavigate } from "react-router-dom";

const toCircle = keyframes`
  from {
    height: 30px;
    width: 50px;
    border-radius: 60% 60% 18% 18% / 100% 100% 25% 25%;
    opacity: 0.7;
    bottom:0;
  }
  to {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    opacity: 1;
    bottom:25px;
  }
`;

const toSemiCircle = keyframes`
  from {
    height: 50px;
    width: 50px;
    border-radius: 50%; 
    opacity: 1;
    bottom:25px;
  }
  to {
    height: 30px;
    width: 50px;
    border-radius: 60% 60% 18% 18% / 100% 100% 25% 25%;
    opacity: 0.7;
    bottom:0;
  }
`;

const StyledChatRoomMarker = styled.div<{ $show: boolean; $expand: boolean }>`
  width: 50px;
  height: 30px;
  position: absolute;

  background: rgb(240, 242, 201);
  background: -moz-linear-gradient(
    0deg,
    rgba(240, 242, 201, 1) 0%,
    rgba(12, 47, 242, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(240, 242, 201, 1) 0%,
    rgba(12, 47, 242, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(240, 242, 201, 1) 0%,
    rgba(12, 47, 242, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f0f2c9",endColorstr="#0c2ff2",GradientType=1);

  border-radius: 60% 60% 18% 18% / 100% 100% 25% 25%;
  position: relative;
  opacity: 0.7;

  animation: ${({ $show, $expand }) =>
    $show || $expand
      ? css`
          ${toCircle} 0.5s forwards
        `
      : css`
          ${toSemiCircle} 0.5s forwards
        `};
`;

export const ChatRoomMarker = ({ chatRoom }: { chatRoom: ChatRoomType }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => setIsHover(false);

  const handleClick = () => {
    setIsExpanding(true);
    setTimeout(() => {
        //navigate(`/chat/${chatRoom.id}`); //기존 채팅방 유저
        navigate(`/enter/${chatRoom.id}`); //새로운 채팅방 유저
    }, 2000);
  };

  return (
    <MarkerContainer
      id="container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      $expand={isExpanding}
      $show={isHover}
    >
      <StyledChatRoomMarker
        className="chatRoomMarker"
        $show={isHover}
        $expand={isExpanding}
      />
      <ChatRoomInfo
        chatRoom={chatRoom}
        isHover={isHover}
        expand={isExpanding}
      />
    </MarkerContainer>
  );
};

const MarkerContainer = styled.div<{ $expand: boolean; $show: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor:pointer;

  .chatRoomMarker {
    order: 2;
  }
  .chatRoomInfo {
    order: 1;
`;
