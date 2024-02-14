import styled from "styled-components";
import { GlassmorphismDiv } from "../../StyledComponents/GmDiv";
import MainMap from "./MainMap";
import { ListDiv } from "./Components/ChatRoomList";
import { useEffect, useState } from "react";
import NewChatRoomPage from "../NewChatRoom/NewChatRoomPage";

const StyledMainContainer = styled.div`
  width: 100%;
  height: 100vh;
  //overflow: hidden;
  background: #000;
`;

const StyledMainDiv = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;

const MainPage = () => {
  const [showList, setShowList] = useState(false);
  const handleClick = () => {
    setShowList(!showList);
  };
  const [scroll, setScroll] = useState(false);

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
        {showList && <ListDiv />}
        <MainMap />
      </StyledMainDiv>
      <NewChatRoomPage />
    </StyledMainContainer>
  );
};

export default MainPage;

const StyledListBtn = styled(GlassmorphismDiv)`
  position: absolute;
  top: 50%;
  left: 3%;
  transform: translateY(-50%);
  z-index: 100;
  width: 30px;
  height: 30px;
  padding: 5px;
  background: rgba(12, 46, 242, 0.1);
  backdrop-filter: blur(1px);
  //border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 30%;
  background-image: url(https://cdn.icon-icons.com/icons2/2385/PNG/512/list_icon_144238.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 25px;

  cursor: pointer;
  &:hover {
    box-shadow:
      0 0 3px #ffffff,
      0 0 5px #ff00de,
      0 0 8px #ff00de,
      0 0 10px #ff00de,
      0 0 12px #ff00de;
  }
`;

const ListBtn = ({ handleClick }: { handleClick: () => void }) => {
  return <StyledListBtn onClick={handleClick} />;
};
