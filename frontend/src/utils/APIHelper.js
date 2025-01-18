import {
  fetchPaginatedMovies,
  fetchVideoDetails,
  fetchStreamingDetails,
  fetchCurrentCountry,
  fetchData,
} from "../services/API";

import {
  TMDB_API_KEY,
  BASE_URL,
  LANG,
  URL_TO_GET_CURRENT_COUNTRY,
  OMDB_API_KEY,
} from "./constants";

// Popular Movies
export const searchPopularMovies = async (pageNumber) => {
  const baseUrl = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
  return fetchPaginatedMovies(baseUrl, pageNumber);
};

// Genre Movies
export const searchMoviesByGenre = async (id, pageNumber) => {
  const baseUrl = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}`;
  const extraParams = `&with_genres=${id}`;
  return fetchPaginatedMovies(baseUrl, pageNumber, extraParams);
};

// Search Movies
export const searchMoviesByQuery = async (query, pageNumber) => {
  const baseUrl = `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}`;
  const extraParams = `&query=${encodeURIComponent(query)}`;
  return fetchPaginatedMovies(baseUrl, pageNumber, extraParams);
};

// Get promotional material details
export function getVideoDetails(movieId) {
  const baseUrl = `${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=${LANG}`;
  return fetchVideoDetails(baseUrl);
}

// Get Streaming Details
export function getStreamingDetails(movieId) {
  const baseUrl = `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`;
  return fetchStreamingDetails(baseUrl);
}

// Get Current Country
export function getCurrentCountry() {
  const baseURl = `${URL_TO_GET_CURRENT_COUNTRY}`;
  return fetchCurrentCountry(baseURl);
}

//Get Cast Info
export function getCastInfo(memberId) {
  const baseUrl = `${BASE_URL}/person/${memberId}?api_key=${TMDB_API_KEY}&language=${LANG}`;
  return fetchData(baseUrl);
}

// Get Cast And Crew Details
export function getCastAndCrewDetails(movieId) {
  const baseUrl = `${BASE_URL}/movie/${encodeURIComponent(
    movieId
  )}/credits?api_key=${TMDB_API_KEY}`;
  return fetchData(baseUrl);
}

export function getArtistFilmography(castId) {
  const baseUrl = `${BASE_URL}/person/${castId}/movie_credits?api_key=${TMDB_API_KEY}`;
  return fetchData(baseUrl);
}

export function getRatingArray(movieTitle) {
  const baseUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieTitle}`;
  return fetchData(baseUrl);
}
