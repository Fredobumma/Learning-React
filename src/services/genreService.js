import http from "./httpService";
import config from "../config/config.json";

export function genresEndpoint() {
  return http.get(config.genreApiEndpoint);
}
