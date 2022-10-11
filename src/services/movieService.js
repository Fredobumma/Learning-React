import http from "./httpService";
import config from "../config/config.json";

export function getMovies() {
  return http.get(`${config.apiUrl}/movies`);
}

export function getMovie(movieId) {
  return http.get(`${config.apiUrl}/movies/${movieId}`);
}

export function saveMovie(movie) {
  console.log(`${config.apiUrl}/movies`);
  return http.post(`${config.apiUrl}/movies`, movie);
}

export function updateMovie(movie, movieId) {
  return http.put(`${config.apiUrl}/movies/${movieId}`, movie);
}
