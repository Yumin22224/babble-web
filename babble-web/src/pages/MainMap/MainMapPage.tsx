import styled from "styled-components";
import { GlassmorphismDiv } from "../../StyledComponents/GmDiv";
import MainMap from "./MainMap";
import { ListDiv } from "./Components/ChatRoomList";
import { useState } from "react";
//import { useEffect } from "react";

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
  return (
    <StyledMainDiv>
      <ListBtn handleClick={handleClick} />
      {showList && <ListDiv setShowList={setShowList} />}
      <MainMap />
    </StyledMainDiv>
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
