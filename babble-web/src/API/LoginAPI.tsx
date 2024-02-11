import axios from "axios";
import { baseUrl } from "../Constants";

export function kakaoLogin(c: string) {
  return axios.post(baseUrl + "/api/auth/login", { params: { code: c } });
}
