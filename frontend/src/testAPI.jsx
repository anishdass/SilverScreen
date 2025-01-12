const API_KEY = "3570b521118764bbb1a871af55e9fb5c";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();

  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  console.log(data.results);
  return data.results;
};

export const getCastAndCrewDetails = async (query) => {
  const url = `${BASE_URL}/movie/${encodeURIComponent(
    query
  )}/credits?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(`${IMAGE_BASE_URL}w500${data["cast"][0]["profile_path"]}`);

  return data;
};

export const getGenres = async () => {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
