import styled from "styled-components";
import { GlassmorphismDiv } from "../../StyledComponents/GmDiv";
import { useEffect, useState } from "react";
import KakImage from "../../assets/Kak.png";
import { clientUrl } from "../../Constants";
//import { useMyLocationContext } from "../../Context/MyLocationContext";

const MainDiv = styled(GlassmorphismDiv)<{ $check: boolean }>`
  border-radius: ${(prop) => (prop.$check ? "30%" : "40%")};
  transition: border-radius 0.3s ease;
`;

const StyledLogoDiv = styled.h1<{ $check: boolean }>`
  font-weight: 800;
  margin-bottom: ${(prop) =>
    prop.$check ? "calc(0.3rem + 0.5vw)" : "calc(0.5rem + 0.5vw)"};
  margin-top: calc(0.7rem + 0.5vw);
  margin-left: ${(prop) =>
    prop.$check ? "calc(0.3rem + 0.5vw)" : "calc(0.3rem + 0.2vw)"};
  margin-right: ${(prop) =>
    prop.$check ? "calc(0.3rem + 0.5vw)" : "calc(0.3rem + 0.2vw)"};
  transition: margin 0.3s ease;
`;

const StyledCheckInput = styled.div<{ $check: boolean }>`
  font-size: calc(1rem + 1vw);
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  transition: transform 0.3s ease;
  transform: ${({ $check }) =>
    $check
      ? "translateY(0px)"
      : "translateY(10px)"}; /* 체크 여부에 따라 위치 변경 */

  input {
    order: 2;
    width: calc(0.8rem + 1vw);
    height: calc(0.8rem + 1vw);
    margin: 1vw;
  }
  label {
    order: 1;
  }
  input:checked + label {
    font-weight: bold;
  }
`;

const StyledKakaoLogin = styled.button<{ $show: boolean }>`
  all: unset;

  margin-top: calc(0.5rem + 0.5vw);
  margin-bottom: calc(1rem + 0.5vw);

  background-image: url(${KakImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  height: ${({ $show }) => ($show ? "calc(2rem + 0.5vw)" : "0")};
  width: ${({ $show }) => ($show ? "calc(5rem + 0.5vw)" : "0")};
  padding: ${({ $show }) => ($show ? "calc(0.5rem + 0.5vw)" : "0")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition:
    width 0.3s ease,
    height 0.3s ease,
    padding 0.3s ease,
    opacity 0.3s ease;
`;

const Landing = () => {
  const [check, setCheck] = useState(false);

  //const { updateCurLocation, setCurLocation } = useMyLocationContext();

  const requestLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("위치 정보 접근 성공", position);

          //카카오페이지라는 새로운 페이지로 이동했다가 다시 복귀하는 것이기 때문에, React 어플리케이션 상태가 초기화된다.
          // updateCurLocation(position);
          // setCurLocation({
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude,
          // });
        },
        (error) => {
          console.error("위치 정보 접근 실패", error);
        }
      );
    } else {
      console.error("This browser does not support Geolocation.");
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheck(isChecked);

    if (isChecked) {
      requestLocationAccess();
    }
  };

  const Rest_api_key = "66e0056e554144467f120b3504e71658";
  const redirect_uri = clientUrl + "/auth";
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  //카카오 로그인 페이지에서 뒤로가기 할 경우 버그 (미해결)
  useEffect(() => {
    // 페이지 로드 시 체크박스 상태 확인
    const checkbox = document.getElementById("check") as HTMLInputElement;
    if (checkbox) {
      setCheck(checkbox.checked);
    }
  }, []);

  return (
    <MainDiv $check={check}>
      <StyledLogoDiv $check={check}>babble</StyledLogoDiv>
      <StyledCheckInput $check={check}>
        <input
          id="check"
          type="checkbox"
          checked={check}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="check">위치 정보 수집 동의</label>
      </StyledCheckInput>
      <StyledKakaoLogin $show={check} onClick={handleLogin} />
    </MainDiv>
  );
};

export default Landing;
