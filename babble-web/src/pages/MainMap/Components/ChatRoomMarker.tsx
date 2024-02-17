import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { ChatRoomType } from "../../../Constants";
import ChatRoomInfo from "./ChatRoomInfo";
import { useNavigate } from "react-router-dom";
import { useMyLocationContext } from "../../../Context/MyLocationContext";
import { getRecentChat } from "../../../API/ChatAPI";

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

const moveToCenter = keyframes`
to {
    transform:translate(-50%,-50%);
    //left: 50%; 
    //top:50%;
    opacity:1;
}
`;

const expandToFullScreen = keyframes`
30%{
  opacity: 0.3;
}
  100% {
    width: 100vw;
    height: 100vw;
    border-radius: 50%;
    opacity: 0.1;
    bottom: 0;
    left: 0;
    background: rgb(1,72,113);
background: radial-gradient(circle, rgba(1,72,113,1) 0%, rgba(215,237,226,0) 100%);
  }
`;

const StyledChatRoomMarker = styled.div<{
  $show: boolean;
  $expand: boolean;
  $valid: boolean;
}>`
  width: 50px;
  height: 30px;
  position: absolute;

  background-color: #FBAB7E;
background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);


  &.valid {
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
  }
  );

  border-radius: 60% 60% 18% 18% / 100% 100% 25% 25%;
  position: relative;
  opacity: 0.7;

  animation: ${({ $show, $expand }) =>
    $expand
      ? css`
          ${moveToCenter} 0.5s forwards,
          ${expandToFullScreen} 0.5s 0.5s forwards
        `
      : $show
      ? css`
          ${toCircle} 0.5s forwards
        `
      : css`
          ${toSemiCircle} 0.5s forwards
        `};

  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

export const ChatRoomMarker = ({
  chatRoom,
  isValid,
}: {
  chatRoom: ChatRoomType;
  isValid: boolean;
}) => {
  const navigate = useNavigate();
  const { curLocation } = useMyLocationContext();
  const [isHover, setIsHover] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => setIsHover(false);

  const handleClick = () => {
    if (isValid) {
      setIsExpanding(true);
      setTimeout(() => {
        getRecentChat(chatRoom.id, curLocation.lat, curLocation.lng)
          .then((res) => {
            if (res.status !== 401) {
              if (res.data.isChatter) {
                //기존 채팅방, isChatter가 true인 경우
                navigate(`/chat/${chatRoom.id}`);
              } else {
                //기존 채팅방, isChatter가 false인 경우
                navigate(`/enter/${chatRoom.id}`);
              }
            } else {
              alert("다시 로그인 해주세요.");
              navigate(`/login`);
            }
          })
          .catch((error) => {
            console.log(
              "error getting recent chat (getting previous chats)",
              error
            );
          });
      }, 1000);
    } else {
      alert(`너무 먼 거리의 채팅방입니다.`);
    }
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
        className={`chatRoomMarker ${isValid && `valid`}`}
        $show={isHover}
        $expand={isExpanding}
        $valid={isValid}
      />
      <ChatRoomInfo
        chatRoom={chatRoom}
        isHover={isHover}
        expand={isExpanding}
        valid={isValid}
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
