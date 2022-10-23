import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config/config.json";

const apiEndpoint = `${config.apiUrl}/auth`;
const tokenKey = "token";

export async function login(user) {
  return http.post(apiEndpoint, user);
}

export function loginWithJwt(data) {
  localStorage.setItem(tokenKey, data);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {}
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
