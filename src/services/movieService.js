import http from "./httpService";
import config from "../config/config.json";

const apiEndpoint = `${config.apiUrl}/movies`;

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  return http.post(apiEndpoint, movie);
}

export function updateMovie(movie, movieId) {
  return http.put(movieUrl(movieId), movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
