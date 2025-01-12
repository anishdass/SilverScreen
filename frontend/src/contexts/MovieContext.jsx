import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [genreClicked, setGenreClicked] = useState("");
  const [genreId, setGenreId] = useState(1);
  const [videos, setVideos] = useState([]);
  const [streamingData, setStreamingData] = useState({});

  const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  };

  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [watched, setWatched] = useLocalStorage("watched", []);
  const [inWatchlist, setInWatchlist] = useLocalStorage("watchlist", []);
  const [genres, setGenres] = useLocalStorage("genres", {});

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
    addToWatched(movie);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const addToWatched = (movie) => {
    if (!isWatched(movie.id)) {
      setWatched((prev) => [...prev, movie]);
      removeFromWatchlist(movie.id);
    }
  };

  const removeFromWatched = (movieId) => {
    setWatched((prev) => prev.filter((movie) => movie.id !== movieId));
    removeFromFavorites(movieId);
  };

  const isWatched = (movieId) => {
    return watched.some((movie) => movie.id === movieId);
  };

  const addToWatchlist = (movie) => {
    if (!isInWatchlist(movie.id)) {
      setInWatchlist((prev) => [...prev, movie]);
      removeFromFavorites(movie.id);
      removeFromWatched(movie.id);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setInWatchlist((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return inWatchlist.some((movie) => movie.id === movieId);
  };

  const handleAction = (addFn, removeFn, condition, movieData) => {
    condition ? removeFn(movieData.id) : addFn(movieData);
  };

  const value = {
    searchQuery,
    setSearchQuery,
    movies,
    setMovies,
    error,
    setError,
    loading,
    setLoading,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    watched,
    addToWatched,
    removeFromWatched,
    isWatched,
    inWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    currentPage,
    setCurrentPage,
    totalResults,
    setTotalResults,
    genreClicked,
    setGenreClicked,
    genres,
    genreId,
    setGenreId,
    videos,
    setVideos,
    streamingData,
    setStreamingData,
    handleAction,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
