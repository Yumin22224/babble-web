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

  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(
    to bottom,
    rgba(253, 219, 146, 0.1) 0%,
    rgba(209, 253, 255, 1) 100%
  );
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
        <ListBtn handleClick={handleClick} show={showList} />
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

const StyledListBtn = styled(GlassmorphismDiv)<{ $show: boolean }>`
  z-index: 400;
  position: absolute;
  top: 50%;
  left: 3%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  padding: 5px;
  filter: invert(21%) sepia(79%) saturate(3711%) hue-rotate(231deg)
    brightness(100%) contrast(90%);
  box-shadow: -9px -9px 16px rgba(255, 255, 255, 0.6);
  border-radius: 30px;

  background-image: url(https://cdn.icon-icons.com/icons2/2385/PNG/512/list_icon_144238.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 25px;
  filter: drop-shadow(9px 9px 16px rgba(163, 177, 198, 0.6)) blur(0.5px);

  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  ${($show) => $show && `background-color: rgba(255, 255, 255, 1);`}

  @media screen and (max-width: 450px) {
    top: 9vh;
    left: 80vw;
  }
`;

const ListBtn = ({
  handleClick,
  show,
}: {
  handleClick: () => void;
  show: boolean;
}) => {
  return <StyledListBtn onClick={handleClick} $show={show} />;
};
