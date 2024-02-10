import axios from "axios";
import { baseUrl } from "../Constants";

export function kakaoLogin(code: string) {
  return axios.post(baseUrl + "/api/auth/login", { code: code });
}
