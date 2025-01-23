import "../css/Home.css";
import { useMovieContext } from "../contexts/MovieContext";
import MoviePage from "../components/MoviePage";
import { useEffect } from "react";
import NoMovie from "../elements/common/NoMovie";

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

  if (watched.length > 0) {
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
  } else {
    return <NoMovie page={"Watched"} />;
  }
}

export default Watched;
