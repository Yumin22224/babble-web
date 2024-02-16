import styled, { css } from "styled-components";
import { generateColor, invertColor } from "../../../API/GenerateColor";
import { useState } from "react";
import { useEffect } from "react";

export type ChatType = {
  id: number;
  chatterId: number;
  chatterNickname: string;
  content: string;
  isMine: boolean;
  createdTimeInSec: number;
};

const StyledChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 1vw 0;
  padding: 0 calc(2.2rem + 1vw);
  min-width: calc(20rem + 5vw);

  &.isMine {
    justify-content: flex-end;
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

  &.isMine {
    order: 2;
  }

  word-break: keep-all;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const StyledDate = styled.div<{ $isMine: boolean }>`
  vertical-align: bottom;
  font-size: 0.7rem;
  height: 0.9rem;
  margin: 0 0.5vw;
`;

const Chat = ({ chat }: { chat: ChatType }) => {
  const color = generateColor(chat.chatterNickname);
  const invColor = invertColor(color);
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
      <StyledChat
        className={`chat ${chat.isMine && "isMine"}`}
        $color={color}
        $invColor={invColor}
      >
        {chat.content}
      </StyledChat>
      <StyledDate
        $isMine={chat.isMine}
      >{`${time.hour}:${time.min}`}</StyledDate>
    </StyledChatContainer>
  );
};

export default Chat;
