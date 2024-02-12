import { useEffect } from "react";
import { kakaoLogin } from "../../API/LoginAPI";
import { useNavigate } from "react-router-dom";

const LoginToMain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getCodeFromUrl = () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get(`code`);
      return code;
    };

    const code = getCodeFromUrl();
    console.log(code);

    if (code) {
      kakaoLogin(code)
        .then((response) => {
          
          localStorage.setItem("accessToken", response.data.accessToken);
          console.log(localStorage.getItem("accessToken"));
          navigate("/main");
        })
        .catch((error) => {
          console.error("Login failed:", error);
          navigate("/main"); //일단 메인으로 이동
        });
    }
  }, [navigate]);

  return <div>Wait for a moment...</div>;
};

export default LoginToMain;
