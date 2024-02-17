import styled from "styled-components";
import { GlassmorphismDiv } from "../../StyledComponents/GmDiv.tsx";
import MainMap from "./MainMap";
import { ListDiv } from "./Components/ChatRoomList";
import { useEffect, useState } from "react";
import NewChatRoomPage from "../NewChatRoom/NewChatRoomPage";

const StyledMainContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;

  // 웹킷 기반 브라우저를 위한 스타일
  &::-webkit-scrollbar {
    width: 0;
  }

  // Firefox를 위한 스타일
  scrollbar-width: none;
`;

const StyledMainDiv = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;

const StyledWrapper = styled.div<{ $show: boolean }>`
  z-index: 300;
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainPage = () => {
  const [showList, setShowList] = useState(false);
  const handleClick = () => {
    setShowList(!showList);
  };
  const [scroll, setScroll] = useState(false);

  const closeList = (e) => {
    setShowList(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, []);

  const handleScroll = () => {
    // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
    if (window.scrollY >= 1) {
      setScroll(true);
      console.log(scroll);
    } else {
      // 스크롤이 50px 미만일경우 false를 넣어줌
      setScroll(false);
    }
  };
  return (
    <StyledMainContainer>
      <StyledMainDiv>
        <ListBtn handleClick={handleClick} />
        {showList && (
          <StyledWrapper onClick={closeList} $show={showList}>
            <ListDiv show={showList} />
          </StyledWrapper>
        )}
        <MainMap />
      </StyledMainDiv>
      <NewChatRoomPage />
    </StyledMainContainer>
  );
};

export default MainPage;

const StyledListBtn = styled(GlassmorphismDiv)`
  z-index: 400;
  position: absolute;
  top: 50%;
  left: 3%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1px);
  border: 2px solid rgba(53, 81, 242, 0.3);
  border-radius: 30%;
  background-image: url(https://cdn.icon-icons.com/icons2/2385/PNG/512/list_icon_144238.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 25px;
  backdrop-filter: invert(15%) sepia(93%) saturate(6130%) hue-rotate(236deg)
    brightness(94%) contrast(103%);

  cursor: pointer;
  &:hover {
    background-color: rgba(53, 81, 242, 0.5);
  }

  @media screen and (max-width: 450px) {
    top: 9vh;
    left: 80vw;
  }

  
`;

const ListBtn = ({ handleClick }: { handleClick: () => void }) => {
  return <StyledListBtn onClick={handleClick} />;
};



// /* CSS */
// .button-86 {
//   all: unset;
//   width: 100px;
//   height: 30px;
//   font-size: 16px;
//   background: transparent;
//   border: none;
//   position: relative;
//   color: #f0f0f0;
//   cursor: pointer;
//   z-index: 1;
//   padding: 10px 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   white-space: nowrap;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
// }

// .button-86::after,
// .button-86::before {
//   content: '';
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   z-index: -99999;
//   transition: all .4s;
// }

// .button-86::before {
//   transform: translate(0%, 0%);
//   width: 100%;
//   height: 100%;
//   background: #28282d;
//   border-radius: 10px;
// }

// .button-86::after {
//   transform: translate(10px, 10px);
//   width: 35px;
//   height: 35px;
//   background: #ffffff15;
//   backdrop-filter: blur(5px);
//   -webkit-backdrop-filter: blur(5px);
//   border-radius: 50px;
// }

// .button-86:hover::before {
//   transform: translate(5%, 20%);
//   width: 110%;
//   height: 110%;
// }

// .button-86:hover::after {
//   border-radius: 10px;
//   transform: translate(0, 0);
//   width: 100%;
//   height: 100%;
// }

// .button-86:active::after {
//   transition: 0s;
//   transform: translate(0, 5%);
// }