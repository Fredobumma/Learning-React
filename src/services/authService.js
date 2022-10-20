import http from "./httpService";
import config from "../config/config.json";

const apiEndpoint = `${config.apiUrl}/auth`;

export function login(user) {
  return http.post(apiEndpoint, user);
}
