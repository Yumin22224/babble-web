import axios from "axios";
import { baseUrl } from "../Constants";

function kakaoLogin(c: string) {
  const urlWithQuery = `${baseUrl}/api/auth/login?token=${c}`;
  return axios.post(urlWithQuery, {});
}

import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";

const SocialKakao = () => {
  const navigate = useNavigate();
  const Javascript_api_key = "3d9458a60e9e270c3821f682d91f43c0"; //환경변수로 했더니 브라우저에서 읽지 못하는 에러 (미해결)
  const kakaoOnSuccess = async (data) => {
    const idToken = data.response.access_token;
    //console.log(`idToken from kakao: ${idToken}`);
    kakaoLogin(idToken)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        //console.log(localStorage.getItem("accessToken"));
        navigate("/main");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        navigate("/main"); //일단 메인으로 이동
      });
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
    alert(`로그인을 다시 시도해주세요.`);
    navigate(`/login`);
  };

  return (
    <KakaoLogin
      token={Javascript_api_key}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
    />
  );
};

export default SocialKakao;
