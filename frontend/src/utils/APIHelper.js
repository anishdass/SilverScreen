import {
  fetchPaginatedMovies,
  fetchCurrentCountry,
  fetchData,
  fetchDataResults,
  fetchSimilarMoviesSortedByPopularity,
} from "../services/API";

import {
  TMDB_API_KEY,
  TMDB_BASE_URL,
  OMDB_BASE_URL,
  LANG,
  URL_TO_GET_CURRENT_COUNTRY,
  OMDB_API_KEY,
} from "./constants";

// Popular Movies
export const searchPopularMovies = async (pageNumber) => {
  const baseUrl = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
  return fetchPaginatedMovies(baseUrl, pageNumber);
};

// Genre Movies
export const searchMoviesByGenre = async (id, pageNumber) => {
  const baseUrl = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}`;
  const extraParams = `&with_genres=${id}`;
  return fetchPaginatedMovies(baseUrl, pageNumber, extraParams);
};

//Keyword Movies
export const searchMoviesByKeyword = async (id, pageNumber) => {
  const baseUrl = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}`;
  const extraParams = `&with_keywords=${id}`;
  return fetchPaginatedMovies(baseUrl, pageNumber, extraParams);
};

// Search Movies
export const searchMoviesByQuery = async (query, pageNumber) => {
  const baseUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}`;
  const extraParams = `&query=${encodeURIComponent(query)}`;
  return fetchPaginatedMovies(baseUrl, pageNumber, extraParams);
};

// Get promotional material details
export function getVideoDetails(movieId) {
  const baseUrl = `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=${LANG}`;
  return fetchDataResults(baseUrl);
}

// Get Streaming Details
export function getStreamingDetails(movieId) {
  const baseUrl = `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`;
  return fetchDataResults(baseUrl);
}

// Get Current Country
export function getCurrentCountry() {
  const baseURl = `${URL_TO_GET_CURRENT_COUNTRY}`;
  return fetchCurrentCountry(baseURl);
}

//Get Cast Info
export function getCastInfo(memberId) {
  const baseUrl = `${TMDB_BASE_URL}/person/${memberId}?api_key=${TMDB_API_KEY}&language=${LANG}`;
  return fetchData(baseUrl);
}

// Get Cast And Crew Details
export function getCastAndCrewDetails(movieId) {
  const baseUrl = `${TMDB_BASE_URL}/movie/${encodeURIComponent(
    movieId
  )}/credits?api_key=${TMDB_API_KEY}`;
  return fetchData(baseUrl);
}

export function getArtistFilmography(castId) {
  const baseUrl = `${TMDB_BASE_URL}/person/${castId}/movie_credits?api_key=${TMDB_API_KEY}`;
  return fetchData(baseUrl);
}

export function getRatingArray(movieTitle, type, year) {
  const baseUrl = `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&t=${movieTitle}&type=${type}&y=${year}`;
  return fetchData(baseUrl);
}

export async function getMovieDetails(movieId) {
  const baseUrl = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=${LANG}`;
  return fetchData(baseUrl);
}

export function getKeywords(movieId) {
  const baseUrl = `${TMDB_BASE_URL}/movie/${movieId}/keywords?api_key=${TMDB_API_KEY}&language=${LANG}`;
  return fetchData(baseUrl);
}

export function getSimilarMovies(movieId, page = 1) {
  const baseUrl = `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
  return fetchSimilarMoviesSortedByPopularity(baseUrl);
}

export function getCollectionDetails(collectionId, page = 1) {
  const baseUrl = `${TMDB_BASE_URL}/collection/${collectionId}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
  return fetchData(baseUrl);
}
