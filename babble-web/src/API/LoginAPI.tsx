import axios from "axios";
import { baseUrl } from "../Constants";

export function kakaoLogin(c: string) {
  const urlWithQuery = `${baseUrl}/api/auth/login?code=${c}`;
  return axios.post(urlWithQuery, {});
}