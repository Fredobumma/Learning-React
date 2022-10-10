import http from "./httpService";
import config from "../config/config.json";

export function moviesEndpoint() {
  return http.get(config.moviesApiEndpoint);
}
