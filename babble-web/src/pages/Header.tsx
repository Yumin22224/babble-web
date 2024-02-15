//화면 상단 로고, 날짜, 시간
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { GlassmorphismDiv } from "../StyledComponents/GmDiv";

const StyledHeader = styled(GlassmorphismDiv)<{ $isChatRoute: boolean }>`
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
  h1 {
    cursor: pointer;
    transition: text-shadow 0.2s ease-in-out;
    &:hover {
      text-shadow:
        0 0 5px #ffffff,
        0 0 7px #80a6f2,
        0 0 9px #80a6f2,
        0 0 11px #80a6f2,
        0 0 13px #80a6f2;
    }
  }

  p {
    font-size: calc(0.5rem + 0.8vw);
    margin: 0 10px;
  }
  div {
    margin: 10px 0;
  }

  ${(props) =>
    props.$isChatRoute
      ? css`
          background: transparent;
          backdrop-filter: none;
          top: 1vw; // 위치 변경
          left: 13%; // 위치 변경
          transform: translateX(-50%) scale(0.6); // 크기 및 위치 조정
          border: none;

          @media screen and (max-width: 905px) {
            background: transparent;
            backdrop-filter: none;
            box-shadow: none;
            top: -1%;
            left: 70%;
            div {
              display: none;
            }
          }
          @media screen and (max-width: 450px) {
            background: transparent;
            backdrop-filter: none;
            box-shadow: none;
            top: calc(1rem + 1vh);
            left: 80%;
            div {
              display: none;
            }
          }
        `
      : css`
          @media screen and (max-width: 400px) {
            border-radius: 60% / 60%;
            top: 1vh;
            left: 1vw;
            transform: scale(0.7);
            div {
              display: none;
            }
          }
        `}

  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith("/chat/");

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
      <StyledHeader $isChatRoute={isChatRoute}>
        <h1 onClick={() => navigate(`/main`)}>babble</h1>
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
