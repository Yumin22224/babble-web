import styled from "styled-components";
//import { GlassmorphismDiv } from "../../StyledComponents/GmDiv.tsx";
import { useState } from "react";
import { StyledButton } from "../../StyledComponents/Button";
import { useMyLocationContext } from "../../Context/MyLocationContext";
import { useContext } from "react";
import { NewChatRoomContext } from "../../Context/ChatRoomsContext";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../StyledComponents/Wrapper";

const StyledNewChatRoomDiv = styled.div`
  width: calc(25vw + 29em);
  height: calc(5vw + 20em);
  border-radius: 30%/40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1vw 1vw;
  

  background: var(--4-hex); 
  //box-shadow:
    -8px -8px 16px rgba(255, 255, 255, 0.8),
    8px 8px 16px rgba(163, 177, 198, 0.5);
  h1 {
    font-size: 1.7em;
  }
  .tagTitle {
    font-size: 1.5em;
    font-weight: 600;
  }

  .tagContainer {
    display: flex;
    flex-direction: row;
  }

  .tag {
    cursor: pointer;
    margin: 0.5vw;
  }
  label {
    font-size: 1.3em;
    font-weight: 600;
    margin-top: 1vw;
    color:var(--3-hex);
  }
  input {
    all: unset;
    color: white;
    height: calc(3vh + 2rem);
    width: calc(6vw + 18rem);
    border-radius: 10% / 50%;

    margin: 0 4vw;
  }
  input {
    border: none;
    background: #e0e5ec;
    box-shadow:
      inset 8px 8px 16px rgba(163, 177, 198, 0.2),
      inset -8px -8px 16px rgba(255, 255, 255, 0.8);
  }
  input::placeholder {
    mix-blend-mode: difference;
    opacity: 0.7;
  }
`;

const StyledTag = styled.div<{ $selected: boolean }>`
  background: ${({ $selected }) => ($selected ? "#AED0EA" : "transparent")};
  border-radius: 25px;
  padding: 5px 10px;
  width: calc(3vw + 2.5rem);
  box-shadow: ${({ $selected }) =>
    $selected
      ? "inset 5px 5px 10px #99a9b3, inset -5px -5px 10px #ffffff"
      : "5px 5px 10px #99a9b3, -5px -5px 10px #ffffff"};

  &.selected {
    box-shadow:
      inset 5px 5px 10px #b8bcc3,
      inset -5px -5px 10px #fff;
    color: white;
  }
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #aed0ea; /* 하버 시 하늘색 배경 */
  }
`;

const CreateBtn = styled(StyledButton)`
  font-size: calc(1vw + 0.8em);
  line-height: calc(2vh + 0.3em);
  font-weight: 700;

  background: rgba(53, 81, 242, 1);
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  box-shadow:
    -5px -5px 10px rgba(255, 255, 255, 0.8),
    5px 5px 10px rgba(163, 177, 198, 0.5);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 1vh;
  &:hover {
    box-shadow:
      -2px -2px 5px rgba(255, 255, 255, 0.8),
      2px 2px 5px rgba(163, 177, 198, 0.5);
  }
`;

const StyledWrapper = styled(Wrapper)`
  &.show {
    opacity: 1;
    visibility: visible;
  }
  opacity: 0;
  visibility: hidden;

  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const tagGuide = [
  {
    tag: "강의실",
    guide: "강의동, 호수를 입력해주세요",
    example: "301동 308호, 83동 301호, ...",
    engTag: "LECTURE_ROOM",
  },
  {
    tag: "학생 식당",
    guide: "식당 이름을 입력해주세요",
    example: "학생회관 식당, 자하연 식당, ...",
    engTag: "CAFETERIA",
  },
  {
    tag: "식당",
    guide: "식당 이름을 입력해주세요",
    example: "포포인, BBQ, ...",
    engTag: "RESTAURANT",
  },
  {
    tag: "도서관",
    guide: "도서관 이름, 층을 입력해주세요",
    example: "관정도서관 7층, 신양공학학술정보관 1층, ...",
    engTag: "LIBRARY",
  },
  {
    tag: "동아리방",
    guide: "동아리 이름을 입력해주세요",
    example: "와플스튜디오, SCSC, ...",
    engTag: "CLUB_ACTIVITY_ROOM",
  },
  {
    tag: "과방",
    guide: "과 이름을 입력해주세요",
    example: "전기정보공학부 윗과방, 컴퓨터공학부, ...",
    engTag: "DEPARTMENT_ROOM",
  },
  {
    tag: "카페",
    guide: "카페 이름을 입력해주세요",
    example: "관정 파스쿠찌, 자하연 느티나무, ...",
    engTag: "CAFE",
  },
];

const NewChatRoomPage = ({ isVisible }: { isVisible: boolean }) => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState(0);
  const [roomName, setRoomName] = useState("");
  const { curLocation } = useMyLocationContext();
  const context = useContext(NewChatRoomContext);
  if (!context) {
    throw new Error(
      "useContext(NewChatRoomContext) must be inside a Provider with a value"
    );
  }

  const { setRoomSpec, setTag } = context;

  const handleTagClick = (index: number) => {
    setSelectedTag(index);
  };

  const handleChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleCreateClick = () => {
    if (curLocation.lat === 0 && curLocation.lng === 0) {
      alert("잠시만 기다려주세요. (위치 정보 갱신중...)");
      return;
    }
    if (roomName.length === 0) {
      alert("방 이름을 입력해주세요.");
      return;
    }
    const newRoom = {
      hashTag: tagGuide[selectedTag].engTag,
      latitude: curLocation.lat,
      longitude: curLocation.lng,
      roomName: roomName,
    };
    setRoomSpec(newRoom);
    setTag(tagGuide[selectedTag].tag);
    navigate(`/enter/0`);
  };

  return (
    <StyledWrapper className={`wrapper ${isVisible && `show`}`}>
      <StyledNewChatRoomDiv className={`${isVisible && "showDiv"}`}>
        <h1>현 위치에 채팅방 개설</h1>
        <div className="tagTitle">태그를 선택해주세요</div>
        <div className="tagContainer">
          {tagGuide.map((tag, index) => (
            <StyledTag
              key={index}
              className={`tag ${selectedTag === index ? "selected" : ""}`}
              onClick={() => handleTagClick(index)}
              $selected={selectedTag === index}
            >
              {tag.tag}
            </StyledTag>
          ))}
        </div>
        <label htmlFor="roomTitle">{tagGuide[selectedTag].guide}</label>
        <input
          type="text"
          id="roomTitle"
          onChange={handleChange}
          placeholder={tagGuide[selectedTag].example}
        />
        <CreateBtn className="createRoom" onClick={handleCreateClick}>
          생성
        </CreateBtn>
      </StyledNewChatRoomDiv>
    </StyledWrapper>
  );
};

export default NewChatRoomPage;
