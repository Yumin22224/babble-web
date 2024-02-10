import { useEffect } from "react";
import { kakaoLogin } from "../../API/LoginAPI";

const LoginToMain = () => {

    useEffect(() => {
        const getCodeFromUrl = () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const code = urlParams.get(`code`);
            return code;
        };

        const code = getCodeFromUrl();

        if (code) {
            kakaoLogin(code);
        }
    }, [])
    
    return (
        <div>Wait for a moment...</div>
    )
}

export default LoginToMain;