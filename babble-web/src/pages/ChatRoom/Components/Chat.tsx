import styled, { css } from "styled-components";
import { generateColor, invertColor } from "../../../API/GenerateColor";
import { useState } from "react";
import { useEffect } from "react";
import Reply from "../../../assets/Reply.png";
import { forwardRef } from "react";

export type ChatType = {
  id: number;
  chatterId: number;
  chatterNickname: string;
  content: string;
  isMine: boolean;
  createdTimeInSec: number;
  parent: {
    id: number;
    chatterId: number;
    chatterNickname: string;
    content: string;
    isMine: boolean;
    createdTimeInSec: number;
  } | null;
};

const StyledChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 1vw 0;
  padding: 0 calc(2.2rem + 1vw) 0 0;
  min-width: calc(20rem + 5vw);

  &.isMine {
    justify-content: flex-end;
    padding: 0 0 0 calc(2.2rem + 1vw);
  }

  .reply {
    visibility: hidden;
    cursor: pointer;
  }
  .isReply {
    visibility: visible;
  }
  &:hover {
    .reply {
      visibility: visible;
    }
  }

  .chatAndReply {
    &.isMine {
      order: 2;
    }
    cursor: pointer;
  }
`;

const StyledChat = styled.div<{
  $color: { r: number; g: number; b: number };
  $invColor: { r: number; g: number; b: number };
}>`
  background-color: ${({ $color }) =>
    `rgba(${$color.r}, ${$color.g}, ${$color.b}, 0.9)`};
  color: ${({ $invColor }) =>
    `rgba(${$invColor.r}, ${$invColor.g}, ${$invColor.b}, 1)`};
  text-shadow: 0.5px 0.5px 0.5px #fff;

  padding: 0 1vh;
  max-width: calc(17rem + 5vw);
  text-align: left;

  word-break: keep-all;
  word-wrap: break-word;
  white-space: pre-wrap;

  &.parent {
    border-bottom: 1px solid;
  }
`;

const StyledDate = styled.div<{ $isMine: boolean }>`
  vertical-align: bottom;
  font-size: 0.7rem;
  height: 0.9rem;
  margin: 0 0.5vw;
`;

const StyledReply = styled.div`
  background-image: url(${Reply});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  filter: opacity(0.5);
  backdrop-filter: blur(100px);
  background-color: rgba(128, 166, 242, 0.5);

  width: calc(2.2rem + 1vw);
  height: 100%;

  &.isMine {
    order: 3;
    transform: scaleX(-1);
  }
`;

interface ChatProps {
  chat: ChatType;
  handleReplyClick: (arg: number) => void;
  handleParentClick: (parentId: number) => void; // 추가된 함수
  isReply: boolean;
  parentId: null | number;
}

const Chat = forwardRef<HTMLDivElement, ChatProps>(
  ({ chat, handleReplyClick, handleParentClick, isReply, parentId }, ref) => {
    const color = generateColor(chat.chatterNickname);
    const invColor = invertColor(color);

    const parentColor = generateColor(chat.parent?.chatterNickname || "");
    const invParentColor = invertColor(parentColor);

    const onParentClick = () => {
      if (chat.parent) {
        handleParentClick(chat.parent.id);
      }
    };

    const [time, setTime] = useState({
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      min: 0,
    });
    useEffect(() => {
      const date = new Date(chat.createdTimeInSec * 1000);
      setTime({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        min: date.getMinutes(),
      });
    }, [chat.createdTimeInSec]);

    return (
      <StyledChatContainer className={`container ${chat.isMine && "isMine"}`}>
        <StyledReply
          className={`reply ${chat.isMine && "isMine"} ${
            isReply && parentId === chat.id && "isReply"
          }`}
          onClick={() => handleReplyClick(chat.id)}
        />
        <div className={`chatAndReply ${chat.isMine && "isMine"}`}>
          {chat.parent && (
            <StyledChat
              className={`chat ${chat.isMine && "isMine"} parent`}
              $color={parentColor}
              $invColor={invParentColor}
              onClick={onParentClick}
            >
              {chat.parent.content}
            </StyledChat>
          )}
          <StyledChat
            ref={ref}
            className={`chat ${chat.isMine && "isMine"}`}
            $color={color}
            $invColor={invColor}
          >
            {chat.content}
          </StyledChat>
        </div>

        <StyledDate
          $isMine={chat.isMine}
        >{`${time.hour}:${time.min}`}</StyledDate>
      </StyledChatContainer>
    );
  }
);

export default Chat;
