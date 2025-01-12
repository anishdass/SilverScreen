import "../css/home.css";
import { useMovieContext } from "../contexts/MovieContext";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";

function Watchlist() {
  const { inWatchlist, setMovies, setTotalResults, setLoading, totalResults } =
    useMovieContext();

  useEffect(() => {
    const loadWatchlist = async () => {
      setMovies(inWatchlist);
      setTotalResults(inWatchlist.length);
      setLoading(false);
    };
    loadWatchlist();
  }, []);

  return (
    <>
      <div className='movie-grid-heading'>
        <p>
          {totalResults} {totalResults === 1 ? "movie" : "movies"} in watchlist
        </p>
      </div>
      <div className='movie-page'>
        <MoviePage />
      </div>
    </>
  );
}

export default Watchlist;
