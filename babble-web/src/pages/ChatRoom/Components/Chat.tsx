import styled from "styled-components";
import { generateColor } from "../../../API/GenerateColor";
import { useState } from "react";
import { useEffect } from "react";

type ChatType = {
  id: number;
  chatterId: number;
  chatterNickname: string;
  content: string;
  isMine: boolean;
  createdTimeInSec: number;
};

const StyledChat = styled.div<{
  $color: { r: number; g: number; b: number };
}>`
  background-color: ${({ $color }) =>
    `rgba(${$color.r}, ${$color.g}, ${$color.b}, 1)`};
`;

const StyledDate = styled.div<{ $isMine: boolean }>``;

const Chat = ({ chat }: { chat: ChatType }) => {
  const color = generateColor(chat.chatterNickname);
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
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      min: date.getUTCMinutes(),
    });
  }, []);

  return (
    <>
      <StyledChat className={`chat ${chat.isMine && "isMine"}`} $color={color}>
        {chat.content}
      </StyledChat>
      <StyledDate $isMine={chat.isMine}>{`${time.hour}:${time.min}`}</StyledDate>
    </>
  );
};

export default Chat;