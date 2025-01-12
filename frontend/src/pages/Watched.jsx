import "../css/home.css";
import { useMovieContext } from "../contexts/MovieContext";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";

function Watched() {
  const { watched, setMovies, setTotalResults, setLoading, totalResults } =
    useMovieContext();

  useEffect(() => {
    const loadWatchedMovies = async () => {
      setMovies(watched);
      setTotalResults(watched.length);
      setLoading(false);
    };
    loadWatchedMovies();
  }, []);

  return (
    <>
      <div className='movie-grid-heading'>
        <p>
          {totalResults} {totalResults === 1 ? "movie" : "movies"} watched
        </p>
      </div>
      <div className='movie-page'>
        <MoviePage />
      </div>
    </>
  );
}

export default Watched;
