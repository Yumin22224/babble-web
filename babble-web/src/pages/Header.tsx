//화면 상단 로고, 날짜, 시간
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { GlassmorphismDiv } from "../StyledComponents/gmDiv";

const StyledHeader = styled(GlassmorphismDiv)`
  position: fixed;
  top: 1vw;
  left: 5vw;
  border-radius: 30% / 70%;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;

  transform: scale(0.8);
  & > h1,
  p {
    margin: 0 10px 10px 10px;
    vertical-align: bottom;
  }

  p {
    font-size: calc(0.5rem + 0.8vw);
    margin: 0 10px;
  }
  div {
    margin: 10px 0;
  }
`;

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 매초마다 현재 시간 업데이트

    return () => {
      clearInterval(timerId); // 컴포넌트가 언마운트될 때 인터벌 제거
    };
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate().toString().padStart(2, "0");
    return `${year} / ${month} / ${day}`;
  };

  const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}H ${m}M ${s}S`;
  };

  return (
    <>
      <StyledHeader>
        <h1>babble</h1>
        <div>
          <p>{formatDate(currentTime)}</p>
          <p>{formatTime(currentTime)}</p>
        </div>
      </StyledHeader>
      <Outlet />
    </>
  );
};

export default Header;
