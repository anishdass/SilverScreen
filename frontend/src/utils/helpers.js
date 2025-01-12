import {
  fetchPaginatedMovies,
  fetchVideoDetails,
  fetchStreamingDetails,
  fetchCurrentCountry,
  fetchData,
} from "../services/API";

import {
  API_KEY,
  BASE_URL,
  LANG,
  URL_TO_GET_CURRENT_COUNTRY,
} from "./constants";

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getJobList(artistAsCrew) {
  return [...new Set(artistAsCrew.map((data) => data.job))];
}

// Popular Movies
export const searchPopularMovies = async (pageNumber) => {
  const baseUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  return fetchPaginatedMovies(baseUrl, pageNumber);
};

// Genre Movies
export const searchMoviesByGenre = async (id, pageNumber) => {
  const baseUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
  const extraParams = `&with_genres=${id}`;
  return fetchPaginatedMovies(baseUrl, pageNumber, extraParams);
};

// Search Movies
export const searchMoviesByQuery = async (query, pageNumber) => {
  const baseUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}`;
  const extraParams = `&query=${encodeURIComponent(query)}`;
  return fetchPaginatedMovies(baseUrl, pageNumber, extraParams);
};

// Get promotional material details
export function getVideoDetails(movieId) {
  const baseUrl = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${LANG}`;
  return fetchVideoDetails(baseUrl);
}

// Get Streaming Details
export function getStreamingDetails(movieId) {
  const baseUrl = `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`;
  return fetchStreamingDetails(baseUrl);
}

// Get Current Country
export function getCurrentCountry() {
  const baseURl = `${URL_TO_GET_CURRENT_COUNTRY}`;
  return fetchCurrentCountry(baseURl);
}

//Get Cast Info
export function getCastInfo(memberId) {
  const baseUrl = `${BASE_URL}/person/${memberId}?api_key=${API_KEY}&language=${LANG}`;
  return fetchData(baseUrl);
}

// Get Cast And Crew Details
export function getCastAndCrewDetails(movieId) {
  const baseUrl = `${BASE_URL}/movie/${encodeURIComponent(
    movieId
  )}/credits?api_key=${API_KEY}`;
  return fetchData(baseUrl);
}

// Get Genres
export function getGenres() {
  const baseUrl = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
  return fetchData(baseUrl);
}

export function getArtistFilmography(castId) {
  const baseUrl = `${BASE_URL}/person/${castId}/movie_credits?api_key=${API_KEY}`;
  return fetchData(baseUrl);
}

export function storeComment(comment, movie) {
  if (comment.trim()) {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    console.log(storedComments);

    const newComment = {
      id: Date.now(),
      movie_id: movie.id,
      text: comment,
      date: new Date().toISOString(),
    };

    storedComments.push(newComment);

    localStorage.setItem("comments", JSON.stringify(storedComments));
  }
}

export function getCommentAndTimeSinceUpdate(movie) {
  let comment = "";
  let timeSinceUpdate = "";

  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  if (comments.length > 0) {
    const filteredComments = comments.filter(
      (comment) => comment.movie_id === movie.id
    );

    if (filteredComments.length > 0) {
      const latestComment = filteredComments.reduce((latest, current) =>
        current.id > latest.id ? current : latest
      );

      comment = latestComment;

      if (comment.date) {
        const commentDate = new Date(comment.date);
        const currentDate = new Date();
        const timeDiff = currentDate - commentDate;

        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
          timeSinceUpdate = `${days} day${days > 1 ? "s" : ""} ago`;
        } else if (hours > 0) {
          timeSinceUpdate = `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else if (minutes > 0) {
          timeSinceUpdate = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else {
          timeSinceUpdate = `${seconds} second${seconds > 1 ? "s" : ""} ago`;
        }
      }
    }
  }
  return { comment, timeSinceUpdate };
}
