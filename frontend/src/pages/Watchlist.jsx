import "../css/Home.css";
import { useMovieContext } from "../contexts/MovieContext";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";
import NoMovie from "../elements/common/NoMovie";

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

  if (inWatchlist.length > 0) {
    return (
      <>
        <div className='movie-grid-heading'>
          <p>
            {totalResults} {totalResults === 1 ? "movie" : "movies"} in
            watchlist
          </p>
        </div>
        <div className='movie-page'>
          <MoviePage />
        </div>
      </>
    );
  } else {
    return <NoMovie page={"Watchlist"} />;
  }
}

export default Watchlist;
