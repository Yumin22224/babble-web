import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { ChatRoomType } from "../../../Constants";
import ChatRoomInfo from "./ChatRoomInfo";

// eslint-disable-next-line react-refresh/only-export-components

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

const StyledChatRoomMarker = styled.div<{ $show: boolean }>`
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

  //   &:hover {
  //     animation: ${toCircle} 0.5s forwards;
  //   }

  animation: ${({ $show }) =>
    $show
      ? css`
          ${toCircle} 0.5s forwards
        `
      : css`
          ${toSemiCircle} 0.5s forwards
        `};
`;

export const ChatRoomMarker = ({ chatRoom }: { chatRoom: ChatRoomType }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <MarkerContainer
      id="container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $move={isHover}
    >
      <StyledChatRoomMarker className="chatRoomMarker" $show={isHover} />
      <ChatRoomInfo chatRoom={chatRoom} isHover={isHover} />
    </MarkerContainer>
  );
};

// MarkerContainer 스타일 컴포넌트
const MarkerContainer = styled.div<{ $move: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .chatRoomMarker {
    order: 2;
  }
  .chatRoomInfo {
    order: 1;
  }
`;
